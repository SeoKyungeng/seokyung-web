import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LenisProvider } from "@/providers/LenisProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { GrainOverlay } from "@/components/common/GrainOverlay";
import { TransitionProvider } from "@/providers/TransitionProvider";
import { SITE_URL } from "@/lib/constants";
import "@/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "400 700",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("site.name"),
      template: `%s | ${t("site.name")}`,
    },
    description: t("site.description"),
    icons: {
      icon: { url: "/images/logo-symbol.svg", type: "image/svg+xml" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      siteName: t("site.name"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "ko" ? "(주)서경엔지니어링" : "Seokyung Engineering Co., Ltd.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-symbol.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ko" ? "경남 창원시" : "Changwon, Gyeongnam",
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
    },
  };

  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${GeistSans.variable} ${GeistMono.variable} ${pretendard.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <ToastProvider>
              <TransitionProvider>
                <GrainOverlay />
                <Header />
                <main id="main-content">{children}</main>
                <Footer />
              </TransitionProvider>
            </ToastProvider>
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
