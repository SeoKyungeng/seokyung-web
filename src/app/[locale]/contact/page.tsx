import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { CompanyInfo } from "@/components/contact/CompanyInfo";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";

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
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-10 md:gap-16">
            {/* 문의 폼 (6/10) */}
            <div className="md:col-span-6">
              <ContactForm />
            </div>

            {/* 회사 정보 (4/10) */}
            <div className="md:col-span-4">
              <CompanyInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 지도 플레이스홀더 */}
      <MapPlaceholder />
    </>
  );
}
