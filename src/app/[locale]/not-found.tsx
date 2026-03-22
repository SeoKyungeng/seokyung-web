import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-midnight text-white">
      <span className="font-display text-[120px] font-bold leading-none text-white/10">
        404
      </span>
      <h2 className="mt-4 font-display text-2xl font-semibold">
        {t("title")}
      </h2>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary-400 px-8 py-3 font-semibold text-midnight transition-colors hover:bg-primary-300"
      >
        {t("backToHome")}
      </Link>
    </div>
  );
}
