import { EASE_SPRING_CSS } from "@/lib/motion";

interface CardProps {
  children: React.ReactNode;
  variant?: "dark" | "light" | "glass";
  className?: string;
}

const variantStyles = {
  dark: "border-steel ring-1 ring-white/10 bg-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] hover:border-primary-400 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_0_15px_rgba(20,71,230,0.15)]",
  light: "border-gray-200 bg-white hover:border-primary-400 hover:shadow-md",
  glass: "border-white/10 ring-1 ring-white/10 bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-sm hover:border-primary-400/50 hover:bg-white/[0.07]",
};

export function Card({ children, variant = "dark", className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 ${variantStyles[variant]} ${className}`}
      style={{ transitionTimingFunction: EASE_SPRING_CSS }}
    >
      {children}
    </div>
  );
}
