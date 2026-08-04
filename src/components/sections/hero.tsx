import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroGrid } from "@/components/sections/hero-grid";
import { HeroMeteors } from "@/components/sections/hero-meteors";

/**
 * Soft white wash under the copy. The page is already white, so this reads as
 * a mask that holds the backdrop away from the text rather than as a glow.
 */
const TEXT_GLOW =
  "radial-gradient(ellipse 52% 46% at 28% 46%, rgba(255,255,255,0.9) 0%, rgba(252,252,253,0.58) 42%, rgba(241,241,243,0) 72%)";

export function Hero() {
  return (
    // Height subtracts the sticky 4.5rem header, otherwise the section centres
    // its content against a viewport 72px taller than the space it actually has
    // and the bottom of the hero gets pushed under the fold.
    <section className="relative flex min-h-[calc(100svh-4.5rem)] w-full flex-col justify-center overflow-hidden bg-background pt-[clamp(1.5rem,5vh,4rem)] pb-[clamp(5rem,11vh,7.5rem)]">
      <HeroMeteors />
      <HeroGrid />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: TEXT_GLOW }}
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="mb-[clamp(0.75rem,2vh,1.5rem)] text-sm font-medium tracking-[0.2em] text-primary uppercase">
          CCIE · MSCP · CTS Certified Systems Integrator
        </p>
        <h1 className="max-w-4xl text-[clamp(2.5rem,6.2vw,5.75rem)] leading-[0.98] font-semibold tracking-tight text-foreground font-heading">
          Enterprise technology, engineered by certified architects.
        </h1>
        <p className="mt-[clamp(1.25rem,3vh,2rem)] max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          IT Heritages designs, deploys, and manages the infrastructure,
          cloud, security, and communications systems that government,
          banking, and healthcare enterprises run on — from Islamabad,
          Lahore, and the UK.
        </p>
        <div className="mt-[clamp(1.5rem,3.5vh,2.5rem)] flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            className="h-12 px-8 text-base"
            render={<Link href="/contact">Book a Consultation</Link>}
          />
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="h-12 px-8 text-base"
            render={<Link href="/services">Explore Services</Link>}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[clamp(1.25rem,3.5vh,2.5rem)] z-10 flex flex-col items-center gap-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </div>
    </section>
  );
}
