import Image from "next/image";

// Simple browser-chrome placeholder for consumer-facing sites without a
// services architecture worth diagramming (e.g. a marketing/NGO website).
// Shows a real homepage screenshot when one is provided; otherwise falls
// back to a plain text placeholder rather than a fabricated preview.
export function BrowserFrame({ url, title, screenshot }: { url?: string; title: string; screenshot?: string }) {
  return (
    <div
      className={`w-full bg-bg overflow-hidden ${
        screenshot ? "" : "max-w-[280px] border border-border rounded-lg"
      }`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-surface">
        <span className="w-2 h-2 rounded-full bg-border" />
        <span className="w-2 h-2 rounded-full bg-border" />
        <span className="w-2 h-2 rounded-full bg-border" />
        <div className="ml-2 flex-1 text-[10px] text-text-soft bg-bg border border-border rounded px-2 py-0.5 truncate">
          {url ?? title}
        </div>
      </div>
      {screenshot ? (
        <div className="relative w-full aspect-[4/3]">
          <Image src={screenshot} alt={`${title} homepage`} fill className="object-cover object-top" />
        </div>
      ) : (
        <div className="h-24 flex items-center justify-center">
          <span className="text-xs text-text-soft">{title}</span>
        </div>
      )}
    </div>
  );
}
