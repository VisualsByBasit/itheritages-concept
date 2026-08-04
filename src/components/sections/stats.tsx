"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { STATS } from "@/data/company";

const DURATION = 1600;
const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** easeOutExpo — quick off the mark, settling precisely on the real number. */
function ease(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * A number and the ring around it, driven by one shared progress value so the
 * arc always finishes exactly as the digits land.
 */
function StatDial({
  value,
  display,
  progress,
}: {
  value: number;
  display: string;
  progress: number;
}) {
  const isYear = value > 1000;
  const from = isYear ? value - 24 : 0;
  const suffix = display.endsWith("+") ? "+" : "";

  const eased = ease(progress);
  const shown = Math.round(from + (value - from) * eased);

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 110 110" className="absolute inset-0 h-full w-full -rotate-90">
        <circle
          cx={55}
          cy={55}
          r={RADIUS}
          fill="none"
          stroke="var(--border)"
          strokeWidth={2}
        />
        <circle
          cx={55}
          cy={55}
          r={RADIUS}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - eased)}
        />
      </svg>
      <span className="relative text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-semibold tracking-tight tabular-nums text-foreground font-heading">
        {shown}
        {suffix}
      </span>
    </div>
  );
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    // setActive fires from the observer callback, never synchronously here.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Reduced motion resolves to the finished state by derivation rather than by
  // setting state from an effect.
  const shownProgress = reducedMotion ? 1 : progress;

  useEffect(() => {
    if (!active || reducedMotion) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-labelledby="stats-heading"
      className="relative w-full border-t border-border/70 bg-background py-[clamp(4rem,9vh,7rem)]"
    >
      <SectionBackdrop variant="center" />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="section-eyebrow reveal text-sm font-medium tracking-[0.2em] text-primary uppercase">
          By the numbers
        </p>
        <AnimatedHeading
          id="stats-heading"
          text="Verified, not estimated."
          className="mt-5 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-tight text-foreground font-heading"
        />

        <dl className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-start">
              <dd>
                <StatDial
                  value={stat.value}
                  display={stat.display}
                  progress={shownProgress}
                />
              </dd>
              <dt className="mt-5 text-base font-medium text-foreground">
                {stat.label}
              </dt>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stat.detail}
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
