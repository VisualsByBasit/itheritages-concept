"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Flowing beam lines — a fan of parallel curves with a gradient highlight
 * drifting along each one.
 *
 * Two deliberate departures from the reference implementation:
 *
 *   - The 50 hardcoded path strings are generated instead. They are a strict
 *     arithmetic progression (+7 on x, -8 on y per line), so a loop expresses
 *     the fan exactly and lets the density be tuned in one place.
 *   - Durations and delays come from a hash of the index rather than
 *     `Math.random()` during render, matching `hero-meteors.tsx`: the field has
 *     to be identical on the server and the client, and render should be pure.
 *
 * The gradients only animate while the section is on screen, and not at all
 * under `prefers-reduced-motion` — the beams still draw, they just hold still.
 */

/**
 * Each path's bounding box is far larger than the viewBox, so only a fraction
 * of any one gradient is ever on screen — with too few beams, or delays spread
 * too wide, whole seconds pass with no visible highlight at all. Density and a
 * tight delay range are what make the effect read as continuous flow.
 */
/**
 * Tuned against beams that are all mid-sweep at once. While they still idled,
 * only a handful were lit at any moment and the count had to be high to keep
 * something on screen; now that every one is travelling from the first frame,
 * that same count reads as a solid stripe field.
 */
const BEAM_COUNT = 36;

/**
 * The reference fan's first path as seven coordinate pairs:
 * `M p0 C p1 p2 p3 C p4 p5 p6`. Index 0 reproduces it exactly.
 */
const BASE = [
  -380, -189, -380, -189, -312, 216, 152, 343, 616, 470, 684, 875, 684, 875,
];

/**
 * Deliberately not run through `pct`/`toFixed`: every term here is an integer —
 * the BASE pairs and both offsets — so the path string is already exact and
 * identical on server and client. Rounding it would only pad the output with
 * zeroes and stop index 0 reproducing the reference path verbatim.
 */
function beamPath(index: number) {
  const dx = index * 7;
  const dy = index * -8;
  const p = BASE.map((value, i) => (i % 2 === 0 ? value + dx : value + dy));
  return `M${p[0]} ${p[1]}C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}C${p[8]} ${p[9]} ${p[10]} ${p[11]} ${p[12]} ${p[13]}`;
}

/**
 * Deterministic 0–1 from an index — stands in for Math.random().
 *
 * Rounded, and that rounding is load-bearing. ECMAScript leaves the precision
 * of `Math.sin` implementation-defined, so Node and the browser may disagree in
 * the last bit or two. Multiplying by 43758.5453 and then keeping only the
 * fractional part amplifies that disagreement into the visible decimals, which
 * is enough to make the server and client render different gradient
 * coordinates and trip a hydration mismatch. Quantising here means every value
 * derived from it — phase, duration, the y2 endpoint — starts from an
 * identical number in both environments.
 */
function hashed(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  const fraction = value - Math.floor(value);
  return Math.round(fraction * 1e6) / 1e6;
}

/**
 * Every coordinate that reaches the DOM goes through here, so the attribute
 * string is byte-identical on both sides of hydration regardless of any
 * remaining floating-point drift.
 */
function pct(value: number) {
  return `${value.toFixed(4)}%`;
}

