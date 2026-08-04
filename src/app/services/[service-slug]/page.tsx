import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ServiceVisual } from "@/components/sections/service-visuals";
import {
  INDUSTRY_LABELS,
  SERVICES,
  SERVICES_BY_SLUG,
  type ServiceAccent,
} from "@/data/services";

const ACCENT_VAR: Record<ServiceAccent, string> = {
  primary: "var(--primary)",
  success: "var(--success)",
  tertiary: "var(--accent-tertiary)",
  quaternary: "var(--accent-quaternary)",
};

type PageProps = {
  params: Promise<{ "service-slug": string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ "service-slug": service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "service-slug": slug } = await params;
  const service = SERVICES_BY_SLUG.get(slug);
  if (!service) return {};

  return {
    title: `${service.name} | IT Heritages`,
    description: service.positioning,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { "service-slug": slug } = await params;
  const service = SERVICES_BY_SLUG.get(slug);
  if (!service) notFound();

  const accent = ACCENT_VAR[service.accent];
  const industries = service.relatedIndustries.filter((id) => INDUSTRY_LABELS[id]);

  return (
    <article
      style={{ "--service-accent": accent } as React.CSSProperties}
      className="service-card w-full"
    >
      {/* 1 — Service hero. The motif is the same one used on the overview card,
             so the module reads continuously from homepage to detail page. */}
      <header className="border-b border-border/70 bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link href="/services" className="transition-colors hover:text-foreground">
              Services
            </Link>
            <span className="mx-2 text-border" aria-hidden="true">
              /
            </span>
            <span className="text-foreground">{service.name}</span>
          </nav>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              {service.status === "roadmap" ? (
                <span className="mb-5 inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--service-accent)_35%,var(--border))] px-2.5 py-1 text-xs font-medium tracking-wide text-[var(--service-accent)] uppercase">
                  Roadmap
                </span>
              ) : null}
              <h1 className="text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-tight text-foreground font-heading">
                {service.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {service.positioning}
              </p>
            </div>
            <div className="h-24 w-24 shrink-0 md:h-28 md:w-28">
              <ServiceVisual slug={service.slug} />
            </div>
          </div>
        </div>
      </header>

      {/* 2 — What it solves. Business framing, not a feature list. */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <h2 className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            What it solves
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
            {service.problem}
          </p>
        </div>
      </section>

      {/* 3 — What's included. The complete audited capability list, unabridged.
             A roadmap module has none, and says so rather than inventing any. */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <h2 className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            What&apos;s included
          </h2>

          {service.capabilities.length > 0 ? (
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {service.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-3 border-b border-border/60 pb-4 text-base text-foreground/90"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--service-accent)]"
                    aria-hidden="true"
                  />
                  {capability}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 max-w-3xl rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-base leading-relaxed text-muted-foreground">
              {service.roadmapNote}
            </p>
          )}

          <p className="mt-8 text-sm text-muted-foreground">
            Source: {service.source}.
          </p>
        </div>
      </section>

      {/* 4 — Related industries. Omitted entirely when there are none. */}
      {industries.length > 0 ? (
        <section className="border-b border-border/70">
          <div className="mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
            <h2 className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
              Related industries
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {industries.map((id) => (
                <li key={id}>
                  <Link
                    href={`/industries/${id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-[color-mix(in_srgb,var(--service-accent)_45%,var(--border))] hover:text-foreground"
                  >
                    {INDUSTRY_LABELS[id]}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 5 — CTA. */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-6 py-[clamp(3.5rem,7vh,5.5rem)] sm:px-10">
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-muted/40 p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-tight text-foreground font-heading">
                {service.status === "roadmap"
                  ? "Want to shape this practice?"
                  : `Talk to an engineer about ${service.name.toLowerCase()}.`}
              </h2>
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
                render={<Link href="/services">All Services</Link>}
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
