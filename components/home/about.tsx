import Link from "next/link";
import { FiAward, FiArrowRight } from "react-icons/fi";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArchitectureThumb } from "@/components/projects/architecture-thumb";
import { LeetCodeCard } from "@/components/home/leetcode-card";
import { projects } from "@/data/projects";
import { stats } from "@/data/stats";
import { achievements } from "@/data/achievements";

export type AboutContent = {
  intro: string[];
  // One-line summary of the project currently in progress. Facts only,
  // taken from that project's own entry in data/projects.ts.
  currentlyBuilding: string;
};

export const aboutContent: AboutContent = {
  intro: [
    "I'm a Technology Analyst at Infosys with 4+ years of experience building software across the full stack — currently focused on backend engineering with Java, Spring Boot, and modern web technologies.",
    "I like solving problems at the system level: backend architecture, APIs, and the data structures behind them. If you're looking for a developer to build, improve, or scale an application, let's talk.",
  ],
  currentlyBuilding:
    "An API gateway with a microservice architecture, built to consolidate authentication and to work hands-on with caching, rate limiting, and event streaming.",
};

const linkClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function About({ content = aboutContent }: { content?: AboutContent }) {
  const building = projects.find((p) => p.status === "in-progress");
  // stats[2] is the INSTA award (see data/stats.ts).
  const insta = stats[2];

  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-24">
      <Reveal>
        <SectionHeading title="About" />
        <div className="max-w-[80ch] mx-auto mb-8 flex flex-col gap-3 text-center">
          {content.intro.map((paragraph, i) => (
            <p key={i} className="text-lg text-text-soft">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a
            href="#contact"
            className={`glow-button inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg bg-accent text-bg hover:brightness-110 transition ${focusRing}`}
          >
            Let&apos;s talk
            <FiArrowRight aria-hidden className="h-4 w-4" />
          </a>
          <a
            href="#projects"
            className={`px-6 py-3 text-base font-medium rounded-lg border border-border text-text hover:border-accent transition-colors ${focusRing}`}
          >
            Explore projects
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
          {building && (
            <div className="card-glow relative flex flex-col rounded-2xl border border-border bg-bg p-6 lg:row-span-2">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-text-soft">Currently building</p>
                <span className="text-xs px-2 py-0.5 rounded-full border border-accent text-accent">In progress</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-text mb-4">{building.title}</h3>

              {building.architecture && (
                <div
                  className="project-tint mb-5 rounded-xl border border-border py-5"
                  style={
                    {
                      "--tint-light": building.cardTint.light,
                      "--tint-dark": building.cardTint.dark,
                    } as React.CSSProperties
                  }
                >
                  <ArchitectureThumb nodes={building.architecture} />
                </div>
              )}

              <p className="text-base text-text-soft">{content.currentlyBuilding}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Redis", "Apache Kafka", "Spring Security"]
                  .filter((tech) => building.technologies.includes(tech))
                  .map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full bg-surface text-text-soft border border-border"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
              <Link href={`/projects/${building.slug}`} className={`mt-auto pt-5 ${linkClass}`}>
                View case study
                <FiArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          )}

          <LeetCodeCard />

          <div className="card-glow relative rounded-2xl border border-border bg-bg p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <FiAward aria-hidden className="h-4 w-4 text-accent" />
              </span>
              <p className="text-sm font-medium text-text-soft">Recognition</p>
            </div>
            <p className="font-heading text-3xl font-semibold text-accent">{insta.value}</p>
            <p className="mt-1 text-base text-text">{insta.label}</p>
            {achievements.map((achievement) => (
              <p key={achievement} className="mt-3 text-sm text-text-soft">
                {achievement}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
