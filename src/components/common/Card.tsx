interface CardProps {
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
}

const variantStyles = {
  dark: "border-steel bg-transparent hover:border-primary-400",
  light: "border-gray-200 bg-white hover:border-primary-400 hover:shadow-md",
};

export function Card({ children, variant = "dark", className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border transition-[border-color,transform,box-shadow] duration-250 hover:-translate-y-1 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
