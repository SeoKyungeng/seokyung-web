import { getTranslations, getLocale } from "next-intl/server";
import { SectionLabel } from "@/components/common/SectionLabel";
import companyData from "@/data/company.json";

interface InfoRowProps {
  label: string;
  value: string;
  mono?: boolean;
  isLast?: boolean;
}

function InfoRow({ label, value, mono = false, isLast = false }: InfoRowProps) {
  return (
    <div className={`py-5 ${isLast ? "" : "border-b border-smoke"}`}>
      <dt className="mb-1 text-[13px] uppercase tracking-[0.1em] text-gray-500">{label}</dt>
      <dd className={`text-gray-950 ${mono ? "font-mono text-sm" : "text-base leading-relaxed"}`}>
        {value}
      </dd>
    </div>
  );
}

export async function CompanyInfo() {
  const t = await getTranslations("pages.contact");
  const locale = (await getLocale()) as "ko" | "en";

  const address =
    locale === "ko" ? companyData.address.ko : companyData.address.en;

  return (
    <div>
      <SectionLabel>{t("infoLabel")}</SectionLabel>

      <dl className="mt-8">
        <InfoRow label={t("addressLabel")} value={address} />
        <InfoRow label={t("phoneLabel")} value={companyData.phone} mono />
        <InfoRow label={t("faxLabel")} value={companyData.fax} mono />
        <InfoRow label={t("emailLabel")} value={companyData.email} mono isLast />
      </dl>
    </div>
  );
}
