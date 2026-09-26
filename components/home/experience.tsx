import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-24">
      <Reveal>
        <SectionHeading title="Experience" subtitle="My professional journey so far" />
        <div className="relative pl-7 max-w-3xl mx-auto">
          <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-border" />
          {experience.map((entry, i) => (
            <div key={i} className="relative pb-12 last:pb-0">
              <div className="absolute -left-7 top-1.5 w-[11px] h-[11px] rounded-full bg-accent" />
              <p className="text-sm text-text-soft font-medium mb-1.5">{entry.duration}</p>
              <h3 className="font-heading text-lg font-semibold text-text">{entry.role}</h3>
              <p className="text-base text-accent mb-3">{entry.company} · {entry.location}</p>
              <ul className="text-base text-text-soft list-disc list-outside pl-4 space-y-2">
                {entry.achievements.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
