import type { Metadata } from "next";
import Link from "next/link";
import { Award, Phone, ShieldCheck } from "lucide-react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { PracticeParallax } from "@/components/sections/practice-parallax";
import { HeritageObjectLazy } from "@/components/three/heritage-object-lazy";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SketchLines } from "@/components/ui/ornaments";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import {
  CERTIFICATIONS,
  HOURS,
  MILESTONES,
  OFFICES,
  RECOGNITION,
} from "@/data/company";

export const metadata: Metadata = {
  title: "About Us | IT Heritages",
  description:
    "Founded in 2018, IT Heritages is a CCIE, MSCP and CTS-certified systems integrator with offices in Islamabad, Lahore and Coventry, UK.",
};

export default function AboutPage() {
  return (
    <article className="w-full">
      {/* This hero previously ran three ambient effects at once — morphing
          blobs, a dot field and drifting dots. Beams replace all three: one
          signature effect per section, and three competing ones read as noise
          behind the 3D mark rather than as depth. */}
      <header className="relative overflow-hidden border-b border-border/70 bg-background">
        <BackgroundBeams />

        {/* Asymmetric split: copy on the left rail, the 3D mark holding the
            right and bleeding past the container edge. */}
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-4">
          <div>
            <p className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
              About Us
            </p>
            <AnimatedHeading
              as="h1"
              text="A systems integrator, built around certified engineers."
              className="mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-tight text-foreground font-heading"
            />
            <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              IT Heritages designs, deploys and manages infrastructure, cloud,
              cyber security and communications systems for enterprise,
              government and healthcare organisations — from Islamabad, Lahore
              and Coventry.
            </p>
          </div>

          <div className="relative -mx-6 aspect-square sm:-mx-10 lg:mx-0 lg:h-[30rem] lg:w-[30rem] lg:translate-x-10">
            <HeritageObjectLazy />
          </div>
        </div>
      </header>

      {/* Chapter headings are the company's own; the bodies are written from
          verified facts, not the template copy the audit flagged. */}
      <section className="relative border-b border-border/70">
        <SectionBackdrop variant="right" />
        <SketchLines
          variant="corner"
          className="top-12 right-[8%] hidden h-32 w-32 lg:block"
          opacity={0.24}
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            The story so far
          </h2>

          <ol className="reveal mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {MILESTONES.map((milestone) => (
              <li key={milestone.period} className="flex flex-col bg-card p-6 sm:p-8">
                <span className="text-sm font-semibold tracking-wide text-primary">
                  {milestone.period}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground font-heading">
                  {milestone.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {milestone.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative border-b border-border/70">
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
                Certified
              </h2>
              <AnimatedHeading
                text="Credentials that sit with the engineers, not the brochure."
                className="mt-5 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-tight text-foreground font-heading"
              />
              <ul className="reveal mt-8 flex flex-wrap items-center gap-3">
                {CERTIFICATIONS.map((code) => (
                  <li
                    key={code}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"
                  >
                    <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-sm font-semibold tracking-wide text-foreground">
                      {code}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="reveal mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Delivery is documented to ITIL practice, including SAD, LLD and
                HLD deliverables on every engagement.
              </p>
            </div>

            <div>
              <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
                Recognised for
              </h2>
              <ul className="reveal mt-8 space-y-3">
                {RECOGNITION.map((area) => (
                  <li
                    key={area}
                    className="flex items-start gap-3 border-b border-border/60 pb-3 text-base text-foreground/90"
                  >
                    <Award
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    {area}
                  </li>
                ))}
              </ul>
              <p className="reveal mt-6 text-sm leading-relaxed text-muted-foreground">
                Best of Class Technology recognition across these areas over
                six-plus years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Follows "Certified" deliberately — this is what that certified team
          actually covers, shown through the service motifs. */}
      <PracticeParallax />

      <section className="relative border-b border-border/70">
        <SectionBackdrop variant="split" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Where we work
          </h2>
          <AnimatedHeading
            text="Three offices, two countries."
            className="mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-tight text-foreground font-heading"
          />

          <ul className="reveal mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {OFFICES.map((office, index) => (
              <li
                key={office.label}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
              >
                {/* SWAP-WITH-REAL-PHOTO — add the office photo to public/photos/
                    and pass src="/photos/office-<city>.jpg". */}
                <PhotoFrame
                  label={office.label}
                  tone={index === 1 ? "lime" : "blue"}
                  seed={index}
                  className="h-40"
                />
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {office.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {office.address}
                  </p>
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, "")}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {office.phone}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="reveal mt-6 text-sm text-muted-foreground">{HOURS}</p>
        </div>
      </section>

      {/* No leadership or headcount data exists in the audit, and the live
          site's "Leadership Member" link goes nowhere — so this stays an
          honest gap rather than invented bios. */}
      <section className="relative border-b border-border/70">
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            The team
          </h2>
          {/* Offset pair: text sits low, image runs tall and breaks upward. */}
          <div className="reveal mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <blockquote className="border-l-4 border-primary pl-6 sm:pl-8">
              <p className="text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.22] font-semibold tracking-tight text-foreground font-heading">
                Every engagement is delivered by vendor-certified engineers —
                never subcontracted out.
              </p>
              <footer className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Individual profiles are being prepared with the team and will be
                published here.
              </footer>
            </blockquote>
            {/* SWAP-WITH-REAL-PHOTO — src="/photos/team-islamabad.jpg" */}
            <PhotoFrame
              label="The team — Islamabad"
              tone="violet"
              seed={3}
              className="h-64 lg:-mt-16 lg:h-80"
            />
          </div>
        </div>
      </section>

      <section className="relative">
        <SectionBackdrop variant="center" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3.5rem,7vh,5.5rem)] sm:px-10">
          <div className="reveal flex flex-col gap-6 rounded-3xl border border-border bg-secondary/40 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <AnimatedHeading
                text="Work with the engineers who build it."
                className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-tight text-foreground font-heading"
              />
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {CERTIFICATIONS.join(" · ")} certified. {HOURS}.
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
