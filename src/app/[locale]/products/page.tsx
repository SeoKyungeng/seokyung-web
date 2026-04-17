import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { ProductGallery } from "@/components/products/ProductGallery";
import { getProductList } from "@/lib/sanity/fetchers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.products" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/products`,
      languages: { ko: "/ko/products", en: "/en/products" },
    },
  };
}

export default async function ProductsPage() {
  const locale = (await getLocale()) as "ko" | "en";
  const t = await getTranslations("pages.products");

  const raw = await getProductList();

  const items = raw
    .filter((p) => p.image && p.width && p.height)
    .map((item) => ({
      id: item.id,
      image: item.image!,
      width: item.width!,
      height: item.height!,
      alt: item.alt?.[locale] ?? "",
    }));

  return (
    <>
      <PageHeader
        label="PRODUCTS"
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <ProductGallery items={items} />
    </>
  );
}
