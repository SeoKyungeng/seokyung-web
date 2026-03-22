import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { EquipmentHeader } from "@/components/equipment/EquipmentHeader";
import { EquipmentStickyList } from "@/components/equipment/EquipmentStickyList";
import equipmentRaw from "@/data/equipment.json";

type Locale = "ko" | "en";

export default async function EquipmentPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.equipment");

  const allItems = [
    ...equipmentRaw.cnc.map((item) => ({ ...item, type: "cnc" as const })),
    ...equipmentRaw.mct.map((item) => ({ ...item, type: "mct" as const })),
    ...equipmentRaw.lathe.map((item) => ({ ...item, type: "lathe" as const })),
    ...equipmentRaw.other.map((item) => ({ ...item, type: "other" as const })),
  ];

  const items = allItems.map((item) => ({
    id: item.id,
    type: item.type,
    name: item.name[locale],
    model: item.model,
    manufacturer: item.manufacturer[locale],
    quantity: item.quantity,
    photo: item.photo,
    specs: item.specs.map((s) => ({ label: s.label[locale], value: s.value })),
  }));

  const cncTotal = equipmentRaw.cnc.reduce((sum, i) => sum + i.quantity, 0);
  const mctTotal = equipmentRaw.mct.reduce((sum, i) => sum + i.quantity, 0);
  const latheTotal = equipmentRaw.lathe.reduce(
    (sum, i) => sum + i.quantity,
    0
  );
  const otherTotal = equipmentRaw.other.reduce(
    (sum, i) => sum + i.quantity,
    0
  );
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
