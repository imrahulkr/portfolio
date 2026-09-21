import type { ArchitectureNode } from "@/data/projects";

// Compact horizontal architecture strip used as the visual block on a
// featured-project card — gives the card real content even without a
// screenshot, using the project's actual services/tech, not decoration.
export function ArchitectureThumb({ nodes }: { nodes: ArchitectureNode[] }) {
  return (
    <div className="flex flex-col gap-2 w-full px-6">
      {nodes.slice(0, 4).map((node, i) => (
        <div key={node.label} className="flex items-center gap-2">
          <div className="flex-1 border border-border rounded bg-bg px-3 py-2">
            <p className="text-xs font-medium text-text truncate">{node.label}</p>
          </div>
          {i < Math.min(nodes.length, 4) - 1 && (
            <span className="text-text-soft text-xs" aria-hidden>
              ↓
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
