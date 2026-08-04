"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Perspective tilt that follows the cursor across the card, layered on top of
 * the card's own hover lift and capability reveal.
 *
 * Pointer position is tracked as motion values so the tilt never re-renders
 * React — it writes straight to the transform on the compositor.
 */
export function TiltCard({
  children,
  maxTilt = 7,
  className,
}: {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [maxTilt, -maxTilt]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-maxTilt, maxTilt]), SPRING);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div ref={ref} className={className} style={{ perspective: 900 }}>
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
