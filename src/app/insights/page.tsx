import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Rss } from "lucide-react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { Button } from "@/components/ui/button";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

export const metadata: Metadata = {
  title: "Insights | IT Heritages",
  description:
    "Notes on infrastructure, cloud, cyber security and unified communications from the IT Heritages engineering team.",
};

/**
 * Index template, ready to receive real posts.
 *
 * The audit found exactly one genuine post on the live site and an otherwise
 * inactive blog, so nothing is invented here. That single post is listed as a
 * pending migration rather than linked, because its body has not been carried
 * across yet and a dead link would be worse than an honest note.
 */
const ARCHIVE = [
  {
    title: "5 Impactful Elements That Promote IT and Business",
    date: "23 April",
    category: "Marketing",
  },
];

export default function InsightsPage() {
  return (
    <article className="w-full">
      <header className="relative border-b border-border/70 bg-background">
        <SectionBackdrop variant="left" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10">
          <p className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Insights
          </p>
          <AnimatedHeading
            as="h1"
            text="Notes from the engineering team."
            className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-tight text-foreground font-heading"
          />
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Writing on infrastructure, cloud, cyber security and unified
            communications — drawn from work we have actually delivered. New
            pieces are in preparation.
          </p>
        </div>
      </header>

      <section className="relative border-b border-border/70">
        <SectionBackdrop variant="right" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <div className="reveal flex max-w-3xl flex-col items-start gap-5 rounded-2xl border border-dashed border-border bg-muted/40 p-8">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary"
            >
              <Rss className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-semibold tracking-tight text-foreground font-heading">
              No published articles yet
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              This index is built and ready. Articles will appear here as the
              team publishes them — we are not backfilling it with syndicated or
              generic industry commentary.
            </p>
          </div>

          {ARCHIVE.length > 0 ? (
            <div className="reveal mt-12">
              <h2 className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                Pending migration
              </h2>
              <ul className="mt-5 max-w-3xl space-y-3">
                {ARCHIVE.map((post) => (
                  <li
                    key={post.title}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <FileText
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-base font-medium text-foreground">
                        {post.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {post.date} · {post.category} · carried over from the
                        previous site, not yet republished
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-12 px-8 text-base"
              render={<Link href="/contact">Talk to an engineer</Link>}
            />
          </div>
        </div>
      </section>
    </article>
  );
}
