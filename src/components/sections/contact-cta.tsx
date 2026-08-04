import Link from "next/link";
import { Clock, Mail } from "lucide-react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Button } from "@/components/ui/button";
import { GradientStripes } from "@/components/ui/ornaments";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { CERTIFICATIONS } from "@/data/company";

/**
 * Conversion band, not a second footer — the full office and contact detail
 * already lives in the site footer directly below this.
 */
export function ContactCta() {
  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-cta-heading"
      className="relative w-full border-t border-border/70 bg-background py-[clamp(4rem,10vh,7.5rem)]"
    >
      <SectionBackdrop variant="center" />
      {/* Diagonal stripes behind the closing CTA — the page's last accent. */}
      <GradientStripes className="inset-x-0 top-1/3 h-64" opacity={0.55} />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <div className="reveal flex flex-col gap-10 rounded-3xl border border-border bg-secondary/40 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <AnimatedHeading
              id="contact-cta-heading"
              text="Start with a scoping conversation."
              className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-tight text-foreground font-heading"
            />
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Every engagement begins the same way — we scope the requirement
              with the people who own it before proposing any technology.
            </p>

            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                Mon–Fri, 09:00–18:00
              </li>
              <li className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:sales@itheritages.com"
                  className="transition-colors hover:text-foreground"
                >
                  sales@itheritages.com
                </a>
              </li>
              <li>{CERTIFICATIONS.join(" · ")} certified</li>
            </ul>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
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
              render={<a href="mailto:sales@itheritages.com">Email the team</a>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
