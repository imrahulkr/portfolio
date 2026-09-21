import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { stats } from "@/data/stats";
import { experience } from "@/data/experience";
import { CountUp } from "@/components/ui/count-up";

export function Hero() {
  const currentRole = experience[0];

  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-stretch">
        <div>
          <p className="font-heading text-sm font-medium text-accent mb-3">{siteConfig.role}</p>
          <h1 className="font-heading font-semibold text-3xl max-w-[18ch] text-text">
            Building scalable backend systems, and writing about what I learn.
          </h1>
          <p className="mt-5 max-w-[56ch] text-base text-text-soft">
            I&apos;m {siteConfig.name}, a backend and full-stack engineer working with Java, Spring Boot,
            and React — currently {currentRole.role} at {currentRole.company.replace(/\s+Ltd\.?$/, "")},
            shipping enterprise systems used across large organizations.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="px-5 py-2.5 text-sm font-medium rounded bg-text text-bg hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
              View projects
            </a>
            <a href="/blog" className="px-5 py-2.5 text-sm font-medium rounded border border-border text-text hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
              Read blog
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-text-soft">
            <a href={siteConfig.links.github} className="hover:text-text transition-colors focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">GitHub</a>
            <a href={siteConfig.links.linkedin} className="hover:text-text transition-colors focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">LinkedIn</a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-text transition-colors focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">Email</a>
            <Link href="/resume" className="hover:text-text transition-colors focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">Resume</Link>
          </div>
        </div>

        <div className="border border-border rounded-xl bg-surface p-6 flex flex-col relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative flex items-center justify-between pb-4 mb-5 border-b border-border">
            <span className="text-xs text-text-soft">Career snapshot</span>
            <span className="text-xs text-text-soft">2021–present</span>
          </div>
          <ul className="relative flex flex-col justify-between gap-6 flex-1">
            {stats.map((s) => (
              <li key={s.label} className="flex items-baseline justify-between gap-4">
                <span className="font-heading text-2xl font-semibold text-accent whitespace-nowrap">
                  <CountUp value={s.value} />
                </span>
                <span className="text-xs text-text-soft text-right">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
