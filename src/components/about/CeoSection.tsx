"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { CEO } from "@/lib/types";

interface CeoSectionProps {
  ceo: CEO;
  locale: "ko" | "en";
  label: string;
}

export function CeoSection({ ceo, locale, label }: CeoSectionProps) {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [-20, 20]
  );

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 md:py-40"
      aria-labelledby="ceo-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <motion.div
              style={{ y: imageY }}
              className="relative h-[300px] w-full overflow-hidden rounded-lg bg-smoke md:h-full md:min-h-[480px]"
            >
              <Image
                src={ceo.photo}
                alt={`${ceo.name[locale]} ${ceo.title[locale]}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
                priority
              />
              {/* 이미지 없을 때 플레이스홀더 */}
              <div className="absolute inset-0 flex items-center justify-center bg-smoke">
                <span className="text-sm text-gray-400">
                  {ceo.name[locale]}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center md:col-span-7">
            <SectionLabel>{label}</SectionLabel>

            <h2
              id="ceo-heading"
              className="mt-5 font-display text-2xl font-semibold leading-snug text-gray-950 md:text-3xl"
            >
              {ceo.greeting.highlight[locale]}
            </h2>

            <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
              {ceo.greeting.body[locale]}
            </p>

            <div className="mt-10 border-t border-gray-200 pt-6 text-right">
              <p className="font-display text-lg font-semibold text-gray-900">
                {ceo.name[locale]}
              </p>
              <p className="mt-1 text-sm text-gray-500">{ceo.title[locale]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
