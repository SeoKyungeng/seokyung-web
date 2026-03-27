"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useContext } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CTAButton } from "@/components/common/CTAButton";
import { GlowBlob } from "@/components/common/GlowBlob";
import { PageTransitionContext } from "@/providers/TransitionProvider";
import { EASE_SPRING, DURATION_SLOW } from "@/lib/motion";

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
  const ready = useContext(PageTransitionContext);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // 라인별 → 단어별 2단계 분해
  const lines = heroTitle.split("\n");
  let wordIndex = 0;
  const wordLines = lines.map((line) =>
    line.split(" ").map((word) => ({
      word,
      delay: wordIndex++ * 0.06,
    }))
  );
  // 라인간 추가 딜레이
  let lineOffset = 0;
  for (let li = 0; li < wordLines.length; li++) {
    for (const w of wordLines[li]) {
      w.delay += lineOffset;
    }
    lineOffset += 0.15;
  }

  return (
    <section ref={sectionRef} className="relative flex min-h-[calc(100vh+48px)] items-center overflow-hidden bg-midnight">
      {/* 배경 scale-up on scroll */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reducedMotion ? undefined : { scale: bgScale }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(135deg, rgba(20,71,230,0.06) 0%, transparent 50%, rgba(20,71,230,0.03) 100%)",
              "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(20,71,230,0.08), transparent)",
              "radial-gradient(ellipse 60% 40% at 80% 60%, rgba(107,138,245,0.05), transparent)",
            ].join(", "),
          }}
        />
        <GlowBlob className="-left-32 top-1/4 will-change-transform" size={600} />
        <GlowBlob className="-right-48 bottom-1/4 will-change-transform" size={500} />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl w-full mx-auto px-5 md:px-10 lg:px-20 py-24"
        style={reducedMotion ? undefined : { y, opacity }}
      >
        <h1 className="mb-8 font-display font-normal tracking-[-0.05em] text-white leading-[1.05]">
          {wordLines.map((words, li) => (
            <span key={li} className="block">
              {words.map((w, wi) => (
                <span key={wi} className="inline-block overflow-hidden">
                  {reducedMotion ? (
                    <span className="inline-block text-[clamp(40px,9vw,88px)]">
                      {w.word}
                    </span>
                  ) : (
                    <motion.span
                      className="inline-block text-[clamp(40px,9vw,88px)]"
                      initial={{ y: "110%", opacity: 0 }}
                      animate={ready ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                      transition={{
                        duration: DURATION_SLOW,
                        delay: w.delay,
                        ease: EASE_SPRING,
                      }}
                    >
                      {w.word}
                    </motion.span>
                  )}
                  {/* 단어 사이 공백 */}
                  {wi < words.length - 1 && (
                    <span className="inline-block text-[clamp(40px,9vw,88px)]">&nbsp;</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {heroSubtitle && (reducedMotion ? (
          <p className="mb-10 text-lg md:text-xl text-white/60">{heroSubtitle}</p>
        ) : (
          <motion.p
            className="mb-10 text-lg md:text-xl text-white/60"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
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
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          >
            <CTAButton href="/contact" variant="solid" className="w-full sm:w-auto justify-center">
              {heroCta}
            </CTAButton>
            <CTAButton href="/equipment" variant="outline" className="hidden sm:inline-flex">
              {heroCtaSecondary}
            </CTAButton>
          </motion.div>
        )}
      </motion.div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:bottom-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-widest text-white/50 backdrop-blur-sm ring-1 ring-white/10">
          {scrollIndicator}
        </span>
        {reducedMotion ? (
          <div className="h-10 w-px bg-white/30" />
        ) : (
          <motion.div
            className="h-10 w-px bg-white/30"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      {/* Notch — 왼쪽 수평 bar + 오른쪽 SVG 커브 하강 */}
      <div
        className="absolute bottom-0 left-0 right-[33%] h-9 bg-white md:right-[40%] md:h-12"
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
