import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSeries, getSeriesBySlug } from "@/lib/blog";
import type { ChapterMeta } from "@/lib/blog";
import { Footer } from "@/components/layout/footer";

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ series: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ series: string }> }): Promise<Metadata> {
  const { series } = await params;
  const s = getSeriesBySlug(series);
  if (!s) return {};
  return {
    title: `${s.title} — Rahul Kumar`,
    description: s.description,
    openGraph: { title: s.title, description: s.description },
  };
}

export default async function SeriesPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params;
  const s = getSeriesBySlug(series);
  if (!s) notFound();

  const groups: { partLabel: string; chapters: ChapterMeta[] }[] = [];
  for (const chapter of s.chapters) {
    const last = groups[groups.length - 1];
    if (last && last.partLabel === chapter.partLabel) {
      last.chapters.push(chapter);
    } else {
      groups.push({ partLabel: chapter.partLabel, chapters: [chapter] });
    }
  }

  return (
    <>
      <main id="main-content">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-text-soft hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
          >
            ← All topics
          </Link>
        </div>
        <section className="max-w-4xl mx-auto px-6 pt-8 pb-8">
          <p className="text-xs text-text-soft mb-2">{s.chapters.length} chapters</p>
          <h1 className="font-heading text-2xl font-semibold text-text">{s.title}</h1>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/blog/${s.slug}/banner-image`}
            alt=""
            width={1200}
            height={400}
            className="w-full h-auto rounded-xl border border-border"
          />
        </div>

        <section className="max-w-4xl mx-auto px-6 pt-8 pb-10 border-b border-border">
          <p className="text-base text-text-soft max-w-prose">{s.description}</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
          {groups.map((group, i) => (
            <div key={`${group.partLabel}-${i}`}>
              <h2 className="text-xs font-medium text-text-soft uppercase tracking-wide mb-4">{group.partLabel}</h2>
              <div className="flex flex-col gap-2">
                {group.chapters.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    href={`/blog/${s.slug}/${chapter.slug}`}
                    className="flex items-baseline gap-3 border border-border rounded-lg px-4 py-3 hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <span className="text-xs text-text-soft font-mono shrink-0">
                      {String(chapter.order).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-text flex-1">{chapter.title}</span>
                    <span className="text-xs text-text-soft shrink-0 hidden sm:inline">{chapter.readingTimeText}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
