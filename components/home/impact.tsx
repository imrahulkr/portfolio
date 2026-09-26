import { impactItems } from "@/data/impact";
import { getAllSeries } from "@/lib/blog";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";

export function Impact() {
  const chapterCount = getAllSeries().reduce((sum, s) => sum + s.chapters.length, 0);
  const items = [
    ...impactItems,
    { value: String(chapterCount), label: "blog chapters on Java, Spring Boot, and system design" },
  ];

  return (
    <section aria-label="Impact" className="bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Reveal>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {items.map((item) => (
              <li key={item.label} className="text-center lg:text-left">
                <span className="block font-heading text-3xl font-semibold text-accent">
                  <CountUp value={item.value} />
                </span>
                <span className="block mt-2 text-sm text-text-soft">{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
