"use client";

import Image from "next/image";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { CTAButton } from "@/components/common/CTAButton";
import { AnimateInView } from "@/components/common/AnimateInView";

interface ProductsHighlightProps {
  productsLabel: string;
  productsTitle: string;
  productsViewAll: string;
}

const HIGHLIGHT_ITEMS = [
  { image: "/images/products/01.jpeg", size: "lg" as const },
  { image: "/images/products/04.jpeg", size: "md" as const },
  { image: "/images/products/10.jpeg", size: "md" as const },
];

function ProductCard({
  image,
  index,
  size = "md",
}: {
  image: string;
  index: number;
  size?: "lg" | "md";
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="block h-full group">
      {/* Double-Bezel 외부 셸 */}
      <div className="h-full rounded-2xl bg-white/60 p-1.5 ring-1 ring-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
        {/* Double-Bezel 내부 코어 */}
        <div className="relative h-full overflow-hidden rounded-[calc(1rem-6px)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
          <Image
            src={image}
            alt={`가공제품 ${num}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            sizes={size === "lg" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
          />
        </div>
      </div>
    </div>
  );
}

export function ProductsHighlight({
  productsLabel,
  productsTitle,
  productsViewAll,
}: ProductsHighlightProps) {
  return (
    <section className="bg-smoke py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20">
        {/* 헤더 */}
        <div className="mb-12 md:mb-16">
          <SectionLabel>{productsLabel}</SectionLabel>
          <SectionTitle weight="normal" className="mt-3 text-2xl md:text-4xl text-midnight">
            {productsTitle}
          </SectionTitle>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* 대형 카드 */}
          <div className="md:col-span-7 aspect-[4/3] md:aspect-auto md:h-[540px]">
            <AnimateInView y={40} duration={0.6} className="h-full">
              <ProductCard
                image={HIGHLIGHT_ITEMS[0].image}
                index={0}
                size="lg"
              />
            </AnimateInView>
          </div>

          {/* 오른쪽 스택 */}
          <div className="md:col-span-5 flex flex-col gap-3 md:gap-4">
            <div className="aspect-[16/9] md:aspect-auto md:h-[260px]">
              <AnimateInView y={40} duration={0.6} delay={0.1} className="h-full">
                <ProductCard
                  image={HIGHLIGHT_ITEMS[1].image}
                  index={1}
                />
              </AnimateInView>
            </div>

            <div className="aspect-[16/9] md:aspect-auto md:flex-1">
              <AnimateInView y={40} duration={0.6} delay={0.2} className="h-full">
                <ProductCard
                  image={HIGHLIGHT_ITEMS[2].image}
                  index={2}
                />
              </AnimateInView>
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
