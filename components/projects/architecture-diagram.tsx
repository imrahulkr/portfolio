import type { ArchitectureNode } from "@/data/projects";

// Full vertical flow diagram used on the case-study page itself.
export function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNode[] }) {
  return (
    <div className="flex flex-col items-stretch gap-0 max-w-xl">
      {nodes.map((node, i) => (
        <div key={node.label} className="flex flex-col items-center">
          <div className="w-full border border-border rounded-lg bg-surface px-5 py-4">
            <p className="font-heading text-sm font-medium text-text">{node.label}</p>
            <p className="text-xs text-text-soft mt-1">{node.detail}</p>
          </div>
          {i < nodes.length - 1 && (
            <svg width="16" height="24" viewBox="0 0 16 24" className="text-text-soft my-1" aria-hidden="true" focusable="false">
              <path d="M8 0v18M2 14l6 8 6-8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
