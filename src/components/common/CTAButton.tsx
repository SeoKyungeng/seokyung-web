import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "solid" | "outline" | "dark";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

const base =
  "inline-flex items-center gap-2 rounded-full px-8 py-3 font-semibold transition-colors duration-200";
const variants = {
  solid: "bg-primary-400 text-white hover:bg-primary-300",
  outline: "border border-primary-400 text-primary-400 hover:bg-primary-400/10",
  dark: "bg-midnight text-white hover:bg-midnight/80",
};

export function CTAButton({
  children,
  href,
  variant = "solid",
  onClick,
  className = "",
  type = "button",
}: CTAButtonProps) {
  const styles = `${base} ${variants[variant]} ${className}`;

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
