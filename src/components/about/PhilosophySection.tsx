"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, Heart } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Card } from "@/components/common/Card";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { EASE_SMOOTH } from "@/lib/motion";
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
      ease: EASE_SMOOTH,
    },
  },
};

function ValueCard({ value, locale }: { value: PhilosophyValue; locale: "ko" | "en" }) {
  const Icon = ICON_MAP[value.icon as IconName];

  return (
    <Card className="flex h-full flex-col p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-400/10">
        {Icon && <Icon className="h-6 w-6 text-primary-400" aria-hidden="true" />}
      </div>
      <p className="font-display text-xl font-semibold text-gray-950">
        {value.title[locale]}
      </p>
      <p className="mt-1 text-sm font-medium text-primary-500">
        {value.subtitle[locale]}
      </p>
      <ul className="mt-4 flex-1 space-y-3">
        {value.items.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed text-gray-600">
            {item[locale]}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function PhilosophySection({ slogan, values, locale, label, title }: PhilosophySectionProps) {
  const { ref, isInView, reducedMotion } = useAnimateInView();

  return (
    <section className="bg-smoke py-24 md:py-40" aria-labelledby="philosophy-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        <div className="mb-12 text-center md:mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 id="philosophy-heading" className="sr-only">{title}</h2>
          <div className="mt-4" aria-hidden="true">
            <SectionTitle as="h2" className="text-3xl text-midnight md:text-4xl">
              {title}
            </SectionTitle>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            {slogan}
          </p>
        </div>

        {reducedMotion ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
              <ValueCard key={value.key} value={value} locale={locale} />
            ))}
          </div>
        ) : (
          <motion.div
            ref={ref}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {values.map((value) => (
              <motion.div key={value.key} variants={cardVariants}>
                <ValueCard value={value} locale={locale} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
