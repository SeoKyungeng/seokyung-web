"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_SMOOTH } from "@/lib/motion";
import type { Client } from "@/lib/types";

interface ClientsSectionProps {
  clients: Client[];
  locale: "ko" | "en";
  label: string;
  title: string;
  subtitle: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_SMOOTH,
    },
  },
};

function ClientCell({ client, locale }: { client: Client; locale: "ko" | "en" }) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-transparent bg-smoke p-6 transition-[border-color,box-shadow] duration-250 hover:border-primary-400/20 hover:shadow-md">
      <p className="text-sm font-medium text-gray-700">{client.name[locale]}</p>
    </div>
  );
}

export function ClientsSection({ clients, locale, label, title, subtitle }: ClientsSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-24 md:py-40" aria-labelledby="clients-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        <div className="mb-12 text-center md:mb-16">
          <SectionLabel>{label}</SectionLabel>
          <h2 id="clients-heading" className="sr-only">{title}</h2>
          <div className="mt-4" aria-hidden="true">
            <SectionTitle as="h2" className="text-3xl text-midnight md:text-4xl">
              {title}
            </SectionTitle>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 md:text-lg">
            {subtitle}
          </p>
        </div>

        {reducedMotion ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {clients.map((client) => (
              <ClientCell key={client.id} client={client} locale={locale} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            {clients.map((client) => (
              <motion.div key={client.id} variants={itemVariants}>
                <ClientCell client={client} locale={locale} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
