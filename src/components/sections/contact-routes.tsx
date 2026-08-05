import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CERTIFICATIONS, EMAILS, HOURS, OFFICES } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * The three ways into the company, as cards rather than the thin pill rows this
 * replaces — each states what you actually get before asking for the click.
 *
 * Every bullet is a verified fact from `@/data/company`: the office list, the
 * published hours, the two real mailboxes and the certifications the audit
 * confirms. Nothing here promises a response time or a service level, because
 * none is documented anywhere and inventing one would be a commitment made on
 * the client's behalf.
 *
 * Lime carries the checkmarks — PROJECT_BRIEF.md §3 reserves it for exactly
 * this kind of confirmation state rather than decorative filler.
 */

type Route = {
  title: string;
  summary: string;
  points: string[];
  cta: { label: string; href: string };
  /** The recommended path gets the solid button and a blue edge. */
  primary?: boolean;
};

const ROUTES: Route[] = [
  {
    title: "Scoping call",
    summary: "The normal way in, and the one we would suggest.",
    points: [
      "Scoped with an engineer, not a sales desk",
      `${HOURS}`,
      `${CERTIFICATIONS.join(" · ")} certified team`,
    ],
    cta: { label: "Book a consultation", href: "#new-enquiry" },
    primary: true,
  },
  {
    title: "Email us",
    summary: "For written requirements, tenders and RFPs.",
    points: [
      `${EMAILS.sales} — new engagements`,
      `${EMAILS.general} — everything else`,
      "Attach an existing spec and we will work from it",
    ],
    cta: { label: `Email ${EMAILS.sales}`, href: `mailto:${EMAILS.sales}` },
  },
  {
    title: "Call an office",
    summary: "Three offices, one engineering team.",
    points: OFFICES.map((office) => `${office.label} — ${office.phone}`),
    cta: { label: `Call ${OFFICES[0].phone}`, href: `tel:${OFFICES[0].phone.replace(/\s+/g, "")}` },
  },
];

export function ContactRoutes({ className }: { className?: string }) {
  return (
    <ul className={cn("reveal space-y-4", className)}>
      {ROUTES.map((route) => (
        <li
          key={route.title}
          className={cn(
            "rounded-2xl border bg-secondary/70 p-5",
            "transition-[border-color,box-shadow] duration-300 ease-out",
            route.primary
              ? "border-primary/35 shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--primary)_60%,transparent)]"
              : "border-border hover:border-primary/30"
          )}
        >
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {route.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {route.summary}
          </p>

          <ul className="mt-4 space-y-2.5">
            {route.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/85">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  strokeWidth={2.5}
                />
                {point}
              </li>
            ))}
          </ul>

          <Button
            size="lg"
            nativeButton={false}
            variant={route.primary ? "default" : "outline"}
            className="mt-5 h-11 w-full text-sm font-semibold"
            render={<a href={route.cta.href}>{route.cta.label}</a>}
          />
        </li>
      ))}
    </ul>
  );
}
