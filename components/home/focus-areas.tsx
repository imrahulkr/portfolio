import { FiServer, FiMonitor, FiLayers, FiCpu } from "react-icons/fi";
import type { IconType } from "react-icons";
import { focusAreas } from "@/data/skills";

// Generic Feather icons in the site's single accent color — these are
// concept categories, not brands, so no logo/brand-color mapping applies
// (unlike data/skill-icons.ts, which is for real tech logos).
const focusIcons: Record<string, IconType> = {
  "Backend engineering": FiServer,
  Frontend: FiMonitor,
  "System design": FiLayers,
  AI: FiCpu,
};

export function FocusAreas() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-xs font-medium text-text-soft uppercase tracking-wide mb-6">Focus areas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {focusAreas.map((area) => {
            const Icon = focusIcons[area.title];
            return (
              <div
                key={area.title}
                className="bg-bg border border-border rounded-xl p-6 transition-all duration-150 hover:-translate-y-1 hover:border-accent motion-reduce:hover:translate-y-0"
              >
                {Icon && (
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 mb-4">
                    <Icon aria-hidden className="h-5 w-5 text-accent" />
                  </div>
                )}
                <h3 className="font-heading text-base font-semibold text-text mb-2">{area.title}</h3>
                <p className="text-sm text-text-soft">{area.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
