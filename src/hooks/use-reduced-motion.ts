"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/**
 * Server and hydration both see `false`, then React re-renders with the real
 * preference immediately after hydration.
 *
 * This has to go through useSyncExternalStore rather than reading matchMedia in
 * a useState initialiser: components that branch on this value render different
 * markup, and reading the media query during the hydration render makes the
 * client tree disagree with the server tree.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
