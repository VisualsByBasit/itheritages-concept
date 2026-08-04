import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TiltCard } from "@/components/motion/tilt-card";
import { INDUSTRIES, servicesForIndustry } from "@/data/company";
import { cn } from "@/lib/utils";

const CARD = cn(
  "group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5",
  "transition-[transform,box-shadow,border-color] duration-300 ease-out",
  "motion-reduce:transition-none"
);

const INTERACTIVE = cn(
  "hover:-translate-y-1 hover:border-primary/45",
  "hover:shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--primary)_60%,transparent)]",
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30",
  "motion-reduce:hover:translate-y-0"
);

/**
 * The reveal: which practices IT Heritages brings to this vertical. Derived by
 * inverting the service data — the audit contains no per-industry copy, so
 * anything written here per sector would be invented.
 */
function Delivers({ slug }: { slug: string | null }) {
  const services = servicesForIndustry(slug);
  if (services.length === 0) return null;

  return (
    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
      <div className="overflow-hidden">
        <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-border/70 pt-4">
          {services.slice(0, 4).map((service) => (
            <li
              key={service.slug}
              className="rounded-full bg-muted px-2.5 py-1 text-xs text-foreground/75"
            >
              {service.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Shared by the homepage Industries section and the /industries hub. */
export function IndustryGrid({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {INDUSTRIES.map((industry) => {
        const inner = (
          <>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {industry.name}
              </h3>
              {industry.slug ? (
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <Delivers slug={industry.slug} />
          </>
        );

        return (
          <li key={industry.name}>
            {industry.slug ? (
              <TiltCard className="h-full" maxTilt={6}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className={cn(CARD, INTERACTIVE)}
                >
                  {inner}
                </Link>
              </TiltCard>
            ) : (
              // In the audited list but with no route confirmed yet, so it is
              // shown without a dead link rather than dropped.
              <div className={CARD}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
