import { getTranslations } from "next-intl/server";
import { MapPin, ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { getCompanyInfo } from "@/lib/sanity/fetchers";

export async function MapPlaceholder() {
  const [t, company] = await Promise.all([
    getTranslations("pages.contact"),
    getCompanyInfo(),
  ]);

  if (!company) return null;

  const { lat, lng } = company.coordinates;
  const mapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(company.address.ko)}?c=${lng},${lat},15,0,0,0,dh`;

  return (
    <section aria-label="지도" className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent"
        aria-hidden="true"
      />

      <div className="flex h-[300px] w-full flex-col items-center justify-center gap-5 bg-smoke md:h-[400px]">
        <SectionLabel>{t("mapTitle")}</SectionLabel>
        <MapPin className="h-12 w-12 text-primary-400" aria-hidden="true" />
        <p className="text-base text-gray-600">{company.address.ko}</p>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary-400 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-300 hover:shadow-lg"
        >
          {t("mapFallback")}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
