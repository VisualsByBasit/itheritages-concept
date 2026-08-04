/**
 * Single source of truth for the ten services — powers both the homepage
 * overview section and the /services/[service-slug] template.
 *
 * Every positioning line and capability is drawn from CONTENT_AUDIT.md's
 * "Real service positioning" section, i.e. genuine copy recovered from the
 * current site. Nothing here is invented marketing filler, and where the
 * audited source is thin the entry stays thin rather than being padded out.
 *
 * Two entries are deliberately sparse, both flagged by the audit itself:
 *   - `ai` has no capability list at all. The audit (line 54) records AI as a
 *     stated future direction with no page copy to draw from, so it ships in a
 *     roadmap state instead of with invented deliverables.
 *   - `cloud-computing` draws on the audit's verified company facts (early
 *     Azure adoption, public/private cloud security) because the current site
 *     has no dedicated cloud service page.
 *
 * `relatedIndustries` are editorial routing decisions, not audited claims —
 * they map to the industry routes in SITEMAP.md and are worth confirming with
 * the client.
 */

export type ServiceAccent = "primary" | "success" | "tertiary" | "quaternary";

export type Service = {
  slug: string;
  name: string;
  href: string;
  /** Genuine positioning line, cleaned up from the audited source page. */
  positioning: string;
  /** Business-problem framing for the detail page. Never a feature dump. */
  problem: string;
  /** The 2–3 concrete capabilities revealed on hover in the overview. */
  highlights: string[];
  /** The complete audited capability list, unabridged, for the detail page. */
  capabilities: string[];
  accent: ServiceAccent;
  /** Which audited page this maps back to. */
  source: string;
  /** Set when the audited source is thin — the detail page stays short. */
  sparse?: boolean;
  status?: "roadmap";
  roadmapNote?: string;
  relatedIndustries: string[];
};

/**
 * Accent weighting follows the locked brand rule in PROJECT_BRIEF.md §3:
 * blue ~60%, lime ~20%, dark green ~10%, violet ~10%. Across ten modules that
 * is exactly 6 / 2 / 1 / 1 — not an even spread across all four colours.
 */
