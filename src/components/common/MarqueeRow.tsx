"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

const sizeStyles = {
  xl: "text-[clamp(40px,8vw,88px)] text-white/80 tracking-[-0.03em]",
  lg: "text-2xl md:text-[32px] text-white/80",
  sm: "text-xl md:text-2xl text-white/70",
};

interface MarqueeRowProps {
  text: string;
  reverse?: boolean;
  size?: "sm" | "lg" | "xl";
  duration?: number;
}

export function MarqueeRow({ text, reverse = false, size = "lg", duration }: MarqueeRowProps) {
  const reducedMotion = useReducedMotion();
  const repeated = `${text} · ${text} · ${text} · ${text} · `;

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-block ${reducedMotion ? "" : "animate-marquee"}`}
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: reducedMotion ? "paused" : "running",
          ...(duration ? { animationDuration: `${duration}s` } : {}),
        }}
      >
        <span className={`font-display font-normal leading-none ${sizeStyles[size]}`}>
          {repeated}
        </span>
        <span className={`font-display font-normal leading-none ${sizeStyles[size]}`}>
          {repeated}
        </span>
      </div>
    </div>
  );
}
