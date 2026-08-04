import { ShieldCheck } from "lucide-react";

import { ClientMarquee } from "@/components/sections/client-marquee";
import { FloatingDots } from "@/components/ui/ornaments";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { CERTIFICATIONS, CLIENT_ROWS } from "@/data/company";

export function TrustBar() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="relative w-full border-t border-border/70 bg-secondary/30 py-[clamp(3rem,7vh,5rem)]"
    >
      <SectionBackdrop variant="right" />
      {/* Hero-adjacent: a few drifting dots carry the meteor field's DNA down. */}
      <FloatingDots />

      <div className="relative">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <h2 id="trust-heading" className="sr-only">
            Certifications and clients
          </h2>

          <div className="reveal flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap items-center gap-3">
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
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A vendor-certified engineering team, with 20+ years of combined
              expertise across infrastructure and cloud.
            </p>
          </div>

          <p className="mt-12 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Trusted by
          </p>
        </div>

        {/* Full-bleed so logos travel edge to edge rather than inside the grid. */}
        <div className="mt-6 space-y-2">
          <ClientMarquee
            clients={CLIENT_ROWS[0]}
            direction="to-right"
            durationSeconds={52}
          />
          <ClientMarquee
            clients={CLIENT_ROWS[1]}
            direction="to-left"
            durationSeconds={44}
          />
        </div>
      </div>
    </section>
  );
}
