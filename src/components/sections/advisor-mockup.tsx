import { cn } from "@/lib/utils";

/**
 * Browser-framed mockup of the ITH Advisor panel described in
 * PROJECT_BRIEF.md §5. Rendered as real DOM rather than a screenshot so it
 * stays sharp, themeable and translatable.
 *
 * The sample exchange only claims things the advisor could genuinely answer
 * from the service and industry data already in the site — no invented case
 * work, client names or numbers.
 */
export function AdvisorMockup({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-32px_rgba(10,10,11,0.35)]",
        className
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/30" />
        </span>
        <span className="mx-auto rounded-md bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground">
          itheritages.com
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-center gap-2 border-b border-border/70 pb-3">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary/12">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <p className="text-sm font-medium text-foreground">ITH Advisor</p>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Online
          </span>
        </div>

        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-foreground">
          We run a hospital network. Where do we start?
        </div>

        <div className="w-fit max-w-[90%] space-y-2.5 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-3 text-sm text-foreground/85">
          <p>Healthcare draws on three of our practices:</p>
          <ul className="space-y-1.5">
            {["Infrastructure Management", "Cyber Security", "Unified Communications"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              )
            )}
          </ul>
          <button
            type="button"
            tabIndex={-1}
            className="pointer-events-none mt-1 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background"
          >
            Book a consultation
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5">
          <span className="font-mono text-xs text-muted-foreground">Ask about</span>
          <span className="h-4 w-px bg-border" />
          <span className="text-sm text-muted-foreground/60">
            services, industries, security…
          </span>
        </div>
      </div>
    </div>
  );
}
