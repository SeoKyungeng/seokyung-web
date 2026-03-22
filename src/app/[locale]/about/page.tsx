import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { CeoSection } from "@/components/about/CeoSection";
import { OrgChart } from "@/components/about/OrgChart";
import ceoData from "@/data/ceo.json";
import organizationData from "@/data/organization.json";
import type { CEO, Department } from "@/lib/types";

export default async function AboutPage() {
  const locale = (await getLocale()) as "ko" | "en";
  const t = await getTranslations("pages.about");

  return (
    <>
      <PageHeader
        label="ABOUT US"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <CeoSection
        ceo={ceoData as CEO}
        locale={locale}
        label={t("ceoLabel")}
      />

      <OrgChart
        departments={organizationData.departments as Department[]}
        locale={locale}
        label={t("orgLabel")}
        title={t("orgTitle")}
      />
    </>
  );
}
