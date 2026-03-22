import { getLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { EquipmentPreview } from "@/components/home/EquipmentPreview";
import { ProductsHighlight } from "@/components/home/ProductsHighlight";
import { CTABand } from "@/components/home/CTABand";
import statsData from "@/data/stats.json";
import equipmentRaw from "@/data/equipment.json";
import productsData from "@/data/products.json";
import type { EquipmentItem } from "@/lib/types";

export default async function HomePage() {
  const locale = (await getLocale()) as "ko" | "en";
  const t = await getTranslations("pages.home");

  const allEquipment: EquipmentItem[] = [
    ...equipmentRaw.cnc.map((item) => ({ ...item, type: "cnc" as const })),
    ...equipmentRaw.mct.map((item) => ({ ...item, type: "mct" as const })),
  ];

  // 제품 카테고리 라벨 (locale에 맞게)
  const categoryItems = productsData.categories.map((cat) => ({
    category: cat.key,
    label: cat.label[locale],
  }));

  return (
    <>
      <HeroSection
        heroTitle={t("heroTitle")}
        heroSubtitle={t("heroSubtitle")}
        heroCta={t("heroCta")}
        heroCtaSecondary={t("heroCtaSecondary")}
        scrollIndicator={t("scrollIndicator")}
      />
      <StatsSection
        statsLabel={t("statsLabel")}
        statsTitle={t("statsTitle")}
        statsSince={t("statsSince")}
        statsSinceDesc={t("statsSinceDesc")}
        stats={statsData.items}
        locale={locale}
      />
      <EquipmentPreview
        equipmentLabel={t("equipmentLabel")}
        equipmentTitle={t("equipmentTitle")}
        equipmentViewAll={t("equipmentViewAll")}
        items={allEquipment}
        locale={locale}
      />
      <ProductsHighlight
        productsLabel={t("productsLabel")}
        productsTitle={t("productsTitle")}
        productsViewAll={t("productsViewAll")}
        categories={categoryItems}
      />
      <CTABand
        ctaTitle={t("ctaTitle")}
        ctaSubtitle={t("ctaSubtitle")}
        ctaButton={t("ctaButton")}
      />
    </>
  );
}
