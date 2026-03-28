"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { EASE_SMOOTH, EASE_SPRING } from "@/lib/motion";
import type { CEO } from "@/lib/types";

interface CeoSectionProps {
  ceo: CEO;
  locale: "ko" | "en";
  label: string;
}

export function CeoSection({ ceo, locale, label }: CeoSectionProps) {
  const { ref, isInView, reducedMotion } = useAnimateInView();
  const paragraphs = ceo.greeting.body[locale].split("\n\n");

  const leftStatic = (
    <div className="col-span-12 md:col-span-5">
      <SectionLabel>{label}</SectionLabel>
      <h2
        id="ceo-heading"
        className="mt-6 break-keep-all font-display text-3xl font-normal leading-[1.1] tracking-[-0.03em] text-gray-950 md:text-4xl lg:text-5xl"
      >
        {ceo.greeting.highlight[locale]}
      </h2>
      <div className="mt-8 h-0.5 w-16 bg-primary-400" />
      <div className="mt-8">
        <p className="font-display text-lg font-semibold text-gray-950">
          {ceo.name[locale]}
        </p>
        <p className="mt-1 text-sm uppercase tracking-[0.1em] text-gray-500">
          {ceo.title[locale]}
        </p>
      </div>
    </div>
  );

  const rightStatic = (
    <div className="col-span-12 space-y-6 break-keep-all text-base leading-relaxed text-gray-700 md:col-span-7 md:text-lg">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );

  const leftAnimated = (
    <div className="col-span-12 md:col-span-5">
      <SectionLabel>{label}</SectionLabel>
      <motion.h2
        id="ceo-heading"
        className="mt-6 break-keep-all font-display text-3xl font-normal leading-[1.1] tracking-[-0.03em] text-gray-950 md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: EASE_SMOOTH }}
      >
        {ceo.greeting.highlight[locale]}
      </motion.h2>
      <motion.div
        className="mt-8 h-0.5 w-16 origin-left bg-primary-400"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE_SMOOTH }}
      />
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: EASE_SMOOTH }}
      >
        <p className="font-display text-lg font-semibold text-gray-950">
          {ceo.name[locale]}
        </p>
        <p className="mt-1 text-sm uppercase tracking-[0.1em] text-gray-500">
          {ceo.title[locale]}
        </p>
      </motion.div>
    </div>
  );

  const rightAnimated = (
    <motion.div
      className="col-span-12 space-y-6 break-keep-all text-base leading-relaxed text-gray-700 md:col-span-7 md:text-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE_SPRING }}
    >
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </motion.div>
  );

  return (
    <section className="bg-white py-24 md:py-40" aria-labelledby="ceo-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        {reducedMotion ? (
          <div className="grid grid-cols-12 gap-10 md:gap-16">
            {leftStatic}
            {rightStatic}
          </div>
        ) : (
          <div ref={ref} className="grid grid-cols-12 gap-10 md:gap-16">
            {leftAnimated}
            {rightAnimated}
          </div>
        )}
      </div>
    </section>
  );
}
