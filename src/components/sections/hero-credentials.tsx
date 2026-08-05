import { Building2, ShieldCheck, Wrench } from "lucide-react";

import { StackCards } from "@/components/motion/stack-cards";
import { CERTIFICATIONS, OFFICES, STATS } from "@/data/company";

/**
 * The scroll transition out of the hero: three credential cards that stack and
 * pin as you leave it.
 *
 * The hero claims "engineered by certified architects". These are the three
 * verified things standing behind that claim, so the transition earns its
 * scroll rather than decorating it. Every value is read from `@/data/company`
 * rather than retyped — the certification codes, the founding year and combined
 * expertise from STATS, and the office count from OFFICES — so this cannot
 * drift from the rest of the site.
 *
 * The certification acronyms are deliberately left unexpanded: CONTENT_AUDIT
 * records MSCP appearing as MCSE in one place and needing client confirmation,
 * and spelling them out here would be guessing at a credential.
 *
 * Shape differs from the Case Studies stack on purpose. These are wide, short
 * credential bands on a 68vh travel, so the sequence resolves in roughly one
 * screen of scrolling — a bridge between two sections, not a destination.
 */

const founded = STATS.find((stat) => stat.label === "Founded");
const expertise = STATS.find(
  (stat) => stat.label === "Years of combined expertise"
);

const CREDENTIALS = [
  {
    icon: ShieldCheck,
    eyebrow: "Certified",
    headline: CERTIFICATIONS.join(" · "),
    body: "The certifications sit with the engineers who do the work, not with the company badge. The same team scopes, architects and implements.",
  },
  {
    icon: Wrench,
    eyebrow: "Experienced",
    headline: `${expertise?.display ?? "20+"} years of combined expertise`,
    body: `${expertise?.detail ?? "Architecture, design, deployment and operational implementation"} — building since ${founded?.display ?? "2018"}.`,
  },
  {
    icon: Building2,
    eyebrow: "Present",
    headline: `${OFFICES.length} offices, two countries`,
    body: OFFICES.map((office) => office.label).join(" · "),
  },
];

export function HeroCredentials() {
  return (
    <section
      aria-label="Credentials behind the work"
      className="relative w-full bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <StackCards slotHeight="68vh" topOffset="7rem" stagger={10}>
          {CREDENTIALS.map((credential) => {
            const Icon = credential.icon;
            return (
              <div
                key={credential.eyebrow}
                className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-[0_20px_44px_-28px_color-mix(in_srgb,var(--primary)_65%,transparent)] sm:p-8 md:grid-cols-[1fr_1.25fr] md:gap-10"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                      {credential.eyebrow}
                    </p>
                    <p className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] font-semibold tracking-tight text-foreground font-heading">
                      {credential.headline}
                    </p>
                  </div>
                </div>

                <p className="text-base leading-relaxed text-muted-foreground md:border-l md:border-border/70 md:pl-10">
                  {credential.body}
                </p>
              </div>
            );
          })}
        </StackCards>
      </div>
    </section>
  );
}
