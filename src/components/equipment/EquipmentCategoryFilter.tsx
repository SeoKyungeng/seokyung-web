"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export type EquipmentCategory = "all" | "cnc" | "mct" | "lathe" | "other";

interface Tab {
  key: EquipmentCategory;
  label: string;
}

interface EquipmentCategoryFilterProps {
  active: EquipmentCategory;
  onChange: (key: EquipmentCategory) => void;
}

export function EquipmentCategoryFilter({
  active,
  onChange,
}: EquipmentCategoryFilterProps) {
  const t = useTranslations("pages.equipment");
  const reducedMotion = useReducedMotion();

  const tabs: Tab[] = [
    { key: "all", label: t("filterAll") },
    { key: "cnc", label: t("filterCnc") },
    { key: "mct", label: t("filterMct") },
    { key: "lathe", label: t("filterLathe") },
    { key: "other", label: t("filterOther") },
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
                  layoutId={reducedMotion ? undefined : "equipment-tab"}
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
