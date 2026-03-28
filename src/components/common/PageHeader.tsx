import { SectionLabel } from "./SectionLabel";
import { GlowBlob } from "./GlowBlob";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative z-[35] flex h-[70vh] items-center justify-center overflow-hidden bg-midnight text-white">
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

      {/* Notch — 왼쪽 수평 bar + 오른쪽 SVG 커브 하강 */}
      <div
        className="absolute bottom-0 left-0 right-[33%] h-9 bg-white md:right-[40%] md:h-12"
        aria-hidden="true"
      >
        <svg
          className="absolute right-0 top-0 h-full translate-x-[99%]"
          viewBox="0 0 51 30"
          fill="white"
          preserveAspectRatio="none"
          style={{ width: "clamp(60px, 6vw, 100px)" }}
        >
          <path d="M0 0h3.565c3.212 0 6.293 1.264 8.565 3.513l23.207 22.974A12.175 12.175 0 0 0 43.902 30H51 0V0Z" />
        </svg>
      </div>
    </section>
  );
}
