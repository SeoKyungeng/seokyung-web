import { getLocale, getTranslations } from "next-intl/server";
import equipmentRaw from "@/data/equipment.json";
import { EquipmentHeader } from "@/components/equipment/EquipmentHeader";
import { EquipmentShowcase } from "@/components/equipment/EquipmentShowcase";
import type { EquipmentItem } from "@/lib/types";

const cncItems: EquipmentItem[] = equipmentRaw.cnc.map((item) => ({
  ...item,
  type: "cnc" as const,
}));

const mctItems: EquipmentItem[] = equipmentRaw.mct.map((item) => ({
  ...item,
  type: "mct" as const,
}));

export default async function EquipmentPage() {
  const locale = (await getLocale()) as "ko" | "en";
  const t = await getTranslations("pages.equipment");

  const cncTotal = cncItems.reduce((sum, item) => sum + item.quantity, 0);
  const mctTotal = mctItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cncTotal + mctTotal;

  const stats = [
    { label: t("totalEquipment"), value: total },
    { label: t("cncLabel"), value: cncTotal },
    { label: t("mctLabel"), value: mctTotal },
  ];

  return (
    <>
      <EquipmentHeader
        title={t("title")}
        subtitle={t("subtitle")}
        stats={stats}
      />

      <EquipmentShowcase
        items={cncItems}
        label={t("cncLabel")}
        locale={locale}
        specManufacturer={t("specManufacturer")}
        specQuantity={t("specQuantity")}
        specUnit={t("specUnit")}
        bgClass="bg-white"
      />

      <EquipmentShowcase
        items={mctItems}
        label={t("mctLabel")}
        locale={locale}
        specManufacturer={t("specManufacturer")}
        specQuantity={t("specQuantity")}
        specUnit={t("specUnit")}
        bgClass="bg-smoke"
      />
    </>
  );
}
