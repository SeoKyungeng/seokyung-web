import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("pages.about");

  return (
    <main>
      <section className="flex min-h-screen items-center justify-center bg-midnight text-white">
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold">{t("title")}</h1>
          <p className="mt-4 text-white/60">{t("subtitle")}</p>
        </div>
      </section>
    </main>
  );
}
