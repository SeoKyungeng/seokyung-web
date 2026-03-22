"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export type CategoryKey = "all" | "defense" | "heat-exchanger" | "industrial";

interface Tab {
  key: CategoryKey;
  label: string;
}

interface CategoryFilterProps {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const t = useTranslations("pages.products");
  const reducedMotion = useReducedMotion();

  const tabs: Tab[] = [
    { key: "all", label: t("filterAll") },
    { key: "defense", label: t("filterDefense") },
    { key: "heat-exchanger", label: t("filterHeatExchanger") },
    { key: "industrial", label: t("filterIndustrial") },
  ];

  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm">
      <div
        role="tablist"
        aria-label={t("title")}
        className="mx-auto flex max-w-6xl overflow-x-auto scroll-smooth px-4 scrollbar-hide sm:px-6 lg:px-8"
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
                "relative flex-shrink-0 scroll-snap-align-start px-5 py-4 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
                isActive
                  ? "text-gray-950 font-semibold"
                  : "text-gray-500 hover:text-gray-700",
              ].join(" ")}
              style={{ scrollSnapAlign: "start" }}
            >
              {tab.label}

              {isActive && (
                <motion.span
                  layoutId={reducedMotion ? undefined : "tab-indicator"}
                  className="absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary-400"
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

      <div className="h-px bg-gray-100" />
    </div>
  );
}
