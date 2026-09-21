import { focusAreas } from "@/data/skills";

export function FocusAreas() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xs font-medium text-text-soft uppercase tracking-wide mb-6">Focus areas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {focusAreas.map((area) => (
            <div key={area.title} className="bg-bg p-6">
              <h3 className="font-heading text-sm font-medium text-text mb-1.5">{area.title}</h3>
              <p className="text-sm text-text-soft">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
