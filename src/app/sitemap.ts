import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

const pages = [
  "",
  "/about",
  "/equipment",
  "/products",
  "/sustainability",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      changeFrequency: (page === "" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
          "x-default": `${SITE_URL}/${routing.defaultLocale}${page}`,
        },
      },
    }))
  );
}
