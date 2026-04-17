import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { EquipmentPreview } from "@/components/home/EquipmentPreview";
import { ProductsHighlight } from "@/components/home/ProductsHighlight";
import {
  getClientList,
  getEquipmentList,
  getStats,
} from "@/lib/sanity/fetchers";
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

  const [stats, equipmentRaw, clientsRaw] = await Promise.all([
    getStats(),
    getEquipmentList(),
    getClientList(),
  ]);

  const allEquipment: EquipmentItem[] = equipmentRaw
    .filter((e) => e.type === "cnc" || e.type === "mct")
    .map((e) => ({
      id: e.id,
      type: e.type as "cnc" | "mct",
      name: e.name,
      model: e.model ?? "",
      manufacturer: e.manufacturer,
      quantity: e.quantity,
      photo: e.photo ?? "",
      specs: (e.specs ?? []).map((s) => ({ label: s.label, value: s.value })),
    }));

  const clients = clientsRaw.map((c) => ({
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
        stats={(stats?.items ?? []).map((s) => ({
          label: s.label,
          value: s.value ?? undefined,
          text: s.text ?? undefined,
          prefix: s.prefix ?? undefined,
          suffix: s.suffix ?? undefined,
        }))}
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
