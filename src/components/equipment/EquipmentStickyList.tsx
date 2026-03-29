"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Cog } from "lucide-react";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslations } from "next-intl";
import { EASE_SMOOTH } from "@/lib/motion";
import { StickyTabFilter } from "@/components/common/StickyTabFilter";

type EquipmentCategory = "all" | "cnc" | "mct" | "lathe" | "other";

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
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0">
      <span className="shrink-0 text-sm text-gray-400">{label}</span>
      <span className="font-mono text-sm font-medium text-gray-950">
        {value}
      </span>
    </div>
  );
}

function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  img.style.filter = "blur(0)";
  img.style.opacity = "1";
}

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  img.style.display = "none";
  const fallback = img.parentElement?.querySelector("[data-fallback]");
  if (fallback instanceof HTMLElement) fallback.style.display = "flex";
}

function EquipmentImage({ photo, model }: { photo: string; model: string }) {
  if (!photo) {
    return (
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gradient-to-br from-smoke to-gray-100">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <Cog className="h-10 w-10 text-gray-300" strokeWidth={1} aria-hidden="true" />
          <span className="font-mono text-sm tracking-wider text-gray-400">{model}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-4/3 w-full overflow-hidden bg-gradient-to-br from-smoke to-gray-100">
      <Image
        src={photo}
        alt={model}
        fill
        sizes="(max-width: 768px) 100vw, 58vw"
        className="object-cover blur-[20px] opacity-0 transition-[filter,opacity] duration-500"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      <div
        data-fallback
        className="absolute inset-0 hidden flex-col items-center justify-center gap-4"
      >
        <Cog className="h-10 w-10 text-gray-300" strokeWidth={1} aria-hidden="true" />
        <span className="font-mono text-sm tracking-wider text-gray-400">{model}</span>
      </div>
    </div>
  );
}

const TYPE_LABELS: Record<string, string> = {
  cnc: "CNC",
  mct: "MCT",
  lathe: "LATHE",
  other: "OTHER",
};

const CLIP_NORMAL =
  "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)";
const CLIP_REVERSED =
  "polygon(32px 0, 100% 0, 100% 100%, 0 100%, 0 32px)";

interface EquipmentRowProps {
  item: EquipmentCardItem;
  specUnit: string;
  reducedMotion: boolean;
  reversed: boolean;
}

function EquipmentRow({
  item,
  specUnit,
  reducedMotion,
  reversed,
}: EquipmentRowProps) {
  const { ref: rowRef, isInView } = useAnimateInView();

  const clipPath = reversed ? CLIP_REVERSED : CLIP_NORMAL;

  const typeBadge = (
    <span className="inline-flex items-center rounded-full bg-primary-400/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary-400">
      {TYPE_LABELS[item.type] ?? item.type.toUpperCase()}
    </span>
  );

  const imageBlock = (
    <div className="overflow-hidden" style={{ clipPath }}>
      {reducedMotion ? (
        <EquipmentImage photo={item.photo} model={item.model} />
      ) : (
        <motion.div
          variants={imageReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <EquipmentImage photo={item.photo} model={item.model} />
        </motion.div>
      )}
    </div>
  );

  const textContent = (
    <>
      <motion.div variants={staggerItem}>{typeBadge}</motion.div>
      <motion.h3
        className="mt-4 font-display text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl lg:text-4xl"
        variants={staggerItem}
      >
        {item.name}
      </motion.h3>
      {item.model && (
        <motion.p
          className="mt-2 font-mono text-sm tracking-wider text-gray-400"
          variants={staggerItem}
        >
          {item.model}
        </motion.p>
      )}
      <motion.p
        className="mt-1 text-sm text-gray-500"
        variants={staggerItem}
      >
        {item.manufacturer && item.manufacturer !== "미상" && item.manufacturer !== "Unknown"
          ? `${item.manufacturer} · ${item.quantity}${specUnit}`
          : `${item.quantity}${specUnit}`}
      </motion.p>

      {item.specs.length > 0 && (
        <motion.div className="mt-8" variants={staggerItem}>
          {item.specs.map((spec) => (
            <SpecRow key={spec.label} label={spec.label} value={spec.value} />
          ))}
        </motion.div>
      )}
    </>
  );

  const staticTextContent = (
    <>
      {typeBadge}
      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl lg:text-4xl">
        {item.name}
      </h3>
      {item.model && (
        <p className="mt-2 font-mono text-sm tracking-wider text-gray-400">
          {item.model}
        </p>
      )}
      <p className="mt-1 text-sm text-gray-500">
        {item.manufacturer && item.manufacturer !== "미상" && item.manufacturer !== "Unknown"
          ? `${item.manufacturer} · ${item.quantity}${specUnit}`
          : `${item.quantity}${specUnit}`}
      </p>

      {item.specs.length > 0 && (
        <div className="mt-8">
          {item.specs.map((spec) => (
            <SpecRow key={spec.label} label={spec.label} value={spec.value} />
          ))}
        </div>
      )}
    </>
  );

  const textBlock = reducedMotion ? (
    <div className="flex flex-col justify-center">{staticTextContent}</div>
  ) : (
    <motion.div
      className="flex flex-col justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {textContent}
    </motion.div>
  );

  return (
    <div ref={rowRef} className="md:sticky md:top-[132px]">
      <div className="border-t border-gray-100 bg-white py-16 md:py-20">
        <div
          className={`mx-auto flex max-w-7xl flex-col gap-10 px-5 md:flex-row md:items-center md:gap-16 md:px-10 lg:px-20 ${
            reversed ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-5/12">{textBlock}</div>
          <div className="md:w-7/12">{imageBlock}</div>
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
}: EquipmentStickyListProps) {
  const reducedMotion = useReducedMotion();
  const t = useTranslations("pages.equipment");
  const [activeCategory, setActiveCategory] =
    useState<EquipmentCategory>("all");

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.type === activeCategory);
  }, [items, activeCategory]);

  const variants = reducedMotion ? reducedFilterVariants : filterVariants;

  return (
    <>
      <StickyTabFilter
        tabs={[
          { key: "all", label: t("filterAll") },
          { key: "cnc", label: t("filterCnc") },
          { key: "mct", label: t("filterMct") },
          { key: "lathe", label: t("filterLathe") },
          { key: "other", label: t("filterOther") },
        ]}
        active={activeCategory}
        onChange={(key) => setActiveCategory(key as EquipmentCategory)}
        ariaLabel={t("title")}
        layoutId="equipment-tab"
      />

      <section>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredItems.map((item, index) => (
              <EquipmentRow
                key={item.id}
                item={item}
                specUnit={specUnit}
                reducedMotion={reducedMotion}
                reversed={index % 2 === 1}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
