"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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

function EquipmentCard({ item, locale, index }: { item: EquipmentItem; locale: "ko" | "en"; index: number }) {
  const typeLabel = item.type.toUpperCase();
  return (
    <div className="group shrink-0 w-[85vw] sm:w-100 rounded-xl border border-white/10 ring-1 ring-white/5 bg-white/3 overflow-hidden transition-all duration-300 hover:border-primary-400/50 hover:shadow-[0_0_30px_rgba(20,71,230,0.15)]"
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div
        className="relative h-72 overflow-hidden rounded-t-xl"
      >
        <Image
          src={item.photo}
          alt={item.model}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 85vw, 400px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-midnight/80 via-midnight/20 to-transparent" />

        <span className="absolute -right-3 -bottom-4 font-mono text-[120px] leading-none text-white/5 select-none pointer-events-none group-hover:text-primary-400/8 transition-colors duration-500">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute bottom-3 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-black/40 text-white/80 ring-1 ring-white/10 backdrop-blur-sm group-hover:text-primary-300 group-hover:ring-primary-400/30 transition-all duration-300">
            {typeLabel}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-1">
          {item.name[locale]}
        </p>
        <h3 className="font-mono text-xl font-bold text-white group-hover:text-primary-300 transition-colors duration-200 leading-tight">
          {item.model}
        </h3>
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

  useEffect(() => {
    if (reducedMotion) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      trackRef.current?.setAttribute("data-lenis-prevent-touch", "");
      return;
    }

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
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
            <CTAButton href="/equipment" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40">
              {equipmentViewAll}
            </CTAButton>
          </div>
        </div>

        <div className="overflow-hidden max-md:overflow-x-auto">
          <div
            ref={trackRef}
            className="flex gap-5 px-5 md:px-20 max-md:overflow-x-auto max-md:pb-4 md:will-change-transform md:pb-8"
            style={{ scrollSnapType: "x mandatory", scrollPaddingInline: "20px" }}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                style={{ scrollSnapAlign: "start" }}
              >
                <EquipmentCard item={item} locale={locale} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-24 md:pb-40" />
    </section>
  );
}
