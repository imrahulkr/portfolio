import type { Decision } from "@/data/projects";

export function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <div className="border border-border rounded-lg p-5">
      <h3 className="font-heading text-sm font-medium text-text mb-1.5">{decision.title}</h3>
      <p className="text-sm text-text-soft">{decision.description}</p>
    </div>
  );
}
