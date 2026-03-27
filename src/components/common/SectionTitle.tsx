"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-10%" });
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
    <Tag ref={ref} className={`font-display ${weightClass} ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="mr-[0.3em] inline-block last:mr-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
