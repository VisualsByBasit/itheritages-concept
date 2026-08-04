"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary for the 3D mark. R3F's Canvas needs browser APIs, so it has
 * to skip prerendering — and `ssr: false` is only valid inside a Client
 * Component, which lets the About page stay a Server Component.
 */
const HeritageObject = dynamic(
  () => import("@/components/three/heritage-object").then((m) => m.HeritageObject),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="h-full w-full rounded-3xl bg-[radial-gradient(circle_at_50%_45%,rgba(7,157,251,0.10),transparent_65%)]"
      />
    ),
  }
);

export function HeritageObjectLazy() {
  return <HeritageObject />;
}
