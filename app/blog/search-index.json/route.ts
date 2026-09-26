import { getAllSeries } from "@/lib/blog";

// Static index of every chapter, fetched lazily by components/blog/blog-search.tsx.
// Titles, part labels, tags, and a short description keep it small enough to
// ship whole to the browser; full chapter text is deliberately not included.
export const dynamic = "force-static";

export function GET() {
  const entries = getAllSeries().flatMap((s) =>
    s.chapters.map((c) => ({
      title: c.title,
      description: c.description.slice(0, 200),
      part: c.partLabel,
      tags: c.tags.slice(0, 8),
      url: `/blog/${s.slug}/${c.slug}`,
      series: s.title,
    }))
  );
  return Response.json(entries);
}
