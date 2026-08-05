import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { INDUSTRIES } from "@/data/company";

export const metadata: Metadata = {
  title: "Industries | IT Heritages",
  description:
    "Twelve sectors served across Pakistan and the UK — government, banking and finance, healthcare, education, retail, oil and gas, utility, BPOs, telecom, media and aviation.",
};

export default function IndustriesHubPage() {
  return (
    <article className="w-full">
      <header className="relative overflow-hidden border-b border-border/70 bg-background">
        <BackgroundBeams />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10">
          <p className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Industries
          </p>
          <AnimatedHeading
            as="h1"
            text="Twelve sectors, one delivery standard."
            className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-tight text-foreground font-heading"
          />
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            The sectors IT Heritages serves across Islamabad, Lahore and the UK.
            Each vertical draws on the same ten practices — the mix changes, the
            engineering standard does not.
          </p>
          <p className="reveal mt-6 text-sm text-muted-foreground">
            {INDUSTRIES.length} sectors served
          </p>
        </div>
      </header>

      <section className="relative border-b border-border/70">
        <SectionBackdrop variant="left" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <IndustryGrid className="reveal" />
          <p className="reveal mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Semi-Govt Entities is part of the served list but does not yet have
            its own page.
          </p>
        </div>
      </section>

      <section className="relative">
        <SectionBackdrop variant="center" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3.5rem,7vh,5.5rem)] sm:px-10">
          <div className="reveal flex flex-col gap-6 rounded-3xl border border-border bg-secondary/40 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <AnimatedHeading
                text="Working in a sector we should know about?"
                className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-tight text-foreground font-heading"
              />
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Tell us what you are running and we will scope it against the
                practices that actually fit.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
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
                render={<Link href="/services">All Services</Link>}
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
