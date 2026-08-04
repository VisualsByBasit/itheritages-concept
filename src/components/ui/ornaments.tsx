import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Decorative background flourishes. All four are purely ornamental: aria-hidden,
 * non-interactive, and pinned well below content in both stacking order and
 * contrast. They are applied selectively rather than to every section, so the
 * page reads as illustrated in places rather than uniformly patterned.
 *
 * Colour weighting follows PROJECT_BRIEF.md §3 — blue leads, lime is the clear
 * second voice, violet is rare.
 */

type Tone = "blue" | "lime" | "violet";

const TONE_CLASS: Record<Tone, string> = {
  blue: "text-primary",
  lime: "text-success",
  violet: "text-accent-quaternary",
};

/** Sparse dot field, echoing the Process isometric's rule grid at lower weight. */
export function DotGrid({
  className,
  tone = "blue",
  gap = 18,
  origin = "0% 0%",
  opacity = 0.16,
}: {
  className?: string;
  tone?: Tone;
  gap?: number;
  /** Where the fade-out mask is centred, e.g. "100% 0%" for a top-right corner. */
  origin?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "ornament-dotgrid pointer-events-none absolute",
        TONE_CLASS[tone],
        className
      )}
      style={
        {
          "--dot-gap": `${gap}px`,
          "--dot-origin": origin,
          opacity,
        } as CSSProperties
      }
    />
  );
}

/**
 * Loose "sketch" strokes — deliberately open curves that read as drawn marks
 * rather than as rules or dividers.
 */
const SKETCHES = {
  arc: "M4 96 C 40 96, 62 62, 68 22 M18 98 C 54 96, 78 58, 84 8",
  swoop: "M2 20 C 46 4, 74 34, 118 16 M6 34 C 50 18, 78 48, 122 30",
  corner: "M2 74 C 2 34, 34 2, 74 2 M2 96 C 2 40, 40 2, 96 2",
} as const;

export function SketchLines({
  variant = "arc",
  tone = "blue",
  className,
  opacity = 0.28,
}: {
  variant?: keyof typeof SKETCHES;
  tone?: Tone;
  className?: string;
  opacity?: number;
}) {
  const box = variant === "swoop" ? "0 0 124 44" : "0 0 100 100";

  return (
    <svg
      aria-hidden="true"
      viewBox={box}
      fill="none"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute", TONE_CLASS[tone], className)}
      style={{ opacity }}
    >
      <path
        d={SKETCHES[variant]}
        stroke="currentColor"
        strokeWidth={0.9}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Soft diagonal stripes, used sparingly behind a CTA or at a section seam.
 * Blue-led by default; the violet pairing is reserved for rare moments.
 */
export function GradientStripes({
  className,
  pair = "blue-lime",
  opacity = 0.5,
}: {
  className?: string;
  pair?: "blue-lime" | "blue-violet";
  opacity?: number;
}) {
  const [from, to] =
    pair === "blue-violet"
      ? ["rgba(7,157,251,0.14)", "rgba(83,51,170,0.10)"]
      : ["rgba(7,157,251,0.14)", "rgba(134,198,12,0.10)"];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute overflow-hidden", className)}
      style={{ opacity }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(115deg, ${from} 0px, ${from} 2px, transparent 2px, transparent 16px, ${to} 16px, ${to} 18px, transparent 18px, transparent 34px)`,
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 25%, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 25%, #000 70%, transparent 100%)",
        }}
      />
    </div>
  );
}

/**
 * A handful of drifting dots — the meteor field's DNA at a fraction of the
 * density, so hero-adjacent sections feel related without repeating the effect.
 * Positions are hand-set to stay deterministic across server and client.
 */
const DOTS = [
  { top: "18%", left: "6%", size: 4, dx: 6, dy: -9, duration: 12, delay: -2, opacity: 0.4 },
  { top: "62%", left: "13%", size: 3, dx: -5, dy: 7, duration: 15, delay: -6, opacity: 0.32 },
  { top: "34%", left: "88%", size: 5, dx: -7, dy: -6, duration: 13.5, delay: -9, opacity: 0.28 },
  { top: "76%", left: "79%", size: 3, dx: 4, dy: 8, duration: 17, delay: -4, opacity: 0.36 },
  { top: "12%", left: "68%", size: 2.5, dx: 5, dy: 6, duration: 14, delay: -11, opacity: 0.3 },
];

export function FloatingDots({
  className,
  tone = "blue",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        TONE_CLASS[tone],
        className
      )}
    >
      {DOTS.map((dot, index) => (
        <span
          key={index}
          className="ornament-dot"
          style={
            {
              top: dot.top,
              left: dot.left,
              height: `${dot.size}px`,
              width: `${dot.size}px`,
              "--dx": `${dot.dx}px`,
              "--dy": `${dot.dy}px`,
              "--dot-duration": `${dot.duration}s`,
              "--dot-delay": `${dot.delay}s`,
              "--dot-opacity": dot.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
