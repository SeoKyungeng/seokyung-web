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

const base =
  "inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";
const variants = {
  solid: "bg-primary-400 text-white hover:bg-primary-300 hover:shadow-[0_0_20px_rgba(20,71,230,0.3)]",
  outline: "border border-primary-400 text-primary-400 hover:bg-primary-400/10",
  dark: "bg-midnight text-white hover:bg-midnight/80",
};

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
        {children}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
