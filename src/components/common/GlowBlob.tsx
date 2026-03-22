interface GlowBlobProps {
  className?: string;
  size?: number;
}

export function GlowBlob({ className = "", size = 400 }: GlowBlobProps) {
  return (
    <div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(ellipse, var(--color-primary-400) 0%, transparent 70%)",
        opacity: 0.15,
      }}
      aria-hidden="true"
    />
  );
}
