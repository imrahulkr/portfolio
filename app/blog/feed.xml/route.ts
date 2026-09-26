import { getAllSeries } from "@/lib/blog";
import { siteConfig, siteUrl } from "@/data/site-config";

// RSS 2.0 feed of every chapter. Chapters carry no publish dates in their
// frontmatter, so items have none: the permalink is the stable guid, which is
// what feed readers use to avoid showing an item twice.
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = getAllSeries()
    .flatMap((s) =>
      s.chapters.map((c) => {
        const link = `${siteUrl}/blog/${s.slug}/${c.slug}`;
        return [
          "    <item>",
          `      <title>${escapeXml(c.title)}</title>`,
          `      <link>${escapeXml(link)}</link>`,
          `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
          `      <description>${escapeXml(c.description)}</description>`,
          `      <category>${escapeXml(s.title)}</category>`,
          "    </item>",
        ].join("\n");
      })
    )
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(`${siteConfig.name} — Engineering notes`)}</title>`,
    `    <link>${escapeXml(`${siteUrl}/blog`)}</link>`,
    `    <description>${escapeXml("In-depth series on Java, Spring Boot, system design, and AI systems.")}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${escapeXml(`${siteUrl}/blog/feed.xml`)}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
