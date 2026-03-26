"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CTAButton } from "@/components/common/CTAButton";
import { Link } from "@/i18n/navigation";
import { EASE_SPRING } from "@/lib/motion";

interface CategoryItem {
  category: string;
  label: string;
}

interface ProductsHighlightProps {
  productsLabel: string;
  productsTitle: string;
  productsViewAll: string;
  categories: CategoryItem[];
}

const clipPaths = {
  "asymmetric-cut": "polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)",
  "corner-notch": "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)",
};

const ease = EASE_SPRING;

function ProductCard({
  category,
  label,
  index,
  clipPath,
  className = "",
  reducedMotion,
}: {
  category: string;
  label: string;
  index: number;
  clipPath: string;
  className?: string;
  reducedMotion: boolean;
}) {
  const inner = (
    <div
      className={`relative h-full w-full overflow-hidden bg-gray-200 group ${className}`}
      style={{ clipPath }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-16 h-16 text-gray-400/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* 호버 오버레이 */}
      <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* 오버사이즈 넘버링 — 상시 노출 워터마크 */}
      <span className="absolute -bottom-6 -right-2 font-mono text-[120px] md:text-[160px] leading-none text-black/[0.04] select-none pointer-events-none z-0 group-hover:text-primary-400/10 transition-colors duration-500">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* hover 시 하단 슬라이드업 오버레이 */}
      <div className="absolute bottom-0 left-0 right-0 bg-midnight/85 px-6 py-5 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-out">
        <p className="text-white font-display text-lg">{label}</p>
        <p className="text-white/50 text-sm mt-1">더 보기 →</p>
      </div>

      <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500 -z-10 bg-gray-200" />
    </div>
  );

  if (reducedMotion) {
    return (
      <Link href={`/products?category=${category}`} className="block h-full">
        {inner}
      </Link>
    );
  }

  return (
    <motion.div
      className="h-full"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease }}
    >
      <Link href={`/products?category=${category}`} className="block h-full">
        {inner}
      </Link>
    </motion.div>
  );
}

export function ProductsHighlight({
  productsLabel,
  productsTitle,
  productsViewAll,
  categories,
}: ProductsHighlightProps) {
  const reducedMotion = useReducedMotion();

  const [defenseCategory, heatCategory, industrialCategory] = [
    categories.find((c) => c.category === "defense"),
    categories.find((c) => c.category === "heat-exchanger"),
    categories.find((c) => c.category === "industrial"),
  ];

  return (
    <section className="bg-smoke py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div className="mb-12 md:mb-16">
          <SectionLabel>{productsLabel}</SectionLabel>
          <SectionTitle weight="normal" className="mt-3 text-2xl md:text-4xl text-midnight">
            {productsTitle}
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-[2/3] md:aspect-auto md:h-[560px]">
            {defenseCategory && (
              <ProductCard
                category={defenseCategory.category}
                label={defenseCategory.label}
                index={0}
                clipPath={clipPaths["asymmetric-cut"]}
                className="h-full"
                reducedMotion={reducedMotion}
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-[200px] md:h-[268px]">
              {heatCategory && (
                <ProductCard
                  category={heatCategory.category}
                  label={heatCategory.label}
                  index={1}
                  clipPath={clipPaths["corner-notch"]}
                  className="h-full"
                  reducedMotion={reducedMotion}
                />
              )}
            </div>

            <div className="h-[200px] md:h-[268px]">
              {industrialCategory && (
                <ProductCard
                  category={industrialCategory.category}
                  label={industrialCategory.label}
                  index={2}
                  clipPath={clipPaths["corner-notch"]}
                  className="h-full"
                  reducedMotion={reducedMotion}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <CTAButton href="/products" variant="dark">
            {productsViewAll}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
