/**
 * Verified company facts from CONTENT_AUDIT.md's "Company facts (verified
 * across multiple pages — use these as ground truth)" section.
 *
 * Nothing in this file is invented. Where the audit flags a value as fake or
 * unconfigured on the current site (project counts, satisfaction scores,
 * testimonials, pricing) it is simply absent here rather than estimated.
 */

import { SERVICES } from "@/data/services";

/**
 * The audit records these three as called out repeatedly across the site.
 * Expansions are omitted deliberately: it notes MSCP is written as MCSE in one
 * place and needs client confirmation, so spelling any of them out would be
 * guessing at a credential.
 */
export const CERTIFICATIONS = ["CCIE", "MSCP", "CTS"];

/**
 * The full confirmed client list — 12 real, named clients in two rows, matching
 * the audit's "FULL LIST CONFIRMED" section and the live site's two-row layout.
 *
 * Logo files in public/clients/ are the audit's screenshot crops: low-res
 * reference assets, not final production files. High-resolution transparent
 * SVG/PNG originals are still outstanding from the client before launch.
 *
 * `confirmed: false` marks a logo whose owner the audit could not identify from
 * the source screenshots. Those fall back to a label derived from the filename
 * rather than a guessed company name.
 */
export type Client = { file: string; name: string; confirmed: boolean };

export const CLIENT_ROWS: Client[][] = [
  [
    { file: "nishat-power", name: "Nishat Power Limited", confirmed: true },
    { file: "riz", name: "RIZ", confirmed: true },
    { file: "tcs", name: "TCS", confirmed: true },
    { file: "giz", name: "GIZ", confirmed: true },
    { file: "graana", name: "Graana.com", confirmed: true },
    { file: "ghulam-farooq", name: "Ghulam Farooq Group", confirmed: true },
  ],
  [
    { file: "govt-crest", name: "Govt Crest", confirmed: false },
    { file: "logistics-co", name: "Logistics Co", confirmed: false },
    { file: "crest-2", name: "Crest 2", confirmed: false },
    { file: "haidri-beverages", name: "Haidri Beverages (Pvt. Ltd.)", confirmed: true },
    { file: "oil-gas-co", name: "Oil Gas Co", confirmed: false },
    { file: "serena-hotels", name: "Serena Hotels", confirmed: true },
  ],
];

/**
 * Technology vendor partners, distinct from the client list — these are the
 * platforms IT Heritages builds on, not organisations it has delivered for.
 *
 * Files live in public/clients/partners/ (where they were supplied), and like
 * the client marks they are reference-quality crops rather than final vendor
 * brand assets. Vendor logos carry trademark usage rules, so confirm approved
 * artwork and partner-tier wording with each vendor before launch.
 */
export const PARTNERS = [
  { file: "partner-cisco", name: "Cisco" },
  { file: "partner-hpe", name: "Hewlett Packard Enterprise" },
  { file: "partner-hp", name: "HP" },
  { file: "partner-dell", name: "Dell" },
  { file: "partner-lenovo", name: "Lenovo" },
  { file: "partner-ruckus", name: "Ruckus" },
];

/** All three offices, verified in the audit's company-facts section. */
export const OFFICES = [
  {
    label: "Islamabad — HQ",
    address: "1st Floor, H-1, Street-34, G-10/1, Islamabad, Pakistan",
    phone: "+92-300-0607639",
  },
  {
    label: "Lahore",
    address: "No. 204, 30-M Civic Center, Model Town, Lahore, Pakistan",
    phone: "+92-300-0607639",
  },
  {
    label: "United Kingdom",
    address: "175 Humber Road, Coventry CV3 1NZ, United Kingdom",
    phone: "+44 785 2421806",
  },
];

export const EMAILS = {
  general: "info@itheritages.com",
  sales: "sales@itheritages.com",
};

export const HOURS = "Mon–Fri 09:00–18:00 · Sat–Sun closed";

/**
 * The company's own chapter headings from the live site, kept verbatim because
 * they are genuine copy. The bodies are written from the audit's verified
 * facts — none of the template "Why Choose" or Herrington Consulting leftovers
 * are carried over.
 */
