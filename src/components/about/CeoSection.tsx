"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_SMOOTH } from "@/lib/motion";
import type { CEO } from "@/lib/types";

interface CeoSectionProps {
  ceo: CEO;
  locale: "ko" | "en";
  label: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, delay: 0.3, ease: EASE_SMOOTH },
  },
};

export function CeoSection({ ceo, locale, label }: CeoSectionProps) {
  const reducedMotion = useReducedMotion();
  const paragraphs = ceo.greeting.body[locale].split("\n\n");

  const content = (
    <div className="mx-auto max-w-3xl text-center">
      <SectionLabel>{label}</SectionLabel>

      {reducedMotion ? (
        <>
          <h2
            id="ceo-heading"
            className="mt-5 font-display text-2xl font-semibold leading-snug text-gray-950 md:text-3xl"
          >
            {ceo.greeting.highlight[locale]}
          </h2>

          <div className="mx-auto mt-8 h-0.5 w-16 bg-primary-400" />

          <div className="mt-8 space-y-6 text-left text-base leading-relaxed text-gray-600 md:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </>
      ) : (
        <>
          <motion.h2
            id="ceo-heading"
            className="mt-5 font-display text-2xl font-semibold leading-snug text-gray-950 md:text-3xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {ceo.greeting.highlight[locale]}
          </motion.h2>

          <motion.div
            className="mx-auto mt-8 h-0.5 w-16 origin-left bg-primary-400"
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          />

          <motion.div
            className="mt-8 space-y-6 text-left text-base leading-relaxed text-gray-600 md:text-lg"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </>
      )}

      <div className="mt-10 border-t border-gray-200 pt-6 text-right">
        <p className="font-display text-lg font-semibold text-gray-900">
          {ceo.name[locale]}
        </p>
        <p className="mt-1 text-sm text-gray-500">{ceo.title[locale]}</p>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-24 md:py-40" aria-labelledby="ceo-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        {content}
      </div>
    </section>
  );
}
