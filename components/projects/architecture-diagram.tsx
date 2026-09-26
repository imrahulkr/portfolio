import type { ArchitectureNode } from "@/data/projects";
import { TechChip } from "@/components/projects/tech-chip";

// Full flow diagram used on the case-study page. Layout: the first node is
// the entry point (usually the client), the second is the core service, and
// any further nodes are the systems the core talks to, stacked on the right.
// On narrow screens everything stacks top to bottom with down arrows.

function Node({ node }: { node: ArchitectureNode }) {
  return (
    <div
      className={`card-glow relative rounded-xl bg-surface p-4 ${
        node.planned ? "border border-dashed border-accent/60" : "border border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-heading text-base font-semibold text-text">{node.label}</p>
        {node.planned && (
          <span className="shrink-0 rounded-full border border-accent px-2 py-0.5 text-xs text-accent">Planned</span>
        )}
      </div>
      <p className="mt-1 text-sm text-text-soft">{node.detail}</p>
      {node.tech && node.tech.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {node.tech.map((tech) => (
            <TechChip key={tech} name={tech} />
          ))}
        </div>
      )}
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center text-accent" aria-hidden="true">
      <svg width="24" height="36" viewBox="0 0 24 36" className="lg:hidden" focusable="false">
        <path d="M12 0v28M6 22l6 8 6-8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
      <svg width="40" height="24" viewBox="0 0 40 24" className="hidden lg:block" focusable="false">
        <path d="M0 12h32M26 6l8 6-8 6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNode[] }) {
  if (nodes.length < 3) {
    return (
      <div className="flex max-w-xl flex-col gap-3">
        {nodes.map((node) => (
          <Node key={node.label} node={node} />
        ))}
      </div>
    );
  }

  const [entry, core, ...downstream] = nodes;

  return (
    <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1.15fr)] lg:gap-4">
      <Node node={entry} />
      <Connector />
      <Node node={core} />
      <Connector />
      <div className="flex flex-col gap-3">
        {downstream.map((node) => (
          <Node key={node.label} node={node} />
        ))}
      </div>
    </div>
  );
}
