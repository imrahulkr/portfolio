import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { evaluate } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { getAllSeries, getSeriesBySlug, getChapter, getAdjacentChapters, extractHeadings } from "@/lib/blog";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Footer } from "@/components/layout/footer";

export function generateStaticParams() {
  return getAllSeries().flatMap((s) => s.chapters.map((c) => ({ series: s.slug, chapter: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ series: string; chapter: string }>;
}): Promise<Metadata> {
  const { series, chapter } = await params;
  const c = getChapter(series, chapter);
  if (!c) return {};
  return {
    title: `${c.title} — Rahul Kumar`,
    description: c.description,
    openGraph: { title: c.title, description: c.description, type: "article" },
  };
}

// Referenced diagram images (/diagrams/*.svg) don't exist yet — render a
// labeled placeholder using the image's own alt text instead of a broken
// <img>, consistent with this site's "[Add ...]" placeholder convention.
function ChapterImage({ src, alt }: { src?: string; alt?: string }) {
  if (typeof src === "string" && src.startsWith("/diagrams/")) {
    return (
      <span className="not-prose my-6 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface px-6 py-10 text-center text-sm text-text-soft">
        <span className="text-xs uppercase tracking-wide text-text-soft">Diagram placeholder</span>
        {alt && <span>{alt}</span>}
      </span>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt ?? ""} />;
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ series: string; chapter: string }>;
}) {
  const { series, chapter } = await params;
  const s = getSeriesBySlug(series);
  const c = getChapter(series, chapter);
  if (!s || !c) notFound();

  const headings = extractHeadings(c.content);
  const { prev, next } = getAdjacentChapters(series, c.order);

  const { default: MDXContent } = await evaluate(c.content, {
    ...jsxRuntime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  });

  return (
    <>
      <main id="main-content">
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <Link
            href={`/blog/${s.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-soft hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
          >
            ← {s.title}
          </Link>
        </div>
        <section className="max-w-5xl mx-auto px-6 pt-8 pb-8 border-b border-border">
          <div className="flex items-center gap-2 mb-2 flex-wrap text-xs text-text-soft">
            <span>{c.partLabel}</span>
            <span aria-hidden="true">·</span>
            <span>
              Chapter {c.order} of {s.chapters.length}
            </span>
            <span aria-hidden="true">·</span>
            <span>{c.readingTimeText}</span>
          </div>
          <h1 className="font-heading text-2xl font-semibold text-text mb-3 max-w-[46ch]">{c.title}</h1>
          {c.description && <p className="text-base text-text-soft max-w-prose">{c.description}</p>}
        </section>

        {/* No items-start here: a stretched (default) grid row gives the
            <aside> the full row height (matching the article), which is
            what gives the sticky TOC inside it room to actually stick while
            scrolling — with items-start the aside collapses to the TOC's
            own content height and the sticky nav has nowhere to travel, so
            it just scrolls away with the page instead of staying put. */}
        <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-12">
          <article className="prose prose-sm max-w-none">
            <MDXContent components={{ img: ChapterImage }} />
          </article>

          <aside className="hidden md:block order-first md:order-none">
            <TableOfContents headings={headings} />
          </aside>
        </section>

        <nav
          aria-label="Chapter navigation"
          className="max-w-5xl mx-auto px-6 py-12 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prev ? (
            <Link
              href={`/blog/${s.slug}/${prev.slug}`}
              className="block border border-border rounded-lg p-4 hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <p className="text-xs text-text-soft mb-1">← Previous</p>
              <p className="text-sm font-medium text-text">{prev.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${s.slug}/${next.slug}`}
              className="block border border-border rounded-lg p-4 text-right hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <p className="text-xs text-text-soft mb-1">Next →</p>
              <p className="text-sm font-medium text-text">{next.title}</p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
