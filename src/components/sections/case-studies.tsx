import Link from "next/link";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedHeading } from "@/components/motion/animated-heading";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

/**
 * An honest holding state. PROJECT_BRIEF.md §4 is explicit: build this only
 * with real content once the client provides it, and never fabricate results,
 * screenshots or client names — that is the current site's actual failure mode.
 */
export function CaseStudies() {
  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="relative w-full border-t border-border/70 bg-secondary/30 py-[clamp(4rem,9vh,7rem)]"
    >
      <SectionBackdrop variant="left" />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="section-eyebrow reveal text-sm font-medium tracking-[0.2em] text-primary uppercase">
          Proof
        </p>
        <AnimatedHeading
          id="case-studies-heading"
          text="Case studies, coming soon."
          className="mt-5 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-tight text-foreground font-heading"
        />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Much of our work is delivered under NDA for government, banking and
          healthcare clients. We are preparing a set of documented engagements
          for publication — until then, we would rather show you nothing than
          show you something invented.
        </p>

        <div className="reveal mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
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

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="h-12 px-8 text-base"
            render={<Link href="/contact">Request references</Link>}
          />
        </div>
      </div>
    </section>
  );
}
