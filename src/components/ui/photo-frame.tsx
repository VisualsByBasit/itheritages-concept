import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * ── SWAP-WITH-REAL-PHOTO ────────────────────────────────────────────────────
 * Art-directed image slot. Pass `src` and it renders that photo under the
 * house duotone treatment; omit `src` and it renders a designed brand
 * composition instead of an empty box.
 *
 * To drop in the client's real photography later, add the file to
 * public/photos/ and pass `src="/photos/<name>.jpg"` — nothing else changes,
 * the duotone and framing are applied automatically. Every call site that
 * still needs a real photo is marked with a SWAP-WITH-REAL-PHOTO comment.
 * ────────────────────────────────────────────────────────────────────────────
 */

type Tone = "blue" | "lime" | "violet";

const TONES: Record<Tone, { from: string; to: string; wash: string }> = {
  blue: { from: "#079dfb", to: "#0a2f4d", wash: "rgba(7,157,251,0.55)" },
  lime: { from: "#86c60c", to: "#0d3320", wash: "rgba(134,198,12,0.5)" },
  violet: { from: "#5333aa", to: "#1a1030", wash: "rgba(83,51,170,0.5)" },
};

type PhotoFrameProps = {
  /** Real photo path once available. Omit to render the interim composition. */
  src?: string;
  /** Describes the intended subject — also the alt text for a real photo. */
  label: string;
  tone?: Tone;
  className?: string;
  /** Varies the interim composition so repeated slots don't look identical. */
  seed?: number;
};

/**
 * Interim visual: layered brand gradients over an isometric rule grid. Reads
 * as deliberate art direction rather than a missing asset, and shares the
 * duotone palette so swapping in a real photo is not a visual jump.
 */
function BrandComposition({ tone, seed = 0 }: { tone: Tone; seed?: number }) {
  const { from, to } = TONES[tone];
  const rotate = -18 + (seed % 3) * 9;
  const shift = 12 + (seed % 4) * 14;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: `linear-gradient(135deg, ${to} 0%, ${from} 78%, #ffffff 160%)`,
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g
          stroke="#ffffff"
          strokeOpacity={0.14}
          strokeWidth={1}
          transform={`rotate(${rotate} 200 150)`}
        >
          {Array.from({ length: 14 }, (_, i) => (
            <line key={`h${i}`} x1={-120} y1={i * 26 - shift} x2={520} y2={i * 26 - shift} />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <line key={`v${i}`} x1={i * 34 - shift} y1={-120} x2={i * 34 - shift} y2={420} />
          ))}
        </g>

        <circle
          cx={90 + shift}
          cy={70}
          r={110}
          fill="#ffffff"
          fillOpacity={0.1}
        />
        <circle
          cx={330}
          cy={250 - shift}
          r={90}
          fill={from}
          fillOpacity={0.35}
        />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 0%, rgba(255,255,255,0.3) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

export function PhotoFrame({
  src,
  label,
  tone = "blue",
  className,
  seed = 0,
}: PhotoFrameProps) {
  const { wash } = TONES[tone];

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl border border-border/60 bg-muted",
        className
      )}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            /* Duotone: desaturate the source, then push the brand hue back in
               through a colour blend so every photo sits in the same palette. */
            className="object-cover grayscale contrast-[1.15]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-color"
            style={{ background: wash }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 40%, rgba(10,10,11,0.28) 100%)",
            }}
          />
        </>
      ) : (
        <BrandComposition tone={tone} seed={seed} />
      )}

      <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 bg-linear-to-t from-black/45 to-transparent px-4 pt-8 pb-3">
        <span className="text-xs font-medium tracking-[0.08em] text-white/90 uppercase">
          {label}
        </span>
      </figcaption>
    </figure>
  );
}
