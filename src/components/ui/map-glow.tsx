"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Dotted glow background drawn at the coordinates in `src/data/map-points.json`
 * — a real street layout around the Islamabad office, reduced to ~4,000
 * normalised points — so the footer reads as an abstract map rather than a
 * random dot field. No map tile or imagery is involved, only coordinates.
 *
 * Three things keep an always-on canvas cheap enough to sit under every page:
 *
 *   - The point data is `import()`ed only once the footer nears the viewport,
 *     so it never touches the initial bundle.
 *   - Dots are batched into a handful of alpha buckets and filled as one path
 *     each, rather than 4,000 individual fills with `shadowBlur` (the reference
 *     component's approach, and by far the most expensive part of it).
 *   - The loop stops entirely whenever the footer is scrolled out of view.
 *
 * Under `prefers-reduced-motion` it paints one static frame and never loops.
 */

/** `x`/`y` are normalised 0–1 across a `cols`×`rows` grid; `i` is intensity. */
type MapPoint = { x: number; y: number; i: number };
type MapData = { cols: number; rows: number; points: MapPoint[] };

/** Alpha quantisation — the number of fills per colour, per frame. */
const BUCKETS = 6;
/** Brighter buckets also draw larger, so the dense runs read as structure. */
const MIN_RADIUS = 0.8;
const RADIUS_STEP = 0.16;
/** Points at or above this alpha also get a soft halo pass. */
const HALO_THRESHOLD = 0.72;
/** Every Nth point is lime, keeping the field blue-led per §3. */
const LIME_EVERY = 11;

/**
 * Strips fully-occupied rows of near-uniform intensity.
 *
 * The supplied dataset ends in eight such rows — 1,120 points, 28% of the file,
 * every column filled at intensity 0.90 — which is a fill artifact from however
 * the grid was derived, not street data. Drawn, it puts a solid bright bar
 * across the bottom of the footer. Detecting the shape rather than hardcoding
 * the row numbers keeps this working if the dataset is ever regenerated.
 */
function usableRows(data: MapData): MapPoint[] {
  const rows = new Map<number, MapPoint[]>();
  for (const point of data.points) {
    const row = Math.round(point.y * (data.rows - 1));
    const list = rows.get(row);
    if (list) list.push(point);
    else rows.set(row, [point]);
  }

  const solid = new Set<number>();
  for (const [row, list] of rows) {
    if (list.length < data.cols) continue;
    let min = Infinity;
    let max = -Infinity;
    for (const point of list) {
      if (point.i < min) min = point.i;
      if (point.i > max) max = point.i;
    }
    if (max - min <= 0.12) solid.add(row);
  }

  if (solid.size === 0) return data.points;
  return data.points.filter(
    (point) => !solid.has(Math.round(point.y * (data.rows - 1)))
  );
}

export function MapGlow({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let stopped = false;
    let visible = false;
    let points: MapPoint[] | null = null;
    /** Height ÷ width of the source grid, so the streets never get squashed. */
    let aspect = 1;
    let minY = 0;
    let maxY = 1;

    // Read the brand tokens once rather than hardcoding hex in the component.
    const styles = getComputedStyle(document.documentElement);
    const blue = styles.getPropertyValue("--primary").trim() || "#079dfb";
    const lime = styles.getPropertyValue("--success").trim() || "#86c60c";

    // Per-point animation state, sized once the data lands.
    let px: Float32Array | null = null;
    let py: Float32Array | null = null;
    let base: Float32Array | null = null;
    let phase: Float32Array | null = null;
    let speed: Float32Array | null = null;

    let width = 0;
    let height = 0;
    const dpr = Math.min(Math.max(1, window.devicePixelRatio || 1), 2);

    function resize() {
      if (!container || !canvas || !ctx) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      project();
    }

    /**
     * Scale the cloud to cover the container at its own aspect ratio and centre
     * it on the occupied rows — the source grid is a 2.3:1 banner, so on a
     * footer it lands almost exactly full-bleed with no distortion.
     */
    function project() {
      if (!points || !px || !py) return;
      const drawWidth = Math.max(width, height / aspect);
      const drawHeight = drawWidth * aspect;
      const offsetX = (width - drawWidth) / 2;
      const spanY = maxY - minY;
      const offsetY = (height - drawHeight * spanY) / 2 - minY * drawHeight;
      for (let n = 0; n < points.length; n++) {
        px[n] = points[n].x * drawWidth + offsetX;
        py[n] = points[n].y * drawHeight + offsetY;
      }
    }

    function draw(now: number) {
      if (stopped || !ctx) return;
      if (!visible || !points || !px || !py || !base || !phase || !speed) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const time = now / 1000;
      const count = points.length;

      // Two colour groups, each quantised into alpha buckets, so a frame costs
      // ~12 path fills instead of thousands.
      for (let group = 0; group < 2; group++) {
        ctx.fillStyle = group === 0 ? blue : lime;

        for (let bucket = 0; bucket < BUCKETS; bucket++) {
          const lo = bucket / BUCKETS;
          const hi = (bucket + 1) / BUCKETS;
          const radius = MIN_RADIUS + bucket * RADIUS_STEP;
          let opened = false;

          for (let n = 0; n < count; n++) {
            if ((n % LIME_EVERY === 0 ? 1 : 0) !== group) continue;

            let alpha = base[n];
            if (!reduced) {
              // Triangle wave — a slow, non-sinusoidal twinkle that never
              // syncs across the field because each point has its own speed.
              const mod = (time * speed[n] + phase[n]) % 2;
              alpha *= 0.45 + 0.55 * (mod < 1 ? mod : 2 - mod);
            }
            if (alpha < lo || alpha >= hi) continue;

            if (!opened) {
              ctx.beginPath();
              opened = true;
            }
            ctx.moveTo(px[n] + radius, py[n]);
            ctx.arc(px[n], py[n], radius, 0, Math.PI * 2);
          }

          if (opened) {
            ctx.globalAlpha = (bucket + 0.5) / BUCKETS;
            ctx.fill();

            // The brightest bucket gets a wider, fainter disc behind it — a
            // halo without the per-dot `shadowBlur` the reference relies on.
            if (lo >= HALO_THRESHOLD) {
              ctx.globalAlpha = 0.14;
              ctx.beginPath();
              for (let n = 0; n < count; n++) {
                if ((n % LIME_EVERY === 0 ? 1 : 0) !== group) continue;
                let alpha = base[n];
                if (!reduced) {
                  const mod = (time * speed[n] + phase[n]) % 2;
                  alpha *= 0.45 + 0.55 * (mod < 1 ? mod : 2 - mod);
                }
                if (alpha < lo || alpha >= hi) continue;
                ctx.moveTo(px[n] + radius * 3.5, py[n]);
                ctx.arc(px[n], py[n], radius * 3.5, 0, Math.PI * 2);
              }
              ctx.fill();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      if (reduced) return;
      raf = requestAnimationFrame(draw);
    }

    async function load() {
      const data: MapData = (await import("@/data/map-points.json")).default;
      if (stopped) return;
      aspect = data.rows / data.cols;
      points = usableRows(data);

      const count = points.length;
      minY = Infinity;
      maxY = -Infinity;

      // The source intensities only span 0.26–1, so using them raw leaves every
      // dot lit and the field reads as uniform noise. Normalising the range and
      // easing it lets the dense runs carry the shape.
      let lowest = Infinity;
      let highest = -Infinity;
      for (let n = 0; n < count; n++) {
        if (points[n].i < lowest) lowest = points[n].i;
        if (points[n].i > highest) highest = points[n].i;
      }
      const span = Math.max(highest - lowest, 0.0001);
      px = new Float32Array(count);
      py = new Float32Array(count);
      base = new Float32Array(count);
      phase = new Float32Array(count);
      speed = new Float32Array(count);

      for (let n = 0; n < count; n++) {
        // Intensity drives resting brightness before any pulse is applied.
        const t = (points[n].i - lowest) / span;
        base[n] = 0.1 + 0.9 * t * t;
        phase[n] = Math.random() * 2;
        speed[n] = 0.12 + Math.random() * 0.28;
        if (points[n].y < minY) minY = points[n].y;
        if (points[n].y > maxY) maxY = points[n].y;
      }

      project();
      raf = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const nowVisible = entries[0]?.isIntersecting ?? false;
        if (nowVisible && !points) void load();
        // A static frame needs painting once; it has no loop to resume.
        if (nowVisible && reduced && points) raf = requestAnimationFrame(draw);
        visible = nowVisible;
      },
      { rootMargin: "200px" }
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced && points) raf = requestAnimationFrame(draw);
    });
    resizeObserver.observe(container);
    resize();

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{
        // Dissolves at every edge so the map never ends on a hard line.
        maskImage:
          "radial-gradient(ellipse 75% 85% at 50% 45%, #000 0%, rgba(0,0,0,0.55) 55%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 85% at 50% 45%, #000 0%, rgba(0,0,0,0.55) 55%, transparent 85%)",
        opacity: 0.75,
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
