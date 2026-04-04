import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/common/TransitionLink";
import { FooterMarqueeBand } from "./FooterMarqueeBand";
import companyData from "@/data/company.json";

const QUICK_LINKS = [
  { href: "/about", key: "about" },
  { href: "/equipment", key: "equipment" },
  { href: "/products", key: "products" },
  { href: "/sustainability", key: "sustainability" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tFooter = useTranslations("footer");
  const locale = useLocale() as "ko" | "en";

  return (
    <footer className="bg-midnight text-white">
      <FooterMarqueeBand />

      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 lg:px-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <Image
              src="/images/logo.svg"
              alt={tCommon("siteName")}
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <address className="mt-4 text-sm not-italic leading-relaxed text-white/60">
              {companyData.address[locale]}
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
              <p>TEL: {companyData.phone}</p>
              <p>FAX: {companyData.fax}</p>
              <p>EMAIL: {companyData.email}</p>
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
