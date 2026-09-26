import { FiCompass } from "react-icons/fi";
import type { Decision } from "@/data/projects";

export function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <div className="card-glow relative h-full rounded-2xl border border-border bg-surface p-6">
      <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-inset ring-accent/30">
        <FiCompass aria-hidden className="h-4 w-4 text-accent" />
      </span>
      <h3 className="mb-2 font-heading text-base font-semibold text-text">{decision.title}</h3>
      <p className="text-sm text-text-soft">{decision.description}</p>
    </div>
  );
}
