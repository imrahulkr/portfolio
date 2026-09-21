import { experience } from "@/data/experience";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-20">
      <Reveal>
        <h2 className="font-heading text-xl font-semibold text-text mb-10">Experience</h2>
        <div className="relative pl-7">
          <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-border" />
          {experience.map((entry, i) => (
            <div key={i} className="relative pb-10 last:pb-0">
              <div className="absolute -left-7 top-1 w-[11px] h-[11px] rounded-full bg-accent" />
              <p className="text-xs text-text-soft font-medium mb-1">{entry.duration}</p>
              <h3 className="font-heading text-base font-medium text-text">{entry.role}</h3>
              <p className="text-sm text-accent mb-2">{entry.company} · {entry.location}</p>
              <ul className="text-sm text-text-soft list-disc list-outside pl-4 space-y-1.5">
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
