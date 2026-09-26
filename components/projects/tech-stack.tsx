import type { TechGroup } from "@/data/projects";
import { TechChip } from "@/components/projects/tech-chip";

export function TechStack({ groups }: { groups: TechGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-soft">{group.label}</p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <TechChip key={item} name={item} size="md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
