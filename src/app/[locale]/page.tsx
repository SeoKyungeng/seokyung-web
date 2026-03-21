import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("pages.home");

  return (
    <main>
      <section className="flex min-h-screen items-center justify-center bg-midnight text-white">
        <h1 className="font-display text-5xl font-bold md:text-7xl">
          {t("heroText")}
        </h1>
      </section>
    </main>
  );
}
