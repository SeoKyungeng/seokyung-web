"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { TransitionLink as Link } from "@/components/common/TransitionLink";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LanguageToggle } from "./LanguageToggle";
import { CTAButton } from "./CTAButton";
import { EASE_SPRING, EASE_SPRING_CSS } from "@/lib/motion";

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
  const navRef = useRef<HTMLElement>(null);
  const [underline, setUnderline] = useState<{
    left: number;
    width: number;
  } | null>(null);

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

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => {
      const el = nav.querySelector<HTMLElement>('[aria-current="page"]');
      if (!el) {
        setUnderline(null);
        return;
      }
      setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [pathname]);

  return (
    <>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        {tCommon("skipToContent")}
      </a>

      <header
        className={`fixed z-40 transition-all duration-500 ${
          scrolled
            ? "top-3 right-4 left-4 mx-auto max-w-4xl rounded-full border border-white/10 bg-midnight/80 ring-1 ring-white/10 backdrop-blur-xl lg:top-4 lg:right-0 lg:left-0"
            : "top-0 right-0 left-0 bg-transparent"
        }`}
        style={{ transitionTimingFunction: EASE_SPRING_CSS }}
      >
        <div className={`mx-auto flex items-center justify-between ${
          scrolled
            ? "h-14 px-6 md:h-14 lg:px-8"
            : "h-16 max-w-[1400px] px-5 md:h-20 md:px-10 lg:px-20"
        }`}>
          {/* Logo */}
          <Link href="/" aria-label={tCommon("siteName")}>
            <Image
              src="/images/logo-white.svg"
              alt={tCommon("siteName")}
              width={120}
              height={40}
              className={`transition-all duration-500 w-auto ${scrolled ? "h-7" : "h-9 md:h-10"}`}
              priority
            />
          </Link>

          {/* PC Nav */}
          <nav
            ref={navRef}
            className="relative hidden items-center gap-8 lg:flex"
            aria-label="메인"
          >
            {NAV_ITEMS.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className={`py-1 text-sm transition-colors duration-200 ${
                  isActive(href)
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {t(key)}
              </Link>
            ))}
            {underline && (
              <motion.span
                className="pointer-events-none absolute -bottom-1 left-0 h-0.5 bg-primary-400"
                initial={false}
                animate={{ x: underline.left, width: underline.width }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 30 }
                }
              />
            )}
          </nav>

          {/* PC Right */}
          <div className="hidden items-center gap-6 lg:flex">
            <LanguageToggle />
            <CTAButton href="/contact" size="sm">
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
                aria-label={tCommon("siteName")}
                onClick={() => setMobileOpen(false)}
              >
                <Image
                  src="/images/logo-white.svg"
                  alt={tCommon("siteName")}
                  width={120}
                  height={40}
                  className="h-9 w-auto"
                />
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
                      : { delay: i * 0.05, duration: 0.3, ease: EASE_SPRING }
                  }
                >
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-semibold transition-colors ${
                      isActive(href) ? "text-primary-400" : "text-white"
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
