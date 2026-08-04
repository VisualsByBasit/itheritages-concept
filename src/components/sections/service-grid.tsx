import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TiltCard } from "@/components/motion/tilt-card";
import { ServiceVisual } from "@/components/sections/service-visuals";
import { SERVICES, type Service, type ServiceAccent } from "@/data/services";
import { cn } from "@/lib/utils";

/** Maps the brand accent tokens onto the CSS variable each motif reads. */
export const ACCENT_VAR: Record<ServiceAccent, string> = {
  primary: "var(--primary)",
  success: "var(--success)",
  tertiary: "var(--accent-tertiary)",
  quaternary: "var(--accent-quaternary)",
};

/**
 * The service card grid, shared by the homepage section and the /services hub
 * so the two never drift apart visually.
 */
export function ServiceGrid({
  services = SERVICES,
  className,
}: {
  services?: Service[];
  className?: string;
}) {
  return (
    <ul className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", className)}>
      {services.map((service) => (
        <li key={service.slug}>
          <TiltCard className="h-full">
            <Link
              href={service.href}
              style={
                { "--service-accent": ACCENT_VAR[service.accent] } as React.CSSProperties
              }
              className={cn(
                "service-card group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-7",
                "transition-[transform,box-shadow,border-color] duration-300 ease-out",
                "hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--service-accent)_45%,var(--border))] hover:shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--service-accent)_60%,transparent)]",
                "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[color-mix(in_srgb,var(--service-accent)_35%,transparent)]",
                "motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="h-14 w-14 shrink-0">
                  <ServiceVisual slug={service.slug} />
                </div>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-colors duration-300 group-hover:text-[var(--service-accent)]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground font-heading">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.positioning}
              </p>

              {service.status === "roadmap" ? (
                <span className="mt-4 inline-flex w-fit items-center rounded-full border border-[color-mix(in_srgb,var(--service-accent)_35%,var(--border))] px-2.5 py-1 text-xs font-medium tracking-wide text-[var(--service-accent)] uppercase">
                  Roadmap
                </span>
              ) : null}

              {/* The expand: 0fr → 1fr animates the reveal to its natural
                  height without hardcoding one. Opens on keyboard focus too. */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
                <div className="overflow-hidden">
                  {service.highlights.length > 0 ? (
                    <ul className="mt-5 space-y-2 border-t border-border/70 pt-4">
                      {service.highlights.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-2.5 text-sm text-foreground/80"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--service-accent)]"
                          />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 border-t border-border/70 pt-4 text-sm leading-relaxed text-muted-foreground">
                      {service.roadmapNote}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </TiltCard>
        </li>
      ))}
    </ul>
  );
}
