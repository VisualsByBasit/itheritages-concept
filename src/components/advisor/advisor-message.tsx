"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { AdvisorSphere } from "@/components/advisor/advisor-orb";
import type { AdvisorReply } from "@/data/advisor";

export type AdvisorChatMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "advisor"; reply: AdvisorReply };

function AdvisorAvatar() {
  return (
    <AdvisorSphere
      className="mt-0.5 h-7 w-7"
      glyphClassName="h-4 w-4 drop-shadow-[0_1px_1px_rgba(2,45,80,0.45)]"
    />
  );
}

/**
 * Rich advisor turn: paragraphs, an optional capability list, service or
 * industry cards that link to the real routes, and the consultation CTA from
 * PROJECT_BRIEF.md §5.
 *
 * The bubble carries a faint brand tint and a hairline border rather than the
 * flat grey of a support widget — the same tint-and-hairline language the
 * service cards use, at a smaller scale.
 */
function AdvisorTurn({ reply }: { reply: AdvisorReply }) {
  return (
    <div className="flex gap-2.5">
      <AdvisorAvatar />
      <div className="advisor-bubble advisor-bubble--advisor min-w-0 space-y-3 border border-primary/15 bg-[color-mix(in_srgb,var(--primary)_7%,transparent)] px-3.5 py-3 shadow-[0_1px_2px_rgba(10,10,11,0.04),0_10px_24px_-20px_color-mix(in_srgb,var(--primary)_70%,transparent)]">
        {reply.body.map((paragraph) => (
          <p key={paragraph} className="text-[13.5px] leading-relaxed text-foreground/85">
            {paragraph}
          </p>
        ))}

        {reply.bullets ? (
          <ul className="space-y-1.5">
            {reply.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-[13px] leading-snug text-foreground/80"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_5px_color-mix(in_srgb,var(--primary)_75%,transparent)]"
                />
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}

        {reply.cards ? (
          <ul className="space-y-1.5">
            {reply.cards.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="group/card flex items-start gap-2 rounded-xl border border-border/80 bg-white/75 px-3 py-2.5 transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:-translate-y-px hover:border-primary/45 hover:bg-white hover:shadow-[0_12px_26px_-20px_color-mix(in_srgb,var(--primary)_70%,transparent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] font-medium text-foreground">
                      {card.label}
                    </span>
                    {card.detail ? (
                      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                        {card.detail}
                      </span>
                    ) : null}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover/card:text-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        {reply.cta ? (
          <Link
            href={reply.cta.href}
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background shadow-[0_8px_18px_-12px_rgba(10,10,11,0.8)] transition-colors hover:bg-foreground/85"
          >
            {reply.cta.label}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function AdvisorMessage({ message }: { message: AdvisorChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="advisor-bubble advisor-bubble--user max-w-[85%] bg-primary px-3.5 py-2.5 text-[13.5px] leading-relaxed text-primary-foreground shadow-[0_10px_22px_-14px_color-mix(in_srgb,var(--primary)_85%,transparent)]">
          {message.text}
        </p>
      </div>
    );
  }

  return <AdvisorTurn reply={message.reply} />;
}

/** Stands in for the streaming cursor until the model is wired up. */
export function AdvisorTyping() {
  return (
    <div className="flex gap-2.5">
      <AdvisorAvatar />
      <span className="advisor-bubble advisor-bubble--advisor flex items-center gap-1 border border-primary/15 bg-[color-mix(in_srgb,var(--primary)_7%,transparent)] px-3.5 py-3.5 shadow-[0_1px_2px_rgba(10,10,11,0.04)]">
        <span className="sr-only">The advisor is replying</span>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            aria-hidden="true"
            className="advisor-typing__dot h-1.5 w-1.5 rounded-full bg-primary/70"
            style={{ animationDelay: `${index * 160}ms` }}
          />
        ))}
      </span>
    </div>
  );
}
