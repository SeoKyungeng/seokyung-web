"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageLightbox } from "@/components/common/ImageLightbox";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CertItem {
  id: string;
  name: string;
  image: string;
}

interface CertGridProps {
  items: CertItem[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const LIGHTBOX_SIZE = { width: 800, height: 1120 };

export function CertGrid({ items }: CertGridProps) {
  const reducedMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages = items.map((item) => ({
    src: item.image,
    alt: item.name,
    width: LIGHTBOX_SIZE.width,
    height: LIGHTBOX_SIZE.height,
  }));

  const handleOpen = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const gridContent = items.map((item, index) => (
    <button
      key={item.id}
      onClick={() => handleOpen(index)}
      className="group flex flex-col gap-3 text-left"
      aria-label={`${item.name} 인증서 확대 보기`}
    >
      <div className="relative aspect-[5/7] w-full overflow-hidden rounded-lg bg-smoke">
        <Image
          src={item.image}
          alt={item.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, 25vw"
          onError={(e) => {
            // 이미지 로드 실패 시 placeholder 표시
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* placeholder — 이미지 없을 때 표시 */}
        <div className="absolute inset-0 flex items-center justify-center bg-smoke">
          <span className="text-sm font-medium text-gray-500">{item.name}</span>
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-lg shadow-none transition-shadow duration-300 group-hover:shadow-lg" />
      </div>
      <p className="text-center text-sm font-medium text-gray-950">
        {item.name}
      </p>
    </button>
  ));

  return (
    <>
      {reducedMotion ? (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {gridContent}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          {items.map((item, index) => (
            <motion.div key={item.id} variants={itemVariants}>
              <button
                onClick={() => handleOpen(index)}
                className="group flex w-full flex-col gap-3 text-left"
                aria-label={`${item.name} 인증서 확대 보기`}
              >
                <div className="relative aspect-[5/7] w-full overflow-hidden rounded-lg bg-smoke">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-smoke">
                    <span className="text-sm font-medium text-gray-500">
                      {item.name}
                    </span>
                  </div>
                  <div className="absolute inset-0 overflow-hidden rounded-lg shadow-none transition-shadow duration-300 group-hover:shadow-lg" />
                </div>
                <p className="text-center text-sm font-medium text-gray-950">
                  {item.name}
                </p>
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={handleClose}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </>
  );
}
