"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { ImageLightbox } from "@/components/common/ImageLightbox";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_SPRING, EASE_SMOOTH } from "@/lib/motion";

interface ProductItem {
  id: string;
  image: string;
  alt: string;
  placeholderHeight: number;
}

interface ProductGalleryProps {
  items: ProductItem[];
}

/* ── 모션 변수 ── */
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [...EASE_SPRING] as [number, number, number, number] },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [...EASE_SMOOTH] as [number, number, number, number] },
  },
};

/**
 * 이미지 onLoad 시 직접 DOM style을 변경하여 blur-up 효과를 적용한다.
 */
function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  img.style.filter = "blur(0)";
  img.style.opacity = "1";
}

/* ── GalleryItem ── */
interface GalleryItemProps {
  item: ProductItem;
  reducedMotion: boolean;
  onClick: () => void;
}

function GalleryItem({ item, reducedMotion, onClick }: GalleryItemProps) {
  const { ref, isInView } = useAnimateInView();
  const [imgError, setImgError] = useState(false);

  const content = (
    <button
      type="button"
      aria-label={item.alt}
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
    >
      <div
        className="relative w-full bg-smoke transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        style={{ height: `${item.placeholderHeight}px`, maxHeight: "300px" }}
      >
        {imgError ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-smoke">
            <ImageOff className="h-8 w-8 text-gray-300" strokeWidth={1} aria-hidden="true" />
            <span className="text-xs text-gray-400">{item.alt}</span>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 animate-pulse bg-linear-to-br from-smoke to-gray-100" />
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover blur-[20px] opacity-0 transition-[filter,opacity] duration-500"
              onLoad={handleImageLoad}
              onError={() => setImgError(true)}
            />
          </>
        )}
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-midnight/40 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

      {/* Hover 콘텐츠 */}
      <div className="pointer-events-none absolute bottom-4 left-4 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
        <span className="text-sm font-medium text-white drop-shadow-sm">
          {item.alt}
        </span>
      </div>
    </button>
  );

  if (reducedMotion) {
    return (
      <div ref={ref} className="mb-3 break-inside-avoid">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="mb-3 break-inside-avoid"
      variants={staggerItem}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        variants={imageReveal}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}

/* ── ProductGallery ── */
export function ProductGallery({ items }: ProductGalleryProps) {
  const reducedMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = items.map((item) => ({
    src: item.image,
    alt: item.alt,
    width: 800,
    height: item.placeholderHeight * 3,
  }));

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20 lg:px-20">
        <div className="columns-1 gap-2 sm:columns-2 lg:columns-3">
          {items.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              reducedMotion={reducedMotion}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
