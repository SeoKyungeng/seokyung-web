"use client";

import { useTranslations } from "next-intl";
import { CTAButton } from "./CTAButton";
import { MarqueeRow } from "./MarqueeRow";

export function FooterMarqueeBand() {
  const tFooter = useTranslations("footer");

  return (
    <div className="relative overflow-hidden bg-navy px-5 py-12 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10">
        <div className="mb-8 space-y-2">
          <MarqueeRow
            text={`${tFooter("ctaMarqueeKo")} · ${tFooter("ctaMarqueeEn")}`}
            size="sm"
          />
          <MarqueeRow
            text={`${tFooter("ctaMarqueeEn")} · ${tFooter("ctaMarqueeKo")}`}
            reverse
            size="sm"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton href="/contact" variant="solid">
            {tFooter("ctaButton")}
          </CTAButton>
          <CTAButton href="/equipment" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            {tFooter("ctaButtonSecondary")}
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
