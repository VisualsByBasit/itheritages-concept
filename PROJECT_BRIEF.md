# IT Heritages — Redesign Spec Sheet

Reference doc for the rebuild. Feed this to Claude Code section by section — don't ask it to build the whole thing in one shot.

---

## 1. Context

**Current site:** itheritages.com — WordPress + Slider Revolution template. Confirmed issues: unedited Lorem Ipsum in the "How We Help" and testimonial sections, leftover placeholder brand name ("Herrington Consulting," "Giles," "Radical Orange Pty Ltd") in the testimonials, fake stat counters, stock icons, no real motion, no storytelling — it reads unfinished, not just dated.

**Company facts to build around (real, not filler):**
- HQ: H-1, G-Floor, Street-34, G-10/1, Islamabad. Additional offices: Lahore, UK.
- Contact: +92-300-0607639 · info@itheritages.com · sales@itheritages.com
- Positioning: CCIE/MSCP/CTS-certified systems integrator, MSP partnerships, partner enablements.
- Services: Infrastructure Management, Cloud Computing, Cyber Security / Information Security, Unified Communications & Collaboration, Modern Workspace, Audio-Video, AI, Managed Services, Professional Consulting, Enterprise Networking, Digital Transformation.
- Industries served: Government, Semi-Govt Entities, Banking & Finance, Healthcare, Education, Retail, Oil & Gas, Utility, BPOs, Telecom, Media & Entertainment, Aviation & Transport.

**Reference bar:** Apple, Vercel, Stripe, Linear, Framer — restrained, confident, cinematic. Not neon, not template-agency, not "AI-generated minimal." (Note: light theme, so lean toward Stripe/Linear's light-mode execution specifically, not Vercel/OpenAI's dark aesthetic.)

---

## 2. Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (base primitives only, restyled)
- React Three Fiber + Three.js (hero network, section 3D)
- GSAP + ScrollTrigger (pinned/scroll-driven sequences)
- Framer Motion (component-level transitions, hover states)
- Lenis (smooth scroll)
- Lucide Icons
- AI SDK + streaming (chatbot), vector search / RAG over a small knowledge base (see §5)

---

## 3. Design System

**Color — CLIENT-MANDATED, LOCKED (light theme, exact values pixel-sampled from the real IT Heritages logo file — a 5-color pinwheel: lime green, sky blue, dark forest green, violet, and a neutral gray "IT" chip):**
- Base: white `#FFFFFF` / off-white `#FAFAFA`, with near-black text `#0A0A0B` / `#111114`
- Accent primary: sky blue `#079DFB` — dominant accent, used for primary CTAs, links, key headings
- Accent secondary: lime green `#86C60C` — used deliberately (status/success states, select highlights, small UI moments) — not decorative filler
- Accent tertiary: dark forest green `#026430` — pairs with lime green for depth (e.g. gradient partner, darker hover state on green elements)
- Accent quaternary: violet `#5333AA` — used sparingly, as a rare highlight — never competes with blue as the dominant color
- Rule of usage: blue carries ~60% of accent weight, lime green ~20%, dark green ~10%, violet ~10%. Do not treat all colors as equal-weight — that reads busy. The logo uses them as equal quadrants because it's a mark; the *site* should read as blue-led with green as the clear second voice.
- Structural grays: light graphite `#F1F1F3` / `#E5E5E8` for card backgrounds and section dividers
- No dark theme. Premium feel comes from typography scale, whitespace, and restrained motion — not glow-on-black depth. Think Linear's light mode or Stripe's docs, not Vercel's dark hero sections.
- Glass/blur effects still work in light mode (frosted white cards over subtle background texture) — tune opacity/blur so it doesn't read like generic Apple frosted-glass UI

**Logo:** Real client-provided files — `it-heritages-logo.png` (full lockup: mark + "HERITAGES" wordmark, for header/light backgrounds) and `it-heritages-icon.png` (square mark only, transparent background, for favicon/app icon/small placements). Both go in `public/`.

**Photography:** The current site uses real photography in places (team/office/industry imagery) even though most of its content is templated filler. The rebuild should do the same — real or high-quality licensed photography at key moments (team section, maybe industry cards, office locations), not an all-illustration/all-3D site. Source these once the client provides them, or use tastefully selected stock in the interim clearly marked as placeholder — do not ship generic corporate stock photography (handshakes, people pointing at whiteboards) as final content.

