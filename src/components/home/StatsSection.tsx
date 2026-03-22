"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Card } from "@/components/common/Card";

interface StatItem {
  label: { ko: string; en: string };
  value: number;
  suffix: { ko: string; en: string };
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

interface StatCardProps {
  item: StatItem;
  locale: "ko" | "en";
  triggered: boolean;
  reducedMotion: boolean;
}

function StatCard({ item, locale, triggered, reducedMotion }: StatCardProps) {
  const count = useCounter(item.value, 2, triggered, reducedMotion);
  const label = item.label[locale];
  const suffix = item.suffix[locale];
  const displayValue = Number.isInteger(item.value) ? count : count.toFixed(2);

  return (
    <Card className="flex flex-col justify-center p-6 md:p-8">
      <p className="font-mono text-4xl md:text-5xl font-bold text-cyan-400 leading-none">
        {displayValue}
        <span className="text-2xl md:text-3xl ml-1 text-cyan-400/80">{suffix}</span>
      </p>
      <p className="mt-3 text-sm text-gray-500 uppercase tracking-wider">{label}</p>
    </Card>
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

  const sinceCount = useCounter(
    sinceItem.value,
    2,
    triggered,
    reducedMotion
  );

  return (
    <section ref={sectionRef} className="bg-smoke py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div className="mb-12 md:mb-16">
          <SectionLabel>{statsLabel}</SectionLabel>
          <SectionTitle className="mt-3 text-2xl md:text-4xl text-midnight">
            {statsTitle}
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
          <div className="md:col-span-2 md:row-span-2">
            <Card className="h-full p-8 md:p-12 bg-midnight/5 flex flex-col justify-between min-h-[220px] md:min-h-0">
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
                  {statsSince}
                </p>
                <p className="font-mono text-6xl md:text-8xl font-bold text-midnight leading-none">
                  {sinceCount}
                  <span className="text-3xl md:text-4xl ml-2 text-midnight/60">
                    {sinceItem.suffix[locale]}
                  </span>
                </p>
              </div>
              <p className="mt-6 text-gray-500 text-base md:text-lg leading-relaxed max-w-xs">
                {statsSinceDesc}
              </p>
            </Card>
          </div>

          <div className="md:col-span-2 md:row-span-2 grid grid-cols-2 gap-4">
            {restItems.map((item) => (
              <StatCard
                key={item.label.ko}
                item={item}
                locale={locale}
                triggered={triggered}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
