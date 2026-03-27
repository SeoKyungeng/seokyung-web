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

const REVEAL_MS = 400;

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

      phaseRef.current = "snap-blur";
      setPhase("snap-blur");
      router.push(href);
    },
    [router, pathname, reducedMotion],
  );

  // popstate(뒤로/앞으로) → 어떤 phase든 취소 + snap-blur
  useEffect(() => {
    const handlePopState = () => {
      if (phaseRef.current !== "idle") {
        clearTimers();
      }
      if (!reducedMotion) {
        phaseRef.current = "snap-blur";
        setPhase("snap-blur");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [clearTimers, reducedMotion]);

  // 경로 변경 감지 (navigateWithTransition 경유 제외 — exiting/entering은 이미 처리됨)
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
        <TransitionOverlay phase={phase} reducedMotion={reducedMotion} />
      </PageTransitionContext.Provider>
    </TransitionContext.Provider>
  );
}

/* ── TransitionOverlay: 콘텐츠 위에 올라가는 blur 오버레이 ──
   콘텐츠 자체에 filter를 적용하지 않으므로
   CSS containing block 문제가 없고 fixed 요소에 영향 없음. */
function TransitionOverlay({
  phase,
  reducedMotion,
}: {
  phase: Phase;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return null;

  const active = phase !== "idle";
  const instant = phase === "snap-blur";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 45,
        backdropFilter: active ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: active ? "blur(12px)" : "blur(0px)",
        backgroundColor: active
          ? "rgba(2, 6, 23, 0.6)"
          : "rgba(2, 6, 23, 0)",
        transition: instant
          ? "none"
          : `backdrop-filter ${REVEAL_MS}ms ease, -webkit-backdrop-filter ${REVEAL_MS}ms ease, background-color ${REVEAL_MS}ms ease`,
        pointerEvents: active ? "auto" : "none",
      }}
      aria-hidden="true"
    />
  );
}
