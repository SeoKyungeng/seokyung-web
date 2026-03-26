"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CTAButton } from "@/components/common/CTAButton";
import { GlowBlob } from "@/components/common/GlowBlob";

interface HeroSectionProps {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroCtaSecondary: string;
  scrollIndicator: string;
}

export function HeroSection({
  heroTitle,
  heroSubtitle,
  heroCta,
  heroCtaSecondary,
  scrollIndicator,
}: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const lines = heroTitle.split("\n");

  return (
    <section className="relative flex min-h-[calc(100vh+48px)] items-center overflow-hidden bg-midnight">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,71,230,0.06) 0%, transparent 50%, rgba(20,71,230,0.03) 100%)",
        }}
        aria-hidden="true"
      />

      <GlowBlob className="-left-32 top-1/4" size={600} />
      <GlowBlob className="-right-48 bottom-1/4" size={500} />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 md:px-10 lg:px-20 py-24">
        <h1 className="mb-6 font-display font-normal tracking-[-0.04em] text-white leading-none">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              {reducedMotion ? (
                <span className="block text-[clamp(28px,7vw,64px)]">{line}</span>
              ) : (
                <motion.span
                  className="block text-[clamp(28px,7vw,64px)]"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                >
                  {line}
                </motion.span>
              )}
            </span>
          ))}
        </h1>

        {heroSubtitle && (reducedMotion ? (
          <p className="mb-10 text-lg md:text-xl text-white/60">{heroSubtitle}</p>
        ) : (
          <motion.p
            className="mb-10 text-lg md:text-xl text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            {heroSubtitle}
          </motion.p>
        ))}

        {reducedMotion ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton href="/contact" variant="solid" className="w-full sm:w-auto justify-center">
              {heroCta}
            </CTAButton>
            <CTAButton href="/equipment" variant="outline" className="hidden sm:inline-flex">
              {heroCtaSecondary}
            </CTAButton>
          </div>
        ) : (
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          >
            <CTAButton href="/contact" variant="solid" className="w-full sm:w-auto justify-center">
              {heroCta}
            </CTAButton>
            <CTAButton href="/equipment" variant="outline" className="hidden sm:inline-flex">
              {heroCtaSecondary}
            </CTAButton>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:bottom-24">
        <span className="text-[11px] uppercase tracking-widest text-white/40">
          {scrollIndicator}
        </span>
        {reducedMotion ? (
          <div className="h-12 w-px bg-white/30" />
        ) : (
          <motion.div
            className="h-12 w-px bg-white/30"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Notch — 왼쪽 수평 bar + 오른쪽 SVG 커브 하강 */}
      <div
        className="absolute bottom-0 left-0 right-[33%] h-[36px] bg-white md:right-[40%] md:h-[48px]"
        aria-hidden="true"
      >
        <svg
          className="absolute right-0 top-0 h-full translate-x-[99%]"
          viewBox="0 0 51 30"
          fill="white"
          preserveAspectRatio="none"
          style={{ width: "clamp(60px, 6vw, 100px)" }}
        >
          <path d="M0 0h3.565c3.212 0 6.293 1.264 8.565 3.513l23.207 22.974A12.175 12.175 0 0 0 43.902 30H51 0V0Z" />
        </svg>
      </div>
    </section>
  );
}
