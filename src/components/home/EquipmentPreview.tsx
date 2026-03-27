"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CTAButton } from "@/components/common/CTAButton";

import type { EquipmentItem } from "@/lib/types";

interface EquipmentPreviewProps {
  equipmentLabel: string;
  equipmentTitle: string;
  equipmentViewAll: string;
  items: EquipmentItem[];
  locale: "ko" | "en";
}

const TYPE_ICONS: Record<string, { path: string; viewBox: string }> = {
  cnc: {
    viewBox: "0 0 24 24",
    path: "M4 12a8 8 0 1116 0 8 8 0 01-16 0zm8-3v3l2.5 1.5M12 2v2m0 16v2M2 12h2m16 0h2",
  },
  mct: {
    viewBox: "0 0 24 24",
    path: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  },
  lathe: {
    viewBox: "0 0 24 24",
    path: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 6a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z",
  },
  other: {
    viewBox: "0 0 24 24",
    path: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  },
};

function EquipmentCard({ item, locale, index }: { item: EquipmentItem; locale: "ko" | "en"; index: number }) {
  const typeLabel = item.type.toUpperCase();
  const specEntries = item.specs.slice(0, 2);
  const icon = TYPE_ICONS[item.type] || TYPE_ICONS.other;

  return (
    <div className="group shrink-0 w-[85vw] sm:w-95 rounded-xl border border-white/10 ring-1 ring-white/5 bg-white/3 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary-400/50 hover:shadow-[0_0_30px_rgba(20,71,230,0.15)]"
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div
        className="relative h-44 bg-linear-to-br from-white/5 to-transparent flex items-center justify-center overflow-hidden"
        style={{ clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)" }}
      >
        <span className="absolute -right-3 -bottom-4 font-mono text-[120px] leading-none text-white/3 select-none pointer-events-none group-hover:text-primary-400/6 transition-colors duration-500">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:border-primary-400/30 group-hover:bg-primary-400/5 transition-all duration-300">
            <svg
              className="w-7 h-7 text-white/30 group-hover:text-primary-400/60 transition-colors duration-300"
              fill="none"
              viewBox={icon.viewBox}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon.path} />
            </svg>
          </div>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-white/5 text-white/40 ring-1 ring-white/10 group-hover:text-primary-400/70 group-hover:ring-primary-400/20 transition-all duration-300">
            {typeLabel}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-[11px] uppercase tracking-[0.15em] text-white/30 mb-2">
          {item.manufacturer[locale]}
        </p>
        <h3 className="font-mono text-2xl font-bold text-white mb-5 group-hover:text-primary-300 transition-colors duration-200 leading-tight">
          {item.model}
        </h3>

        <dl className="space-y-3 border-t border-white/10 pt-4">
          {specEntries.map((spec) => (
            <div key={spec.label.ko} className="flex items-baseline justify-between gap-4">
              <dt className="text-[11px] uppercase tracking-wider text-white/30">{spec.label[locale]}</dt>
              <dd className="text-base text-white/80 font-mono font-medium">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function EquipmentPreview({
  equipmentLabel,
  equipmentTitle,
  equipmentViewAll,
  items,
  locale,
}: EquipmentPreviewProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      const progress = progressRef.current;
      if (!track || !container) return;

      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = totalWidth - viewportWidth + 160;

      gsap.to(track, {
        x: () => -distance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) {
              progress.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section className="bg-midnight">
      <div
        ref={containerRef}
        className="relative z-10 pt-24 md:pt-40"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 mb-16">
          <div className="flex items-end justify-between gap-8">
            <div>
              <SectionLabel variant="dark">{equipmentLabel}</SectionLabel>
              <SectionTitle weight="normal" className="mt-3 text-2xl md:text-4xl text-white">
                {equipmentTitle}
              </SectionTitle>
            </div>
            <p className="hidden md:block font-mono text-6xl font-bold text-white/10 leading-none">
              {items.length}<span className="text-3xl text-white/6">+</span>
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className={
              reducedMotion
                ? "flex gap-5 px-5 md:px-20 overflow-x-auto pb-4 scroll-snap-x-mandatory"
                : "flex gap-5 px-5 md:px-20 will-change-transform pb-8"
            }
            style={reducedMotion ? { scrollSnapType: "x mandatory" } : undefined}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                style={reducedMotion ? { scrollSnapAlign: "start" } : undefined}
              >
                <EquipmentCard item={item} locale={locale} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto px-5 md:px-20 mt-10">
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-primary-400 rounded-full transition-none shadow-[0_0_8px_rgba(20,71,230,0.5)]"
              style={{ width: reducedMotion ? "100%" : "0%" }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-20 mt-8 flex justify-end">
          <CTAButton href="/equipment" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40">
            {equipmentViewAll}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
