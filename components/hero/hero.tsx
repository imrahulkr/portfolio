import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import { siteConfig } from "@/data/site-config";
import { heroContent } from "@/data/hero";
import { stats } from "@/data/stats";
import { projects } from "@/data/projects";
import { CountUp } from "@/components/ui/count-up";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const socialLink = `flex items-center gap-1.5 hover:text-text transition-colors rounded-sm ${focusRing}`;

export function Hero() {
  const featured = projects.filter((p) => p.featured);
  const heroStats = [stats[0], stats[3]];

  return (
    <section className="relative isolate">
      <div aria-hidden className="hero-aurora" />
      <div aria-hidden className="hero-grid" />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-14 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-sm font-medium text-text-soft mb-6">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {heroContent.eyebrow}
            </p>
            <h1 className="font-heading font-semibold text-3xl lg:text-4xl tracking-tight text-text max-w-[20ch]">
              {heroContent.headlineStart}{" "}
              <span className="text-gradient-accent">{heroContent.headlineHighlight}</span>
            </h1>
            <p className="mt-6 max-w-[50ch] text-lg text-text-soft">{heroContent.subtext}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className={`glow-button inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg bg-accent text-bg hover:brightness-110 transition ${focusRing}`}
              >
                {heroContent.primaryCta}
                <FiArrowRight aria-hidden className="h-4 w-4" />
              </a>
              <a
                href="#projects"
                className={`px-6 py-3 text-base font-medium rounded-lg border border-border text-text hover:border-accent transition-colors ${focusRing}`}
              >
                {heroContent.secondaryCta}
              </a>
              <Link
                href="/blog"
                className={`px-3 py-3 text-base font-medium text-text-soft hover:text-text transition-colors rounded-lg ${focusRing}`}
              >
                {heroContent.tertiaryCta} →
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-5 text-base text-text-soft">
              <a href={siteConfig.links.github} className={socialLink}>
                <FiGithub aria-hidden className="w-4 h-4" />
                GitHub
              </a>
              <a href={siteConfig.links.linkedin} className={socialLink}>
                <FiLinkedin aria-hidden className="w-4 h-4" />
                LinkedIn
              </a>
              <a href={`mailto:${siteConfig.email}`} className={socialLink}>
                <FiMail aria-hidden className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>

          <div className="glow-panel relative rounded-2xl border border-border bg-surface/90 backdrop-blur p-6 lg:[transform:perspective(1400px)_rotateY(-5deg)_rotateX(2deg)] lg:hover:[transform:none] transition-transform duration-500 motion-reduce:transform-none">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
              <span className="text-sm font-medium text-text">Selected work</span>
              <span className="text-sm text-text-soft">{siteConfig.name}</span>
            </div>

            <ul className="flex flex-col gap-3">
              {featured.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={`flex items-center gap-3 rounded-xl border border-border bg-bg p-3.5 hover:border-accent transition-colors ${focusRing}`}
                  >
                    <span
                      aria-hidden
                      className="tint-dot h-9 w-1.5 shrink-0 rounded-full"
                      style={
                        {
                          "--tint-light": project.cardTint.light,
                          "--tint-dark": project.cardTint.dark,
                        } as React.CSSProperties
                      }
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-heading text-base font-semibold text-text">
                        {project.title}
                      </span>
                      <span className="block truncate text-sm text-text-soft">
                        {project.technologies.slice(0, 3).join(" · ")}
                      </span>
                    </span>
                    {project.status === "in-progress" ? (
                      <span className="shrink-0 text-xs px-2 py-0.5 rounded-full border border-accent text-accent">
                        Building
                      </span>
                    ) : (
                      <FiArrowRight aria-hidden className="h-4 w-4 shrink-0 text-text-soft" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-5 pt-5 border-t border-border grid grid-cols-2 gap-4">
              {heroStats.map((s) => (
                <li key={s.label}>
                  <span className="block font-heading text-2xl font-semibold text-accent">
                    <CountUp value={s.value} />
                  </span>
                  <span className="block text-xs text-text-soft mt-1">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
