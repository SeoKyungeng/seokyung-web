"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, Heart } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { EASE_SPRING } from "@/lib/motion";
import type { PhilosophyValue } from "@/lib/types";

const ICON_MAP = {
  Users,
  ShieldCheck,
  Heart,
} as const;

type IconName = keyof typeof ICON_MAP;

interface PhilosophySectionProps {
  slogan: string;
  values: PhilosophyValue[];
  locale: "ko" | "en";
  label: string;
  title: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_SPRING,
    },
  },
};

const sloganVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SPRING, delay: 0.2 },
  },
};

interface BentoCardProps {
  value: PhilosophyValue;
  locale: "ko" | "en";
  className?: string;
  horizontal?: boolean;
}

function BentoCard({ value, locale, className = "", horizontal = false }: BentoCardProps) {
  const Icon = ICON_MAP[value.icon as IconName];

  return (
    <div
      className={[
        "group relative flex flex-col",
        "rounded-xl border border-gray-200 bg-white",
        "ring-1 ring-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
        "p-8 md:p-10",
        "transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1 hover:scale-[1.02] hover:border-primary-400 hover:shadow-md",
        className,
      ].join(" ")}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-400/10">
        {Icon && <Icon className="h-6 w-6 text-primary-400" aria-hidden="true" />}
      </div>
      <p className="font-display text-xl font-medium text-gray-950">
        {value.title[locale]}
      </p>
      <p className="mt-1 text-sm font-medium break-keep-all text-primary-500">
        {value.subtitle[locale]}
      </p>

      {horizontal ? (
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {value.items.map((item, i) => (
            <p key={i} className="break-keep-all text-sm leading-relaxed text-gray-600">
              {item[locale]}
            </p>
          ))}
        </div>
      ) : (
        <ul className="mt-4 flex-1 space-y-3">
          {value.items.map((item, i) => (
            <li key={i} className="break-keep-all text-sm leading-relaxed text-gray-600">
              {item[locale]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function PhilosophySection({ slogan, values, locale, label, title }: PhilosophySectionProps) {
  const { ref, isInView, reducedMotion } = useAnimateInView();
  const { ref: headerRef, isInView: headerInView, reducedMotion: headerReducedMotion } = useAnimateInView();

  const [firstValue, secondValue, thirdValue] = values;

  const bentoStatic = (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {firstValue && (
          <div className="md:col-span-7">
            <BentoCard value={firstValue} locale={locale} className="h-full" />
          </div>
        )}
        {secondValue && (
          <div className="md:col-span-5">
            <BentoCard value={secondValue} locale={locale} className="h-full" />
          </div>
        )}
      </div>
      {thirdValue && (
        <BentoCard value={thirdValue} locale={locale} horizontal />
      )}
    </div>
  );

  const bentoAnimated = (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {firstValue && (
          <motion.div className="md:col-span-7" variants={cardVariants}>
            <BentoCard value={firstValue} locale={locale} className="h-full" />
          </motion.div>
        )}
        {secondValue && (
          <motion.div className="md:col-span-5" variants={cardVariants}>
            <BentoCard value={secondValue} locale={locale} className="h-full" />
          </motion.div>
        )}
      </div>
      {thirdValue && (
        <motion.div variants={cardVariants}>
          <BentoCard value={thirdValue} locale={locale} horizontal />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <section className="bg-smoke py-24 md:py-40" aria-labelledby="philosophy-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">

        {/* 에디토리얼 비대칭 헤더 */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <SectionLabel>{label}</SectionLabel>
            <h2 id="philosophy-heading" className="sr-only">{title}</h2>
            <div className="mt-4" aria-hidden="true">
              {reducedMotion ? (
                <SectionTitle as="h2" className="text-4xl font-normal tracking-[-0.03em] text-midnight md:text-5xl">
                  {title}
                </SectionTitle>
              ) : (
                <motion.div
                  ref={headerRef}
                  initial="hidden"
                  animate={headerInView ? "visible" : "hidden"}
                >
                  <SectionTitle as="h2" className="text-4xl font-normal tracking-[-0.03em] text-midnight md:text-5xl">
                    {title}
                  </SectionTitle>
                </motion.div>
              )}
            </div>
          </div>

          <div className="md:col-span-7">
            {reducedMotion ? (
              <p className="break-keep-all text-base leading-relaxed text-gray-600 md:text-lg">
                {slogan}
              </p>
            ) : (
              <motion.p
                className="break-keep-all text-base leading-relaxed text-gray-600 md:text-lg"
                variants={sloganVariants}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
              >
                {slogan}
              </motion.p>
            )}
          </div>
        </div>

        {/* 비대칭 벤토 그리드 */}
        {reducedMotion ? bentoStatic : bentoAnimated}
      </div>
    </section>
  );
}