**Header additions (new, not in original brief):**
- Search — a search bar/command palette (⌘K style) for finding services, industries, and content across the site. Fits the "senior technical partner" positioning better than a plain search icon.
- Light/dark mode toggle — **phase 2, not launch-blocking.** Site launches light-only per client mandate above. Build the color token system (CSS variables, not hardcoded hex in components) from day one so a dark variant can be added later without a full rebuild — this is a "build it extensible" note, not a "build both themes now" note.

**Typography:**
- One display face for hero/section headers (large, tight tracking), one workhorse sans for body. Pick both before building — don't default to Inter for the display face, it reads templated.
- Hero headline: 72–120px desktop, fluid clamp() scaling
- Body: 16–18px, generous line-height (1.6+)

**Surfaces:**
- Glass cards: `backdrop-blur`, 1px hairline border at low opacity, soft outer shadow, subtle noise texture overlay (not a gradient) for depth
- Corner radius: consistent scale (e.g. 12 / 16 / 24px), not ad hoc per component

**Motion principles:**
- Every section transitions in — nothing hard-cuts
- Motion has a *reason* tied to content (a network animates when talking about networking, not decoratively)
- Cursor: custom glowing orb, magnetic pull on interactive elements, no trail gimmicks that hurt performance
- Respect `prefers-reduced-motion` everywhere — build this in from the start, not bolted on later

---

## 4. Page Sections (build order = priority order)

### Hero
- 3D network/particle field (R3F), camera drifts, mouse perturbs particles slightly
- Headline should state what IT Heritages *does*, not a vague tagline — e.g. positioning around "enterprise technology partner" + CCIE/MSCP credibility, not generic "innovation" language
- Scroll cue; scrolling drives camera deeper into the network into section 2

### Trust / Credentials bar
- CCIE-MSCP-CTS certifications, MSP partner marks — real logos only, floating/glowing presentation, not a static grayscale strip

### Services (the core of the site)
- One module per real service (Infrastructure, Cloud, Cyber Security, Unified Communications, Modern Workspace, AV, AI, Managed Services, Consulting, Enterprise Networking)
- Each gets its own micro-animation tied to what it actually does (firewall blocking packets for Cyber Security, nodes connecting for Networking, etc.) — no shared generic icon set
- Hover: expand, lift, reveal 2–3 concrete capabilities per service, not marketing adjectives

### Industries
- Real 12 industries as holographic/glass cards, hover reveals what IT Heritages actually delivers for that vertical (e.g. banking → Zero Trust, SIEM, DR)

### Process / How We Work
- Replace the current lorem-ipsum "Analysis / Strategy / Execution" with real methodology copy

### Case studies / proof
- Only build this section with real content once client provides it — do not fabricate results, screenshots, or client names. Use a placeholder state that's honest ("Case studies coming soon") rather than fake testimonials like the current site.

### Stats
- Only real numbers (years in business, certifications, clients) — animated rolling counters, not filler "1+" like the current site shows

### Contact
- Terminal/command-line-styled form, multi-step (needs, contact method) mirroring the current site's actual lead flow but rebuilt visually

### Footer
- Real address, both phone/email lines, social links (Facebook, LinkedIn — confirm both are current)

---

## 5. AI Assistant ("ITH Advisor" or similar — name TBD)

- Floating orb, bottom-right, idle breathing glow + rotating ring, expands into a glass panel on click
- Personality: senior solutions architect, not support bot — confident, concise, no emoji
- First message should state its actual scope: services, industries, cyber/cloud/AI questions, consultation booking
- Knowledge base = the real service/industry list above, not generic IT chatbot filler. Build the RAG source doc from the actual services pages before wiring retrieval.
- Rich responses: service cards, industry recommendation checklists, "book a consultation" CTA button
- Must never invent case studies, client names, or numbers not in the knowledge base — hallucination here is a credibility risk for the client, not just a UX bug

---

## 6. What NOT to do

- No stock photography, no generic "team high-fiving" imagery
- No placeholder Lorem Ipsum shipped anywhere, even temporarily in a commit
- No fake testimonials/client names (the current site's actual failure mode)
- No section that could describe literally any IT company — every section should be legibly *IT Heritages*
