"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Phase = "idle" | "exiting" | "snap-blur" | "entering";

const BLUR_MS = 800;
const REVEAL_MS = 800;

interface TransitionContextValue {
  navigateWithTransition: (href: string) => void;
  phase: Phase;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateWithTransition: () => {},
  phase: "idle",
});

export const PageTransitionContext = createContext(true);

export function usePageTransition() {
  return useContext(TransitionContext);
}

/* ── TransitionProvider: context + 상태 머신 ── */
export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const clear = clearTimers;
    return () => clear();
  }, [clearTimers]);

  const resetToIdle = useCallback(() => {
    clearTimers();
    phaseRef.current = "idle";
    setPhase("idle");
  }, [clearTimers]);

  const navigateWithTransition = useCallback(
    (href: string) => {
      if (phaseRef.current !== "idle") return;
      if (href === pathname) return;

      if (reducedMotion) {
        router.push(href);
        return;
      }

      phaseRef.current = "exiting";
      setPhase("exiting");

      exitTimerRef.current = setTimeout(() => {
        exitTimerRef.current = null;
        router.push(href);
        phaseRef.current = "entering";
        setPhase("entering");
      }, BLUR_MS);
    },
    [router, pathname, reducedMotion],
  );

  // exiting 중 popstate(뒤로가기) → 진행 중인 전환 취소 + snap-blur
  useEffect(() => {
    const handlePopState = () => {
      if (phaseRef.current === "exiting") {
        clearTimers();
        phaseRef.current = "snap-blur";
        setPhase("snap-blur");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [clearTimers]);

  // 경로 변경 감지 (popstate, locale 변경 등)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    if (phase === "idle" && !reducedMotion) {
      setPhase("snap-blur");
    }
  }

  // snap-blur → entering (1프레임 후 CSS transition 시작)
  useEffect(() => {
    if (phase !== "snap-blur") return;
    const raf = requestAnimationFrame(() => {
      phaseRef.current = "entering";
      setPhase("entering");
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // entering → idle
  useEffect(() => {
    if (phase !== "entering") return;
    enterTimerRef.current = setTimeout(() => {
      enterTimerRef.current = null;
      resetToIdle();
    }, REVEAL_MS);
    return () => {
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
      }
    };
  }, [phase, resetToIdle]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, phase }}>
      <PageTransitionContext.Provider value={phase === "idle"}>
        {children}
      </PageTransitionContext.Provider>
    </TransitionContext.Provider>
  );
}

/* ── TransitionOverlay: blur/opacity 시각 효과 래퍼 ──
   Header/GrainOverlay는 이 래퍼 바깥에 배치하여
   CSS filter의 containing block 영향을 받지 않도록 함. */
export function TransitionOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const { phase } = usePageTransition();
  const reducedMotion = useReducedMotion();

  const isBlurred = phase === "exiting" || phase === "snap-blur";

  const style: React.CSSProperties = reducedMotion
    ? {}
    : isBlurred
      ? {
          opacity: 0.4,
          filter: "blur(12px)",
          willChange: "filter, opacity",
          transition:
            phase === "snap-blur"
              ? "none"
              : `opacity ${BLUR_MS}ms ease, filter ${BLUR_MS}ms ease`,
        }
      : phase === "entering"
        ? {
            opacity: 1,
            filter: "blur(0px)",
            willChange: "filter, opacity",
            transition: `opacity ${REVEAL_MS}ms ease, filter ${REVEAL_MS}ms ease`,
          }
        : {};

  return (
    <div style={style} {...(isBlurred ? { inert: "" as never } : {})}>
      {children}
    </div>
  );
}
