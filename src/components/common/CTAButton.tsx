import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "dark";
  size?: "lg" | "sm";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const sizes = {
  lg: "px-8 py-4 text-lg",
  sm: "px-6 py-2 text-sm",
};

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const base = `group/cta inline-flex items-center rounded-full font-semibold overflow-hidden transition-all duration-500 ${EASE} hover:scale-[1.04] active:scale-[0.97]`;
const variants = {
  solid: "bg-primary-400 text-white hover:bg-primary-300 hover:shadow-[0_0_24px_rgba(20,71,230,0.35)]",
  outline: "border border-primary-400 text-primary-400 hover:bg-primary-400/10",
  dark: "bg-midnight text-white hover:bg-midnight/80",
};

function ButtonContent({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center">
      {/* 왼쪽 화살표 wrapper — w-0 → w-4, mr-0 → mr-2 */}
      <span className={`inline-flex items-center w-0 mr-0 opacity-0 group-hover/cta:w-4 group-hover/cta:mr-2 group-hover/cta:opacity-100 transition-all duration-500 ${EASE}`}>
        <ArrowRight className={`h-4 w-4 shrink-0 -translate-x-8 group-hover/cta:translate-x-0 transition-transform duration-700 ${EASE}`} aria-hidden="true" />
      </span>

      <span>{children}</span>

      {/* 오른쪽 화살표 wrapper — w-4 → w-0, ml-2 → ml-0 */}
      <span className={`inline-flex items-center w-4 ml-2 opacity-100 group-hover/cta:w-0 group-hover/cta:ml-0 group-hover/cta:opacity-0 transition-all duration-500 ${EASE}`}>
        <ArrowRight className={`h-4 w-4 shrink-0 group-hover/cta:translate-x-8 transition-transform duration-700 ${EASE}`} aria-hidden="true" />
      </span>
    </span>
  );
}

export function CTAButton({
  children,
  href,
  variant = "solid",
  size = "lg",
  onClick,
  className = "",
  type = "button",
}: CTAButtonProps) {
  const styles = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        <ButtonContent>{children}</ButtonContent>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      <ButtonContent>{children}</ButtonContent>
    </button>
  );
}
