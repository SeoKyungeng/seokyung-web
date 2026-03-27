"use client";

import { useRef } from "react";
import { motion, useInView, type UseInViewOptions, type Easing } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_SPRING, DURATION_NORMAL } from "@/lib/motion";

/**
 * SSR-safe useInView 훅.
 * variants/stagger 패턴에서 whileInView 대신 사용.
 *
 * @example
 * const { ref, isInView, reducedMotion } = useAnimateInView();
 * <motion.div ref={ref} animate={isInView ? "visible" : "hidden"} />
 */
export function useAnimateInView(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: (options?.margin ?? "-10%") as UseInViewOptions["margin"],
  });

  return { ref, isInView, reducedMotion };
}

interface AnimateInViewProps {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  duration?: number;
  ease?: Easing | Easing[];
  className?: string;
  once?: boolean;
  margin?: string;
}

export function AnimateInView({
  children,
  y = 30,
  delay = 0,
  duration = DURATION_NORMAL,
  ease = [...EASE_SPRING] as [number, number, number, number],
  className,
  once = true,
  margin = "-10%",
}: AnimateInViewProps) {
  const { ref, isInView, reducedMotion } = useAnimateInView({ once, margin });

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
