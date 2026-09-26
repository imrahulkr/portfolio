import Link from "next/link";
import { getAllSeries } from "@/lib/blog";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function BlogTeaser() {
  const series = getAllSeries();
  const total = series.reduce((sum, s) => sum + s.chapters.length, 0);

  return (
    <section id="blog" className="max-w-5xl mx-auto px-6 py-24">
      <Reveal>
        <SectionHeading
          title="From the blog"
          subtitle={`${total} chapters across ${series.length} in-depth series, written as I learn.`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {series.map((s, i) => (
            <Link
              key={s.slug}
              href={`/blog/${s.slug}`}
              className={`card-glow group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-bg ${focusRing} ${
                i < 2 ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/blog/${s.slug}/banner-image`}
                alt=""
                width={1200}
                height={400}
                loading="lazy"
                className="w-full h-auto border-b border-border"
              />
              <div className="p-5">
                <p className="text-xs text-text-soft mb-1.5">{s.chapters.length} chapters</p>
                <h3 className="font-heading text-lg font-semibold text-text mb-2">{s.title}</h3>
                <p className="text-sm text-text-soft line-clamp-2">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-1.5 text-base font-medium text-accent hover:underline rounded-sm ${focusRing}`}
          >
            Browse all articles →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
