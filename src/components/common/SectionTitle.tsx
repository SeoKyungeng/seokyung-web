"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_SMOOTH, DURATION_NORMAL } from "@/lib/motion";

interface SectionTitleProps {
  children: string;
  as?: "h2" | "h3";
  weight?: "semibold" | "normal";
  className?: string;
}

export function SectionTitle({
  children,
  as: Tag = "h2",
  weight = "semibold",
  className = "",
}: SectionTitleProps) {
  const reducedMotion = useReducedMotion();
  const words = children.split(" ");
  const weightClass = weight === "normal" ? "font-normal" : "font-semibold";

  if (reducedMotion) {
    return (
      <Tag className={`font-display ${weightClass} ${className}`}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag className={`font-display ${weightClass} ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.3em] inline-block last:mr-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: DURATION_NORMAL,
            delay: i * 0.05,
            ease: EASE_SMOOTH,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
