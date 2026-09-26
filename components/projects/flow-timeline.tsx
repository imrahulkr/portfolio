import type { FlowStep } from "@/data/projects";

// Vertical numbered timeline for a request or process lifecycle. The rail
// runs behind the numbered nodes; each step is a card that glows on hover.
export function FlowTimeline({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="relative flex max-w-3xl flex-col gap-5">
      <span aria-hidden className="absolute bottom-5 left-[19px] top-5 w-px bg-border" />
      {steps.map((step, i) => (
        <li key={step.label} className="group relative flex gap-5">
          <span
            aria-hidden
            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-sm font-medium text-accent transition-all duration-200 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-bg group-hover:shadow-[0_0_26px_rgba(var(--accent-rgb),0.65)]"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="card-glow relative flex-1 rounded-2xl border border-border bg-surface p-5">
            <h3 className="mb-1.5 font-heading text-base font-semibold text-text">{step.label}</h3>
            <p className="text-sm text-text-soft">{step.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
