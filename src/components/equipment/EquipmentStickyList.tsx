"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cog } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_SMOOTH } from "@/lib/motion";
import {
  EquipmentCategoryFilter,
  type EquipmentCategory,
} from "./EquipmentCategoryFilter";

interface EquipmentCardItem {
  id: string;
  type: string;
  name: string;
  model: string;
  manufacturer: string;
  quantity: number;
  photo: string;
  specs: { label: string; value: string }[];
}

interface EquipmentStickyListProps {
  items: EquipmentCardItem[];
  specUnit: string;
  /** true면 홀짝 교차 레이아웃 (좌우 반전) */
  zigzag?: boolean;
}

const VIEWPORT = { once: true, margin: "-10%" } as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
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
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-smoke">
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <Cog className="h-16 w-16 text-gray-300" strokeWidth={1} aria-hidden="true" />
        <span className="font-mono text-sm tracking-wider text-gray-500">{model}</span>
      </div>
    </div>
  );
}

interface EquipmentRowProps {
  item: EquipmentCardItem;
  specUnit: string;
  reducedMotion: boolean;
  reversed: boolean;
}

function EquipmentRow({ item, specUnit, reducedMotion, reversed }: EquipmentRowProps) {
  const imageBlock = reducedMotion ? (
    <ImagePlaceholder model={item.model} />
  ) : (
    <motion.div
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <ImagePlaceholder model={item.model} />
    </motion.div>
  );

  const textBlock = reducedMotion ? (
    <div className="flex flex-col justify-center">
      <div className="flex items-start gap-4">
        <div className="hidden shrink-0 md:flex md:h-8 md:items-center lg:h-9">
          <Cog className="h-5 w-5 text-primary-400" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-2xl font-semibold text-gray-950 md:text-3xl">
            {item.model}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{item.name}</p>
          <p className="mt-1 text-sm text-gray-500">
            {item.manufacturer} · {item.quantity}{specUnit}
          </p>

          {item.specs.length > 0 && (
            <div className="mt-6">
              {item.specs.map((spec) => (
                <SpecRow key={spec.label} label={spec.label} value={spec.value} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <motion.div
      className="flex flex-col justify-center"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <div className="flex items-start gap-4">
        <motion.div className="hidden shrink-0 md:flex md:h-8 md:items-center lg:h-9" variants={staggerItem}>
          <Cog className="h-5 w-5 text-primary-400" strokeWidth={1.5} aria-hidden="true" />
        </motion.div>
        <div className="flex-1">
          <motion.h3
            className="font-display text-2xl font-semibold text-gray-950 md:text-3xl"
            variants={staggerItem}
          >
            {item.model}
          </motion.h3>
          <motion.p className="mt-1 text-sm text-gray-500" variants={staggerItem}>
            {item.name}
          </motion.p>
          <motion.p className="mt-1 text-sm text-gray-500" variants={staggerItem}>
            {item.manufacturer} · {item.quantity}{specUnit}
          </motion.p>

          {item.specs.length > 0 && (
            <motion.div className="mt-6" variants={staggerItem}>
              {item.specs.map((spec) => (
                <SpecRow key={spec.label} label={spec.label} value={spec.value} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="md:sticky md:top-20">
      <div className="border-t border-gray-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-24">
          <div className={`md:col-span-4 ${reversed ? "md:order-2" : ""}`}>
            {textBlock}
          </div>
          <div className={`md:col-span-6 md:col-start-7 ${reversed ? "md:order-1" : ""}`}>
            {imageBlock}
          </div>
        </div>
      </div>
    </div>
  );
}

const filterVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
};

const reducedFilterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

export function EquipmentStickyList({
  items,
  specUnit,
  zigzag = false,
}: EquipmentStickyListProps) {
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<EquipmentCategory>("all");

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.type === activeCategory);
  }, [items, activeCategory]);

  const variants = reducedMotion ? reducedFilterVariants : filterVariants;

  return (
    <>
      <EquipmentCategoryFilter
        active={activeCategory}
        onChange={setActiveCategory}
      />

      <section className="mx-auto px-5 md:px-10 lg:px-16">
        <AnimatePresence mode="popLayout">
          <motion.div key={activeCategory} variants={variants} initial="hidden" animate="visible" exit="exit">
            {filteredItems.map((item, index) => (
              <EquipmentRow
                key={item.id}
                item={item}
                specUnit={specUnit}
                reducedMotion={reducedMotion}
                reversed={zigzag && index % 2 === 1}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
