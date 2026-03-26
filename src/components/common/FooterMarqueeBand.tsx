"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CTAButton } from "./CTAButton";
import { GlowBlob } from "./GlowBlob";
import { EASE_SPRING, DURATION_NORMAL } from "@/lib/motion";

export function FooterMarqueeBand() {
  const tFooter = useTranslations("footer");
  const reducedMotion = useReducedMotion();

  const marqueeText = `${tFooter("ctaMarqueeKo")} · ${tFooter("ctaMarqueeEn")} · `;
  const repeated = marqueeText.repeat(6);

  const ctaContent = (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <CTAButton href="/contact" variant="solid">
        {tFooter("ctaButton")}
      </CTAButton>
      <CTAButton href="/equipment" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-white/40">
        {tFooter("ctaButtonSecondary")}
      </CTAButton>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-navy px-5 py-20 md:py-28">
      {/* 쉐브론 패턴 배경 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 글로우 배경 */}
      <GlowBlob className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 will-change-transform opacity-50" size={500} />

      <div className="relative z-10">
        {/* 대형 마키 — 풀블리드 */}
        <div className="mb-12 md:mb-16 space-y-3 -mx-5">
          <div className="overflow-hidden whitespace-nowrap">
            <div
              className={`inline-block ${reducedMotion ? "" : "animate-marquee"}`}
              style={{ animationDuration: "100s" }}
            >
              <span className="font-display font-normal text-[clamp(48px,10vw,100px)] leading-none tracking-[-0.03em] text-white/90">
                {repeated}
              </span>
              <span className="font-display font-normal text-[clamp(48px,10vw,100px)] leading-none tracking-[-0.03em] text-white/90">
                {repeated}
              </span>
            </div>
          </div>

          <div className="overflow-hidden whitespace-nowrap">
            <div
              className={`inline-block ${reducedMotion ? "" : "animate-marquee"}`}
              style={{ animationDuration: "130s", animationDirection: "reverse" }}
            >
              <span className="font-display font-normal text-[clamp(48px,10vw,100px)] leading-none tracking-[-0.03em] text-white/20">
                {repeated}
              </span>
              <span className="font-display font-normal text-[clamp(48px,10vw,100px)] leading-none tracking-[-0.03em] text-white/20">
                {repeated}
              </span>
            </div>
          </div>
        </div>

        {/* CTA 버튼 */}
        {reducedMotion ? ctaContent : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: DURATION_NORMAL, ease: EASE_SPRING }}
          >
            {ctaContent}
          </motion.div>
        )}
      </div>
    </div>
  );
}
