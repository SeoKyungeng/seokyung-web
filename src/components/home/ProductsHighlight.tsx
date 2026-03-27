"use client";

import Image from "next/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CTAButton } from "@/components/common/CTAButton";
import { TransitionLink as Link } from "@/components/common/TransitionLink";
import { AnimateInView } from "@/components/common/AnimateInView";

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

const CATEGORY_IMAGES: Record<string, string> = {
  defense: "/images/products/defense-1.jpg",
  "heat-exchanger": "/images/products/heat-1.jpg",
  industrial: "/images/products/industrial-1.jpg",
};

function ProductCard({
  category,
  label,
  index,
  size = "md",
}: {
  category: string;
  label: string;
  index: number;
  size?: "lg" | "md";
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link href={`/products?category=${category}`} className="block h-full group">
      {/* Double-Bezel 외부 셸 */}
      <div className="h-full rounded-2xl bg-white/60 p-1.5 ring-1 ring-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-500 hover:ring-primary-400/30 hover:shadow-[0_8px_40px_rgba(20,71,230,0.12)]"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Double-Bezel 내부 코어 */}
        <div className="relative h-full overflow-hidden rounded-[calc(1rem-6px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
          <Image
            src={CATEGORY_IMAGES[category] ?? "/images/products/defense-1.jpg"}
            alt={label}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            sizes={size === "lg" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
          />

          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-linear-to-t from-midnight/70 via-midnight/20 to-transparent" />
          <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/20 transition-colors duration-500" />

{/* 카테고리 필 */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-white/80 ring-1 ring-white/20 backdrop-blur-md group-hover:bg-primary-400/20 group-hover:ring-primary-400/30 group-hover:text-white transition-all duration-500">
              {num}
            </span>
          </div>

          {/* 하단 콘텐츠 */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
            <p className="font-display text-white leading-tight group-hover:text-primary-300 transition-colors duration-300"
              style={{ fontSize: size === "lg" ? "clamp(1.25rem, 2vw, 1.75rem)" : "clamp(1rem, 1.5vw, 1.25rem)" }}
            >
              {label}
            </p>

            {/* 화살표 — 호버 시 슬라이드 */}
            <div className="mt-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <span className="text-xs text-white/60 tracking-wider uppercase">View</span>
              <svg className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProductsHighlight({
  productsLabel,
  productsTitle,
  productsViewAll,
  categories,
}: ProductsHighlightProps) {
  const [defenseCategory, heatCategory, industrialCategory] = [
    categories.find((c) => c.category === "defense"),
    categories.find((c) => c.category === "heat-exchanger"),
    categories.find((c) => c.category === "industrial"),
  ];

  return (
    <section className="bg-smoke py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        {/* 헤더 */}
        <div className="flex items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <SectionLabel>{productsLabel}</SectionLabel>
            <SectionTitle weight="normal" className="mt-3 text-2xl md:text-4xl text-midnight">
              {productsTitle}
            </SectionTitle>
          </div>
          <p className="hidden md:block font-mono text-6xl font-bold text-midnight/[0.04] leading-none select-none">
            {String(categories.length).padStart(2, "0")}
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* 방산 — 대형 카드 */}
          <div className="md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[540px]">
            {defenseCategory && (
              <AnimateInView y={40} duration={0.6} className="h-full">
                <ProductCard
                  category={defenseCategory.category}
                  label={defenseCategory.label}
                  index={0}
                  size="lg"
                />
              </AnimateInView>
            )}
          </div>

          {/* 오른쪽 스택 */}
          <div className="md:col-span-5 flex flex-col gap-3 md:gap-4">
            <div className="aspect-[16/9] md:aspect-auto md:h-[260px]">
              {heatCategory && (
                <AnimateInView y={40} duration={0.6} delay={0.1} className="h-full">
                  <ProductCard
                    category={heatCategory.category}
                    label={heatCategory.label}
                    index={1}
                  />
                </AnimateInView>
              )}
            </div>

            <div className="aspect-[16/9] md:aspect-auto md:flex-1">
              {industrialCategory && (
                <AnimateInView y={40} duration={0.6} delay={0.2} className="h-full">
                  <ProductCard
                    category={industrialCategory.category}
                    label={industrialCategory.label}
                    index={2}
                  />
                </AnimateInView>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <AnimateInView y={20} delay={0.3}>
          <div className="mt-10 flex justify-end">
            <CTAButton href="/products" variant="dark">
              {productsViewAll}
            </CTAButton>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
