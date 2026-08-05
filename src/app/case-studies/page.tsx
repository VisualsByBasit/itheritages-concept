import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { StackCards } from "@/components/motion/stack-cards";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

export const metadata: Metadata = {
  title: "Case Studies | IT Heritages",
  description:
    "Documented engagements are being prepared for publication. IT Heritages delivers much of its work under NDA for government, banking and healthcare clients.",
};

/**
 * Slots waiting on real engagements. Deliberately interchangeable and
 * unspecific — naming a sector or a result here would be exactly the
 * fabrication PROJECT_BRIEF.md §4 rules out.
 */
const PLACEHOLDER_ENGAGEMENTS = [
  {
    index: "Engagement 01",
    label: "Documented engagement",
    note: "Scope, architecture and outcome will be published here once the client has approved the write-up.",
  },
  {
    index: "Engagement 02",
    label: "Documented engagement",
    note: "Delivered under NDA. The technical detail is written and waiting on sign-off before it can be shown.",
  },
  {
    index: "Engagement 03",
    label: "Documented engagement",
    note: "Held back until the client confirms what may be named publicly — including whether they can be named at all.",
  },
];

/**
 * Holding state only. PROJECT_BRIEF.md §4 is explicit: build this with real
 * content once the client provides it, and never fabricate results,
 * screenshots or client names — that is the current site's actual failure mode.
 */
export default function CaseStudiesPage() {
  return (
    <article className="w-full">
      <header className="relative overflow-hidden border-b border-border/70 bg-background">
        <BackgroundBeams />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10">
          <p className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Proof
          </p>
          <AnimatedHeading
            as="h1"
            text="Case studies, coming soon."
            className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-tight text-foreground font-heading"
          />
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Much of our work is delivered under NDA for government, banking and
            healthcare clients. We are preparing a set of documented engagements
            for publication — until then, we would rather show you nothing than
            show you something invented.
          </p>
        </div>
      </header>

      <section className="relative border-b border-border/70">
        <SectionBackdrop variant="right" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          {/* The stacking mechanism, built now against the holding-state cards
              so it is ready when real engagements land. The copy stays honest:
              these are placeholders, and they say so. */}
          <StackCards>
            {PLACEHOLDER_ENGAGEMENTS.map((engagement, index) => (
              <div
                key={engagement.label}
                className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-6 shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--primary)_60%,transparent)] sm:p-8 md:grid-cols-[1fr_1.1fr] md:items-center"
              >
                {/* SWAP-WITH-REAL-PHOTO — src="/photos/case-<slug>.jpg" */}
                <PhotoFrame
                  label={engagement.label}
                  seed={index}
                  tone={index === 1 ? "lime" : "blue"}
                  className="h-48 sm:h-56"
                />
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {engagement.index}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground font-heading">
                    {engagement.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {engagement.note}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground">
                    <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    Awaiting client sign-off
                  </p>
                </div>
              </div>
            ))}
          </StackCards>

          <p className="reveal mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground">
            References for comparable engagements can be provided directly on
            request, subject to the relevant client&apos;s approval.
          </p>

          <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 px-8 text-base"
              render={<Link href="/contact">Request references</Link>}
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
      </section>
    </article>
  );
}
