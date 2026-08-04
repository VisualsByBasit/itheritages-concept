/**
 * Isometric illustration of the four-step methodology — four raised platforms
 * climbing left to right, connected by a routed path, with the artefact of
 * each stage sitting on top: a scoping doc, an architecture stack, a tested
 * prototype, and the deployed rack.
 *
 * Drawn on a true 2:1 isometric projection so the platforms tile correctly.
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
  );
}

export function ProcessIsometric({ className }: { className?: string }) {
  const steps = [
    { gx: 0, gy: 0, lift: 0, accent: BLUE },
    { gx: 1, gy: 0, lift: 26, accent: BLUE },
    { gx: 2, gy: 0, lift: 52, accent: LIME },
    { gx: 3, gy: 0, lift: 78, accent: LIME },
  ];

  return (
    <svg
      viewBox="-90 -140 460 320"
      className={className}
      fill="none"
      role="img"
      aria-label="Four-step methodology shown as four rising isometric platforms: scoping, architecture, proof of concept, and implementation."
    >
      {/* routed path linking the stages */}
      <path
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
        <rect x={-15} y={-26} width={30} height={34} rx={2} fill="#fff" stroke={BLUE} strokeWidth={1.3} />
        <line x1={-9} y1={-17} x2={9} y2={-17} stroke={BLUE} strokeOpacity={0.5} strokeWidth={1.4} />
        <line x1={-9} y1={-10} x2={5} y2={-10} stroke={BLUE} strokeOpacity={0.5} strokeWidth={1.4} />
        <line x1={-9} y1={-3} x2={9} y2={-3} stroke={BLUE} strokeOpacity={0.5} strokeWidth={1.4} />
      </g>

      {/* 02 — layered architecture */}
      <g transform="translate(44 -60)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${-i * 11})`}>
            <path d="M0 -11 L22 0 L0 11 L-22 0 Z" fill="#fff" stroke={BLUE} strokeWidth={1.2} />
          </g>
        ))}
      </g>

      {/* 03 — tested prototype */}
      <g transform="translate(88 -86)">
        <path d="M0 -13 L26 0 L0 13 L-26 0 Z" fill="#fff" stroke={LIME} strokeWidth={1.3} />
        <path d="M-8 0 L-2 6 L9 -6" stroke={LIME} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* 04 — deployed rack */}
      <g transform="translate(132 -118)">
        <rect x={-16} y={-30} width={32} height={42} rx={2.5} fill="#fff" stroke={LIME} strokeWidth={1.3} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line x1={-10} y1={-22 + i * 10} x2={10} y2={-22 + i * 10} stroke={LIME} strokeOpacity={0.35} strokeWidth={1.2} />
            <circle cx={-12.5} cy={-22 + i * 10} r={1.4} fill={i < 3 ? LIME : BLUE} />
          </g>
        ))}
      </g>

      {/* ground shadow */}
      <ellipse cx={66} cy={54} rx={168} ry={30} fill={INK} fillOpacity={0.05} />
    </svg>
  );
}
