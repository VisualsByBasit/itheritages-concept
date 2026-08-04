import { Throughline } from "@/components/motion/throughline";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { Industries } from "@/components/sections/industries";
import { Partners } from "@/components/sections/partners";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { CaseStudies } from "@/components/sections/case-studies";
import { AiAdvisor } from "@/components/sections/ai-advisor";
import { ContactCta } from "@/components/sections/contact-cta";

/** Section order follows SITEMAP.md — "Home page — section order". */
export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      {/* Draws itself down the page as you scroll, tying the sections together. */}
      <Throughline />
      <Hero />
      <TrustBar />
      <Services />
      <Industries />
      <Partners />
      <Process />
      <Stats />
      <CaseStudies />
      <AiAdvisor />
      <ContactCta />
      {/* 10 — Footer is rendered globally from app/layout.tsx. */}
    </main>
  );
}
