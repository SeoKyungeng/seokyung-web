import { SectionLabel } from "./SectionLabel";
import { GlowBlob } from "./GlowBlob";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative flex h-[70vh] items-center justify-center overflow-hidden bg-midnight text-white">
      <GlowBlob className="-bottom-32 -left-32" size={500} />
      <div className="relative z-10 text-center">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
