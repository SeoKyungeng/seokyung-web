import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { CeoSection } from "@/components/about/CeoSection";
import { PhilosophySection } from "@/components/about/PhilosophySection";
import { OrgChart } from "@/components/about/OrgChart";
import { ClientsSection } from "@/components/about/ClientsSection";
import ceoData from "@/data/ceo.json";
import organizationData from "@/data/organization.json";
import philosophyData from "@/data/philosophy.json";
import clientsData from "@/data/clients.json";
import type { CEO, Department, PhilosophyValue, Client } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/about`,
      languages: { ko: "/ko/about", en: "/en/about" },
    },
  };
}

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

      <PhilosophySection
        slogan={philosophyData.slogan[locale]}
        values={philosophyData.values as PhilosophyValue[]}
        locale={locale}
        label={t("philosophyLabel")}
        title={t("philosophyTitle")}
      />

      <OrgChart
        departments={organizationData.departments as Department[]}
        locale={locale}
        label={t("orgLabel")}
        title={t("orgTitle")}
      />

      <ClientsSection
        clients={clientsData.clients as Client[]}
        locale={locale}
        label={t("clientsLabel")}
        title={t("clientsTitle")}
        subtitle={t("clientsSubtitle")}
      />
    </>
  );
}
