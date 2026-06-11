import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { EquipmentHeader } from "@/components/equipment/EquipmentHeader";
import { EquipmentStickyList } from "@/components/equipment/EquipmentStickyList";
import { getEquipmentList } from "@/lib/sanity/fetchers";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.equipment" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/equipment`,
      languages: { ko: "/ko/equipment", en: "/en/equipment", "x-default": "/ko/equipment" },
    },
  };
}

export default async function EquipmentPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.equipment");

  const raw = await getEquipmentList();

  const items = raw.map((item) => ({
    id: item.id ?? "",
    type: item.type ?? "other",
    name: item.name?.[locale] ?? "",
    model: item.model ?? "",
    manufacturer: item.manufacturer?.[locale] ?? "",
    quantity: item.quantity ?? 0,
    photo: item.photo ?? "",
    specs: (item.specs ?? []).map((s) => ({
      label: s?.label?.[locale] ?? "",
      value: s?.value ?? "",
    })),
  }));

  const totalBy = (type: string) =>
    raw
      .filter((i) => i.type === type)
      .reduce((sum, i) => sum + (i.quantity ?? 0), 0);

  const cncTotal = totalBy("cnc");
  const mctTotal = totalBy("mct");
  const latheTotal = totalBy("lathe");
  const otherTotal = totalBy("other");
  const total = cncTotal + mctTotal + latheTotal + otherTotal;

  const stats = [
    { label: t("totalEquipment"), value: total },
    { label: t("cncLabel"), value: cncTotal },
    { label: t("mctLabel"), value: mctTotal },
    { label: t("latheLabel"), value: latheTotal },
  ];

  return (
    <>
      <PageHeader
        label="EQUIPMENT"
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <EquipmentHeader stats={stats} />
      <EquipmentStickyList
        items={items}
        specUnit={t("specUnit")}
      />
    </>
  );
}
