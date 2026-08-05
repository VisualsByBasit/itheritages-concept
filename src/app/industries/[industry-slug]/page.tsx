import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ClipboardList } from "lucide-react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { ServiceGrid } from "@/components/sections/service-grid";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import {
  INDUSTRY_BY_SLUG,
  ROUTED_INDUSTRIES,
  servicesForIndustry,
} from "@/data/company";

type PageProps = {
  params: Promise<{ "industry-slug": string }>;
};

export function generateStaticParams() {
  return ROUTED_INDUSTRIES.map((industry) => ({ "industry-slug": industry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "industry-slug": slug } = await params;
  const industry = INDUSTRY_BY_SLUG.get(slug);
  if (!industry) return {};

  return {
    title: `${industry.name} | IT Heritages`,
    description: `Infrastructure, cloud, cyber security and communications delivered for ${industry.name.toLowerCase()} organisations across Pakistan and the UK.`,
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { "industry-slug": slug } = await params;
  const industry = INDUSTRY_BY_SLUG.get(slug);
  if (!industry) notFound();

  const services = servicesForIndustry(industry.slug);

  return (
    <article className="w-full">
      {/* 1 — Industry hero. */}
      <header className="relative overflow-hidden border-b border-border/70 bg-background">
        <BackgroundBeams />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link href="/industries" className="transition-colors hover:text-foreground">
              Industries
            </Link>
            <span className="mx-2 text-border" aria-hidden="true">
              /
            </span>
            <span className="text-foreground">{industry.name}</span>
          </nav>

          <AnimatedHeading
            as="h1"
            text={industry.name}
            className="text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-tight text-foreground font-heading"
          />
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            One of the twelve sectors IT Heritages serves from Islamabad, Lahore
            and Coventry — delivered by the same CCIE, MSCP and CTS-certified
            engineering team that runs every other practice.
          </p>
        </div>
      </header>

      {/* 2 — Sector-specific challenges.
             The audit documents the served-industry list and nothing more: no
             sector challenges, no vertical case work, no per-industry claims.
             Writing them here would be exactly the invented filler the rebuild
             exists to remove, so the gap is stated instead. */}
      <section className="relative border-b border-border/70">
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Sector challenges
          </h2>
          <div className="reveal mt-8 flex max-w-3xl items-start gap-4 rounded-2xl border border-dashed border-border bg-muted/40 p-6">
            <ClipboardList
              className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-base leading-relaxed text-muted-foreground">
              We are documenting the {industry.name.toLowerCase()} challenges we
              actually solve, drawn from live engagements rather than sector
              boilerplate. Until that is signed off with the teams who delivered
              the work, this section stays empty on purpose.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Recommended solution set, mapped back to the ten services. */}
      <section className="relative border-b border-border/70">
        <SectionBackdrop variant="left" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Recommended solution set
          </h2>
          <AnimatedHeading
            text={`The practices we bring to ${industry.name.toLowerCase()}.`}
            className="mt-5 max-w-3xl text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-tight text-foreground font-heading"
          />

          {services.length > 0 ? (
            <ServiceGrid services={services} className="reveal mt-10" />
          ) : (
            <p className="reveal mt-8 max-w-3xl rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-base leading-relaxed text-muted-foreground">
              No practice mapping is confirmed for this sector yet.
            </p>
          )}

          <p className="reveal mt-8 text-sm text-muted-foreground">
            Showing {services.length} of 10 practices.{" "}
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
              See all services
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* 4 — CTA. */}
      <section className="relative">
        <SectionBackdrop variant="center" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3.5rem,7vh,5.5rem)] sm:px-10">
          <div className="reveal flex flex-col gap-6 rounded-3xl border border-border bg-secondary/40 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <AnimatedHeading
                text={`Talk to an engineer about ${industry.name.toLowerCase()}.`}
                className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-tight text-foreground font-heading"
              />
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                CCIE, MSCP and CTS-certified. Offices in Islamabad, Lahore and
                Coventry, UK.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
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
                render={<Link href="/industries">All Industries</Link>}
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
