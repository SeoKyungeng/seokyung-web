"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { EASE_SMOOTH } from "@/lib/motion";

interface ESGIntroProps {
  vision: string;
  description: string;
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

export function ESGIntro({ vision, description, label }: ESGIntroProps) {
  const { ref, isInView, reducedMotion } = useAnimateInView();

  const content = (
    <div className="mx-auto max-w-3xl text-center">
      <SectionLabel>{label}</SectionLabel>

      {reducedMotion ? (
        <>
          <h2 className="mt-5 font-display text-2xl font-semibold leading-snug text-gray-950 md:text-3xl">
            {vision}
          </h2>

          <div className="mx-auto mt-8 h-0.5 w-16 bg-primary-400" />

          <p className="mt-8 text-base leading-relaxed text-gray-600 md:text-lg">
            {description}
          </p>
        </>
      ) : (
        <div ref={ref}>
          <motion.h2
            className="mt-5 font-display text-2xl font-semibold leading-snug text-gray-950 md:text-3xl"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {vision}
          </motion.h2>

          <motion.div
            className="mx-auto mt-8 h-0.5 w-16 origin-left bg-primary-400"
            variants={lineReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />

          <motion.p
            className="mt-8 text-base leading-relaxed text-gray-600 md:text-lg"
            variants={fadeIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {description}
          </motion.p>
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        {content}
      </div>
    </section>
  );
}
