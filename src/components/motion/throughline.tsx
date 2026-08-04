"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The page's narrative spine: a single blue path that draws itself downward as
 * you scroll, stitching the stacked sections into one continuous story.
 *
 * The SVG is stretched to the full height of <main> with a non-uniform
 * viewBox, so `vector-effect: non-scaling-stroke` keeps the line an even
 * weight no matter how tall the page gets. A soft wide copy of the same path
 * sits underneath to give the leading edge a faint glow.
 */
const PATH =
  "M60 0 C 14 120, 108 232, 60 350 S 8 578, 60 700 S 112 906, 60 1030 S 12 1258, 60 1380 S 108 1606, 60 1730 S 14 1902, 60 2000";

export function Throughline() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    const glow = glowRef.current;
    const head = headRef.current;
    if (!root || !line || !glow || !head) return;

    if (reducedMotion) {
      // Draw it fully and hold — the line still connects the sections, it just
      // doesn't animate.
      gsap.set([line, glow], { strokeDasharray: "none", strokeDashoffset: 0 });
      gsap.set(head, { autoAlpha: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const length = line.getTotalLength();

      gsap.set([line, glow], {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const drawn = length * self.progress;
          gsap.set([line, glow], { strokeDashoffset: length - drawn });

          // Park a soft dot at the drawing tip so the line reads as active.
          const point = line.getPointAtLength(drawn);
          gsap.set(head, {
            attr: { cx: point.x, cy: point.y },
            autoAlpha: self.progress > 0.002 && self.progress < 0.998 ? 1 : 0,
          });
        },
      });

      return () => trigger.kill();
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
    >
      <svg
        className="h-full w-[120px]"
        viewBox="0 0 120 2000"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={glowRef}
          d={PATH}
          stroke="var(--primary)"
          strokeWidth={7}
          strokeLinecap="round"
          opacity={0.14}
          vectorEffect="non-scaling-stroke"
        />
        <path
          ref={lineRef}
          d={PATH}
          stroke="var(--primary)"
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.75}
          vectorEffect="non-scaling-stroke"
        />
        <circle ref={headRef} r={4} fill="var(--primary)" opacity={0} />
      </svg>
    </div>
  );
}
