import { FiCheckCircle, FiLoader, FiCircle } from "react-icons/fi";
import type { Roadmap, RoadmapState } from "@/data/projects";

const STATE_META: Record<RoadmapState, { label: string; icon: typeof FiCheckCircle; iconTone: string; tag: string }> = {
  done: {
    label: "Built",
    icon: FiCheckCircle,
    iconTone: "text-accent",
    tag: "border-accent/40 bg-accent/10 text-accent",
  },
  "in-progress": {
    label: "In progress",
    icon: FiLoader,
    iconTone: "text-accent",
    tag: "border-accent text-accent",
  },
  next: {
    label: "Up next",
    icon: FiCircle,
    iconTone: "text-text-soft",
    tag: "border-border text-text-soft",
  },
};

const ORDER: RoadmapState[] = ["done", "in-progress", "next"];

// Honest build-status view: what exists, what is underway, what is next, with
// a progress bar of built items and the date it was last checked. Items are
// listed built-first so the list reads top to bottom as "done to do".
export function RoadmapList({ roadmap }: { roadmap: Roadmap }) {
  const total = roadmap.items.length;
  const done = roadmap.items.filter((i) => i.state === "done").length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const sorted = ORDER.flatMap((state) => roadmap.items.filter((i) => i.state === state));

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between text-sm">
          <span className="text-text-soft">
            {done} of {total} built
          </span>
          <span className="text-xs text-text-soft">As of {roadmap.asOf}</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          aria-label={`${roadmap.title}: ${done} of ${total} built`}
          className="h-2 overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-border"
        >
          <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <ul className="overflow-hidden rounded-2xl border border-border">
        {sorted.map((item, i) => {
          const meta = STATE_META[item.state];
          const Icon = meta.icon;
          return (
            <li
              key={item.title}
              className={`flex items-center gap-3 bg-surface px-5 py-3.5 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <Icon aria-hidden className={`h-4 w-4 shrink-0 ${meta.iconTone}`} />
              <span className="flex-1 text-sm text-text">{item.title}</span>
              <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.tag}`}>
                {meta.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
