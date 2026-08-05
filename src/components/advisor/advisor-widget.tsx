"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { AdvisorOrb } from "@/components/advisor/advisor-orb";
import type { AdvisorChatMessage } from "@/components/advisor/advisor-message";
import { AdvisorPanel } from "@/components/advisor/advisor-panel";
import {
  OPENING_MESSAGE,
  PLACEHOLDER_REPLY,
  SUGGESTED_QUESTIONS,
} from "@/data/advisor";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * UI shell for the ITH Advisor (PROJECT_BRIEF.md §5): the idle orb, its
 * expansion into a glass panel, and a conversation driven by the canned replies
 * in `@/data/advisor`.
 *
 * There is deliberately no model or retrieval behind this yet — `REPLY_DELAY`
 * stands in for the round trip so the pending state can be reviewed, and typed
 * questions get an explicit "not connected yet" answer rather than a plausible
 * one. Wiring streaming and RAG in should replace `answer()` and the delay,
 * and nothing else here.
 */
const REPLY_DELAY = 700;

const SPRING = { type: "spring" as const, stiffness: 320, damping: 30, mass: 0.7 };

export function AdvisorWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AdvisorChatMessage[]>([
    { id: "opening", role: "advisor", reply: OPENING_MESSAGE },
  ]);
  const [pending, setPending] = useState(false);
  const [askedIds, setAskedIds] = useState<string[]>([]);

  const reducedMotion = useReducedMotion();
  const orbRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const turnCount = useRef(0);
  const wasOpen = useRef(false);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  // Focus moves into the panel on open and back to the orb on close, so the
  // widget never strands keyboard focus on a hidden control.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else if (wasOpen.current) {
      orbRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const ask = useCallback((question: string, suggestionId?: string) => {
    turnCount.current += 1;
    const turn = turnCount.current;

    setMessages((current) => [
      ...current,
      { id: `user-${turn}`, role: "user", text: question },
    ]);
    if (suggestionId) {
      setAskedIds((current) => [...current, suggestionId]);
    }
    setPending(true);

    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      const suggestion = SUGGESTED_QUESTIONS.find(
        (entry) => entry.id === suggestionId
      );
      setMessages((current) => [
        ...current,
        {
          id: `advisor-${turn}`,
          role: "advisor",
          reply: suggestion ? suggestion.reply : PLACEHOLDER_REPLY,
        },
      ]);
      setPending(false);
    }, REPLY_DELAY);
  }, []);

  const suggestions = SUGGESTED_QUESTIONS.filter(
    (entry) => !askedIds.includes(entry.id)
  );

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="advisor-panel"
            role="dialog"
            aria-label="ITH Advisor"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={reducedMotion ? { duration: 0.15 } : SPRING}
            // Grows out of the orb's corner rather than sliding in from nowhere.
            style={{ transformOrigin: "bottom right" }}
            className="fixed right-4 bottom-24 left-4 z-60 h-[min(32rem,calc(100dvh-9rem))] sm:left-auto sm:w-[24rem] print:hidden"
          >
            <AdvisorPanel
              messages={messages}
              pending={pending}
              suggestions={suggestions}
              onAsk={ask}
              onClose={() => setOpen(false)}
              inputRef={inputRef}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        animate={
          open && !reducedMotion
            ? { scale: 0.5, opacity: 0 }
            : { scale: 1, opacity: open ? 0 : 1 }
        }
        transition={reducedMotion ? { duration: 0.15 } : SPRING}
        style={{ transformOrigin: "bottom right" }}
        className="fixed right-5 bottom-5 z-60 print:hidden"
        // The panel replaces the orb visually; hiding it from the pointer keeps
        // the two from overlapping mid-transition.
        inert={open ? true : undefined}
      >
        <AdvisorOrb ref={orbRef} open={open} onOpen={() => setOpen(true)} />
      </motion.div>
    </>
  );
}
