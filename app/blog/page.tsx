import type { Metadata } from "next";
import Link from "next/link";
import { getAllSeries } from "@/lib/blog";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Blog — Rahul Kumar",
  description: "In-depth, chapter-by-chapter series on Java, Spring Boot, system design, and AI systems.",
};

export default function BlogIndexPage() {
  const series = getAllSeries();

  return (
    <>
      <main id="main-content">
        <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <h1 className="font-heading text-2xl font-semibold text-text mb-3">Blog</h1>
          <p className="text-base text-text-soft max-w-prose mb-10">
            In-depth, chapter-by-chapter series — pick a topic to start reading.
          </p>

          <div className="flex flex-col gap-4">
            {series.map((s) => (
              <Link
                key={s.slug}
                href={`/blog/${s.slug}`}
                className="block border border-border rounded-xl p-6 hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <p className="text-xs text-text-soft mb-1.5">{s.chapters.length} chapters</p>
                <h2 className="font-heading text-lg font-medium text-text mb-2">{s.title}</h2>
                <p className="text-sm text-text-soft max-w-prose">{s.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
