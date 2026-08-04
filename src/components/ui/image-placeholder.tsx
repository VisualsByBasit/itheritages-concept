import { Camera } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** What photo belongs here, e.g. "Team — Islamabad office" */
  label: string;
  className?: string;
}

/**
 * Deliberately loud rather than quiet: this is walked through in client
 * presentations, so it has to read as an intentional "asset pending" marker at
 * a glance — never as a broken image or an unfinished layout.
 */
export function ImagePlaceholder({ label, className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center",
        "border-2 border-dashed border-primary/45 bg-primary/[0.04]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary"
      >
        <Camera className="h-5 w-5" />
      </span>
      <span className="text-xs font-semibold tracking-[0.08em] text-primary/90 uppercase">
        Photo: {label}
      </span>
    </div>
  );
}
