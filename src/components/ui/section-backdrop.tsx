"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Ambient background blobs that genuinely morph — real SVG path interpolation
 * via GSAP's MorphSVGPlugin, not a static gradient wash.
 *
 * Each blob cycles through four organic shapes while drifting and rotating on
 * its own slower timeline, so the two never beat in sync. Timelines are paused
 * whenever the section is off-screen, so a page with eight backdrops only ever
 * animates the one or two in view.
 */

const SHAPES = [
  "M100,25 C135,25 175,55 175,100 C175,145 140,178 100,178 C60,178 25,145 25,100 C25,55 65,25 100,25 Z",
  "M100,20 C150,30 180,60 172,105 C164,150 130,185 92,180 C54,175 22,140 28,95 C34,50 50,10 100,20 Z",
  "M105,28 C145,18 178,62 176,108 C174,154 132,182 90,176 C48,170 20,132 26,88 C32,44 65,38 105,28 Z",
  "M98,32 C140,20 172,58 178,102 C184,146 138,180 96,182 C54,184 22,148 22,102 C22,56 56,44 98,32 Z",
];

const BLUE = "#079dfb";
const LIME = "#86c60c";
const VIOLET = "#5333aa";

type Blob = {
  className: string;
  color: string;
  opacity: number;
  /** Seconds per shape change — deliberately long and mutually non-repeating. */
  morph: number;
  drift: { x: number; y: number; rotate: number; duration: number };
};

type Variant = "left" | "right" | "split" | "center";

const VARIANTS: Record<Variant, Blob[]> = {
  left: [
    {
      className: "left-[-16%] top-[-22%] h-[46rem] w-[46rem]",
      color: BLUE,
      opacity: 0.1,
      morph: 9,
      drift: { x: 40, y: 26, rotate: 14, duration: 26 },
    },
    {
      className: "right-[-12%] bottom-[-30%] h-[34rem] w-[34rem]",
      color: LIME,
      opacity: 0.08,
      morph: 11,
      drift: { x: -34, y: -22, rotate: -18, duration: 31 },
    },
  ],
  right: [
    {
      className: "right-[-14%] top-[-24%] h-[44rem] w-[44rem]",
      color: BLUE,
      opacity: 0.09,
      morph: 10,
      drift: { x: -36, y: 30, rotate: -12, duration: 29 },
    },
    {
      className: "left-[-10%] bottom-[-26%] h-[30rem] w-[30rem]",
      color: LIME,
      opacity: 0.07,
      morph: 13,
      drift: { x: 28, y: -20, rotate: 16, duration: 24 },
    },
  ],
  split: [
    {
      className: "left-[-12%] top-[-22%] h-[38rem] w-[38rem]",
      color: LIME,
      opacity: 0.08,
      morph: 12,
      drift: { x: 32, y: 24, rotate: 15, duration: 27 },
    },
    {
      className: "right-[-16%] top-[8%] h-[42rem] w-[42rem]",
      color: BLUE,
      opacity: 0.09,
      morph: 9.5,
      drift: { x: -30, y: 28, rotate: -14, duration: 33 },
    },
  ],
  center: [
    {
      className: "left-1/2 top-[-32%] h-[48rem] w-[48rem] -translate-x-1/2",
      color: BLUE,
      opacity: 0.08,
      morph: 10.5,
      drift: { x: 26, y: 22, rotate: 12, duration: 30 },
    },
    {
      className: "right-[-18%] bottom-[-32%] h-[32rem] w-[32rem]",
      color: VIOLET,
      opacity: 0.06,
      morph: 12.5,
      drift: { x: -24, y: -18, rotate: -16, duration: 25 },
    },
  ],
};

export function SectionBackdrop({ variant = "left" }: { variant?: Variant }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger);

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>("[data-blob-path]");
      const shells = gsap.utils.toArray<HTMLDivElement>("[data-blob-shell]");
      const timelines: gsap.core.Timeline[] = [];

      paths.forEach((path, index) => {
        const morph = Number(path.dataset.morph ?? 10);
        const timeline = gsap.timeline({ repeat: -1, paused: true });

        // Walk the full shape set and return to the start, so the loop is seamless.
        [...SHAPES.slice(1), SHAPES[0]].forEach((shape) => {
          timeline.to(path, {
            duration: morph,
            morphSVG: shape,
            ease: "sine.inOut",
          });
        });

        timelines.push(timeline);

        const shell = shells[index];
        if (shell) {
          const drift = JSON.parse(shell.dataset.drift ?? "{}");
          timelines.push(
            gsap.timeline({ repeat: -1, yoyo: true, paused: true }).to(shell, {
              duration: drift.duration ?? 28,
              x: drift.x ?? 0,
              y: drift.y ?? 0,
              rotate: drift.rotate ?? 0,
              ease: "sine.inOut",
            })
          );
        }
      });

      // Only run while the section is anywhere near the viewport.
      const section = root.closest("section") ?? root;
      const setPlaying = (playing: boolean) =>
        timelines.forEach((timeline) =>
          playing ? timeline.play() : timeline.pause()
        );

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top bottom+=200",
        end: "bottom top-=200",
        onToggle: (self) => setPlaying(self.isActive),
      });

      // onToggle only fires on a transition, so a section that is already in
      // view when the trigger is created would otherwise stay paused forever.
      setPlaying(trigger.isActive);

      return () => {
        trigger.kill();
        timelines.forEach((timeline) => timeline.kill());
      };
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {VARIANTS[variant].map((blob, index) => (
        <div
          key={index}
          data-blob-shell
          data-drift={JSON.stringify(blob.drift)}
          className={cn("absolute", blob.className)}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
            <defs>
              <radialGradient id={`blob-${variant}-${index}`}>
                <stop offset="0%" stopColor={blob.color} stopOpacity={blob.opacity} />
                <stop
                  offset="60%"
                  stopColor={blob.color}
                  stopOpacity={blob.opacity * 0.45}
                />
                <stop offset="100%" stopColor={blob.color} stopOpacity={0} />
              </radialGradient>
            </defs>
            <path
              data-blob-path
              data-morph={blob.morph}
              d={SHAPES[0]}
              fill={`url(#blob-${variant}-${index})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
