import { skills } from "@/data/skills";
import { skillIcons } from "@/data/skill-icons";
import { Reveal } from "@/components/ui/reveal";

export function Skills() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Reveal>
          <h2 className="font-heading text-xl font-semibold text-text mb-10">Technical range</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {skills.map((group) => (
              <div key={group.category} className="bg-bg p-5">
                <h3 className="text-xs font-medium text-text-soft mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const entry = skillIcons[item];
                    const Icon = entry?.icon;
                    return (
                      <span
                        key={item}
                        className="flex items-center gap-1.5 text-xs px-2 py-1 rounded bg-surface text-text-soft border border-border"
                      >
                        {Icon && (
                          <Icon
                            aria-hidden
                            className="w-3.5 h-3.5 shrink-0"
                            style={entry.color ? { color: entry.color } : undefined}
                          />
                        )}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
