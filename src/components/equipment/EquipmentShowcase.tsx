"use client";

import { motion, type Variants } from "framer-motion";
import { Cog } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";

import type { EquipmentItem } from "@/lib/types";

interface EquipmentShowcaseProps {
  items: EquipmentItem[];
  label: string;
  locale: "ko" | "en";
  specManufacturer: string;
  specQuantity: string;
  specUnit: string;
  bgClass?: string;
}

export type { EquipmentItem };

const VIEWPORT = { once: true, margin: "-10%" } as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-smoke py-3 last:border-b-0">
      <span className="text-sm uppercase tracking-wider text-gray-500">{label}</span>
      <span className="font-mono text-sm text-gray-950">{value}</span>
    </div>
  );
}

function ImagePlaceholder({ model }: { model: string }) {
  return (
    <div className="relative aspect-[7/5] w-full overflow-hidden rounded-lg bg-smoke transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <Cog className="h-16 w-16 text-gray-300" strokeWidth={1} aria-hidden="true" />
        <span className="font-mono text-sm tracking-wider text-gray-500">{model}</span>
      </div>
    </div>
  );
}

interface SpecContentProps {
  item: EquipmentItem;
  locale: "ko" | "en";
  specManufacturer: string;
  specQuantity: string;
  specUnit: string;
}

function SpecContent({ item, locale, specManufacturer, specQuantity, specUnit }: SpecContentProps) {
  return (
    <>
      <h3 className="font-display text-2xl font-semibold text-gray-950 md:text-3xl">
        {item.model}
      </h3>
      <div className="mt-6">
        <SpecRow label={specManufacturer} value={item.manufacturer[locale]} />
        <SpecRow label={specQuantity} value={`${item.quantity}${specUnit}`} />
        {item.specs.map((spec) => (
          <SpecRow key={spec.label.ko} label={spec.label[locale]} value={spec.value} />
        ))}
      </div>
    </>
  );
}

function AnimatedSpecContent({ item, locale, specManufacturer, specQuantity, specUnit }: SpecContentProps) {
  return (
    <>
      <motion.h3
        className="font-display text-2xl font-semibold text-gray-950 md:text-3xl"
        variants={itemVariants}
      >
        {item.model}
      </motion.h3>
      <motion.div className="mt-6" variants={itemVariants}>
        <SpecRow label={specManufacturer} value={item.manufacturer[locale]} />
        <SpecRow label={specQuantity} value={`${item.quantity}${specUnit}`} />
        {item.specs.map((spec) => (
          <motion.div key={spec.label.ko} variants={itemVariants}>
            <SpecRow label={spec.label[locale]} value={spec.value} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

interface EquipmentCardProps {
  item: EquipmentItem;
  index: number;
  locale: "ko" | "en";
  reducedMotion: boolean;
  specManufacturer: string;
  specQuantity: string;
  specUnit: string;
}

function EquipmentCard({
  item,
  index,
  locale,
  reducedMotion,
  specManufacturer,
  specQuantity,
  specUnit,
}: EquipmentCardProps) {
  const isEven = index % 2 === 1;
  const specProps = { item, locale, specManufacturer, specQuantity, specUnit };

  if (reducedMotion) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className={`col-span-1 md:col-span-7 ${isEven ? "md:order-2" : ""}`}>
          <ImagePlaceholder model={item.model} />
        </div>
        <div className={`col-span-1 flex flex-col justify-center md:col-span-5 ${isEven ? "md:order-1" : ""}`}>
          <SpecContent {...specProps} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
      <motion.div
        className={`col-span-1 md:col-span-7 ${isEven ? "md:order-2" : ""}`}
        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <ImagePlaceholder model={item.model} />
      </motion.div>
      <motion.div
        className={`col-span-1 flex flex-col justify-center md:col-span-5 ${isEven ? "md:order-1" : ""}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <AnimatedSpecContent {...specProps} />
      </motion.div>
    </div>
  );
}

export function EquipmentShowcase({
  items,
  label,
  locale,
  specManufacturer,
  specQuantity,
  specUnit,
  bgClass = "bg-white",
}: EquipmentShowcaseProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className={`${bgClass} px-5 py-24 md:px-10 md:py-40 lg:px-20`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <SectionLabel>{label}</SectionLabel>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {items.map((item, index) => (
            <EquipmentCard
              key={item.id}
              item={item}
              index={index}
              locale={locale}
              reducedMotion={reducedMotion}
              specManufacturer={specManufacturer}
              specQuantity={specQuantity}
              specUnit={specUnit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
