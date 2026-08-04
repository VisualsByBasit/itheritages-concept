import Image from "next/image";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { PARTNERS } from "@/data/company";

/**
 * Vendor partners — the platforms the practices are built on. Deliberately a
 * calm static grid rather than a second marquee, so it reads as a different
 * kind of proof from the client logos scrolling further up the page.
 */
export function Partners() {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="relative w-full border-t border-border/70 bg-background py-[clamp(3.5rem,8vh,6rem)]"
    >
      <SectionBackdrop variant="right" />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:gap-16">
          <div>
            <p className="section-eyebrow reveal text-sm font-medium tracking-[0.2em] text-primary uppercase">
              Partners
            </p>
            <AnimatedHeading
              id="partners-heading"
              text="Partners trust IT Heritages."
              className="mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-tight text-foreground font-heading"
            />
            <p className="reveal mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              We design and deploy on the platforms our clients already run —
              with vendor-certified engineers on staff rather than
              subcontracted in.
            </p>
          </div>

          <ul className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {PARTNERS.map((partner) => (
              <li
                key={partner.file}
                className="group flex h-28 items-center justify-center bg-card px-6 transition-colors duration-300 hover:bg-muted/50"
              >
                <Image
                  src={`/clients/partners/${partner.file}.png`}
                  alt={partner.name}
                  width={220}
                  height={110}
                  /* Supplied crops carry a near-white backing rather than true
                     transparency; multiply drops it into the card surface. */
                  className="h-auto max-h-11 w-auto max-w-full object-contain opacity-75 mix-blend-multiply transition-[opacity,transform] duration-300 group-hover:scale-105 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
