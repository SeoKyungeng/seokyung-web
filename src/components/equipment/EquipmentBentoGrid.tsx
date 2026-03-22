"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cog, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Card } from "@/components/common/Card";
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

interface EquipmentGridProps {
  items: EquipmentCardItem[];
  specUnit: string;
  viewSpecs: string;
  hideSpecs: string;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-smoke py-3 last:border-b-0">
      <span className="text-sm uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <span className="font-mono text-sm text-gray-950">{value}</span>
    </div>
  );
}

function ImagePlaceholder({
  model,
  isLarge,
}: {
  model: string;
  isLarge: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-smoke transition-transform duration-300 hover:scale-[1.02] ${
        isLarge ? "aspect-[4/3]" : "aspect-[7/5]"
      }`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
        <Cog
          className="h-16 w-16 text-gray-300"
          strokeWidth={1}
          aria-hidden="true"
        />
        <span className="font-mono text-sm tracking-wider text-gray-500">
          {model}
        </span>
      </div>
    </div>
  );
}

interface EquipmentCardProps {
  item: EquipmentCardItem;
  isLarge: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  specUnit: string;
  viewSpecs: string;
  hideSpecs: string;
  reducedMotion: boolean;
}

function EquipmentCard({
  item,
  isLarge,
  isExpanded,
  onToggle,
  specUnit,
  viewSpecs,
  hideSpecs,
  reducedMotion,
}: EquipmentCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <ImagePlaceholder model={item.model} isLarge={isLarge} />

        <div className="mt-4">
          <p className="text-sm text-gray-500">{item.name}</p>
          <h3
            className={`font-display font-semibold text-gray-950 ${
              isLarge ? "text-xl" : "text-lg"
            }`}
          >
            {item.model}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {item.manufacturer} · {item.quantity}
            {specUnit}
          </p>
        </div>

        {item.specs.length > 0 && (
          <>
            <button
              type="button"
              onClick={onToggle}
              className="mt-3 flex cursor-pointer items-center gap-1 text-sm font-medium text-primary-400"
            >
              {isExpanded ? hideSpecs : viewSpecs}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={
                  reducedMotion ? { duration: 0 } : { duration: 0.2 }
                }
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="specs"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 300, damping: 25 }
                  }
                  className="overflow-hidden"
                >
                  <div className="mt-2">
                    {item.specs.map((spec) => (
                      <SpecRow
                        key={spec.label}
                        label={spec.label}
                        value={spec.value}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </Card>
  );
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
};

const reducedCardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 0, transition: { duration: 0 } },
};

export function EquipmentGrid({
  items,
  specUnit,
  viewSpecs,
  hideSpecs,
}: EquipmentGridProps) {
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] =
    useState<EquipmentCategory>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.type === activeCategory);
  }, [items, activeCategory]);

  const variants = reducedMotion ? reducedCardVariants : cardVariants;

  function handleCategoryChange(key: EquipmentCategory) {
    setActiveCategory(key);
    setExpandedId(null);
  }

  function handleToggle(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <>
      <EquipmentCategoryFilter
        active={activeCategory}
        onChange={handleCategoryChange}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout={!reducedMotion}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <EquipmentCard
                  item={item}
                  isLarge={index === 0}
                  isExpanded={expandedId === item.id}
                  onToggle={() => handleToggle(item.id)}
                  specUnit={specUnit}
                  viewSpecs={viewSpecs}
                  hideSpecs={hideSpecs}
                  reducedMotion={reducedMotion}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </section>
    </>
  );
}
