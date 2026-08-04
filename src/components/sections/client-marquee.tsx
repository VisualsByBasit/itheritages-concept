import Image from "next/image";

import type { Client } from "@/data/company";
import { cn } from "@/lib/utils";

type ClientMarqueeProps = {
  clients: Client[];
  /** Travel direction of the logos themselves. */
  direction: "to-right" | "to-left";
  durationSeconds: number;
};

export function ClientMarquee({
  clients,
  direction,
  durationSeconds,
}: ClientMarqueeProps) {
  // Two identical passes: the track shifts by exactly half its width, so the
  // second pass lands where the first began and the loop never seams.
  const passes = [0, 1];

  return (
    <div
      className="marquee"
      style={{ "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties}
    >
      <ul
        className={cn(
          "marquee__track items-center",
          direction === "to-right" && "marquee__track--to-right"
        )}
      >
        {passes.map((pass) =>
          clients.map((client) => (
            <li
              key={`${pass}-${client.file}`}
              // Only the first pass is exposed; the duplicate is decorative.
              aria-hidden={pass === 1 ? "true" : undefined}
              className="flex h-20 w-40 shrink-0 items-center justify-center px-4 sm:w-48"
            >
              <Image
                src={`/clients/${client.file}.png`}
                alt={
                  client.confirmed
                    ? client.name
                    : `${client.name} — client logo, name to be confirmed`
                }
                width={220}
                height={120}
                /* The audit's crops carry a near-white backing rather than true
                   transparency; multiply blends that into the section instead
                   of leaving each logo sitting on a visible grey tile. */
                className="h-auto max-h-14 w-auto max-w-full object-contain mix-blend-multiply"
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
