"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

interface Tab {
  key: string;
  label: string;
}

interface StickyTabFilterProps {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
  ariaLabel: string;
  layoutId: string;
}

export function StickyTabFilter({
  tabs,
  active,
  onChange,
  ariaLabel,
  layoutId,
}: StickyTabFilterProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="sticky top-16 z-30 border-b border-gray-100 bg-white/90 backdrop-blur-sm md:top-20 before:absolute before:inset-x-0 before:bottom-full before:h-16 before:bg-white/90 before:backdrop-blur-sm md:before:h-20">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="mx-auto flex max-w-7xl overflow-x-auto scroll-smooth px-5 scrollbar-hide md:px-10 lg:px-20"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.key)}
              className={[
                "relative shrink-0 px-5 py-4 text-sm font-medium transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
                isActive
                  ? "text-gray-950"
                  : "text-gray-400 hover:text-gray-600",
              ].join(" ")}
              style={{ scrollSnapAlign: "start" }}
            >
              {tab.label}

              {isActive && (
                <motion.span
                  layoutId={reducedMotion ? undefined : layoutId}
                  className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary-400"
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 30 }
                  }
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
