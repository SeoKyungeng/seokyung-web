import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { ProductGallery } from "@/components/products/ProductGallery";
import productsRaw from "@/data/products.json";

function getPlaceholderHeight(id: string): number {
  const heights = [150, 180, 200, 220, 250, 280, 300];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) & 0xffff;
  }
  return heights[hash % heights.length];
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const locale = (await getLocale()) as "ko" | "en";
  const t = await getTranslations("pages.products");
  const { category } = await searchParams;

  const items = productsRaw.items.map((item) => ({
    id: item.id,
    category: item.category,
    image: item.image,
    alt: item.alt[locale],
    placeholderHeight: getPlaceholderHeight(item.id),
  }));

  return (
    <>
      <PageHeader
        label="PRODUCTS"
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <ProductGallery items={items} initialCategory={category} />
    </>
  );
}
