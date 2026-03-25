interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
}

const variantStyles = {
  light: { text: "text-gray-500", dot: "bg-primary-400" },
  dark: { text: "text-white/60", dot: "bg-primary-300" },
};

export function SectionLabel({ children, variant = "light" }: SectionLabelProps) {
  const styles = variantStyles[variant];

  return (
    <span className={`inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.15em] ${styles.text}`}>
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${styles.dot}`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
