"use client";

import { motion } from "framer-motion";
import { Leaf, Users, Shield } from "lucide-react";
import { Card } from "@/components/common/Card";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ICON_MAP = {
  Leaf,
  Users,
  Shield,
} as const;

type IconName = keyof typeof ICON_MAP;

interface ESGItem {
  key: "E" | "S" | "G";
  title: string;
  description: string;
  icon: IconName;
}

interface ESGCardsProps {
  items: ESGItem[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export function ESGCards({ items }: ESGCardsProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <Card key={item.key} className="flex flex-col gap-4 p-8">
              <p className="font-display text-3xl font-bold text-primary-400">
                {item.key}
              </p>
              <hr className="border-steel" />
              <p className="font-semibold text-gray-950">{item.title}</p>
              <p className="flex-1 text-gray-700">{item.description}</p>
              <div className="pt-2">
                <Icon className="h-8 w-8 text-primary-400" aria-hidden="true" />
              </div>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-8 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {items.map((item) => {
        const Icon = ICON_MAP[item.icon];
        return (
          <motion.div key={item.key} variants={cardVariants}>
            <Card className="flex h-full flex-col gap-4 p-8">
              <p className="font-display text-3xl font-bold text-primary-400">
                {item.key}
              </p>
              <hr className="border-steel" />
              <p className="font-semibold text-gray-950">{item.title}</p>
              <p className="flex-1 text-gray-700">{item.description}</p>
              <div className="pt-2">
                <Icon className="h-8 w-8 text-primary-400" aria-hidden="true" />
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
