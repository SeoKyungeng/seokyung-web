"use client";

import { useEffect, useRef } from "react";
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

function EquipmentCard({ item, locale }: { item: EquipmentItem; locale: "ko" | "en" }) {
  const typeLabel = item.type.toUpperCase();
  const specEntries = item.specs.slice(0, 2);

  return (
    <div className="flex-shrink-0 w-[85vw] sm:w-[350px] rounded-lg border border-steel bg-midnight/60 overflow-hidden">
      <div
        className="relative h-48 bg-steel/30 flex items-center justify-center"
        style={{ clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)" }}
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-primary-400/30 mb-3">
            <svg
              className="w-7 h-7 text-primary-400/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="block text-xs text-primary-400/40 uppercase tracking-widest">
            {typeLabel}
          </span>
        </div>
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-primary-400/10 text-primary-400 border border-primary-400/20">
          {typeLabel}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs text-gray-500 mb-1">{item.manufacturer[locale]}</p>
        <h3 className="font-mono text-lg font-semibold text-white mb-4">{item.model}</h3>
        <dl className="space-y-1.5">
          {specEntries.map((spec) => (
            <div key={spec.label.ko} className="flex justify-between gap-4">
              <dt className="text-xs text-gray-500 truncate">{spec.label[locale]}</dt>
              <dd className="text-xs text-white/80 font-mono whitespace-nowrap">{spec.value}</dd>
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
    // 모바일에서는 GSAP 사용 안 함
    if (window.innerWidth < 768) return;

    let ctx: { revert: () => void } | null = null;

    const loadGsap = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
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
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              if (progress) {
                progress.style.width = `${self.progress * 100}%`;
              }
            },
          },
        });
      }, containerRef);
    };

    loadGsap();

    return () => {
      ctx?.revert();
    };
  }, [reducedMotion]);

  return (
    <section className="bg-midnight py-24 md:py-40">
      <div
        ref={containerRef}
        className="relative"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 mb-12">
          <SectionLabel variant="dark">{equipmentLabel}</SectionLabel>
          <SectionTitle weight="normal" className="mt-3 text-2xl md:text-4xl text-white">
            {equipmentTitle}
          </SectionTitle>
        </div>

        <div
          ref={trackRef}
          className={
            reducedMotion
              ? "flex gap-4 px-5 md:px-20 overflow-x-auto pb-4 scroll-snap-x-mandatory"
              : "flex gap-4 px-5 md:px-20 will-change-transform"
          }
          style={reducedMotion ? { scrollSnapType: "x mandatory" } : undefined}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={reducedMotion ? { scrollSnapAlign: "start" } : undefined}
            >
              <EquipmentCard item={item} locale={locale} />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-20 mt-8">
          <div className="h-px bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-primary-400 rounded-full transition-none"
              style={{ width: reducedMotion ? "100%" : "0%" }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-20 mt-8 flex justify-end">
          <CTAButton href="/equipment" variant="outline">
            {equipmentViewAll}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
