import { FiAlertCircle } from "react-icons/fi";
import type { Challenge } from "@/data/projects";

export function ChallengeList({ challenges }: { challenges: Challenge[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {challenges.map((c) => (
        <div key={c.title} className="card-glow relative rounded-2xl border border-border bg-surface p-6">
          <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-inset ring-accent/30">
            <FiAlertCircle aria-hidden className="h-4 w-4 text-accent" />
          </span>
          <h3 className="mb-2 font-heading text-base font-semibold text-text">{c.title}</h3>
          <p className="text-sm text-text-soft">{c.description}</p>
        </div>
      ))}
    </div>
  );
}

// Single-paragraph variant for projects that describe one main challenge.
export function ChallengeCallout({ text }: { text: string }) {
  return (
    <div className="card-glow relative max-w-3xl rounded-2xl border border-border bg-surface p-6">
      <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 ring-1 ring-inset ring-accent/30">
        <FiAlertCircle aria-hidden className="h-4 w-4 text-accent" />
      </span>
      <p className="text-base text-text-soft">{text}</p>
    </div>
  );
}
