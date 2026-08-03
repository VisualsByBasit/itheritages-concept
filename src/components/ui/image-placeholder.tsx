import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  /** What photo belongs here, e.g. "Team — Islamabad office" */
  label: string;
  className?: string;
}

export function ImagePlaceholder({ label, className }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-6 text-center",
        className
      )}
    >
      <ImageIcon className="h-6 w-6 text-muted-foreground/60" aria-hidden="true" />
      <span className="text-xs font-medium tracking-[0.08em] text-muted-foreground/80 uppercase">
        Photo: {label}
      </span>
    </div>
  );
}
