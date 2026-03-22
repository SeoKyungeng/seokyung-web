"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { ToastContainer, type ToastItem, type ToastType } from "@/components/common/Toast";

interface ToastContext {
  toast: (type: ToastType, message: string) => void;
}

const ToastCtx = createContext<ToastContext | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (type: ToastType, message: string) => {
      const id = String(++idRef.current);
      setItems((prev) => [...prev, { id, type, message }]);
      setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  return (
    <ToastCtx value={{ toast }}>
      {children}
      <ToastContainer items={items} onDismiss={dismiss} />
    </ToastCtx>
  );
}
