"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SectionTitleProps {
  children: string;
  as?: "h2" | "h3";
  className?: string;
}

export function SectionTitle({
  children,
  as: Tag = "h2",
  className = "",
}: SectionTitleProps) {
  const reducedMotion = useReducedMotion();
  const words = children.split(" ");

  if (reducedMotion) {
    return (
      <Tag className={`font-display font-semibold ${className}`}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag className={`font-display font-semibold ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.3em] inline-block last:mr-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
