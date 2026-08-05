"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { ACCENT_VAR } from "@/components/sections/service-grid";
import { ServiceVisual } from "@/components/sections/service-visuals";
import { SERVICES, type Service } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * The ten practices as a 3D scrolling wall — the HeroParallax pattern from
 * VISUAL_POLISH_BATCH.md §6, adapted per option (b) to run on the service
 * motifs already built for `service-visuals.tsx` rather than the 15 product
 * screenshots the original needs and we do not have.
 *
 * Two adaptations worth naming:
 *
 *   - Two rows of five, not three rows of five. Ten practices is the real
 *     number; a third row would mean repeating cards to fill it, which is
 *     padding. Five cards a row still overruns the viewport, so the opposing
 *     drift never exposes a row's end.
 *   - The wall is pinned with `sticky` while the scroll drives the transforms.
 *     The original lets a tall container scroll past and relies on a big
 *     `translateY` to bring the rows into frame, which only lands correctly at
 *     one viewport height.
 *
 * It lives on About rather than the homepage: the homepage Services section
 * already renders these ten as a grid under almost this headline, so the same
 * ten again below it would be duplication rather than a second look.
 */

const SPRING = { stiffness: 260, damping: 34, mass: 0.8 };

function PracticeCard({
  service,
  translate,
}: {
  service: Service;
  translate: MotionValue<number>;
}) {
  return (
    <motion.div style={{ x: translate }} className="shrink-0">
      <Link
        href={service.href}
        style={
          { "--service-accent": ACCENT_VAR[service.accent] } as React.CSSProperties
        }
        className="service-card group/practice relative flex h-56 w-[22rem] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:border-[color-mix(in_srgb,var(--service-accent)_50%,var(--border))] hover:shadow-[0_24px_50px_-28px_color-mix(in_srgb,var(--service-accent)_75%,transparent)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_srgb,var(--service-accent)_35%,transparent)]"
      >
        {/* Brand-accent wash on hover, in place of the reference's flat black
            overlay — and kept low enough that the card stays readable. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/practice:opacity-100"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in srgb, var(--service-accent) 12%, transparent) 0%, transparent 60%)",
          }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="h-12 w-12 shrink-0">
            <ServiceVisual slug={service.slug} />
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-300 group-hover/practice:text-[var(--service-accent)]"
          />
        </div>

        <div className="relative">
          <h3 className="text-lg leading-snug font-semibold tracking-tight text-foreground font-heading">
            {service.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {service.positioning}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function Heading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
      <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
        What the team covers
      </h2>
      <p className="mt-5 max-w-3xl text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.06] font-semibold tracking-tight text-foreground font-heading">
        One team, ten practices, no handover between them.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        The same vendor-certified engineers carry a requirement from scoping
        through to supported implementation, whichever practices it touches.
      </p>
    </div>
  );
}

export function PracticeParallax() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const drift = useSpring(useTransform(scrollYProgress, [0, 1], [0, 340]), SPRING);
  const driftBack = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -340]),
    SPRING
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [12, 0]),
    SPRING
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [9, 0]),
    SPRING
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [-90, 40]),
    SPRING
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [0.35, 1]),
    SPRING
  );

  const firstRow = SERVICES.slice(0, 5);
  const secondRow = SERVICES.slice(5, 10);

  // The effect is entirely 3D scroll motion, so there is nothing to tone down —
  // it becomes an ordinary grid of the same ten cards.
  if (reducedMotion) {
    return (
      <section className="relative border-b border-border/70 py-[clamp(3rem,6vh,4.5rem)]">
        <Heading />
        <ul className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={service.href}
                style={
                  {
                    "--service-accent": ACCENT_VAR[service.accent],
                  } as React.CSSProperties
                }
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <div className="h-12 w-12">
                  <ServiceVisual slug={service.slug} />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {service.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.positioning}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label="The ten practice areas"
      className="relative h-[190vh] border-b border-border/70"
    >
      <div className="sticky top-16 overflow-hidden py-[clamp(1.5rem,3.5vh,2.5rem)] [perspective:1000px]">
        <Heading />

        <motion.div
          style={{ rotateX, rotateZ, y: translateY, opacity }}
          className="mt-8 [transform-style:preserve-3d]"
        >
          <div className="mb-5 flex gap-5">
            {firstRow.map((service) => (
              <PracticeCard key={service.slug} service={service} translate={drift} />
            ))}
          </div>
          <div className="flex flex-row-reverse gap-5">
            {secondRow.map((service) => (
              <PracticeCard
                key={service.slug}
                service={service}
                translate={driftBack}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
