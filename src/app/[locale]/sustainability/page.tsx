import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { ESGIntro } from "@/components/sustainability/ESGIntro";
import { ESGSection } from "@/components/sustainability/ESGSection";
import { getSustainability } from "@/lib/sanity/fetchers";
import type { ESGPolicy } from "@/lib/types";

type Locale = "ko" | "en";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.sustainability" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/sustainability`,
      languages: { ko: "/ko/sustainability", en: "/en/sustainability" },
    },
  };
}

export default async function SustainabilityPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.sustainability");

  const data = await getSustainability();
  if (!data) throw new Error("Sustainability 데이터 누락");

  const esgItems = (["e", "s", "g"] as const).map((key) => {
    const entry = data.esg[key];
    return {
      key: entry.key as ESGPolicy["key"],
      title: entry.title[locale],
      subtitle: entry.subtitle[locale],
      description: entry.description[locale],
      icon: entry.icon,
      image: entry.image ?? "",
      items: entry.items.map((item) => item[locale]),
    };
  });

  return (
    <>
      <PageHeader
        label="SUSTAINABILITY"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <ESGIntro
        vision={data.intro.vision[locale]}
        description={data.intro.description[locale]}
        label={t("introLabel")}
      />

      <ESGSection
        items={esgItems}
        label={t("esgLabel")}
        title={t("esgTitle")}
      />
    </>
  );
}
