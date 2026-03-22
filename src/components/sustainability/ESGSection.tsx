"use client";

import { motion, type Variants } from "framer-motion";
import { Leaf, Users, Shield } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";

const ICON_MAP = { Leaf, Users, Shield } as const;
type IconName = keyof typeof ICON_MAP;

interface ESGItem {
  key: "E" | "S" | "G";
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  items: string[];
}

interface ESGSectionProps {
  items: ESGItem[];
  label: string;
  title: string;
}

const VIEWPORT = { once: true, margin: "-10%" } as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function ImagePlaceholder({ iconName }: { iconName: string }) {
  const Icon = ICON_MAP[iconName as IconName] ?? Leaf;
  return (
    <div className="aspect-[7/5] w-full rounded-lg bg-smoke flex items-center justify-center">
      <Icon className="h-16 w-16 text-gray-300" strokeWidth={1} aria-hidden="true" />
    </div>
  );
}

interface ESGBlockProps {
  item: ESGItem;
  index: number;
  reducedMotion: boolean;
}

function ESGBlock({ item, index, reducedMotion }: ESGBlockProps) {
  const isReversed = index % 2 === 1;

  const imageEl = <ImagePlaceholder iconName={item.icon} />;

  const textContent = (
    <>
      <p className="font-display text-3xl font-bold text-primary-400">{item.key}</p>
      <hr className="border-steel mt-2" />
      <p className="mt-4 font-display text-xl font-semibold text-gray-950">{item.title}</p>
      <p className="mt-1 text-sm font-medium text-primary-500">{item.subtitle}</p>
      <p className="mt-3 leading-relaxed text-gray-600">{item.description}</p>
      <ul className="mt-4 space-y-2">
        {item.items.map((text, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shrink-0" aria-hidden="true" />
            <span className="text-sm text-gray-600">{text}</span>
          </li>
        ))}
      </ul>
    </>
  );

  if (reducedMotion) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
        <div className={`col-span-1 md:col-span-7 ${isReversed ? "md:order-2" : ""}`}>
          {imageEl}
        </div>
        <div className={`col-span-1 flex flex-col justify-center md:col-span-5 ${isReversed ? "md:order-1" : ""}`}>
          {textContent}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
      <motion.div
        className={`col-span-1 md:col-span-7 ${isReversed ? "md:order-2" : ""}`}
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {imageEl}
      </motion.div>
      <motion.div
        className={`col-span-1 flex flex-col justify-center md:col-span-5 ${isReversed ? "md:order-1" : ""}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.p className="font-display text-3xl font-bold text-primary-400" variants={itemVariants}>
          {item.key}
        </motion.p>
        <motion.hr className="border-steel mt-2" variants={itemVariants} />
        <motion.p className="mt-4 font-display text-xl font-semibold text-gray-950" variants={itemVariants}>
          {item.title}
        </motion.p>
        <motion.p className="mt-1 text-sm font-medium text-primary-500" variants={itemVariants}>
          {item.subtitle}
        </motion.p>
        <motion.p className="mt-3 leading-relaxed text-gray-600" variants={itemVariants}>
          {item.description}
        </motion.p>
        <motion.ul className="mt-4 space-y-2" variants={itemVariants}>
          {item.items.map((text, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-400 shrink-0" aria-hidden="true" />
              <span className="text-sm text-gray-600">{text}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
}

export function ESGSection({ items, label, title }: ESGSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-smoke py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        <div className="mb-16">
          <SectionLabel>{label}</SectionLabel>
          <SectionTitle as="h2" className="mt-4 text-3xl md:text-4xl">
            {title}
          </SectionTitle>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {items.map((item, index) => (
            <ESGBlock
              key={item.key}
              item={item}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
