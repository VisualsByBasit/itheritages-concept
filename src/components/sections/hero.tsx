"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const ParticleNetwork = dynamic(
  () => import("@/components/three/particle-network").then((mod) => mod.ParticleNetwork),
  { ssr: false }
);

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <ParticleNetwork reducedMotion={reducedMotion} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="mb-6 text-sm font-medium tracking-[0.2em] text-primary uppercase">
          CCIE · MSCP · CTS Certified Systems Integrator
        </p>
        <h1 className="max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] font-semibold tracking-tight text-foreground font-heading">
          Enterprise technology, engineered by certified architects.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          IT Heritages designs, deploys, and manages the infrastructure,
          cloud, security, and communications systems that government,
          banking, and healthcare enterprises run on — from Islamabad,
          Lahore, and the UK.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            className="h-12 px-8 text-base"
            render={<Link href="/contact">Book a Consultation</Link>}
          />
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            className="h-12 px-8 text-base"
            render={<Link href="/services">Explore Services</Link>}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </div>
    </section>
  );
}
