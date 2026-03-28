"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ImageLightbox } from "@/components/common/ImageLightbox";
import { StickyTabFilter } from "@/components/common/StickyTabFilter";

type CategoryKey = "all" | "defense" | "heat-exchanger" | "industrial";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProductItem {
  id: string;
  category: string;
  image: string;
  alt: string;
  placeholderHeight: number;
}

interface ProductGalleryProps {
  items: ProductItem[];
  initialCategory?: string;
}

export function ProductGallery({ items, initialCategory }: ProductGalleryProps) {
  const t = useTranslations("pages.products");
  const reducedMotion = useReducedMotion();

  const validCategories: CategoryKey[] = ["all", "defense", "heat-exchanger", "industrial"];
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(
    validCategories.includes(initialCategory as CategoryKey)
      ? (initialCategory as CategoryKey)
      : "all"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  // 라이트박스용 이미지 목록 (필터된 아이템 기준)
  const lightboxImages = filteredItems.map((item) => ({
    src: item.image,
    alt: item.alt,
    width: 800,
    height: item.placeholderHeight * 3,
  }));

  function handleItemClick(indexInFiltered: number) {
    setLightboxIndex(indexInFiltered);
  }

  function handleLightboxClose() {
    setLightboxIndex(null);
  }

  function handleLightboxNavigate(index: number) {
    setLightboxIndex(index);
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 28 },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
  };

  const reducedItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  const variants = reducedMotion ? reducedItemVariants : itemVariants;

  return (
    <>
      <StickyTabFilter
        tabs={[
          { key: "all", label: t("filterAll") },
          { key: "defense", label: t("filterDefense") },
          { key: "heat-exchanger", label: t("filterHeatExchanger") },
          { key: "industrial", label: t("filterIndustrial") },
        ]}
        active={activeCategory}
        onChange={(key) => setActiveCategory(key as CategoryKey)}
        ariaLabel={t("title")}
        layoutId="products-tab"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-gray-500">{t("emptyState")}</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout={!reducedMotion}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mb-2 break-inside-avoid"
                >
                  <button
                    type="button"
                    aria-label={item.alt}
                    onClick={() => handleItemClick(index)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group relative w-full overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
                  >
                    <div
                      className="w-full bg-smoke transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:max-h-none"
                      style={{
                        height: `${item.placeholderHeight}px`,
                        maxHeight: "300px",
                      }}
                    >
                      {/* 실제 이미지가 있으면 표시, 없으면 placeholder */}
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-steel/30 to-smoke">
                        <span className="text-xs text-gray-400 opacity-60">
                          {item.alt}
                        </span>
                      </div>
                    </div>

                    <div
                      className={[
                        "pointer-events-none absolute inset-0 rounded-lg bg-midnight/40 transition-opacity duration-300",
                        hoveredId === item.id ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />

                    <motion.div
                      className="pointer-events-none absolute bottom-3 left-3"
                      animate={
                        hoveredId === item.id
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 10 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { duration: 0.25, ease: "easeOut" }
                      }
                    >
                      <span className="text-sm font-medium text-white drop-shadow-sm">
                        {item.alt}
                      </span>
                    </motion.div>
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={handleLightboxClose}
            onNavigate={handleLightboxNavigate}
          />
        )}
      </AnimatePresence>
    </>
  );
}
