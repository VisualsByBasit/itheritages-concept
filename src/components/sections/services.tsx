import { AnimatedHeading } from "@/components/motion/animated-heading";
import { ServiceGrid } from "@/components/sections/service-grid";
import { DotGrid } from "@/components/ui/ornaments";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

export function Services() {
  return (
    <section
      id="services"
      className="relative w-full border-t border-border/70 bg-background py-[clamp(4rem,9vh,7rem)]"
    >
      <SectionBackdrop variant="left" />
      {/* Dot field tucked into the top-right corner, behind the heading block. */}
      <DotGrid className="top-0 right-0 h-64 w-[36rem]" origin="100% 0%" gap={20} />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="section-eyebrow reveal text-sm font-medium tracking-[0.2em] text-primary uppercase">
          Services
        </p>
        <AnimatedHeading
          text="Ten practice areas, delivered by one vendor-certified team."
          className="mt-5 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-tight text-foreground font-heading"
        />
        <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Architecture, design, deployment and operational implementation across
          infrastructure and cloud-based secure solutions — the same team, from
          the rack to the boardroom.
        </p>

        <ServiceGrid className="reveal mt-12" />
      </div>
    </section>
  );
}
