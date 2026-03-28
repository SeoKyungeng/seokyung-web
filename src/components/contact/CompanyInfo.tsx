import { getTranslations, getLocale } from "next-intl/server";
import { SectionLabel } from "@/components/common/SectionLabel";
import companyData from "@/data/company.json";

interface InfoRowProps {
  label: string;
  value: string;
  href?: string;
  mono?: boolean;
  isLast?: boolean;
}

function InfoRow({ label, value, href, mono = false, isLast = false }: InfoRowProps) {
  return (
    <div className={`py-5 ${isLast ? "" : "border-b border-gray-200"}`}>
      <dt className="mb-2 text-[13px] uppercase tracking-[0.1em] text-gray-500">{label}</dt>
      <dd className={`text-gray-950 ${mono ? "font-mono text-sm tracking-wider" : "text-base leading-relaxed"}`}>
        {href ? (
          <a href={href} className="transition-colors hover:text-primary-400">
            {value}
          </a>
        ) : (
          value
        )}
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
    <div className="rounded-2xl border border-gray-100 bg-smoke/50 p-6 md:p-8">
      <SectionLabel>{t("infoLabel")}</SectionLabel>

      <dl className="mt-8">
        <InfoRow label={t("addressLabel")} value={address} />
        <InfoRow label={t("phoneLabel")} value={companyData.phone} href={`tel:${companyData.phone}`} mono />
        <InfoRow label={t("faxLabel")} value={companyData.fax} mono />
        <InfoRow label={t("emailLabel")} value={companyData.email} href={`mailto:${companyData.email}`} mono isLast />
      </dl>
    </div>
  );
}
