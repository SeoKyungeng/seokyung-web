import { getLocale, getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/common/PageHeader";
import { ProductGallery } from "@/components/products/ProductGallery";
import productsRaw from "@/data/products.json";

export default async function ProductsPage() {
  const locale = (await getLocale()) as "ko" | "en";
  const t = await getTranslations("pages.products");

  const items = productsRaw.items.map((item) => ({
    id: item.id,
    image: item.image,
    width: item.width,
    height: item.height,
    alt: item.alt[locale],
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
