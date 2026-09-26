import type { Metric } from "@/data/projects";
import { CountUp } from "@/components/ui/count-up";

// A row of verified numbers for the project. Values that don't start with a
// digit are shown as plain text (CountUp leaves them untouched).
export function MetricsStrip({ metrics, note }: { metrics: Metric[]; note?: string }) {
  const cols =
    metrics.length >= 4 ? "md:grid-cols-4" : metrics.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section aria-label="Project at a glance" className="border-b border-border bg-surface">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <ul className={`grid grid-cols-2 gap-x-6 gap-y-8 ${cols}`}>
          {metrics.map((m) => (
            <li key={m.label}>
              <span className="block font-heading text-3xl font-semibold text-accent">
                <CountUp value={m.value} />
              </span>
              <span className="mt-1 block text-sm text-text-soft">{m.label}</span>
            </li>
          ))}
        </ul>
        {note && <p className="mt-6 text-xs text-text-soft">{note}</p>}
      </div>
    </section>
  );
}
