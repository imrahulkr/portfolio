"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/section-heading";

// Desktop geometry. The wave lives in a 1000 x 128 box that spans the full
// width, so the four node x positions are exactly 12.5%, 37.5%, 62.5% and
// 87.5%. Nodes alternate between y=32 (high) and y=88 (low), and the curve
// leaves each node horizontally so it reads as one smooth S-shaped path.
const WAVE_PATH =
  "M0,32 H125 C250,32 250,88 375,88 C500,88 500,32 625,32 C750,32 750,88 875,88 H1000";

const EDGE_FADE = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="max-w-5xl mx-auto px-6 py-24">
      <SectionHeading title="How we'd work together" subtitle="A simple process, so you always know what happens next." />

      <div ref={ref} className="relative">
        {/* Desktop wave: dashed base path, with an accent path drawn over it on scroll. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 lg:block"
          style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
        >
          <svg viewBox="0 0 1000 128" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d={WAVE_PATH} fill="none" stroke="var(--border)" strokeWidth="2" strokeDasharray="5 7" />
          </svg>
          <div
            className="absolute inset-0 motion-safe:transition-[clip-path] motion-safe:duration-[1600ms] motion-safe:ease-out"
            style={{ clipPath: shown ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
          >
            <svg viewBox="0 0 1000 128" preserveAspectRatio="none" className="h-full w-full">
              <path d={WAVE_PATH} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-0">
          {processSteps.map((step, i) => {
            const high = i % 2 === 0;
            const isLast = i === processSteps.length - 1;
            return (
              <li
                key={step.title}
                className={`group relative flex flex-col pl-14 lg:px-2.5 lg:pl-2.5 lg:pt-36 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${
                  shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
                style={{ transitionDelay: shown ? `${i * 160}ms` : "0ms" }}
              >
                {/* Mobile: curved connector down to the next node. */}
                {!isLast && (
                  <svg
                    aria-hidden
                    viewBox="0 0 40 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute left-0 top-5 w-10 overflow-visible lg:hidden"
                    style={{ height: "calc(100% + 1.5rem)" }}
                  >
                    <path
                      d="M20,0 C-14,33 54,66 20,100"
                      fill="none"
                      strokeWidth="2"
                      strokeDasharray="4 5"
                      className="stroke-accent opacity-40 transition-opacity group-hover:opacity-100"
                    />
                  </svg>
                )}

                {/* Desktop: stem from the node down to the card. */}
                <span
                  aria-hidden
                  className={`absolute left-1/2 hidden w-px -translate-x-1/2 bg-border transition-colors group-hover:bg-accent lg:block ${
                    high ? "lg:top-[52px] lg:h-[92px]" : "lg:top-[108px] lg:h-9"
                  }`}
                />

                <span
                  aria-hidden
                  className={`absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg font-mono text-sm font-medium text-accent transition-all duration-200 group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-bg group-hover:shadow-[0_0_26px_rgba(var(--accent-rgb),0.65)] lg:left-1/2 lg:-translate-x-1/2 lg:group-hover:scale-110 ${
                    high ? "lg:top-3" : "lg:top-[68px]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="card-glow relative flex-1 rounded-2xl border border-border bg-bg p-6 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                  <h3 className="mb-2 font-heading text-lg font-semibold text-text">{step.title}</h3>
                  <p className="text-base text-text-soft">{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
