"use client";

import { motion, type Variants } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type AnimatedHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
  /** Seconds between each word. */
  stagger?: number;
};

const container = (stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
});

const word: Variants = {
  hidden: { opacity: 0, y: "0.45em", rotateX: -35 },
  show: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { type: "spring", stiffness: 260, damping: 26, mass: 0.7 },
  },
};

/**
 * Per-word reveal: each word rises and rotates up into place on a stagger, so
 * headings arrive as a line of type being set rather than a single flat fade.
 */
export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  id,
  stagger = 0.055,
}: AnimatedHeadingProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      id={id}
      className={className}
      style={{ perspective: 600 }}
      variants={container(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      {words.map((value, index) => (
        <motion.span
          key={`${value}-${index}`}
          variants={word}
          className="inline-block will-change-transform"
        >
          {value}
          {index < words.length - 1 ? " " : null}
        </motion.span>
      ))}
    </MotionTag>
  );
}
