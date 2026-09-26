import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

// Shared wrapper for every case-study section: anchor id for the sticky
// in-page nav, a small accent eyebrow, a left-aligned heading, and an
// optional intro line.
export function CaseSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  last = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-32 ${last ? "" : "border-b border-border"}`}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-wide text-accent mb-2">{eyebrow}</p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-text">{title}</h2>
          {intro && <p className="mt-2 max-w-[65ch] text-base text-text-soft">{intro}</p>}
          <div className="mt-8">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
