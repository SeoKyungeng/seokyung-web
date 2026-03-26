"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CTAButton } from "@/components/common/CTAButton";
import { MarqueeRow } from "@/components/common/MarqueeRow";
import { GlowBlob } from "@/components/common/GlowBlob";
import { EASE_SPRING, DURATION_NORMAL } from "@/lib/motion";

interface CTABandProps {
  ctaMarqueeKo: string;
  ctaMarqueeEn: string;
  ctaButton: string;
  ctaButtonSecondary: string;
}

export function CTABand({ ctaMarqueeKo, ctaMarqueeEn, ctaButton, ctaButtonSecondary }: CTABandProps) {
  const reducedMotion = useReducedMotion();

  const ctaContent = (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-5">
      <CTAButton href="/contact" variant="solid">
        {ctaButton}
      </CTAButton>
      <CTAButton href="/equipment" variant="outline" className="border-white/30 text-white hover:bg-white/10">
        {ctaButtonSecondary}
      </CTAButton>
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-navy py-16 md:py-24">
      {/* 쉐브론 SVG 패턴 배경 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 깊이감 GlowBlob */}
      <GlowBlob className="left-1/2 -translate-x-1/2 top-0 will-change-transform opacity-40" size={400} />

      <div className="relative z-10">
        <div className="mb-10 md:mb-14 space-y-3">
          <MarqueeRow text={`${ctaMarqueeKo} · ${ctaMarqueeEn}`} size="xl" duration={15} />
          <MarqueeRow text={`${ctaMarqueeEn} · ${ctaMarqueeKo}`} size="xl" duration={25} reverse />
        </div>

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
    </section>
  );
}
