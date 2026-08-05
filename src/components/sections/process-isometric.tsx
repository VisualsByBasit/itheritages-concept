"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Isometric illustration of the four-step methodology — four raised platforms
 * climbing left to right, connected by a routed path, with the artefact of
 * each stage sitting on top: a scoping doc, an architecture stack, a tested
 * prototype, and the deployed rack.
 *
 * Drawn on a true 2:1 isometric projection so the platforms tile correctly.
 *
 * The motion is the section's own argument rather than decoration: the stages
 * build in order — platform, then its artefact — so the graphic performs
 * "scoped, architected, proven, then implemented" as you arrive at it. Once
 * assembled it settles into a slow idle: the artefacts breathe, packets travel
 * the route between stages, and the rack LEDs come online.
 *
 * Transforms are split across three nested groups per element, each owning
 * exactly one job — the outer `translate` attribute places it, GSAP drives the
 * entrance on the middle group, and the CSS idle loop drives the inner one.
 * Sharing a group would put an inline transform and a CSS animation on the same
 * element, and the animation would win once it started.
 */

const BLUE = "#079dfb";
const LIME = "#86c60c";
const INK = "#0a0a0b";

/** Isometric transform: grid (x, y) → screen, 2:1 projection. */
function iso(x: number, y: number, z = 0) {
  return { sx: (x - y) * 44, sy: (x + y) * 22 - z };
}

function Platform({
  gx,
  gy,
  lift,
  accent,
  depth = 14,
}: {
  gx: number;
  gy: number;
  lift: number;
  accent: string;
  depth?: number;
}) {
  const { sx, sy } = iso(gx, gy, lift);
  const w = 44;
  const h = 22;

  return (
    <g transform={`translate(${sx} ${sy})`}>
      <g data-iso-platform>
        {/* left face */}
        <path
          d={`M${-w} 0 L0 ${h} L0 ${h + depth} L${-w} ${depth} Z`}
          fill={accent}
          fillOpacity={0.28}
        />
        {/* right face */}
        <path
          d={`M0 ${h} L${w} 0 L${w} ${depth} L0 ${h + depth} Z`}
          fill={accent}
          fillOpacity={0.16}
        />
        {/* top face */}
        <path
          d={`M0 ${-h} L${w} 0 L0 ${h} L${-w} 0 Z`}
          fill="#ffffff"
          stroke={accent}
          strokeOpacity={0.55}
          strokeWidth={1.2}
        />
      </g>
    </g>
  );
}

