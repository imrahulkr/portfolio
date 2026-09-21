import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/reveal";
import { ArchitectureThumb } from "@/components/projects/architecture-thumb";
import { BrowserFrame } from "@/components/projects/browser-frame";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="font-heading text-xl font-semibold text-text mb-10">Featured projects</h2>

      <div className="flex flex-col gap-8">
        {featured.map((project) => (
          <Reveal key={project.slug}>
            <article className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-0 border border-border rounded-xl overflow-hidden hover:border-accent transition-colors">
              <div
                className="project-tint relative border-b md:border-b-0 md:border-r border-border min-h-[220px] flex items-center justify-center overflow-hidden"
                style={
                  {
                    "--tint-light": project.cardTint.light,
                    "--tint-dark": project.cardTint.dark,
                  } as React.CSSProperties
                }
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative">
                  {project.cardVisual === "architecture" && project.architecture ? (
                    <ArchitectureThumb nodes={project.architecture} />
                  ) : (
                    <BrowserFrame url={project.liveUrl} title={project.title} />
                  )}
                </div>
              </div>

              <div className="p-7">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-xs text-text-soft">{project.category}</p>
                  {project.status === "in-progress" && (
                    <span className="text-xs px-2 py-0.5 rounded-full border border-accent text-accent">
                      Currently building
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-lg font-medium text-text mb-2">{project.title}</h3>
                <p className="text-sm text-text-soft mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded bg-surface text-text-soft border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  <a href={`/projects/${project.slug}`} className="text-accent hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">
                    View case study →
                  </a>
                  {project.github && (
                    <a href={project.github} className="text-text-soft hover:text-text focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">GitHub</a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="text-text-soft hover:text-text focus-visible:outline-none focus-visible:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm">Live demo</a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
