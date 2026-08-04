import Link from "next/link";
import { MessageSquare } from "lucide-react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { AdvisorMockup } from "@/components/sections/advisor-mockup";
import { Button } from "@/components/ui/button";
import { GradientStripes } from "@/components/ui/ornaments";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

/**
 * Callout for the ITH Advisor described in PROJECT_BRIEF.md §5. The assistant
 * itself is a separate build; this section states its real scope — services,
 * industries, cyber/cloud/AI questions, consultation booking — and nothing it
 * cannot actually answer.
 */
const SCOPE = [
  "Which practice fits a given requirement",
  "Sector-specific solution sets across the 12 industries served",
  "Cyber security, cloud and infrastructure questions",
  "Booking a consultation with an engineer",
];

export function AiAdvisor() {
  return (
    <section
      id="advisor"
      aria-labelledby="advisor-heading"
      className="relative w-full border-t border-border/70 bg-background py-[clamp(4rem,9vh,7rem)]"
    >
      <SectionBackdrop variant="split" />
      {/* Stripes running behind the advisor card — blue-led, violet as the
          rare partner, since this section is the AI moment. */}
      <GradientStripes
        pair="blue-violet"
        className="inset-x-0 top-1/4 h-52"
        opacity={0.45}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="reveal grid grid-cols-1 items-center gap-10 rounded-3xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.2em] text-primary uppercase">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              ITH Advisor
            </p>
            <AnimatedHeading
              id="advisor-heading"
              text="Ask a solutions architect, not a support bot."
              className="mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-tight text-foreground font-heading"
            />
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The advisor answers from our actual service and industry
              coverage — it will tell you when something falls outside what we
              deliver rather than guessing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                render={<Link href="/services">Browse services</Link>}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Offset so the mockup sits slightly proud of the copy column. */}
            <AdvisorMockup className="lg:-mt-8 lg:translate-x-4 lg:rotate-1 motion-reduce:lg:rotate-0" />
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {SCOPE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
