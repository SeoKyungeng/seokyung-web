interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] text-gray-500">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-primary-400"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
