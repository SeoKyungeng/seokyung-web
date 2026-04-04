import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { AnimateInView } from "@/components/common/AnimateInView";
import { ContactForm } from "@/components/contact/ContactForm";
import { CompanyInfo } from "@/components/contact/CompanyInfo";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { ko: "/ko/contact", en: "/en/contact" },
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("pages.contact");

  return (
    <>
      {/* Section 1: 페이지 헤더 */}
      <PageHeader
        label="CONTACT US"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Section 2: 문의 폼 + 회사 정보 스플릿 레이아웃 */}
      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-10 lg:gap-20">
            {/* 문의 폼 (6/10) */}
            <div className="md:col-span-6">
              <ContactForm />
            </div>

            {/* 회사 정보 (4/10) */}
            <AnimateInView delay={0.2} className="md:col-span-4">
              <CompanyInfo />
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Section 3: 지도 플레이스홀더 */}
      <AnimateInView>
        <MapPlaceholder />
      </AnimateInView>
    </>
  );
}
