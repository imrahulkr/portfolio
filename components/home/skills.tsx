import {
  FiBox,
  FiLayers,
  FiCpu,
  FiPackage,
  FiCheckSquare,
  FiLayout,
  FiGlobe,
  FiGitBranch,
  FiDatabase,
  FiLock,
  FiZap,
  FiCode,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { skills } from "@/data/skills";
import { skillIcons } from "@/data/skill-icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

// Items with no real brand logo (unlike data/skill-icons.ts' entries, which
// are real official logos) — generic outline icons in the site's single
// accent color instead, same treatment as components/home/focus-areas.tsx.
const genericIcons: Record<string, IconType> = {
  SQL: FiDatabase,
  "REST APIs": FiGlobe,
  OAuth2: FiLock,
  Zustand: FiZap,
  "VS Code": FiCode,
  Microservices: FiBox,
  "System design": FiLayers,
  Multithreading: FiCpu,
  OOP: FiPackage,
  "SOLID principles": FiCheckSquare,
  "Design patterns": FiLayout,
  "RESTful architecture": FiGlobe,
  DSA: FiGitBranch,
};

export function Skills() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading title="Technical range" subtitle="Languages, frameworks, and tools I work with regularly" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border rounded-xl overflow-hidden">
            {skills.map((group) => (
              <div key={group.category} className="bg-bg p-6">
                <h3 className="text-sm font-semibold text-text-soft mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => {
                    const entry = skillIcons[item];
                    const BrandIcon = entry?.icon;
                    const GenericIcon = genericIcons[item];
                    return (
                      <span
                        key={item}
                        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-surface text-text-soft border border-border transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:text-text motion-reduce:hover:translate-y-0"
                      >
                        {BrandIcon && (
                          <BrandIcon
                            aria-hidden
                            className="w-4 h-4 shrink-0"
                            style={entry.color ? { color: entry.color } : undefined}
                          />
                        )}
                        {!BrandIcon && GenericIcon && (
                          <GenericIcon aria-hidden className="w-4 h-4 shrink-0 text-accent" />
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
