"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LanguageToggle } from "./LanguageToggle";
import { CTAButton } from "./CTAButton";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/equipment", key: "equipment" },
  { href: "/products", key: "products" },
  { href: "/sustainability", key: "sustainability" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        {tCommon("skipToContent")}
      </a>

      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-steel bg-midnight/90 backdrop-blur-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10 lg:px-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-lg font-bold text-white"
          >
            {tCommon("siteName")}
          </Link>

          {/* PC Nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="메인">
            {NAV_ITEMS.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className={`relative py-1 text-sm transition-colors duration-200 ${
                  isActive(href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {t(key)}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-cyan-400"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* PC Right */}
          <div className="hidden items-center gap-6 lg:flex">
            <LanguageToggle />
            <CTAButton href="/contact" className="px-6 py-2 text-sm">
              {t("contact")}
            </CTAButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white lg:hidden"
            aria-label="메뉴 열기"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-midnight backdrop-blur-lg lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Link
                href="/"
                className="font-display text-lg font-bold text-white"
                onClick={() => setMobileOpen(false)}
              >
                {tCommon("siteName")}
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white"
                aria-label="메뉴 닫기"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col items-center justify-center gap-6"
              aria-label="모바일 메인"
            >
              {NAV_ITEMS.map(({ href, key }, i) => (
                <motion.div
                  key={key}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { delay: i * 0.05, duration: 0.3 }
                  }
                >
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-semibold transition-colors ${
                      isActive(href) ? "text-cyan-400" : "text-white"
                    }`}
                    aria-current={isActive(href) ? "page" : undefined}
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex justify-center border-t border-steel py-6">
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
