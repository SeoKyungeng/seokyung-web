"use client";

import Image from "next/image";
import { useState } from "react";

interface BlurUpImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function BlurUpImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes,
}: BlurUpImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`transition-all duration-500 ${
          loaded ? "blur-0 scale-100" : "blur-[20px] scale-105"
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
