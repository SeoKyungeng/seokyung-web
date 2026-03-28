"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { EASE_SPRING, EASE_SMOOTH } from "@/lib/motion";
import type { Client } from "@/lib/types";

interface ClientsSectionProps {
  clients: Client[];
  locale: "ko" | "en";
  label: string;
  title: string;
  subtitle: string;
}

const CORPORATE_SUFFIXES = /\b(Co\.|Ltd\.|Inc\.|Corp\.|LLC|PLC|GmbH|S\.A\.)\s*/gi;
const KOREAN_PREFIX = /^\(주\)\s*/;

function getInitials(englishName: string): string {
  const cleaned = englishName
    .replace(KOREAN_PREFIX, "")
    .replace(CORPORATE_SUFFIXES, "")
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_SPRING,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_SMOOTH, delay: 0.2 },
  },
};

function ClientCard({ client, locale }: { client: Client; locale: "ko" | "en" }) {
  const initials = getInitials(client.name.en);

  return (
    <div className="group relative aspect-[3/2] cursor-default rounded-xl border border-gray-200 bg-white ring-1 ring-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-primary-400/30 hover:shadow-md">
      <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-6">
        {client.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={client.logo}
            alt={client.name[locale]}
            className="max-h-12 max-w-[80%] object-contain"
          />
        ) : (
          <span className="font-mono text-2xl font-bold text-gray-300 md:text-3xl" aria-hidden="true">
            {initials}
          </span>
        )}
        <p className="text-center text-sm font-medium break-keep-all text-gray-700">{client.name[locale]}</p>
      </div>
    </div>
  );
}

export function ClientsSection({ clients, locale, label, title, subtitle }: ClientsSectionProps) {
  const { ref: headerRef, isInView: headerInView, reducedMotion } = useAnimateInView();
  const { ref: gridRef, isInView: gridInView } = useAnimateInView();

  return (
    <section className="bg-white py-24 md:py-40" aria-labelledby="clients-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        {/* 에디토리얼 비대칭 헤더 */}
        <div ref={headerRef} className="mb-16 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-12 md:gap-16">
          {/* 좌측 5col: SectionLabel + SectionTitle */}
          <div className="md:col-span-5">
            <SectionLabel>{label}</SectionLabel>
            <h2 id="clients-heading" className="sr-only">{title}</h2>
            <div className="mt-4" aria-hidden="true">
              <SectionTitle as="h2" className="text-4xl text-midnight md:text-5xl">
                {title}
              </SectionTitle>
            </div>
          </div>

          {/* 우측 7col: subtitle */}
          <div className="md:col-span-7 md:flex md:items-end">
            {reducedMotion ? (
              <p className="break-keep-all text-base leading-relaxed text-gray-600 md:text-lg">{subtitle}</p>
            ) : (
              <motion.p
                className="break-keep-all text-base leading-relaxed text-gray-600 md:text-lg"
                variants={subtitleVariants}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* 클라이언트 카드 그리드 */}
        {reducedMotion ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} locale={locale} />
            ))}
          </div>
        ) : (
          <motion.div
            ref={gridRef}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate={gridInView ? "visible" : "hidden"}
          >
            {clients.map((client) => (
              <motion.div key={client.id} variants={cardVariants}>
                <ClientCard client={client} locale={locale} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
