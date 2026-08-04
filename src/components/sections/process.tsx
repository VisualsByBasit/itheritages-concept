import { AnimatedHeading } from "@/components/motion/animated-heading";
import { ProcessIsometric } from "@/components/sections/process-isometric";
import { SketchLines } from "@/components/ui/ornaments";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { PROCESS_STEPS } from "@/data/company";

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative w-full border-t border-border/70 bg-secondary/30 py-[clamp(4rem,9vh,7rem)]"
    >
      <SectionBackdrop variant="right" />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        {/* Asymmetric split: copy holds the left rail, the isometric carries
            the right and is allowed to overflow its column. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-8">
          <div>
            <p className="section-eyebrow reveal text-sm font-medium tracking-[0.2em] text-primary uppercase">
              How we work
            </p>
            <AnimatedHeading
              id="process-heading"
              text="Four steps, from enquiry to supported implementation."
              className="mt-5 max-w-xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold tracking-tight text-foreground font-heading"
            />
            <p className="reveal mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              The same methodology runs across every practice — scoped,
              architected, proven, then implemented and supported.
            </p>
          </div>

          <div className="reveal -mx-6 lg:mx-0 lg:translate-x-8">
            <ProcessIsometric className="h-auto w-full" />
          </div>
        </div>

        {/* Oversized numerals break the grid and set the rhythm. */}
        <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.title} className="reveal relative">
              <span
                aria-hidden="true"
                className="block text-[clamp(4rem,7vw,6.5rem)] leading-[0.8] font-semibold tracking-tighter text-primary/15 tabular-nums font-heading"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-4 border-t-2 border-primary/25 pt-5">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs font-medium tracking-wide text-muted-foreground/80 uppercase">
                  {step.aside}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Pull-quote moment. */}
        <div className="relative mt-20">
          {/* A drawn swoop trailing off the end of the pull-quote. */}
          <SketchLines
            variant="swoop"
            className="top-2 right-0 hidden h-16 w-52 lg:block"
            opacity={0.24}
          />
          <blockquote className="reveal max-w-4xl border-l-4 border-success pl-6 sm:pl-10">
            <p className="text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.18] font-semibold tracking-tight text-foreground font-heading">
              Documented to ITIL practice — every engagement ships with SAD, LLD
              and HLD deliverables.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
