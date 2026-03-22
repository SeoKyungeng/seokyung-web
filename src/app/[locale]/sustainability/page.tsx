import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { ESGCards } from "@/components/sustainability/ESGCards";
import { CertGrid } from "@/components/sustainability/CertGrid";
import sustainabilityData from "@/data/sustainability.json";

type Locale = "ko" | "en";

export default async function SustainabilityPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.sustainability");

  const esgItems = [
    {
      key: "E" as const,
      title: sustainabilityData.esg.e.title[locale],
      description: sustainabilityData.esg.e.description[locale],
      icon: sustainabilityData.esg.e.icon as "Leaf",
    },
    {
      key: "S" as const,
      title: sustainabilityData.esg.s.title[locale],
      description: sustainabilityData.esg.s.description[locale],
      icon: sustainabilityData.esg.s.icon as "Users",
    },
    {
      key: "G" as const,
      title: sustainabilityData.esg.g.title[locale],
      description: sustainabilityData.esg.g.description[locale],
      icon: sustainabilityData.esg.g.icon as "Shield",
    },
  ];

  const certItems = sustainabilityData.certifications.map((cert) => ({
    id: cert.id,
    name: cert.name[locale],
    image: cert.image,
  }));

  return (
    <>
      {/* Section 1 — 페이지 헤더 */}
      <PageHeader
        label="SUSTAINABILITY"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Section 2 — ESG 경영 방침 */}
      <section className="bg-white py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
          <div className="mb-12 flex flex-col gap-4">
            <SectionLabel>{t("esgLabel")}</SectionLabel>
            <SectionTitle className="text-3xl md:text-4xl">
              {t("esgTitle")}
            </SectionTitle>
          </div>
          <ESGCards items={esgItems} />
        </div>
      </section>

      {/* Section 3 — 인증 현황 */}
      <section className="bg-smoke py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
          <div className="mb-12 flex flex-col gap-4">
            <SectionLabel>{t("certLabel")}</SectionLabel>
            <SectionTitle className="text-3xl md:text-4xl">
              {t("certTitle")}
            </SectionTitle>
          </div>
          <CertGrid items={certItems} />
        </div>
      </section>
    </>
  );
}
