"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { AnimateInView } from "@/components/common/AnimateInView";
import { DURATION_SLOW, STAGGER_DEFAULT } from "@/lib/motion";

interface StatItem {
  label: { ko: string; en: string };
  value?: number;
  suffix?: { ko: string; en: string };
  prefix?: { ko: string; en: string };
  text?: { ko: string; en: string };
}

interface StatsSectionProps {
  statsLabel: string;
  statsTitle: string;
  statsSince: string;
  statsSinceDesc: string;
  stats: StatItem[];
  locale: "ko" | "en";
}

function useCounter(target: number, duration: number, triggered: boolean, skip: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (skip || !triggered) return;

    const startTime = performance.now();
    const isFloat = !Number.isInteger(target);

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isFloat
        ? parseFloat((eased * target).toFixed(2))
        : Math.round(eased * target);
      setCount(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [triggered, target, duration, skip]);

  return skip ? target : count;
}

function StatColumn({
  item,
  locale,
  triggered,
  reducedMotion,
  index,
}: {
  item: StatItem;
  locale: "ko" | "en";
  triggered: boolean;
  reducedMotion: boolean;
  index: number;
}) {
  const count = useCounter(item.value ?? 0, 2.2, triggered && !item.text, reducedMotion);
  const displayValue = item.value && Number.isInteger(item.value) ? count : count.toFixed(2);

  const content = (
    <div className="group relative">
      {item.text ? (
        <p className="text-4xl font-bold leading-snug tracking-tight text-midnight md:text-5xl lg:text-6xl">
          {item.text[locale]}
        </p>
      ) : (
        <p className="font-mono text-5xl font-bold leading-none text-midnight md:text-6xl lg:text-7xl">
          {item.prefix && <span className="text-2xl text-midnight/50 md:text-3xl">{item.prefix[locale]}</span>}
          {displayValue}
          <span className="ml-1 text-xl text-midnight/30 md:text-2xl">{item.suffix?.[locale]}</span>
        </p>
      )}

      {item.label[locale] && (
        <p className="mt-3 text-sm uppercase tracking-[0.15em] text-gray-400">
          {item.label[locale]}
        </p>
      )}
    </div>
  );

  return (
    <AnimateInView y={40} delay={index * STAGGER_DEFAULT + 0.2}>
      {content}
    </AnimateInView>
  );
}

export function StatsSection({
  statsLabel,
  statsTitle,
  statsSince,
  statsSinceDesc,
  stats,
  locale,
}: StatsSectionProps) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [sinceItem, ...restItems] = stats;

  useEffect(() => {
    if (reducedMotion || triggered) return;

    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, triggered]);

  const sinceCount = useCounter(sinceItem.value ?? 0, 2.2, triggered, reducedMotion);

  const titleContent = (
    <>
      <SectionLabel>{statsLabel}</SectionLabel>
      <h2 className="mt-4 font-display text-3xl font-normal tracking-tight text-midnight break-keep md:text-4xl lg:text-5xl lg:leading-[1.15]">
        {statsTitle}
      </h2>
    </>
  );

  const sinceBlock = (
    <div className="relative">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{statsSince}</p>
      <p className="mt-2 font-mono text-7xl font-bold leading-none text-midnight md:text-8xl lg:text-9xl">
        {sinceCount}
        <span className="ml-2 text-3xl text-midnight/30 md:text-4xl">{sinceItem.suffix?.[locale]}</span>
      </p>
      <p className="mt-5 max-w-sm text-base leading-relaxed text-gray-500">
        {statsSinceDesc}
      </p>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        {/* 상단: 타이틀 + Since */}
        <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <AnimateInView y={30} duration={DURATION_SLOW}>{titleContent}</AnimateInView>
          </div>

          <div>
            <AnimateInView y={30} duration={DURATION_SLOW} delay={0.1}>{sinceBlock}</AnimateInView>
          </div>
        </div>

        <div className="my-16 h-px bg-gray-200 md:my-20" />

        {/* 하단: 스탯 컬럼 */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {restItems.map((item, index) => (
            <StatColumn
              key={item.label.ko || item.text?.ko}
              item={item}
              locale={locale}
              triggered={triggered}
              reducedMotion={reducedMotion}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
