import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiFileText } from "react-icons/fi";
import { siteConfig } from "@/data/site-config";
import { stats } from "@/data/stats";
import { CountUp } from "@/components/ui/count-up";

export function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-stretch">
        <div>
          <p className="font-heading text-base font-medium text-accent mb-4">{siteConfig.role}</p>
          <h1 className="font-heading font-semibold text-3xl max-w-[18ch] text-text">
            Building scalable backend systems, and writing about what I learn.
          </h1>
          <p className="mt-6 max-w-[48ch] text-lg text-text-soft">
            Backend-leaning engineer working in Java, Spring Boot, and React — focused on
            systems that hold up under real production load.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="px-6 py-3 text-base font-medium rounded-lg bg-text text-bg hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
              View projects
            </a>
            <a href="/blog" className="px-6 py-3 text-base font-medium rounded-lg border border-border text-text hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
              Read blog
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-5 text-base text-text-soft">
            <a href={siteConfig.links.github} className="flex items-center gap-1.5 hover:text-text transition-colors focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">
              <FiGithub aria-hidden className="w-4 h-4" />
              GitHub
            </a>
            <a href={siteConfig.links.linkedin} className="flex items-center gap-1.5 hover:text-text transition-colors focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">
              <FiLinkedin aria-hidden className="w-4 h-4" />
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-text transition-colors focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">
              <FiMail aria-hidden className="w-4 h-4" />
              Email
            </a>
            <Link href="/resume" className="flex items-center gap-1.5 hover:text-text transition-colors focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">
              <FiFileText aria-hidden className="w-4 h-4" />
              Resume
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-2xl bg-surface p-7 flex flex-col relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative flex items-center justify-between pb-4 mb-6 border-b border-border">
            <span className="text-sm text-text-soft">Career snapshot</span>
            <span className="text-sm text-text-soft">2021–present</span>
          </div>
          <ul className="relative flex flex-col justify-between gap-7 flex-1">
            {stats.map((s) => (
              <li key={s.label} className="flex items-baseline justify-between gap-4">
                <span className="font-heading text-2xl font-semibold text-accent whitespace-nowrap">
                  <CountUp value={s.value} />
                </span>
                <span className="text-sm text-text-soft text-right">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
