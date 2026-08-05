import type { CSSProperties } from "react";

const BLUE = "#079dfb";
const LIME = "#86c60c";

/**
 * Hand-tuned rather than random so the field stays visually balanced and, more
 * importantly, renders identically on the server and the client.
 *
 * `top`/`left` are the launch point, `scale` multiplies the shared travel span,
 * and `delay` is negative so every meteor is already mid-cycle on first paint
 * instead of the whole field firing at once on load.
 */
const METEORS = [
  { top: "-6%", left: "58%", length: 150, scale: 0.92, duration: 9.5, delay: -1.2 },
  { top: "4%", left: "88%", length: 110, scale: 0.78, duration: 12, delay: -6.4 },
  { top: "-10%", left: "34%", length: 190, scale: 1, duration: 14.5, delay: -3.1 },
  { top: "16%", left: "96%", length: 130, scale: 0.7, duration: 10.5, delay: -8.7 },
  { top: "2%", left: "72%", length: 100, scale: 0.85, duration: 16, delay: -11.3 },
  { top: "-4%", left: "46%", length: 165, scale: 0.74, duration: 11.5, delay: -4.6 },
  { top: "22%", left: "82%", length: 120, scale: 0.62, duration: 13, delay: -9.8 },
  { top: "8%", left: "62%", length: 135, scale: 0.68, duration: 17.5, delay: -2.4 },
  { top: "-8%", left: "78%", length: 175, scale: 0.95, duration: 15, delay: -12.6 },
  { top: "12%", left: "40%", length: 105, scale: 0.6, duration: 12.8, delay: -7.2 },
  { top: "0%", left: "92%", length: 145, scale: 0.88, duration: 18.5, delay: -5.5 },
  // Second wave — durations stay mutually non-repeating (9.1s … 19.4s) and the
  // negative delays are spread across the range so the field never re-syncs.
  { top: "-12%", left: "50%", length: 160, scale: 0.83, duration: 10.9, delay: -0.6 },
  { top: "6%", left: "36%", length: 95, scale: 0.55, duration: 13.7, delay: -10.4 },
  { top: "-2%", left: "68%", length: 185, scale: 0.97, duration: 16.8, delay: -14.1 },
  { top: "18%", left: "90%", length: 115, scale: 0.66, duration: 9.1, delay: -3.9 },
  { top: "-14%", left: "84%", length: 140, scale: 0.9, duration: 15.6, delay: -8.2 },
  { top: "26%", left: "74%", length: 100, scale: 0.58, duration: 11.9, delay: -5.1 },
  { top: "10%", left: "54%", length: 170, scale: 0.76, duration: 19.4, delay: -16.3 },
  { top: "-5%", left: "98%", length: 125, scale: 0.81, duration: 14.2, delay: -2.8 },
  { top: "20%", left: "44%", length: 90, scale: 0.52, duration: 12.3, delay: -9.1 },
  { top: "3%", left: "80%", length: 155, scale: 0.86, duration: 17.1, delay: -13.4 },
  { top: "-9%", left: "64%", length: 180, scale: 0.71, duration: 10.2, delay: -6.9 },
  { top: "14%", left: "30%", length: 110, scale: 0.64, duration: 18.9, delay: -4.2 },
  // Third wave — same rules as above: durations stay mutually non-repeating
  // across all three waves, and the delays fill the gaps the first two left so
  // the field never thins out or re-syncs.
  { top: "-3%", left: "26%", length: 135, scale: 0.79, duration: 9.8, delay: -1.8 },
  { top: "9%", left: "48%", length: 165, scale: 0.87, duration: 10.7, delay: -5.3 },
  { top: "-11%", left: "70%", length: 120, scale: 0.61, duration: 11.2, delay: -7.6 },
  { top: "24%", left: "38%", length: 150, scale: 0.73, duration: 12.6, delay: -10.1 },
  { top: "1%", left: "94%", length: 105, scale: 0.57, duration: 13.3, delay: -12.9 },
  { top: "-7%", left: "56%", length: 178, scale: 0.93, duration: 14.8, delay: -15.4 },
  { top: "17%", left: "66%", length: 128, scale: 0.69, duration: 15.3, delay: -3.4 },
  { top: "5%", left: "32%", length: 142, scale: 0.82, duration: 16.4, delay: -6.2 },
  { top: "-13%", left: "86%", length: 158, scale: 0.75, duration: 17.8, delay: -8.9 },
  { top: "21%", left: "52%", length: 98, scale: 0.54, duration: 18.2, delay: -11.6 },
  { top: "11%", left: "76%", length: 172, scale: 0.89, duration: 19.1, delay: -14.7 },
  { top: "28%", left: "42%", length: 112, scale: 0.63, duration: 9.3, delay: -17.2 },
];

/** Scatter directions for the impact burst, in px. */
const IMPACT_PARTICLES = [
  { px: "-22px", py: "10px" },
  { px: "-14px", py: "22px" },
  { px: "4px", py: "24px" },
  { px: "18px", py: "14px" },
  { px: "22px", py: "-6px" },
  { px: "-8px", py: "-16px" },
];

type MeteorStyle = CSSProperties &
  Record<"--meteor-top" | "--meteor-left" | "--meteor-length", string> &
  Record<"--meteor-scale" | "--meteor-duration" | "--meteor-delay", string> &
  Record<"--meteor-color", string>;

type ParticleStyle = CSSProperties & Record<"--px" | "--py", string>;

export function HeroMeteors() {
  return (
    <div
      aria-hidden="true"
      className="hero-meteor-field pointer-events-none absolute inset-y-0 left-0 w-[62%] overflow-hidden"
    >
      {METEORS.map((meteor, index) => {
        const style: MeteorStyle = {
          "--meteor-top": meteor.top,
          "--meteor-left": meteor.left,
          "--meteor-length": `${meteor.length}px`,
          "--meteor-scale": `${meteor.scale}`,
          "--meteor-duration": `${meteor.duration}s`,
          "--meteor-delay": `${meteor.delay}s`,
          // Alternate the two brand colours so the field never reads monochrome.
          "--meteor-color": index % 2 === 0 ? BLUE : LIME,
        };

        return (
          <div key={index} className="hero-meteor" style={style}>
            <div className="hero-meteor__streak" />
            <div className="hero-meteor__impact">
              <div className="hero-meteor__flash" />
              {IMPACT_PARTICLES.map((particle, particleIndex) => {
                const particleStyle: ParticleStyle = {
                  "--px": particle.px,
                  "--py": particle.py,
                };
                return (
                  <div
                    key={particleIndex}
                    className="hero-meteor__particle"
                    style={particleStyle}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
