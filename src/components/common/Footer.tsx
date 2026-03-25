"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CTAButton } from "./CTAButton";

const QUICK_LINKS = [
  { href: "/about", key: "about" },
  { href: "/equipment", key: "equipment" },
  { href: "/products", key: "products" },
  { href: "/sustainability", key: "sustainability" },
  { href: "/contact", key: "contact" },
] as const;

function MarqueeRow({ text, reverse = false, paused = false }: { text: string; reverse?: boolean; paused?: boolean }) {
  const repeated = `${text} · ${text} · ${text} · ${text} · `;

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className={`inline-block ${paused ? "" : "animate-marquee"}`}
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <span className="font-display font-normal text-xl md:text-2xl leading-none text-white/70 tracking-[-0.02em]">
          {repeated}
        </span>
        <span className="font-display font-normal text-xl md:text-2xl leading-none text-white/70 tracking-[-0.02em]">
          {repeated}
        </span>
      </div>
    </div>
  );
}

export function Footer() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const reducedMotion = useReducedMotion();

  return (
    <footer className="bg-midnight text-white">
      {/* Marquee CTA Band */}
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
              paused={reducedMotion}
            />
            <MarqueeRow
              text={`${tFooter("ctaMarqueeEn")} · ${tFooter("ctaMarqueeKo")}`}
              reverse
              paused={reducedMotion}
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

      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 lg:px-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <p className="font-display text-lg font-bold">
              {tCommon("siteName")}
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-white/60">
              {tFooter("address")}
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
              {tFooter("quickLinks")}
            </p>
            <nav className="mt-4 flex flex-col gap-3" aria-label="푸터">
              {QUICK_LINKS.map(({ href, key }) => (
                <Link
                  key={key}
                  href={href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
              {tFooter("contactTitle")}
            </p>
            <div className="mt-4 space-y-2 font-mono text-sm text-white/60">
              <p>TEL: {tFooter("phone")}</p>
              <p>FAX: {tFooter("fax")}</p>
              <p>EMAIL: {tFooter("email")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-steel">
        <div className="mx-auto max-w-[1400px] px-5 py-6 md:px-10 lg:px-20">
          <p className="text-center text-xs text-white/40">
            {tFooter("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
