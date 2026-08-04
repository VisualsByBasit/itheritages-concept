import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";

import { AnimatedHeading } from "@/components/motion/animated-heading";
import { ContactTerminal } from "@/components/sections/contact-terminal";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { CERTIFICATIONS, EMAILS, HOURS, OFFICES } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact | IT Heritages",
  description:
    "Book a consultation with IT Heritages. Offices in Islamabad, Lahore and Coventry, UK. Mon–Fri 09:00–18:00.",
};

export default function ContactPage() {
  return (
    <article className="w-full">
      <header className="relative border-b border-border/70 bg-background">
        <SectionBackdrop variant="left" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,7vh,5.5rem)] sm:px-10">
          <p className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Contact
          </p>
          <AnimatedHeading
            as="h1"
            text="Start with a scoping conversation."
            className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-semibold tracking-tight text-foreground font-heading"
          />
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Tell us what you are running and what you need it to do. We scope
            the requirement with the people who own it before proposing any
            technology.
          </p>
          <ul className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              {HOURS}
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={`mailto:${EMAILS.sales}`}
                className="transition-colors hover:text-foreground"
              >
                {EMAILS.sales}
              </a>
            </li>
            <li>{CERTIFICATIONS.join(" · ")} certified</li>
          </ul>
        </div>
      </header>

      <section className="relative border-b border-border/70">
        <SectionBackdrop variant="right" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
                New enquiry
              </h2>
              <div className="mt-8">
                <ContactTerminal />
              </div>
            </div>

            <div>
              <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
                Direct
              </h2>
              <ul className="reveal mt-8 space-y-3">
                <li>
                  <a
                    href={`mailto:${EMAILS.general}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {EMAILS.general}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAILS.sales}`}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {EMAILS.sales}
                  </a>
                </li>
                {OFFICES.map((office) => (
                  <li key={`tel-${office.label}`}>
                    <a
                      href={`tel:${office.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>
                        {office.phone}
                        <span className="ml-2 text-muted-foreground">
                          {office.label}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <SectionBackdrop variant="split" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-[clamp(3rem,6vh,4.5rem)] sm:px-10">
          <h2 className="section-eyebrow text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Offices
          </h2>
          <AnimatedHeading
            text="Islamabad, Lahore, and Coventry."
            className="mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-tight text-foreground font-heading"
          />

          <ul className="reveal mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {OFFICES.map((office) => (
              <li
                key={office.label}
                className="flex flex-col rounded-2xl border border-border bg-card p-5"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {office.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {office.address}
                </p>
                <a
                  href={`tel:${office.phone.replace(/\s+/g, "")}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {office.phone}
                </a>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {HOURS}
                </p>
              </li>
            ))}
          </ul>

          {/* Map embed is wired in separately — marked, not faked. */}
          <div className="reveal mt-8">
            <ImagePlaceholder
              label="Map — three office locations"
              className="h-64"
            />
          </div>
        </div>
      </section>
    </article>
  );
}