export function ProcessIsometric({ className }: { className?: string }) {
  const rootRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  const steps = [
    { gx: 0, gy: 0, lift: 0, accent: BLUE },
    { gx: 1, gy: 0, lift: 26, accent: BLUE },
    { gx: 2, gy: 0, lift: 52, accent: LIME },
    { gx: 3, gy: 0, lift: 78, accent: LIME },
  ];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const platforms = root.querySelectorAll<SVGGElement>("[data-iso-platform]");
    const artefacts = root.querySelectorAll<SVGGElement>("[data-iso-artefact]");

    if (reducedMotion) {
      // Hold the finished assembly — the illustration still reads, it just
      // doesn't build.
      gsap.set([platforms, artefacts], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const route = root.querySelector("[data-iso-route]");

      // Set the start state explicitly rather than relying on `.from()` inside
      // a timeline, whose immediateRender behaviour depends on its position and
      // can flash the assembled graphic for a frame before the trigger fires.
      gsap.set(platforms, { y: 34, opacity: 0 });
      gsap.set(artefacts, {
        y: -22,
        opacity: 0,
        scale: 0.86,
        transformOrigin: "center bottom",
      });
      gsap.set(route, { opacity: 0 });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          // Building once is the point: the sequence is a statement about
          // method, not a scrubbable toy.
          once: true,
        },
      });

      // Each platform lands, then its artefact drops onto it — so the four
      // stages read in order rather than appearing all at once.
      platforms.forEach((platform, index) => {
        const artefact = artefacts[index];
        const at = index * 0.22;

        timeline.to(platform, { y: 0, opacity: 1, duration: 0.7 }, at);

        if (artefact) {
          timeline.to(
            artefact,
            { y: 0, opacity: 1, scale: 1, duration: 0.55 },
            at + 0.22
          );
        }
      });

      timeline.to(route, { opacity: 1, duration: 0.8 }, 0.3);
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <svg
      ref={rootRef}
      viewBox="-90 -140 460 320"
      className={className}
      fill="none"
      role="img"
      aria-label="Four-step methodology shown as four rising isometric platforms: scoping, architecture, proof of concept, and implementation."
    >
      {/* routed path linking the stages — the dashes travel it once assembled,
          so the stages read as connected rather than merely adjacent */}
      <path
        data-iso-route
        className="iso-route"
        d="M0 0 L44 -4 M88 -22 L132 -26 M176 -44 L220 -48"
        stroke={INK}
        strokeOpacity={0.16}
        strokeWidth={1.4}
        strokeDasharray="4 5"
      />

      {steps.map((step, index) => (
        <Platform key={index} {...step} />
      ))}

      {/* 01 — scoping document */}
      <g transform="translate(0 -34)">
        <g data-iso-artefact>
          <g className="iso-float" style={{ animationDelay: "0s" }}>
            <rect x={-15} y={-26} width={30} height={34} rx={2} fill="#fff" stroke={BLUE} strokeWidth={1.3} />
            {/* the lines write themselves in, one after another */}
            <line className="iso-write" style={{ animationDelay: "0.1s" }} x1={-9} y1={-17} x2={9} y2={-17} stroke={BLUE} strokeOpacity={0.5} strokeWidth={1.4} />
            <line className="iso-write" style={{ animationDelay: "0.35s" }} x1={-9} y1={-10} x2={5} y2={-10} stroke={BLUE} strokeOpacity={0.5} strokeWidth={1.4} />
            <line className="iso-write" style={{ animationDelay: "0.6s" }} x1={-9} y1={-3} x2={9} y2={-3} stroke={BLUE} strokeOpacity={0.5} strokeWidth={1.4} />
          </g>
        </g>
      </g>

      {/* 02 — layered architecture */}
      <g transform="translate(44 -60)">
        <g data-iso-artefact>
          <g className="iso-float" style={{ animationDelay: "0.7s" }}>
            {[0, 1, 2].map((i) => (
              <g
                key={i}
                className="iso-layer"
                style={{ ["--layer-y" as string]: `${-i * 11}px`, animationDelay: `${i * 0.5}s` }}
              >
                <path d="M0 -11 L22 0 L0 11 L-22 0 Z" fill="#fff" stroke={BLUE} strokeWidth={1.2} />
              </g>
            ))}
          </g>
        </g>
      </g>

      {/* 03 — tested prototype */}
      <g transform="translate(88 -86)">
        <g data-iso-artefact>
          <g className="iso-float" style={{ animationDelay: "1.4s" }}>
            <path d="M0 -13 L26 0 L0 13 L-26 0 Z" fill="#fff" stroke={LIME} strokeWidth={1.3} />
            {/* the test passing, on a loop */}
            <path
              className="iso-check"
              d="M-8 0 L-2 6 L9 -6"
              stroke={LIME}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>

      {/* 04 — deployed rack */}
      <g transform="translate(132 -118)">
        <g data-iso-artefact>
          <g className="iso-float" style={{ animationDelay: "2.1s" }}>
            <rect x={-16} y={-30} width={32} height={42} rx={2.5} fill="#fff" stroke={LIME} strokeWidth={1.3} />
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <line x1={-10} y1={-22 + i * 10} x2={10} y2={-22 + i * 10} stroke={LIME} strokeOpacity={0.35} strokeWidth={1.2} />
                <circle
                  className="iso-led"
                  style={{ animationDelay: `${i * 0.45}s` }}
                  cx={-12.5}
                  cy={-22 + i * 10}
                  r={1.4}
                  fill={i < 3 ? LIME : BLUE}
                />
              </g>
            ))}
          </g>
        </g>
      </g>

      {/* ground shadow */}
      <ellipse cx={66} cy={54} rx={168} ry={30} fill={INK} fillOpacity={0.05} />
    </svg>
  );
}
