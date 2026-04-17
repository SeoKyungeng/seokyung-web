import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { CeoSection } from "@/components/about/CeoSection";
import { PhilosophySection } from "@/components/about/PhilosophySection";
import { OrgChart } from "@/components/about/OrgChart";
import { ClientsSection } from "@/components/about/ClientsSection";
import {
  getCeo,
  getClientList,
  getOrganization,
  getPhilosophy,
} from "@/lib/sanity/fetchers";
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

  const [ceo, philosophy, organization, clients] = await Promise.all([
    getCeo(),
    getPhilosophy(),
    getOrganization(),
    getClientList(),
  ]);

  if (!ceo || !philosophy || !organization) {
    throw new Error("About 페이지 Sanity 데이터 누락");
  }

  const clientItems: Client[] = clients.map((c) => ({
    id: c.id,
    name: c.name,
    logo: c.logo,
  }));

  return (
    <>
      <PageHeader
        label="ABOUT US"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <CeoSection
        ceo={ceo as CEO}
        locale={locale}
        label={t("ceoLabel")}
      />

      <PhilosophySection
        slogan={philosophy.slogan[locale]}
        values={philosophy.values as PhilosophyValue[]}
        locale={locale}
        label={t("philosophyLabel")}
        title={t("philosophyTitle")}
      />

      <OrgChart
        departments={organization.departments as Department[]}
        locale={locale}
        label={t("orgLabel")}
        title={t("orgTitle")}
      />

      <ClientsSection
        clients={clientItems}
        locale={locale}
        label={t("clientsLabel")}
        title={t("clientsTitle")}
        subtitle={t("clientsSubtitle")}
      />
    </>
  );
}
