import { processSteps } from "@/data/process";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <section id="process" className="max-w-5xl mx-auto px-6 py-24">
      <Reveal>
        <SectionHeading title="How we'd work together" subtitle="A simple process, so you always know what happens next." />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-border bg-bg p-6">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-medium text-accent mb-4"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-lg font-semibold text-text mb-2">{step.title}</h3>
              <p className="text-base text-text-soft">{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
