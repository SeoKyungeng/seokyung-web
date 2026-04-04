import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { EquipmentPreview } from "@/components/home/EquipmentPreview";
import { ProductsHighlight } from "@/components/home/ProductsHighlight";
import statsData from "@/data/stats.json";
import equipmentRaw from "@/data/equipment.json";
import clientsData from "@/data/clients.json";
import type { EquipmentItem } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: { absolute: t("title") },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: "/ko", en: "/en" },
    },
  };
}

export default async function HomePage() {
  const locale = (await getLocale()) as "ko" | "en";
  const t = await getTranslations("pages.home");

  const allEquipment: EquipmentItem[] = [
    ...equipmentRaw.cnc.map((item) => ({ ...item, type: "cnc" as const })),
    ...equipmentRaw.mct.map((item) => ({ ...item, type: "mct" as const })),
  ];

  const clients = clientsData.clients.map((c) => ({
    id: c.id,
    name: c.name[locale],
    logo: c.logo,
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
      <ClientsMarquee
        clientsLabel={t("clientsLabel")}
        clientsTitle={t("clientsTitle")}
        clients={clients}
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
      />
    </>
  );
}
