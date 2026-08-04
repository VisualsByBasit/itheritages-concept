"use client";

import { motion, useScroll, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Thin blue → lime bar pinned to the top of the viewport, filling as the page
 * scrolls. Kept for reduced-motion users because it reports position rather
 * than decorating — only the spring smoothing is dropped.
 */
export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reducedMotion ? scrollYProgress : smooth }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-linear-to-r from-primary via-primary to-success"
    />
  );
}
