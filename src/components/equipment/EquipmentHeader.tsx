"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { GlowBlob } from "@/components/common/GlowBlob";

interface CounterStat {
  label: string;
  value: number;
}

interface EquipmentHeaderProps {
  title: string;
  subtitle: string;
  stats: CounterStat[];
}

const DURATION_MS = 2000;

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedCounter({ value, label }: CounterStat) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion || startedRef.current) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / DURATION_MS, 1);
            const easedProgress = easeOut(progress);
            setDisplay(Math.round(easedProgress * value));

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick);
            }
          };

          rafRef.current = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, reducedMotion]);

  const displayValue = reducedMotion ? value : display;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 rounded-lg border border-steel/60 px-6 py-5"
    >
      <span className="font-mono text-4xl font-bold text-white md:text-5xl">
        {displayValue}
      </span>
      <span className="text-xs uppercase tracking-widest text-gray-500">
        {label}
      </span>
    </div>
  );
}

export function EquipmentHeader({ title, subtitle, stats }: EquipmentHeaderProps) {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-midnight px-5 py-20 text-white md:px-10 lg:px-20">
      <GlowBlob className="-bottom-32 -left-32" size={500} />
      <GlowBlob className="-right-32 -top-32" size={400} />

      <div className="relative z-10 text-center">
        <SectionLabel>EQUIPMENT</SectionLabel>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
          {subtitle}
        </p>

        <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
