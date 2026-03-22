"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type ToastType = "success" | "error" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

const borderColors: Record<ToastType, string> = {
  success: "border-l-primary-400",
  error: "border-l-red-400",
  warning: "border-l-amber-400",
};

interface ToastProps {
  items: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ items, onDismiss }: ToastProps) {
  const visible = items.slice(-3);

  return (
    <div
      className="fixed top-4 right-4 z-[60] flex flex-col gap-2 max-md:right-0 max-md:left-0 max-md:items-center"
      aria-live="polite"
    >
      <AnimatePresence>
        {visible.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.3 }}
            className={`flex w-full max-w-[400px] items-center gap-3 rounded-lg border-l-4 bg-white px-4 py-3 shadow-lg max-md:mx-4 ${borderColors[toast.type]}`}
            role="alert"
          >
            <p className="flex-1 text-sm text-gray-700">{toast.message}</p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-500 transition-colors hover:text-gray-700"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
