import type { CSSProperties } from "react";

const WIDTH = 720;
const HEIGHT = 640;
/** Vanishing point the floor recedes toward. */
const VP_X = 360;
const VP_Y = 44;
const ROWS = 12;
const COLUMNS = 15;
/** How far the converging lines fan out at the bottom edge. */
const FAN = 1180;

const BLUE = "#079dfb";
const LIME = "#86c60c";

/**
 * Depth rows, compressed toward the horizon by a power curve so the spacing
 * reads as perspective rather than as evenly stacked bands.
 */
const ROW_Y = Array.from({ length: ROWS }, (_, i) => {
  const t = (i + 1) / ROWS;
  return VP_Y + (HEIGHT - VP_Y) * Math.pow(t, 2.2);
});

/** Where each converging line crosses the bottom edge. */
const COLUMN_X = Array.from({ length: COLUMNS }, (_, j) => {
  const t = j / (COLUMNS - 1);
  return VP_X + (t - 0.5) * 2 * FAN;
});

/** Exact crossing of a converging line and a depth row. */
function intersect(rowY: number, bottomX: number) {
  const s = (rowY - VP_Y) / (HEIGHT - VP_Y);
  return { x: VP_X + (bottomX - VP_X) * s, y: rowY };
}

/** Deterministic PRNG — keeps server and client markup identical. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Light = {
  x: number;
  y: number;
  color: string;
  pulseDuration: number;
  pulseDelay: number;
  flickerDuration: number;
  flickerDelay: number;
  scale: number;
};

/**
 * Picks a readable subset of intersections. Rows nearest the horizon are
 * skipped (too cramped) and anything landing outside the frame is dropped.
 * Pulse and flicker cycles use co-prime-ish durations plus distinct negative
 * delays, so no two lights ever sync up.
 */
const LIGHTS: Light[] = (() => {
  const random = mulberry32(0x5eed21);
  const taken = new Set<string>();
  const lights: Light[] = [];

  for (let attempt = 0; attempt < 90 && lights.length < 17; attempt++) {
    const row = 3 + Math.floor(random() * (ROWS - 3));
    const column = Math.floor(random() * COLUMNS);
    const key = `${row}:${column}`;
    if (taken.has(key)) continue;

    const { x, y } = intersect(ROW_Y[row], COLUMN_X[column]);
    if (x < 40 || x > WIDTH - 40) continue;

    taken.add(key);

    // Nearer rows get slightly larger lights, matching the grid's perspective.
    const depth = row / (ROWS - 1);

    lights.push({
      x,
      y,
      color: random() < 0.62 ? BLUE : LIME,
      pulseDuration: 2.6 + random() * 2.4,
      pulseDelay: -random() * 5,
      flickerDuration: 9 + random() * 9,
      flickerDelay: -random() * 18,
      scale: 0.7 + depth * 0.6,
    });
  }

  return lights;
})();

type LightStyle = CSSProperties &
  Record<
    "--pulse-duration" | "--pulse-delay" | "--flicker-duration" | "--flicker-delay",
    string
  >;

export function HeroGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] overflow-hidden md:block"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMax slice"
        fill="none"
      >
        <defs>
          {/* Converging lines dissolve toward the horizon. */}
          <linearGradient
            id="hero-grid-fade"
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={VP_Y}
            x2={0}
            y2={HEIGHT}
          >
            <stop offset="0%" stopColor="#d4d4dc" stopOpacity={0} />
            <stop offset="30%" stopColor="#cdcdd6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#bcbcc8" stopOpacity={1} />
          </linearGradient>

          <radialGradient id="hero-grid-glow-blue">
            <stop offset="0%" stopColor={BLUE} stopOpacity={0.55} />
            <stop offset="45%" stopColor={BLUE} stopOpacity={0.18} />
            <stop offset="100%" stopColor={BLUE} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="hero-grid-glow-lime">
            <stop offset="0%" stopColor={LIME} stopOpacity={0.55} />
            <stop offset="45%" stopColor={LIME} stopOpacity={0.18} />
            <stop offset="100%" stopColor={LIME} stopOpacity={0} />
          </radialGradient>
        </defs>

        <g stroke="url(#hero-grid-fade)" strokeWidth={1}>
          {COLUMN_X.map((x, index) => (
            <line key={`c${index}`} x1={VP_X} y1={VP_Y} x2={x} y2={HEIGHT} />
          ))}
          {ROW_Y.map((y, index) => {
            const left = intersect(y, COLUMN_X[0]);
            const right = intersect(y, COLUMN_X[COLUMNS - 1]);
            return (
              <line
                key={`r${index}`}
                x1={left.x}
                y1={y}
                x2={right.x}
                y2={y}
                strokeOpacity={0.3 + (index / (ROWS - 1)) * 0.7}
              />
            );
          })}
        </g>

        {LIGHTS.map((light, index) => {
          const style: LightStyle = {
            "--pulse-duration": `${light.pulseDuration.toFixed(2)}s`,
            "--pulse-delay": `${light.pulseDelay.toFixed(2)}s`,
            "--flicker-duration": `${light.flickerDuration.toFixed(2)}s`,
            "--flicker-delay": `${light.flickerDelay.toFixed(2)}s`,
          };
          const glow = light.color === BLUE ? "hero-grid-glow-blue" : "hero-grid-glow-lime";

          return (
            <g key={index} className="hero-grid-light" style={style}>
              <circle
                className="hero-grid-light__glow"
                cx={light.x}
                cy={light.y}
                r={13 * light.scale}
                fill={`url(#${glow})`}
              />
              <circle
                className="hero-grid-light__core"
                cx={light.x}
                cy={light.y}
                r={2.1 * light.scale}
                fill={light.color}
              />
              <g
                className="hero-grid-light__spark"
                stroke={light.color}
                strokeWidth={1.1}
                strokeLinecap="round"
              >
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const radians = (angle * Math.PI) / 180;
                  const inner = 3.5 * light.scale;
                  const outer = 9 * light.scale;
                  return (
                    <line
                      key={angle}
                      x1={light.x + Math.cos(radians) * inner}
                      y1={light.y + Math.sin(radians) * inner}
                      x2={light.x + Math.cos(radians) * outer}
                      y2={light.y + Math.sin(radians) * outer}
                    />
                  );
                })}
              </g>
            </g>
          );
        })}
      </svg>

      {/* Dissolves the grid into the page at the horizon and the inner edge.
          Kept tight so it softens the seams without washing out the grid. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0) 22%)," +
            "linear-gradient(to right, #fff 0%, rgba(255,255,255,0) 30%)",
        }}
      />
    </div>
  );
}
