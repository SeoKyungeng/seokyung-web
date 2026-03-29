"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function createLenisStore() {
  const listeners = new Set<() => void>();
  let instance: Lenis | null = null;

  return {
    get: () => instance,
    set: (lenis: Lenis | null) => {
      instance = lenis;
      listeners.forEach((l) => l());
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

type LenisStore = ReturnType<typeof createLenisStore>;

const LenisStoreContext = createContext<LenisStore | null>(null);

export function useLenis(): Lenis | null {
  const store = useContext(LenisStoreContext);
  return useSyncExternalStore(
    store?.subscribe ?? (() => () => {}),
    store?.get ?? (() => null),
    () => null,
  );
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(createLenisStore);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis();
    store.set(instance);

    instance.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      instance.destroy();
      store.set(null);
    };
  }, [reducedMotion, store]);

  return (
    <LenisStoreContext.Provider value={store}>
      {children}
    </LenisStoreContext.Provider>
  );
}
