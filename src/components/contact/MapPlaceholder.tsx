import { getTranslations } from "next-intl/server";
import { MapPin, ExternalLink } from "lucide-react";
import companyData from "@/data/company.json";

export async function MapPlaceholder() {
  const t = await getTranslations("pages.contact");

  const { lat, lng } = companyData.coordinates;
  const mapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(companyData.address.ko)}?c=${lng},${lat},15,0,0,0,dh`;

  return (
    <section aria-label="지도" className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent"
        aria-hidden="true"
      />

      <div className="flex h-[300px] w-full items-center justify-center bg-smoke md:h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <MapPin className="h-10 w-10 text-gray-400" aria-hidden="true" />
          <p className="text-sm text-gray-500">{companyData.address.ko}</p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary-400 hover:text-primary-500"
          >
            {t("mapFallback")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