export const MILESTONES = [
  {
    period: "Since 2018",
    title: "A Memorable Start",
    body: "IT Heritages was founded in 2018 to deliver enterprise infrastructure and cloud-based secure solutions to organisations in Pakistan and, later, the UK.",
  },
  {
    period: "20+ Years",
    title: "Of Combined Expertise",
    body: "The team's combined experience spans architecture, design and planning, deployment, and operational implementation of infrastructure and cloud-based secure solutions — including early adoption of Azure and public/private cloud security.",
  },
  {
    period: "6+ Years",
    title: "Of Recognition",
    body: "Recognised for Best of Class Technology across unified communications and collaboration, cloud security, Sec-Ops, cyber security and data centers, with delivery documented to ITIL practice.",
  },
  {
    period: "2018 & Beyond",
    title: "Scale Expansion",
    body: "The stated direction of the business is expansion across UCC, AV, AI, Cloud and IoT — building on the practices already delivered rather than replacing them.",
  },
];

/** Award areas named in the audit. Not a claim of specific award bodies or years. */
export const RECOGNITION = [
  "Unified communications & collaboration",
  "Cloud security",
  "Sec-Ops",
  "Cyber security",
  "Data centers",
];

/** Verified numbers only. The audit flags every counter on the live site as unconfigured "1+" filler. */
export const STATS = [
  {
    value: 2018,
    display: "2018",
    label: "Founded",
    detail: "“Since 2018 — A Memorable Start”",
  },
  {
    value: 20,
    display: "20+",
    label: "Years of combined expertise",
    detail: "Architecture, design, deployment and operational implementation",
  },
  {
    value: 6,
    display: "6+",
    label: "Years of recognition",
    detail: "Best of Class Technology in UCC, Cloud Security, Sec-Ops and Data Centers",
  },
  {
    value: 3,
    display: "3",
    label: "Offices",
    detail: "Islamabad HQ, Lahore, and Coventry in the UK",
  },
];

/**
 * The genuine four-step methodology, repeated across every service page on the
 * current site. Replaces the template's lorem-ipsum "Analysis / Strategy /
 * Execution" steps that PROJECT_BRIEF.md calls out.
 */
export const PROCESS_STEPS = [
  {
    title: "Enquiry Scope & Development",
    aside: "Discussion",
    body: "We start by scoping the actual requirement with the people who own it, before any technology is proposed.",
  },
  {
    title: "Presales Activity — Solution Architecture",
    aside: "Ideas & concepts / technology assessment",
    body: "The solution is architected and assessed against the estate it has to live in, not against a product catalogue.",
  },
  {
    title: "Proof of Concept",
    aside: "Testing & trying / demo-POC",
    body: "The design is demonstrated and tested before commitment, so the decision is made on evidence rather than a deck.",
  },
  {
    title: "Customized Implementation",
    aside: "Execute & install / implement & support",
    body: "Deployment is tailored to the environment, documented to ITIL practice with SAD, LLD and HLD, and supported afterwards.",
  },
];

/**
 * The homepage list of 12 — the audit designates this the primary list and
 * explicitly rejects the broader template menu found on one inner page.
 *
 * `slug` maps to the industry routes in SITEMAP.md. "Semi-Govt Entities" is in
 * the audited list but has no route in the sitemap, so it renders unlinked
 * until that is resolved with the client.
 */
export const INDUSTRIES: { name: string; slug: string | null }[] = [
  { name: "Government", slug: "government" },
  { name: "Semi-Govt Entities", slug: null },
  { name: "Banking & Finance", slug: "banking-finance" },
  { name: "Healthcare", slug: "healthcare" },
  { name: "Educational Institutes", slug: "education" },
  { name: "Retail", slug: "retail" },
  { name: "Oil & Gas", slug: "oil-gas" },
  { name: "Utility", slug: "utility" },
  { name: "BPOs", slug: "bpo" },
  { name: "Telecommunication", slug: "telecom" },
  { name: "Media & Entertainment", slug: "media" },
  { name: "Aviation & Transport", slug: "aviation" },
];

/**
 * What IT Heritages delivers into a given vertical, derived by inverting the
 * service data rather than written per-industry. The audit contains no
 * per-industry capability copy, so inventing any would be filler.
 */
export function servicesForIndustry(slug: string | null) {
  if (!slug) return [];
  return SERVICES.filter((service) => service.relatedIndustries.includes(slug));
}

/** Only the industries that have a confirmed route get a detail page. */
export const ROUTED_INDUSTRIES = INDUSTRIES.filter(
  (industry): industry is { name: string; slug: string } => industry.slug !== null
);

export const INDUSTRY_BY_SLUG = new Map(
  ROUTED_INDUSTRIES.map((industry) => [industry.slug, industry])
);
