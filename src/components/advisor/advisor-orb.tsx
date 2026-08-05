"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Three connected nodes — the same networking motif the hero and the
 * Enterprise Networking service module use. A chat bubble here would read as
 * a support widget, which is exactly what PROJECT_BRIEF.md §5 says this is not.
 */
export function AdvisorMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("relative h-6 w-6", className)}
    >
      <path
        d="M12 6.6 6.6 15.6M12 6.6l5.4 9M6.6 15.6h10.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="12" cy="6.6" r="2.1" fill="currentColor" />
      <circle cx="6.6" cy="15.6" r="1.8" fill="currentColor" />
      <circle cx="17.4" cy="15.6" r="1.8" fill="currentColor" />
    </svg>
  );
}

/**
 * The lit sphere, shared by the orb, the panel header and every advisor avatar
 * in the transcript so the widget reads as one object at three sizes.
 *
 * Depth comes from three stacked cues rather than a single gradient: an
 * off-centre highlight, an inset falloff on the shaded edge, and a discrete
 * specular blob. See `.advisor-sphere` in globals.css.
 */
export function AdvisorSphere({
  className,
  glyphClassName,
  bloom = false,
}: {
  className?: string;
  glyphClassName?: string;
  /** Adds the blurred outer glow. Reserved for the orb and the panel header. */
  bloom?: boolean;
}) {
  return (
    <span
      className={cn(
        "advisor-sphere relative inline-flex shrink-0 items-center justify-center rounded-full text-white",
        className
      )}
    >
      {bloom ? <span className="advisor-sphere__bloom" aria-hidden="true" /> : null}
      <span className="advisor-sphere__specular" aria-hidden="true" />
      <AdvisorMark className={glyphClassName} />
    </span>
  );
}

/**
 * Sparks drifting off the orb — the meteor field's impact-particle DNA at a
 * fraction of the density, alternating the two brand colours the way
 * `hero-meteors.tsx` does. Hand-set so server and client render identically.
 */
const SPARKS = [
  { top: "6%", left: "88%", size: 2.5, dx: 9, dy: -11, duration: 7.5, delay: -1.4, opacity: 0.9 },
  { top: "78%", left: "-6%", size: 3, dx: -8, dy: 7, duration: 9, delay: -4.2, opacity: 0.75 },
  { top: "-8%", left: "34%", size: 2, dx: 4, dy: -10, duration: 11, delay: -7.1, opacity: 0.65 },
  { top: "92%", left: "62%", size: 2.5, dx: 7, dy: 9, duration: 8.2, delay: -2.6, opacity: 0.8 },
  { top: "40%", left: "104%", size: 2, dx: 10, dy: 3, duration: 12.5, delay: -9.3, opacity: 0.6 },
  { top: "22%", left: "-12%", size: 2.5, dx: -10, dy: -5, duration: 10.2, delay: -5.8, opacity: 0.7 },
];

const SPARK_BLUE = "var(--primary)";
const SPARK_LIME = "var(--success)";

function AdvisorSparks() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SPARKS.map((spark, index) => (
        <span
          key={index}
          className="advisor-spark"
          style={
            {
              top: spark.top,
              left: spark.left,
              height: `${spark.size}px`,
              width: `${spark.size}px`,
              "--dx": `${spark.dx}px`,
              "--dy": `${spark.dy}px`,
              "--spark-duration": `${spark.duration}s`,
              "--spark-delay": `${spark.delay}s`,
              "--spark-opacity": spark.opacity,
              // Blue-led with lime as the minority voice, per the §3 weighting.
              "--spark-color": index % 3 === 1 ? SPARK_LIME : SPARK_BLUE,
            } as CSSProperties
          }
        />
      ))}
    </span>
  );
}

/**
 * Collapsed state of the advisor: a lit sphere inside a breathing bloom, ringed
 * by a thin orbit with a travelling bright head, with sparks drifting off it.
 *
 * All of it is CSS (see globals.css) so an idle animation that sits on every
 * page of the site costs no main-thread time.
 */
export function AdvisorOrb({
  open,
  onOpen,
  ref,
}: {
  open: boolean;
  onOpen: () => void;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-label="Open the ITH Advisor"
      tabIndex={open ? -1 : undefined}
      className={cn(
        "advisor-orb group relative flex h-14 w-14 items-center justify-center rounded-full",
        // Grounding shadow under the glow, so the orb sits on the page rather
        // than floating free of it.
        "shadow-[0_14px_30px_-12px_rgba(2,60,110,0.45)]",
        "outline-none transition-transform duration-300 ease-out",
        "hover:scale-[1.06] focus-visible:ring-3 focus-visible:ring-ring/50",
        "motion-reduce:transition-none motion-reduce:hover:scale-100"
      )}
    >
      {/* Glow, orbit and sparks all overflow the button box. */}
      <span className="advisor-orb__glow" aria-hidden="true" />
      <span className="advisor-orb__halo" aria-hidden="true" />
      <span className="advisor-orb__orbit" aria-hidden="true" />
      <span className="advisor-orb__arc" aria-hidden="true" />
      <span className="advisor-orb__comet" aria-hidden="true">
        <span className="advisor-orb__comet-head" />
      </span>
      <AdvisorSparks />

      <AdvisorSphere
        className="absolute inset-0 h-full w-full"
        glyphClassName="h-6 w-6 drop-shadow-[0_1px_2px_rgba(2,45,80,0.5)]"
      />
    </button>
  );
}
