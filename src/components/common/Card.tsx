interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-steel bg-transparent transition-[border-color,transform] duration-250 hover:-translate-y-1 hover:border-cyan-400 ${className}`}
    >
      {children}
    </div>
  );
}
