"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";

import { AdvisorSphere } from "@/components/advisor/advisor-orb";
import {
  AdvisorMessage,
  AdvisorTyping,
  type AdvisorChatMessage,
} from "@/components/advisor/advisor-message";
import type { SuggestedQuestion } from "@/data/advisor";

export function AdvisorPanel({
  messages,
  pending,
  suggestions,
  onAsk,
  onClose,
  inputRef,
}: {
  messages: AdvisorChatMessage[];
  pending: boolean;
  /** Chips not yet used — they disappear once asked. */
  suggestions: SuggestedQuestion[];
  onAsk: (question: string, suggestionId?: string) => void;
  onClose: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const settled = useRef(false);

  // Follow the conversation as turns land, including the typing indicator —
  // but not on the first pass. The opening message is taller than the panel,
  // and scrolling to the bottom of it on open shows the reader the end of a
  // greeting they haven't started yet.
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    if (!settled.current) {
      settled.current = true;
      return;
    }
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question || pending) return;
    setDraft("");
    onAsk(question);
  }

  return (
    <div className="advisor-panel relative flex h-full flex-col overflow-hidden border border-white/70 bg-card/72 backdrop-blur-2xl backdrop-saturate-150">
      {/* Grain over the whole surface, so the glass reads as a material. */}
      <span className="advisor-panel__noise" aria-hidden="true" />

      <header className="relative flex items-center gap-3 border-b border-border/50 bg-white/45 px-4 py-3">
        <AdvisorSphere
          className="h-9 w-9"
          glyphClassName="h-5 w-5 drop-shadow-[0_1px_2px_rgba(2,45,80,0.45)]"
          bloom
        />

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            ITH Advisor
            {/* Honest about what this is until retrieval is wired up. */}
            <span className="rounded-full border border-border bg-muted/70 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              Preview
            </span>
          </p>
          <p className="truncate text-xs text-muted-foreground">
            Solutions architect · services, industries, security
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close the ITH Advisor"
          className="-mr-1 rounded-lg p-2 text-muted-foreground outline-none transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </header>

      <div
        ref={scrollRef}
        className="relative flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
      >
        <div className="space-y-4" aria-live="polite">
          {messages.map((message) => (
            <AdvisorMessage key={message.id} message={message} />
          ))}
          {pending ? <AdvisorTyping /> : null}
        </div>

        {suggestions.length > 0 && !pending ? (
          <div className="space-y-2 pl-9">
            <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              Suggested
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => onAsk(suggestion.question, suggestion.id)}
                  className="rounded-full border border-border/80 bg-white/70 px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-[0_1px_2px_rgba(10,10,11,0.04)] outline-none transition-[background-color,border-color,box-shadow,color] hover:border-primary/45 hover:bg-primary/8 hover:text-foreground hover:shadow-[0_6px_14px_-10px_color-mix(in_srgb,var(--primary)_70%,transparent)] focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {suggestion.chip}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative border-t border-border/50 bg-white/45 px-3 py-3"
      >
        <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-white/80 px-3 py-1.5 shadow-[inset_0_1px_2px_rgba(10,10,11,0.04)] transition-[border-color,box-shadow] focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_14%,transparent)]">
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about services, industries, security…"
            aria-label="Ask the ITH Advisor"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-1.5 text-[13.5px] text-foreground outline-none placeholder:text-muted-foreground/70"
          />
          <button
            type="submit"
            disabled={!draft.trim() || pending}
            aria-label="Send"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_6px_14px_-8px_color-mix(in_srgb,var(--primary)_85%,transparent)] outline-none transition-[opacity,background-color] hover:bg-primary/85 focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-35 disabled:shadow-none"
          >
            <ArrowUp aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-2 px-1 text-[11px] leading-snug text-muted-foreground">
          Answers stay inside IT Heritages&rsquo; documented services and industries.
        </p>
      </form>
    </div>
  );
}
