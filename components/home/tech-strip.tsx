import { skillIcons } from "@/data/skill-icons";

// Only technologies from data/skills.ts that have a real brand icon.
const stripItems = [
  "Java",
  "Spring Boot",
  "Spring Security",
  "React.js",
  "TypeScript",
  "JavaScript",
  "PostgreSQL",
  "Hibernate",
  "Tailwind CSS",
  "Maven",
  "Git",
  "Postman",
  "Swagger/OpenAPI",
  "Jira",
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className={`flex items-center gap-10 pr-10 ${hidden ? "marquee-dup" : ""}`} aria-hidden={hidden || undefined}>
      {stripItems.map((item) => {
        const entry = skillIcons[item];
        if (!entry) return null;
        const Icon = entry.icon;
        return (
          <li key={item} className="flex items-center gap-2 text-base text-text-soft whitespace-nowrap">
            <Icon aria-hidden className="w-6 h-6 shrink-0" style={entry.color ? { color: entry.color } : undefined} />
            {item}
          </li>
        );
      })}
    </ul>
  );
}

export function TechStrip() {
  return (
    <section aria-label="Technologies I work with" className="border-b border-border">
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <p className="text-xs font-medium text-text-soft uppercase tracking-wide text-center">
          Technologies I work with
        </p>
      </div>
      <div className="marquee py-7 overflow-hidden">
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
