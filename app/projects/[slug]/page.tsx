import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";
import { siteConfig, siteUrl } from "@/data/site-config";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { ArchitectureThumb } from "@/components/projects/architecture-thumb";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { BrowserFrame } from "@/components/projects/browser-frame";
import { DecisionCard } from "@/components/projects/decision-card";
import { TechChip } from "@/components/projects/tech-chip";
import { CaseSection } from "@/components/projects/case-section";
import { ProjectNav } from "@/components/projects/project-nav";
import { MetricsStrip } from "@/components/projects/metrics-strip";
import { FlowTimeline } from "@/components/projects/flow-timeline";
import { AccessTable } from "@/components/projects/access-table";
import { FeatureGroups } from "@/components/projects/feature-groups";
import { ChallengeList, ChallengeCallout } from "@/components/projects/challenge-list";
import { RoadmapList } from "@/components/projects/roadmap-list";
import { TechStack } from "@/components/projects/tech-stack";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Rahul Kumar`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.description },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${siteUrl}/projects/${project.slug}`,
    keywords: project.technologies.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteUrl },
    sameAs: [project.github, project.liveUrl].filter((u): u is string => Boolean(u)),
  };

  // Only sections with real content appear, in the sticky nav and on the page.
  const hasOverview = Boolean(project.overview || project.problem || project.solution || project.facts?.length);
  const hasArchitecture = Boolean(project.architecture && project.architecture.length > 0);
  const hasFeatures = Boolean(project.featureGroups?.length || (project.features?.length && !project.roadmap));
  const hasDecisions = Boolean(project.decisions?.length);
  const hasChallenges = Boolean(project.challengeList?.length || project.challenges);
  const hasResults = Boolean(project.results?.length);
  const hasStack = Boolean(project.techGroups?.length);

  const navItems = [
    hasOverview && { id: "overview", label: "Overview" },
    hasArchitecture && { id: "architecture", label: "Architecture" },
    project.flow && { id: "flow", label: project.flow.title },
    project.accessModel?.length && { id: "access", label: "Access model" },
    hasFeatures && { id: "features", label: "Features" },
    hasDecisions && { id: "decisions", label: "Decisions" },
    hasChallenges && { id: "challenges", label: "Challenges" },
    project.roadmap && { id: "status", label: project.roadmap.title },
    hasResults && { id: "results", label: "Results" },
    hasStack && { id: "stack", label: "Tech stack" },
  ].filter((item): item is { id: string; label: string } => Boolean(item));

  const tintStyle = {
    "--tint-light": project.cardTint.light,
    "--tint-dark": project.cardTint.dark,
  } as React.CSSProperties;

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <main id="main-content">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-border">
          <div aria-hidden className="hero-aurora" />
          <div aria-hidden className="hero-grid" />
          <div className="max-w-5xl mx-auto px-6 pt-8 pb-16">
            <Link
              href="/#projects"
              className={`inline-flex items-center gap-1.5 rounded-sm text-sm text-text-soft transition-colors hover:text-text ${focusRing}`}
            >
              <FiArrowLeft aria-hidden className="h-4 w-4" />
              All projects
            </Link>

            <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-border bg-surface/70 px-3 py-1 text-sm font-medium text-text-soft">
                    {project.category}
                  </span>
                  {project.status === "in-progress" && (
                    <span className="rounded-full border border-accent px-3 py-1 text-sm text-accent">
                      Currently building
                    </span>
                  )}
                </div>
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-text lg:text-4xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-[52ch] text-lg text-text-soft">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 8).map((tech) => (
                    <TechChip key={tech} name={tech} />
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`glow-button inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-bg transition hover:brightness-110 ${focusRing}`}
                    >
                      Visit live site
                      <FiExternalLink aria-hidden className="h-4 w-4" />
                    </a>
                  ) : (
                    project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`glow-button inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-bg transition hover:brightness-110 ${focusRing}`}
                      >
                        <FiGithub aria-hidden className="h-4 w-4" />
                        View source
                      </a>
                    )
                  )}
                  {project.liveUrl && project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-base font-medium text-text transition-colors hover:border-accent ${focusRing}`}
                    >
                      <FiGithub aria-hidden className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  <Link
                    href="/#contact"
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-3 text-base font-medium text-text-soft transition-colors hover:text-text ${focusRing}`}
                  >
                    Discuss a similar project
                    <FiArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>
                {!project.github && (
                  <p className="mt-4 text-sm italic text-text-soft">
                    The repository is private at the organization&apos;s request.
                  </p>
                )}
              </div>

              {project.cardVisual === "browser-frame" ? (
                <div className="glow-panel overflow-hidden rounded-2xl border border-border bg-surface">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live site`}
                      className={`block ${focusRing}`}
                    >
                      <BrowserFrame url={project.liveUrl} title={project.title} screenshot={project.screenshot} />
                    </a>
                  ) : (
                    <BrowserFrame url={project.liveUrl} title={project.title} screenshot={project.screenshot} />
                  )}
                </div>
              ) : (
                project.architecture && (
                  <div
                    className="project-tint glow-panel relative overflow-hidden rounded-2xl border border-border py-8"
                    style={tintStyle}
                  >
                    {project.backgroundTexture && (
                      <Image
                        src={project.backgroundTexture}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(min-width: 1024px) 480px, 100vw"
                        className="object-cover opacity-[0.12] grayscale"
                      />
                    )}
                    <div className="relative">
                      <ArchitectureThumb nodes={project.architecture} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {project.metrics && project.metrics.length > 0 && (
          <MetricsStrip metrics={project.metrics} note={project.metricsNote} />
        )}

        {navItems.length > 1 && <ProjectNav items={navItems} />}

        {hasOverview && (
          <CaseSection id="overview" eyebrow="The project" title="Overview">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-6">
                {project.overview && <p className="max-w-[65ch] text-base text-text-soft">{project.overview}</p>}
                {(project.problem || project.solution) && (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {project.problem && (
                      <div className="card-glow relative rounded-2xl border border-border bg-surface p-6">
                        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-accent">The problem</p>
                        <p className="text-sm text-text-soft">{project.problem}</p>
                      </div>
                    )}
                    {project.solution && (
                      <div className="card-glow relative rounded-2xl border border-border bg-surface p-6">
                        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-accent">The approach</p>
                        <p className="text-sm text-text-soft">{project.solution}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {project.facts && project.facts.length > 0 && (
                <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
                  <p className="mb-4 text-xs font-medium uppercase tracking-wide text-text-soft">Quick facts</p>
                  <dl className="flex flex-col gap-4">
                    {project.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="text-xs uppercase tracking-wide text-text-soft">{fact.label}</dt>
                        <dd className="mt-0.5 text-sm text-text">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              )}
            </div>
          </CaseSection>
        )}

        {hasArchitecture && project.architecture && (
          <CaseSection
            id="architecture"
            eyebrow="How it fits together"
            title="Architecture"
            intro="A simplified view of the main pieces and how requests move between them."
          >
            <ArchitectureDiagram nodes={project.architecture} />
          </CaseSection>
        )}

        {project.flow && (
          <CaseSection id="flow" eyebrow="Under the hood" title={project.flow.title} intro={project.flow.intro}>
            <FlowTimeline steps={project.flow.steps} />
          </CaseSection>
        )}

        {project.accessModel && project.accessModel.length > 0 && (
          <CaseSection
            id="access"
            eyebrow="Security"
            title="Who can access what"
            intro="Route access is enforced by Spring Security, so each role only reaches its own part of the API."
          >
            <AccessTable rules={project.accessModel} />
          </CaseSection>
        )}

        {hasFeatures && (
          <CaseSection id="features" eyebrow="What it does" title="Key features">
            <FeatureGroups
              groups={project.featureGroups ?? [{ title: "Highlights", items: project.features ?? [] }]}
            />
          </CaseSection>
        )}

        {hasDecisions && project.decisions && (
          <CaseSection
            id="decisions"
            eyebrow="Engineering"
            title="Key engineering decisions"
            intro="The choices that shaped how the system behaves under real conditions."
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {project.decisions.map((decision) => (
                <DecisionCard key={decision.title} decision={decision} />
              ))}
            </div>
          </CaseSection>
        )}

        {hasChallenges && (
          <CaseSection id="challenges" eyebrow="Lessons" title="Challenges">
            {project.challengeList?.length ? (
              <ChallengeList challenges={project.challengeList} />
            ) : (
              project.challenges && <ChallengeCallout text={project.challenges} />
            )}
          </CaseSection>
        )}

        {project.roadmap && (
          <CaseSection id="status" eyebrow="Progress" title={project.roadmap.title}>
            <RoadmapList roadmap={project.roadmap} />
          </CaseSection>
        )}

        {hasResults && project.results && (
          <CaseSection id="results" eyebrow="Outcome" title="Results">
            <ul className="max-w-3xl list-outside list-disc space-y-2 pl-5 text-base text-text-soft">
              {project.results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </CaseSection>
        )}

        {hasStack && project.techGroups && (
          <CaseSection id="stack" eyebrow="Tools" title="Tech stack" last>
            <TechStack groups={project.techGroups} />
          </CaseSection>
        )}

        {/* Call to action */}
        <section className="border-t border-border bg-surface">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="card-glow relative flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-bg p-8 md:flex-row md:items-center">
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-text">
                  Have something similar in mind?
                </h2>
                <p className="mt-2 max-w-[52ch] text-base text-text-soft">
                  I take on freelance projects from API design to launch. Tell me what you&apos;re building.
                </p>
              </div>
              <Link
                href="/#contact"
                className={`glow-button inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-medium text-bg transition hover:brightness-110 ${focusRing}`}
              >
                Get in touch
                <FiArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                { label: "Previous project", project: prev, arrow: "left" as const },
                { label: "Next project", project: next, arrow: "right" as const },
              ].map(({ label, project: target, arrow }) => (
                <Link
                  key={label}
                  href={`/projects/${target.slug}`}
                  className={`card-glow relative flex items-center gap-4 rounded-2xl border border-border bg-bg p-6 ${focusRing} ${
                    arrow === "right" ? "sm:flex-row-reverse sm:text-right" : ""
                  }`}
                >
                  {arrow === "left" ? (
                    <FiArrowLeft aria-hidden className="h-5 w-5 shrink-0 text-accent" />
                  ) : (
                    <FiArrowRight aria-hidden className="h-5 w-5 shrink-0 text-accent" />
                  )}
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wide text-text-soft">{label}</span>
                    <span className="mt-1 block font-heading text-lg font-semibold text-text">{target.title}</span>
                    <span className="mt-0.5 block text-sm text-text-soft">{target.category}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
