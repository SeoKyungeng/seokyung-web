"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutRouterContext,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const segment = useSelectedLayoutSegment();

  const [frozenContext] = useState(context);
  const [prevSegment, setPrevSegment] = useState(segment);

  const changed = segment !== prevSegment;

  if (changed) {
    setPrevSegment(segment);
  }

  return (
    <LayoutRouterContext.Provider value={changed ? frozenContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

export function LayoutTransition({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment}
        initial={{ opacity: 0, ...(reducedMotion ? {} : { filter: "blur(12px)" }) }}
        animate={{ opacity: 1, ...(reducedMotion ? {} : { filter: "blur(0px)" }) }}
        exit={{ opacity: 0, ...(reducedMotion ? {} : { filter: "blur(6px)" }) }}
        transition={
          reducedMotion
            ? { duration: 0.15 }
            : { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        }
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
