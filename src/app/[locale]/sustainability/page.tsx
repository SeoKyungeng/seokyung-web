import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { ESGIntro } from "@/components/sustainability/ESGIntro";
import { ESGSection } from "@/components/sustainability/ESGSection";
import sustainabilityData from "@/data/sustainability.json";
import type { ESGPolicy } from "@/lib/types";

type Locale = "ko" | "en";

export default async function SustainabilityPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.sustainability");

  const esgItems = (["e", "s", "g"] as const).map((key) => {
    const data = sustainabilityData.esg[key];
    return {
      key: data.key as ESGPolicy["key"],
      title: data.title[locale],
      subtitle: data.subtitle[locale],
      description: data.description[locale],
      icon: data.icon,
      image: data.image,
      items: data.items.map((item) => item[locale]),
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
        vision={sustainabilityData.intro.vision[locale]}
        description={sustainabilityData.intro.description[locale]}
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
