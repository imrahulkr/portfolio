import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { DecisionCard } from "@/components/projects/decision-card";
import { Footer } from "@/components/layout/footer";

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
    openGraph: { title: project.title, description: project.description },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
    <main id="main-content">
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-text-soft hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
        >
          ← All projects
        </Link>
      </div>
      <section className="max-w-4xl mx-auto px-6 pt-8 pb-10 border-b border-border">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <p className="text-xs text-text-soft">{project.category}</p>
          {project.status === "in-progress" && (
            <span className="text-xs px-2 py-0.5 rounded-full border border-accent text-accent">
              Currently building
            </span>
          )}
        </div>
        <h1 className="font-heading text-2xl font-semibold text-text mb-3">{project.title}</h1>
        <p className="text-base text-text-soft max-w-[65ch] mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 rounded bg-surface text-text-soft border border-border">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-sm">
          {project.github ? (
            <a href={project.github} className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">GitHub</a>
          ) : (
            <span className="text-text-soft italic">
              {project.slug === "sidhant" ? "Repo is private" : "GitHub link not added yet"}
            </span>
          )}
          {project.liveUrl && <a href={project.liveUrl} className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">Live demo</a>}
        </div>
      </section>

      {project.overview && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text mb-4">Overview</h2>
          <p className="text-sm text-text-soft max-w-prose">{project.overview}</p>
        </section>
      )}

      {project.problem && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text mb-4">Problem</h2>
          <p className="text-sm text-text-soft max-w-prose">{project.problem}</p>
        </section>
      )}

      {project.solution && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text mb-4">Solution</h2>
          <p className="text-sm text-text-soft max-w-prose">{project.solution}</p>
        </section>
      )}

      {project.architecture && project.architecture.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text mb-2">Architecture</h2>
          <p className="text-sm text-text-soft mb-6 max-w-prose">
            Simplified flow — swap this component for a real diagram/image once you have one.
          </p>
          <ArchitectureDiagram nodes={project.architecture} />
        </section>
      )}

      {project.features && project.features.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text mb-6">Key features</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-text-soft">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.decisions && project.decisions.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text mb-6">Key engineering decisions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.decisions.map((decision) => (
              <DecisionCard key={decision.title} decision={decision} />
            ))}
          </div>
        </section>
      )}

      {project.challenges && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text mb-4">Challenges</h2>
          <p className="text-sm text-text-soft max-w-prose">{project.challenges}</p>
        </section>
      )}

      {project.results && project.results.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-b border-border">
          <h2 className="font-heading text-lg font-semibold text-text mb-4">Results</h2>
          <ul className="text-sm text-text-soft list-disc list-outside pl-5 space-y-1.5">
            {project.results.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-border">
        <h2 className="font-heading text-lg font-semibold text-text mb-6">Tech stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.technologies.map((tech) => (
            <div key={tech} className="border border-border rounded-lg py-3 px-3 text-center text-sm text-text bg-surface">
              {tech}
            </div>
          ))}
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
