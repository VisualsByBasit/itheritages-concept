"use client";

import { useEffect, useState, type ComponentType, type CSSProperties } from "react";
import Image from "next/image";

/**
 * The boot sequence: dots converge, the mark assembles out of them in 3D, a
 * hairline fills underneath, and the whole thing dissolves into the page.
 *
 * Constraints that shaped this:
 *
 *   - **First load only.** A `sessionStorage` flag records that it has run.
 *     Client-side navigations never remount it (it lives in the root layout),
 *     and a reload inside the same session skips it outright.
 *   - **No flash for repeat visits.** The overlay is in the server-rendered
 *     HTML so it covers the page from the first paint. An inline script in the
 *     layout hides it before paint when the flag is set, which is the only way
 *     to consult client storage without either a hydration error or a frame of
 *     visible overlay.
 *   - **Never a gate in front of the site.** Total runtime is ~1.8s and the
 *     3D canvas is loaded separately with a deadline: if three.js has not
 *     arrived in time the flat lockup plays instead, at the same duration.
 *     The sequence is never waiting on a download.
 *
 * Reduced motion drops the 3D entirely — a rotating object is precisely what
 * that preference is asking not to see — and plays a short fade of the real
 * logo instead.
 */

export const BOOT_FLAG = "ith-booted";

/** Milliseconds the mark holds the screen before the overlay leaves. */
const FULL_HOLD = 1450;
const FULL_FADE = 340;
const REDUCED_HOLD = 420;
const REDUCED_FADE = 260;

/** How long the 3D canvas gets to arrive before the flat path is committed. */
const CANVAS_DEADLINE = 600;

/**
 * Dots converging on the mark — the meteor field's impact particles run in
 * reverse. Hand-set so the field is balanced and identical every run.
 */
const PARTICLES = [
  { x: -140, y: -96, size: 3, delay: 0, lime: false },
  { x: 128, y: -112, size: 2.5, delay: 60, lime: true },
  { x: -168, y: 40, size: 2, delay: 120, lime: false },
  { x: 156, y: 64, size: 3, delay: 30, lime: false },
  { x: -96, y: 132, size: 2.5, delay: 150, lime: true },
  { x: 104, y: 144, size: 2, delay: 90, lime: false },
  { x: -196, y: -28, size: 2.5, delay: 180, lime: false },
  { x: 184, y: -40, size: 2, delay: 210, lime: true },
  { x: -60, y: -160, size: 2, delay: 240, lime: false },
  { x: 72, y: 172, size: 2.5, delay: 100, lime: false },
  { x: -128, y: 92, size: 2, delay: 270, lime: false },
  { x: 148, y: -152, size: 2.5, delay: 45, lime: false },
];

type Phase = "running" | "leaving" | "done";

export function BootSequence() {
  const [phase, setPhase] = useState<Phase>("running");
  const [Mark3D, setMark3D] = useState<ComponentType | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(BOOT_FLAG) !== null;
      sessionStorage.setItem(BOOT_FLAG, "1");
    } catch {
      // Private mode or storage disabled — play it, just don't remember.
    }

    if (seen) {
      // The inline script already hid this before paint, so dropping it from
      // the tree on the next tick rather than synchronously is invisible — and
      // synchronous setState in an effect body cascades renders.
      const skip = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(skip);
    }

    // Read the preference directly rather than through the hook: this runs on
    // the first commit, where a hydration-matched hook still reports the
    // server's value. It stays out of React state deliberately — the durations
    // it selects are mirrored by a media query in CSS, so the rendered tree is
    // identical either way and hydration has nothing to disagree about.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const hold = prefersReduced ? REDUCED_HOLD : FULL_HOLD;
    const fade = prefersReduced ? REDUCED_FADE : FULL_FADE;

    // The page must not scroll underneath the overlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cancelled = false;
    let deadline: ReturnType<typeof setTimeout> | undefined;

    if (!prefersReduced) {
      deadline = setTimeout(() => {
        // Past this point a canvas would pop in mid-sequence, so commit to flat.
        cancelled = true;
      }, CANVAS_DEADLINE);

      void import("@/components/boot/boot-mark").then((module) => {
        if (cancelled) return;
        clearTimeout(deadline);
        setMark3D(() => module.BootMark);
      });
    }

    const leaveTimer = setTimeout(() => setPhase("leaving"), hold);
    const doneTimer = setTimeout(() => setPhase("done"), hold + fade);

    return () => {
      cancelled = true;
      clearTimeout(deadline);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (phase === "done") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className="boot-overlay"
      data-leaving={phase === "leaving" ? "" : undefined}
      role="status"
      aria-label="Loading IT Heritages"
    >
      <div className="boot-stage">
        {/* Always rendered so server and client agree; the reduced-motion
            media query is what silences them. */}
        <div className="boot-particles" aria-hidden="true">
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              className="boot-particle"
              style={
                {
                  "--px": `${particle.x}px`,
                  "--py": `${particle.y}px`,
                  "--pd": `${particle.delay}ms`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: particle.lime ? "var(--success)" : "var(--primary)",
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="boot-mark">
          {Mark3D ? (
            <Mark3D />
          ) : (
            /* Reduced motion, or three.js did not arrive in time: the real
               lockup, simply faded in. */
            <Image
              src="/it-heritages-logo-header.png"
              alt="IT Heritages"
              width={1133}
              height={386}
              priority
              className="boot-logo"
            />
          )}
        </div>
      </div>

      <div className="boot-progress" aria-hidden="true">
        <span className="boot-progress__fill" />
      </div>
    </div>
  );
}
