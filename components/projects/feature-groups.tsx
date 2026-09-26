import { FiCheck } from "react-icons/fi";
import type { FeatureGroup } from "@/data/projects";

export function FeatureGroups({ groups }: { groups: FeatureGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title} className="card-glow relative rounded-2xl border border-border bg-surface p-6">
          <h3 className="mb-4 font-heading text-base font-semibold text-text">{group.title}</h3>
          <ul className="flex flex-col gap-2.5">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-text-soft">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <FiCheck aria-hidden className="h-3 w-3 text-accent" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
