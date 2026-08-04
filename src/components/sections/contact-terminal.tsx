"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EMAILS } from "@/data/company";
import { SERVICES } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Multi-step enquiry, styled as a command-line session per PROJECT_BRIEF.md's
 * contact direction. Kept on a light surface so it reads as a Stripe-style
 * code panel rather than importing a dark theme the brief rules out.
 *
 * There is no backend yet, so the final step composes a pre-filled mailto: to
 * sales@ rather than posting to an endpoint that does not exist. Swap
 * `buildMailto` for a real submit handler once an API route is in place.
 */

const CONTACT_METHODS = ["Email", "Phone", "Either"] as const;
type ContactMethod = (typeof CONTACT_METHODS)[number];

const STEPS = ["Needs", "Details", "Contact"] as const;

type FormState = {
  needs: string[];
  name: string;
  company: string;
  email: string;
  phone: string;
  method: ContactMethod;
  message: string;
};

const EMPTY: FormState = {
  needs: [],
  name: "",
  company: "",
  email: "",
  phone: "",
  method: "Email",
  message: "",
};

function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-sm text-muted-foreground">
      <span className="mr-2 text-primary" aria-hidden="true">
        $
      </span>
      {children}
    </p>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-3 focus:ring-primary/20"
      />
    </label>
  );
}

export function ContactTerminal() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const toggleNeed = (name: string) =>
    setForm((current) => ({
      ...current,
      needs: current.needs.includes(name)
        ? current.needs.filter((item) => item !== name)
        : [...current.needs, name],
    }));

  const canAdvance =
    step === 0
      ? form.needs.length > 0
      : step === 1
        ? form.name.trim() !== "" && form.email.trim() !== ""
        : true;

  const mailto = useMemo(() => {
    const lines = [
      `Name: ${form.name}`,
      `Company: ${form.company || "—"}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "—"}`,
      `Preferred contact: ${form.method}`,
      "",
      `Interested in: ${form.needs.join(", ") || "—"}`,
      "",
      form.message || "",
    ];
    return `mailto:${EMAILS.sales}?subject=${encodeURIComponent(
      `Consultation enquiry — ${form.name || "New enquiry"}`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
  }, [form]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted/40">
      {/* Terminal chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
        </span>
        <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          itheritages — new-enquiry
        </p>
        <ol className="ml-auto flex items-center gap-1.5" aria-label="Progress">
          {STEPS.map((label, index) => (
            <li
              key={label}
              aria-current={index === step ? "step" : undefined}
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[11px] transition-colors",
                index === step
                  ? "bg-primary/12 text-primary"
                  : index < step
                    ? "text-success"
                    : "text-muted-foreground/60"
              )}
            >
              {index < step ? "✓ " : ""}
              {label}
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5 sm:p-7">
        {step === 0 ? (
          <div>
            <Prompt>select --needs {"<one or more practices>"}</Prompt>
            <ul className="mt-5 flex flex-wrap gap-2">
              {SERVICES.map((service) => {
                const selected = form.needs.includes(service.name);
                return (
                  <li key={service.slug}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleNeed(service.name)}
                      className={cn(
                        "rounded-full border px-3.5 py-2 font-mono text-sm transition-colors",
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                      )}
                    >
                      {selected ? "✓ " : "+ "}
                      {service.name}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 font-mono text-xs text-muted-foreground">
              {form.needs.length} selected
            </p>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <Prompt>set --contact-details</Prompt>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => set("name", v)}
                required
              />
              <Field
                label="Company"
                value={form.company}
                onChange={(v) => set("company", v)}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => set("email", v)}
                required
              />
              <Field
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => set("phone", v)}
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <Prompt>set --preferred-contact-method</Prompt>
            <ul className="mt-5 flex flex-wrap gap-2">
              {CONTACT_METHODS.map((method) => (
                <li key={method}>
                  <button
                    type="button"
                    aria-pressed={form.method === method}
                    onClick={() => set("method", method)}
                    className={cn(
                      "rounded-full border px-4 py-2 font-mono text-sm transition-colors",
                      form.method === method
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {method}
                  </button>
                </li>
              ))}
            </ul>

            <label className="mt-6 block">
              <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                Anything else
              </span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(event) => set("message", event.target.value)}
                placeholder="Scope, timelines, existing estate…"
                className="mt-2 w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-3 focus:ring-primary/20"
              />
            </label>

            <div className="mt-6 rounded-lg border border-border bg-card p-4">
              <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                Summary
              </p>
              <dl className="mt-3 space-y-1.5 font-mono text-sm text-foreground/85">
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">needs:</dt>
                  <dd>{form.needs.join(", ") || "—"}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">name:</dt>
                  <dd>{form.name || "—"}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-muted-foreground">reply-to:</dt>
                  <dd>{form.method.toLowerCase()}</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : null}

        <div className="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            back
          </button>

          {step < STEPS.length - 1 ? (
            <Button
              size="lg"
              className="h-11 px-6 text-base"
              disabled={!canAdvance}
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            >
              Continue
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              size="lg"
              nativeButton={false}
              className="h-11 px-6 text-base"
              render={
                <a href={mailto}>
                  <Check className="mr-1 h-4 w-4" aria-hidden="true" />
                  Send enquiry
                </a>
              }
            />
          )}
        </div>

        {step === STEPS.length - 1 ? (
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
            Opens your mail client with the enquiry pre-filled, addressed to{" "}
            {EMAILS.sales}.
          </p>
        ) : null}
      </div>
    </div>
  );
}