export const BackgroundBeams = memo(function BackgroundBeams({
  className,
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  /**
   * `initial: true` matters. `useInView` otherwise reports false for the first
   * render and only corrects once IntersectionObserver delivers, so a beam
   * field sitting in the hero — in view before a pixel is scrolled — still
   * started life gated off. Assume visible and let the observer pause it later.
   */
  const inView = useInView(ref, { margin: "200px", initial: true });
  const animating = inView && !reducedMotion;

  const beams = Array.from({ length: BEAM_COUNT }, (_, index) => index);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 78%)",
      }}
    >
      <svg
        className="absolute z-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* The static fan underneath, so the shape reads even before a
            highlight travels any given line. */}
        {beams.map((index) => (
          <path
            key={`base-${index}`}
            d={beamPath(index)}
            stroke="var(--border)"
            strokeOpacity="0.8"
            strokeWidth="0.6"
          />
        ))}

        {/* Heavier than the reference's 0.4/0.5, which was built for a dark page
            where a thin bright line pops. Not as heavy as it needed to be while
            beams still idled: now that every one is mid-sweep from the first
            frame, far more highlights are on screen at once, and the previous
            weight turned the hero into a solid stripe field. */}
        {beams.map((index) => (
          <path
            key={`beam-${index}`}
            d={beamPath(index)}
            stroke={`url(#beam-gradient-${index})`}
            strokeOpacity="0.62"
            strokeWidth="1.4"
          />
        ))}

        <defs>
          {beams.map((index) => {
            // Each beam enters already part-way through its sweep. The
            // reference staggers with `delay`, which does the opposite of what
            // it looks like: a beam with a 6s delay is not drifting slowly into
            // frame, it is doing nothing at all for six seconds. Worse, even at
            // zero delay a sweep *begins* with the gradient vector collapsed to
            // a point, so the travelling highlight is off-path for the first
            // stretch of every cycle — hence the dead couple of seconds on load.
            //
            // Framer Motion has no negative `delay` (the CSS trick), so the
            // phase is baked into the keyframes instead: start at the phase
            // value, run to the end, jump back to the start in zero time, then
            // return to the phase value. `times` places that jump, and the loop
            // is seamless because the first and last keyframes are equal.
            const phase = 0.05 + hashed(index, 3) * 0.9;
            const at = (from: number, to: number) => from + (to - from) * phase;
            const sweep = (from: number, to: number) => [
              pct(at(from, to)),
              pct(to),
              pct(from),
              pct(at(from, to)),
            ];

            const y2End = 93 + hashed(index, 1) * 8;
            /** Where this beam sits at the start of its cycle. */
            const rest = {
              x1: pct(at(0, 100)),
              x2: pct(at(0, 95)),
              y1: pct(at(0, 100)),
              y2: pct(at(0, y2End)),
            };

            return (
              <motion.linearGradient
                key={`gradient-${index}`}
                id={`beam-gradient-${index}`}
                /**
                 * Both props stay defined in every state, which is the actual
                 * fix for the field rendering static until you scrolled.
                 *
                 * Previously this was `initial={false}` with `animate` set to
                 * `undefined` whenever the gate was off. At mount the gate was
                 * always off (see `initial: true` above), so the first defined
                 * `animate` arrived on a later render — and `initial={false}`
                 * means "no mount animation", so Motion snapped to the first
                 * keyframe instead of playing. Scrolling away and back drove a
                 * second defined→defined change, which did animate; hence the
                 * field only came alive after a scroll round-trip.
                 */
                initial={rest}
                animate={
                  animating
                    ? {
                        x1: sweep(0, 100),
                        x2: sweep(0, 95),
                        y1: sweep(0, 100),
                        y2: sweep(0, y2End),
                      }
                    : rest
                }
                transition={{
                  duration: hashed(index, 2) * 6 + 8,
                  // Linear, not easeInOut: the wrap splits the cycle into two
                  // segments, and per-segment easing makes every beam visibly
                  // stall at the seam. A constant-speed drift also suits a
                  // travelling highlight better.
                  ease: "linear",
                  repeat: Infinity,
                  times: [0, 1 - phase, 1 - phase, 1],
                  // A short beat before the field starts moving, so the beams
                  // read as having just arrived rather than being caught
                  // mid-flight the instant the page paints. First cycle only.
                  delay: 0.3,
                }}
              >
              {/* Blue leads and closes the beam; lime is the single interior
                  accent, per the §3 weighting. */}
                {/* Blue leads and closes; lime is a brief interior accent, not
                    the body of the beam. The reference's single lime stop at
                    32.5% left most of each streak green, which inverts the §3
                    weighting once every beam is lit at once. */}
                <stop offset="0%" stopColor="#079dfb" stopOpacity="0" />
                <stop offset="18%" stopColor="#079dfb" stopOpacity="0.95" />
                <stop offset="44%" stopColor="#86c60c" stopOpacity="0.7" />
                <stop offset="68%" stopColor="#079dfb" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#079dfb" stopOpacity="0" />
              </motion.linearGradient>
            );
          })}
        </defs>
      </svg>
    </div>
  );
});
