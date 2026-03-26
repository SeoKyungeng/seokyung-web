import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LenisProvider } from "@/providers/LenisProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { GrainOverlay } from "@/components/common/GrainOverlay";
import { LayoutTransition } from "@/components/common/LayoutTransition";
import "@/styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const pretendard = localFont({
  src: "../../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "(주)서경엔지니어링",
  description: "CNC·MCT 정밀 가공 전문기업",
};

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

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${GeistSans.variable} ${GeistMono.variable} ${pretendard.variable} antialiased`}
    >
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <ToastProvider>
              <GrainOverlay />
              <Header />
              <main id="main-content">
                <LayoutTransition>{children}</LayoutTransition>
              </main>
              <Footer />
            </ToastProvider>
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
