/**
 * Content for the ITH Advisor widget (PROJECT_BRIEF.md §5) — the opening
 * message, the suggested question chips, and the canned replies behind them.
 *
 * This is the UI-shell stage: there is no model and no retrieval yet. Every
 * reply below is therefore assembled from `@/data/services` and
 * `@/data/company` at module load, so the placeholder conversation says only
 * what the site can already substantiate. Nothing here is written as filler,
 * and no case study, client name or number appears — §5 treats hallucination in
 * this widget as a credibility risk, so the placeholder stage holds the same
 * line the real one will have to.
 *
 * When retrieval lands, these replies become the fixtures the RAG answers are
 * checked against rather than dead code to delete.
 */

import {
  EMAILS,
  INDUSTRIES,
  INDUSTRY_BY_SLUG,
  servicesForIndustry,
} from "@/data/company";
import { SERVICES } from "@/data/services";

/** A service or industry the advisor points at — always a real route. */
export type AdvisorCard = {
  label: string;
  detail?: string;
  href: string;
};

export type AdvisorReply = {
  /** Body paragraphs, rendered in order. */
  body: string[];
  bullets?: string[];
  cards?: AdvisorCard[];
  cta?: { label: string; href: string };
};

export type SuggestedQuestion = {
  id: string;
  /** Short label on the chip. */
  chip: string;
  /** What gets sent as the user's message when the chip is pressed. */
  question: string;
  reply: AdvisorReply;
};

function service(slug: string) {
  const match = SERVICES.find((entry) => entry.slug === slug);
  if (!match) {
    throw new Error(`advisor: no service with slug "${slug}"`);
  }
  return match;
}

/**
 * Industry answers invert the service data exactly the way the industry pages
 * do, so the advisor and the page it links to can never disagree.
 */
function industryReply(slug: string, opening: string): AdvisorReply {
  const industry = INDUSTRY_BY_SLUG.get(slug);
  const matches = servicesForIndustry(slug);
  if (!industry) {
    throw new Error(`advisor: no routed industry with slug "${slug}"`);
  }
  return {
    body: [opening],
    cards: matches.map((entry) => ({
      label: entry.name,
      detail: entry.positioning,
      href: entry.href,
    })),
    cta: { label: "Book a consultation", href: "/contact" },
  };
}

function serviceReply(slug: string, opening: string): AdvisorReply {
  const entry = service(slug);
  return {
    body: [opening, entry.problem],
    bullets: entry.highlights,
    cards: [
      {
        label: entry.name,
        detail: "Full capability list and how the practice is delivered",
        href: entry.href,
      },
    ],
    cta: { label: "Book a consultation", href: "/contact" },
  };
}

/**
 * The advisor states its own scope before it is asked — §5's requirement, and
 * the honest version of it: what it covers, and what it will refuse to do.
 */
export const OPENING_MESSAGE: AdvisorReply = {
  body: [
    `I'm the ITH Advisor. I work the way our solutions architects do: tell me the requirement and I'll say which of the ${SERVICES.length} practices carries it, what we deliver into any of the ${INDUSTRIES.length} industries we serve, and I'll take cyber security, cloud and infrastructure questions directly.`,
    "I answer from our documented coverage only. If something sits outside it I'll say so rather than guess — and when it's time to talk specifics, I'll put you in front of an engineer.",
  ],
};

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: "banking",
    chip: "Services for a bank",
    question: "Which of your services fit a bank?",
    reply: industryReply(
      "banking-finance",
      "Banking and finance draws on these practices. In that sector they are almost always scoped together rather than bought separately:"
    ),
  },
  {
    id: "cyber",
    chip: "Cyber security scope",
    question: "What does your cyber security practice cover?",
    reply: serviceReply(
      "cyber-security",
      service("cyber-security").positioning
    ),
  },
  {
    id: "cloud",
    chip: "Cloud migration",
    question: "Where do you start on a cloud migration?",
    reply: serviceReply("cloud-computing", service("cloud-computing").positioning),
  },
  {
    id: "consultation",
    chip: "Talk to an engineer",
    question: "Can I speak to an engineer?",
    reply: {
      body: [
        "Yes. Consultations run with an engineer from the practice that would deliver the work, not a sales desk.",
        `Tell the form what you're trying to solve and which office suits — Islamabad, Lahore or the UK — or write to ${EMAILS.sales} directly.`,
      ],
      cta: { label: "Book a consultation", href: "/contact" },
    },
  },
];

/**
 * Anything typed rather than picked. The shell has no model behind it, and
 * saying so is better than a canned answer that implies one.
 */
export const PLACEHOLDER_REPLY: AdvisorReply = {
  body: [
    "Live answers aren't connected yet — this is the advisor's interface while its knowledge base is built from our service and industry documentation.",
    "The suggested questions are answered from that same source material. For anything outside them, an engineer can answer directly.",
  ],
  cta: { label: "Book a consultation", href: "/contact" },
};
