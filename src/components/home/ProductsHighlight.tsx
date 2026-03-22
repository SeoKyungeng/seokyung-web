"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CTAButton } from "@/components/common/CTAButton";
import { Link } from "@/i18n/navigation";

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

function ProductCard({
  category,
  label,
  className = "",
  reducedMotion,
}: {
  category: string;
  label: string;
  className?: string;
  reducedMotion: boolean;
}) {
  const categoryColors: Record<string, string> = {
    defense: "bg-primary-400/10 border-primary-400/30 text-primary-400",
    "heat-exchanger": "bg-white/10 border-white/20 text-white",
    industrial: "bg-white/10 border-white/20 text-white",
  };
  const badgeClass = categoryColors[category] ?? "bg-white/10 border-white/20 text-white";

  const inner = (
    <div className={`relative h-full w-full overflow-hidden rounded-lg bg-steel/30 group ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-16 h-16 text-white/10"
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

      <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex items-end p-5">
        <span
          className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider border translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ${badgeClass}`}
        >
          {label}
        </span>
      </div>

      <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-500 -z-10 bg-steel/30" />
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
    <section className="bg-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        <div className="mb-12 md:mb-16">
          <SectionLabel>{productsLabel}</SectionLabel>
          <SectionTitle className="mt-3 text-2xl md:text-4xl text-midnight">
            {productsTitle}
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-[2/3] md:aspect-auto md:h-[560px]">
            {defenseCategory && (
              <ProductCard
                category={defenseCategory.category}
                label={defenseCategory.label}
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
