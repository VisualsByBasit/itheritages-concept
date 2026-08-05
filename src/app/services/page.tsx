import type { Metadata } from "next";
import Link from "next/link";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { ServiceGrid } from "@/components/sections/service-grid";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { CERTIFICATIONS } from "@/data/company";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | IT Heritages",
  description:
    "Ten practice areas across infrastructure, cloud, cyber security, unified communications and managed services — delivered by a CCIE, MSCP and CTS-certified team.",
};

export default function ServicesHubPage() {
  return (
    <article className="w-full">
      {/* The services hub is the core of the site per the brief, so it gets the
          signature effect in place of this hero's blobs. */}
      <header className="relative overflow-hidden border-b border-border/70 bg-background">
        <BackgroundBeams />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10">
          <p className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Services
          </p>
          <AnimatedHeading
            as="h1"
            text="Ten practice areas, one accountable team."
            className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-tight text-foreground font-heading"
          />
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Architecture, design, deployment and operational implementation
            across infrastructure and cloud-based secure solutions. The same
            vendor-certified engineers carry a requirement from scoping through
            to supported implementation.
          </p>
          <p className="reveal mt-6 text-sm text-muted-foreground">
            {CERTIFICATIONS.join(" · ")} certified · {SERVICES.length} practices
          </p>
        </div>
      </header>

      <section className="relative border-b border-border/70">
        <SectionBackdrop variant="right" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <ServiceGrid className="reveal" />
        </div>
      </section>

      <section className="relative">
        <SectionBackdrop variant="center" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3.5rem,7vh,5.5rem)] sm:px-10">
          <div className="reveal flex flex-col gap-6 rounded-3xl border border-border bg-secondary/40 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <AnimatedHeading
                text="Not sure which practice you need?"
                className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-tight text-foreground font-heading"
              />
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Every engagement starts by scoping the requirement with the
                people who own it — before any technology is proposed.
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
                render={<Link href="/industries">Browse Industries</Link>}
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
