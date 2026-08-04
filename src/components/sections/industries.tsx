import { AnimatedHeading } from "@/components/motion/animated-heading";
import { IndustryGrid } from "@/components/sections/industry-grid";
import { SketchLines } from "@/components/ui/ornaments";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

export function Industries() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative w-full border-t border-border/70 bg-background py-[clamp(4rem,9vh,7rem)]"
    >
      <SectionBackdrop variant="split" />
      {/* Sketch strokes arcing past the heading, lime as the second voice. */}
      <SketchLines
        variant="arc"
        tone="lime"
        className="top-10 right-[6%] hidden h-40 w-40 lg:block"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="section-eyebrow reveal text-sm font-medium tracking-[0.2em] text-primary uppercase">
          Industries
        </p>
        <AnimatedHeading
          id="industries-heading"
          text="Built for regulated, mission-critical sectors."
          className="mt-5 max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-tight text-foreground font-heading"
        />
        <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Twelve sectors across Pakistan and the UK — from government and
          banking to BPOs and aviation. Hover a sector to see which practices
          we bring to it.
        </p>

        <IndustryGrid className="reveal mt-12" />
      </div>
    </section>
  );
}
