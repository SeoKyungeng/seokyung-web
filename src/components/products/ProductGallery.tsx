"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PackageOpen, ImageOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { ImageLightbox } from "@/components/common/ImageLightbox";
import { StickyTabFilter } from "@/components/common/StickyTabFilter";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_SPRING, EASE_SMOOTH } from "@/lib/motion";

type CategoryKey = "all" | "defense" | "heat-exchanger" | "industrial";

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

/* ── 카테고리 라벨 ── */
const CATEGORY_LABELS: Record<string, string> = {
  defense: "DEFENSE",
  "heat-exchanger": "HEAT EXCHANGER",
  industrial: "INDUSTRIAL",
};

/* ── 모션 변수 ── */
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [...EASE_SPRING] as [number, number, number, number] },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [...EASE_SMOOTH] as [number, number, number, number] },
  },
};

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

/* ── EmptyState ── */
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200/80 bg-white shadow-sm">
        <PackageOpen
          className="h-10 w-10 text-gray-300"
          strokeWidth={1}
          aria-hidden="true"
        />
      </div>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

/* ── GalleryItem ── */
interface GalleryItemProps {
  item: ProductItem;
  reducedMotion: boolean;
  onClick: () => void;
}

/**
 * 이미지 onLoad 시 직접 DOM style을 변경하여 blur-up 효과를 적용한다.
 * useState를 사용하지 않으므로 React 리렌더가 발생하지 않고,
 * Framer Motion motion.div의 애니메이션 재평가를 방지한다.
 */
function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  img.style.filter = "blur(0)";
  img.style.opacity = "1";
}

function GalleryItem({ item, reducedMotion, onClick }: GalleryItemProps) {
  const { ref, isInView } = useAnimateInView();
  const [imgError, setImgError] = useState(false);

  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category.toUpperCase();

  const content = (
    <button
      type="button"
      aria-label={item.alt}
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
    >
      {/* 이미지 컨테이너 */}
      <div
        className="relative w-full bg-smoke transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        style={{ height: `${item.placeholderHeight}px`, maxHeight: "300px" }}
      >
        {imgError ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-smoke">
            <ImageOff className="h-8 w-8 text-gray-300" strokeWidth={1} aria-hidden="true" />
            <span className="text-xs text-gray-400">{item.alt}</span>
          </div>
        ) : (
          <>
            {/* 스켈레톤 — 항상 렌더, 이미지 로드 후 자연스럽게 가려짐 */}
            <div className="absolute inset-0 animate-pulse bg-linear-to-br from-smoke to-gray-100" />
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover blur-[20px] opacity-0 transition-[filter,opacity] duration-500"
              onLoad={handleImageLoad}
              onError={() => setImgError(true)}
            />
          </>
        )}
      </div>

      {/* Hover overlay — CSS only */}
      <div className="pointer-events-none absolute inset-0 bg-midnight/40 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

      {/* Hover 콘텐츠 — CSS only */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-2 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
        <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-wider text-white ring-1 ring-white/20">
          {categoryLabel}
        </span>
        <span className="text-sm font-medium text-white drop-shadow-sm">
          {item.alt}
        </span>
      </div>
    </button>
  );

  if (reducedMotion) {
    return (
      <div ref={ref} className="mb-3 break-inside-avoid">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="mb-3 break-inside-avoid"
      variants={staggerItem}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        variants={imageReveal}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}

/* ── ProductGallery ── */
export function ProductGallery({ items, initialCategory }: ProductGalleryProps) {
  const t = useTranslations("pages.products");
  const reducedMotion = useReducedMotion();

  const validCategories: CategoryKey[] = [
    "all",
    "defense",
    "heat-exchanger",
    "industrial",
  ];
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(
    validCategories.includes(initialCategory as CategoryKey)
      ? (initialCategory as CategoryKey)
      : "all"
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const lightboxImages = filteredItems.map((item) => ({
    src: item.image,
    alt: item.alt,
    width: 800,
    height: item.placeholderHeight * 3,
  }));

  const variants = reducedMotion ? reducedFilterVariants : filterVariants;

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

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20 lg:px-20">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredItems.length === 0 ? (
              <EmptyState message={t("emptyState")} />
            ) : (
              <div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
                {filteredItems.map((item, index) => (
                  <GalleryItem
                    key={item.id}
                    item={item}
                    reducedMotion={reducedMotion}
                    onClick={() => setLightboxIndex(index)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
