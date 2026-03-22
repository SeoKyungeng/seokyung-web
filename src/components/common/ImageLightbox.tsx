"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface LightboxImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  // Focus trap + keyboard
  useEffect(() => {
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();

      if (e.key === "Tab") {
        const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  // Touch swipe
  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  }

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 확대 보기"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-midnight/90 backdrop-blur-sm"
      />

      {/* Close button */}
      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full p-2 text-white/70 transition-colors hover:text-white"
        aria-label="닫기"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Counter */}
      <p className="absolute top-4 left-4 z-10 text-sm text-white/60" aria-live="polite">
        {currentIndex + 1} / {images.length}
      </p>

      {/* Prev */}
      <button
        onClick={goPrev}
        disabled={!hasPrev}
        className="absolute left-4 z-10 rounded-full p-2 text-white/70 transition-colors hover:text-white disabled:invisible"
        aria-label="이전 이미지"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative z-10 max-h-[80vh] max-w-[90vw]"
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="max-h-[80vh] w-auto rounded object-contain"
            sizes="90vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={goNext}
        disabled={!hasNext}
        className="absolute right-4 z-10 rounded-full p-2 text-white/70 transition-colors hover:text-white disabled:invisible"
        aria-label="다음 이미지"
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  );
}
