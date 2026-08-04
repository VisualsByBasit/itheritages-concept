import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Button } from "@/components/ui/button";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

export const metadata: Metadata = {
  title: "Case Studies | IT Heritages",
  description:
    "Documented engagements are being prepared for publication. IT Heritages delivers much of its work under NDA for government, banking and healthcare clients.",
};

/**
 * Holding state only. PROJECT_BRIEF.md §4 is explicit: build this with real
 * content once the client provides it, and never fabricate results,
 * screenshots or client names — that is the current site's actual failure mode.
 */
export default function CaseStudiesPage() {
  return (
    <article className="w-full">
      <header className="relative border-b border-border/70 bg-background">
        <SectionBackdrop variant="left" />

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
          <div className="reveal grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              "Case study — engagement 1",
              "Case study — engagement 2",
              "Case study — engagement 3",
            ].map((label, index) => (
              <div
                key={label}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
              >
                {/* SWAP-WITH-REAL-PHOTO — src="/photos/case-<slug>.jpg" */}
                <PhotoFrame label={label} seed={index} tone={index === 1 ? "lime" : "blue"} className="h-40" />
                <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Awaiting client sign-off
                </p>
              </div>
            ))}
          </div>

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
