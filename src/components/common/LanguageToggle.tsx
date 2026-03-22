"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: "ko" | "en") {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale("ko")}
        className={`transition-colors duration-200 ${
          locale === "ko"
            ? "font-semibold text-white"
            : "font-normal text-white/40 hover:text-white/70"
        }`}
        aria-label="한국어로 전환"
        aria-current={locale === "ko" ? "true" : undefined}
      >
        KO
      </button>
      <span className="text-white/40" aria-hidden="true">
        |
      </span>
      <button
        onClick={() => switchLocale("en")}
        className={`transition-colors duration-200 ${
          locale === "en"
            ? "font-semibold text-white"
            : "font-normal text-white/40 hover:text-white/70"
        }`}
        aria-label="Switch to English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
    </div>
  );
}