export const SERVICES: Service[] = [
  {
    slug: "infrastructure",
    name: "Infrastructure Management",
    href: "/services/infrastructure",
    positioning:
      "Multi-vendor infrastructure, run by a vendor-certified engineering team.",
    problem:
      "Enterprise estates rarely run on one vendor's stack. Mixed hardware accumulates over years of procurement, and the teams who installed it move on. IT Heritages takes ownership of that mixed estate as a single managed responsibility rather than leaving it split across the vendors who happened to sell each part.",
    highlights: [
      "Multi-vendor infrastructure services",
      "Vendor-certified engineering team",
      "ELV solutions",
    ],
    capabilities: [
      "Multi-vendor infrastructure services",
      "Vendor-certified engineering team",
      "ELV solutions",
    ],
    accent: "primary",
    source: "Infrastructure Management",
    sparse: true,
    relatedIndustries: ["government", "banking-finance", "healthcare", "oil-gas"],
  },
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    href: "/services/cloud-computing",
    positioning:
      "Cloud-based secure solutions, from an early adopter of Azure and private cloud security.",
    problem:
      "Most cloud programmes stall between a migration plan and a security model that the business can actually sign off on. IT Heritages came to cloud early — Azure and public/private cloud security sit in the team's documented 20+ years of architecture and deployment experience — so the security posture is designed alongside the migration, not retrofitted after it.",
    highlights: [
      "Public & private cloud security",
      "Azure architecture & migration",
      "Cloud-based secure solution design",
    ],
    capabilities: [
      "Public & private cloud security",
      "Azure architecture, design and deployment",
      "Cloud-based secure solution design",
    ],
    accent: "primary",
    source:
      "Verified company facts — the current site has no dedicated cloud service page",
    sparse: true,
    relatedIndustries: ["banking-finance", "government", "telecom", "retail"],
  },
  {
    slug: "cyber-security",
    name: "Cyber Security",
    href: "/services/cyber-security",
    positioning: "Addressing every facet of information security.",
    problem:
      "Security work fails when it is bought as a product rather than a practice — a tool gets deployed, an audit passes, and nothing changes about how threats are actually detected. This is the deepest documented practice at IT Heritages, spanning assessment, testing, active threat management and the compliance frameworks the result has to stand up to.",
    highlights: [
      "Compliance framework consultancy",
      "Penetration & vulnerability testing",
      "Advanced threat management",
    ],
    capabilities: [
      "Compliance framework consultancy",
      "Penetration and vulnerability testing",
      "Security audits",
      "Threat detection",
      "System analysis",
      "Network monitoring",
      "Data security",
      "Cyber risk assessment",
      "Advanced threat management",
      "End point security",
    ],
    accent: "tertiary",
    source:
      "Information Security Services + Information Security (merged per audit recommendation)",
    relatedIndustries: ["banking-finance", "government", "healthcare", "telecom"],
  },
  {
    slug: "unified-communications",
    name: "Unified Communications & Collaboration",
    href: "/services/unified-communications",
    positioning: "Building a seamless, high-quality communication experience.",
    problem:
      "Distributed organisations lose more time to unreliable communication than to any single outage. Calls drop, conferencing tools fragment across departments, and continuity plans exist on paper only. This practice treats voice, video and continuity as one designed system rather than three separate purchases.",
    highlights: [
      "Video conferencing & IP telephony",
      "Business continuity with 24/7 data protection",
      "Connectivity on the go",
    ],
    capabilities: [
      "Video conferencing",
      "IP telephony",
      "Cloud computing",
      "Meticulous solution design",
      "Modern workspace",
      "Business continuity with 24/7 data protection",
      "Connectivity on the go",
    ],
    accent: "primary",
    source: "Unified Communication & Collaboration",
    relatedIndustries: ["bpo", "government", "healthcare", "media"],
  },
  {
    slug: "modern-workspace",
    name: "Modern Workspace",
    href: "/services/modern-workspace",
    positioning:
      "Efficiency-focused automation, tailored to how teams actually work.",
    problem:
      "Workplace technology is usually assembled piecemeal — a collaboration suite here, a cabling contract there, an ERP rollout that never quite lands. The result is a building full of systems that do not reference each other. This practice covers the workspace end to end, from the SOPs that define a process down to the structured cabling underneath it.",
    highlights: [
      "Microsoft Workspace deployment",
      "SOP design & development",
      "MIS & ERP management",
    ],
    capabilities: [
      "SOP design and development",
      "Microsoft Workspace deployment",
      "MIS management",
      "ERP management",
      "Conference layout planning",
      "AV conferencing systems",
      "ELV automation",
      "Structured cabling",
    ],
    accent: "success",
    source: "Workplace Automation",
    relatedIndustries: ["education", "government", "retail", "bpo"],
  },
  {
    slug: "audio-video",
    name: "Audio-Video",
    href: "/services/audio-video",
    positioning: "Immersive audio experience — conferencing solutions at their best.",
    problem:
      "Contact centres and conferencing estates are judged on call quality, and call quality is an infrastructure problem long before it is a hardware one. This practice covers the voice path end to end, including the session border controllers and VoIP routing that determine whether a call holds up under load.",
    highlights: [
      "VoIP & SBC solutions",
      "Inbound & outbound call management",
      "BPO solutions",
    ],
    capabilities: [
      "BPO solutions",
      "Inbound and outbound call management",
      "VoIP solutions",
      "SBC (Session Border Controller) solutions",
    ],
    accent: "success",
    source: "Audio Visuals",
    relatedIndustries: ["bpo", "telecom", "media", "education"],
  },
  {
    slug: "ai",
    name: "AI",
    href: "/services/ai",
    positioning:
      "Named in the company's stated expansion path, alongside UCC, AV, Cloud and IoT.",
    problem:
      "IT Heritages has publicly placed AI on its roadmap rather than in its current catalogue. Presenting it as a delivered capability today would misrepresent the practice, so this page records the stated direction and nothing more.",
    highlights: [],
    capabilities: [],
    accent: "quaternary",
    source:
      "Stated company direction (“2018 & Beyond — Scale Expansion”) — no service page copy exists",
    sparse: true,
    status: "roadmap",
    roadmapNote:
      "The current site documents no AI capabilities, delivery model or case work. This module is intentionally held in a roadmap state until the client confirms scope — per CONTENT_AUDIT.md, there is no existing page copy to draw from.",
    relatedIndustries: [],
  },
  {
    slug: "managed-services",
    name: "Managed Services",
    href: "/services/managed-services",
    positioning: "A genuine customer-vendor partnership model, measured on ROI.",
    problem:
      "Outsourced operations usually fail on incentives: the supplier is paid for tickets closed, not for systems that stop generating tickets. IT Heritages frames this practice as a partnership aimed at return on investment, covering continuous surveillance and the governance around it rather than reactive support alone.",
    highlights: [
      "Network surveillance & monitoring",
      "Performance monitoring & troubleshooting",
      "Operations management",
    ],
    capabilities: [
      "Managed services",
      "Network surveillance",
      "Performance monitoring",
      "Troubleshooting",
      "Operations management",
      "Network monitoring",
      "Information governance",
    ],
    accent: "primary",
    source: "Professional Services",
    relatedIndustries: ["banking-finance", "government", "utility", "telecom"],
  },
  {
    slug: "consulting",
    name: "Professional Consulting",
    href: "/services/consulting",
    positioning: "Solution design through implementation, support, and certification.",
    problem:
      "Advice that stops at a recommendation deck leaves the hardest part — execution — with the client. This practice runs from solution design through implementation and ongoing support, and includes enabling the client's own people through training and professional certification rather than creating a permanent dependency.",
    highlights: [
      "Partner enablement & portfolio management",
      "Technology transformation",
      "Professional certifications",
    ],
    capabilities: [
      "Partner enablement",
      "Portfolio management",
      "Startup consulting",
      "Remote support",
      "Professional certifications",
      "Penetration testing",
      "Technology transformation",
    ],
    accent: "primary",
    source: "Consulting Services",
    relatedIndustries: ["government", "banking-finance", "education", "retail"],
  },
  {
    slug: "enterprise-networking",
    name: "Enterprise Networking",
    href: "/services/enterprise-networking",
    positioning: "Infrastructure workforce — mission critical technologies delivered.",
    problem:
      "Mission-critical systems are defined by what happens when they stop. The engineering question is not which switch to buy but how the datacenter, storage and converged compute layers behave under failure. This practice covers that layer, from the rack upward.",
    highlights: [
      "Mission-critical systems management",
      "Hyper-converged infrastructure",
      "Datacenter capabilities",
    ],
    capabilities: [
      "Mission critical systems management",
      "Hyper-converged infrastructure",
      "Racks and storage components",
      "Datacenter capabilities",
    ],
    accent: "primary",
    source: "Information Technology & Networking",
    relatedIndustries: ["telecom", "banking-finance", "oil-gas", "aviation"],
  },
];

export const SERVICES_BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]));

/** Industry labels for the cross-link chips, matching SITEMAP.md's routes. */
export const INDUSTRY_LABELS: Record<string, string> = {
  government: "Government",
  "banking-finance": "Banking & Finance",
  healthcare: "Healthcare",
  education: "Education",
  retail: "Retail",
  "oil-gas": "Oil & Gas",
  utility: "Utility",
  bpo: "BPOs",
  telecom: "Telecom",
  media: "Media & Entertainment",
  aviation: "Aviation & Transport",
};
