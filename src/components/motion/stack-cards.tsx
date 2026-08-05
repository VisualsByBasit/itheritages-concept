"use client";

import { Children, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Cards that pin one over the next as you scroll, like sheets being laid onto
 * a stack — each one holds at the top of the viewport until the following card
 * slides up and covers it.
 *
 * The pinning itself is `position: sticky`, not a GSAP pin: sticky survives
 * resize, zoom and the browser's own scroll anchoring without recalculation,
 * and it means the cards still stack correctly if JavaScript never runs. GSAP
 * only adds the depth cue on top — the covered card recedes and dims, which is
 * what separates a stack from a plain overlap.
 *
 * Each slot is one viewport tall, which is the scroll distance a card is given
 * before the next one starts covering it.
 *
 * Under `prefers-reduced-motion` the whole mechanism is dropped and the cards
 * render as an ordinary column, since the effect is inherently motion.
 */
export function StackCards({
  children,
  className,
  /** Where a pinned card comes to rest, below the sticky header. */
  topOffset = "6.5rem",
  /**
   * Scroll distance each card holds for before the next covers it. A full
   * viewport suits a page whose whole purpose is the stack; a transition
   * between two sections wants something brisker.
   */
  slotHeight = "100vh",
  /** Pixels each card is nudged down, so covered edges peek out. */
  stagger = 12,
}: {
  children: React.ReactNode;
  className?: string;
  topOffset?: string;
  slotHeight?: string;
  stagger?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const cards = Children.toArray(children);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);
      // One "covering" per gap between cards.
      const steps = cardEls.length - 1;
      if (steps < 1) return;

      // A single trigger on the root, which is never sticky. Triggering off the
      // sticky slots themselves would measure their stuck position rather than
      // their position in flow whenever the page is refreshed or resized
      // mid-stack, and the whole sequence would be off by a viewport.
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress * steps;
          cardEls.forEach((card, index) => {
            // How far card `index` has been covered by the one after it.
            const covered = Math.min(Math.max(progress - index, 0), 1);
            // Scale only. Fading a covered card makes it translucent, and the
            // card beneath reads straight through it — two sets of body copy
            // superimposed. Paper occludes what it covers; the recede alone,
            // against the opaque card above, is what sells the stack.
            gsap.set(card, { scale: 1 - 0.08 * covered });
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div className={cn("flex flex-col gap-6", className)}>{cards}</div>;
  }

  return (
    <div ref={rootRef} className={className}>
      {cards.map((card, index) => (
        <div
          key={index}
          data-stack-slot
          className="sticky flex items-start"
          style={{
            top: topOffset,
            height: slotHeight,
            // A few pixels of stagger so the edges of the covered cards peek
            // out from under the top one, the way a real stack of paper does.
            paddingTop: `${index * stagger}px`,
            zIndex: index,
          }}
        >
          <div data-stack-card className="w-full origin-top will-change-transform">
            {card}
          </div>
        </div>
      ))}
    </div>
  );
}
