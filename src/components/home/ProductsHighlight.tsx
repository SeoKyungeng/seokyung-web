"use client";

import Image from "next/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CTAButton } from "@/components/common/CTAButton";
import { Link } from "@/i18n/navigation";
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

const clipPaths = {
  "asymmetric-cut": "polygon(32px 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%, 0 32px)",
  "corner-notch": "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)",
};

function ProductCard({
  category,
  label,
  index,
  clipPath,
  className = "",
}: {
  category: string;
  label: string;
  index: number;
  clipPath: string;
  className?: string;
}) {
  const inner = (
    <div
      className={`relative h-full w-full overflow-hidden group ${className}`}
      style={{ clipPath }}
    >
      <Image
        src={CATEGORY_IMAGES[category] ?? "/images/products/defense-1.jpg"}
        alt={label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

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

    </div>
  );

  return (
    <Link href={`/products?category=${category}`} className="block h-full">
      {inner}
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
        <div className="mb-12 md:mb-16">
          <SectionLabel>{productsLabel}</SectionLabel>
          <SectionTitle weight="normal" className="mt-3 text-2xl md:text-4xl text-midnight">
            {productsTitle}
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-[2/3] md:aspect-auto md:h-[560px]">
            {defenseCategory && (
              <AnimateInView y={40} duration={0.6} className="h-full">
                <ProductCard
                  category={defenseCategory.category}
                  label={defenseCategory.label}
                  index={0}
                  clipPath={clipPaths["asymmetric-cut"]}
                  className="h-full"
                />
              </AnimateInView>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-[200px] md:h-[268px]">
              {heatCategory && (
                <AnimateInView y={40} duration={0.6} className="h-full">
                  <ProductCard
                    category={heatCategory.category}
                    label={heatCategory.label}
                    index={1}
                    clipPath={clipPaths["corner-notch"]}
                    className="h-full"
                  />
                </AnimateInView>
              )}
            </div>

            <div className="h-[200px] md:h-[268px]">
              {industrialCategory && (
                <AnimateInView y={40} duration={0.6} className="h-full">
                  <ProductCard
                    category={industrialCategory.category}
                    label={industrialCategory.label}
                    index={2}
                    clipPath={clipPaths["corner-notch"]}
                    className="h-full"
                  />
                </AnimateInView>
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
