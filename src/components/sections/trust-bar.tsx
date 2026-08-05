import { ClientMarquee } from "@/components/sections/client-marquee";
import { FloatingDots } from "@/components/ui/ornaments";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { CLIENT_ROWS } from "@/data/company";

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
            Clients
          </h2>

          {/* The certification pills and the "20+ years of combined expertise"
              line used to sit here. HeroCredentials now states both directly
              above this section, and hearing the same two facts twice inside
              one scroll made the second telling read as padding. This section
              is the client wall; the credentials are the hero's exit. */}
          <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
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
