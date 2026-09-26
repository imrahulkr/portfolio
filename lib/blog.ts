import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const BLOGS_DIR = path.join(process.cwd(), "public", "blogs");

export type Heading = { id: string; text: string; depth: number };

export type ChapterMeta = {
  seriesSlug: string;
  slug: string;
  order: number;
  title: string;
  description: string;
  partLabel: string;
  tags: string[];
  readingTimeText: string;
};

export type Chapter = ChapterMeta & { content: string };

export type SeriesInfo = {
  slug: string;
  folder: string;
  title: string;
  description: string;
};

export type SeriesWithChapters = SeriesInfo & { chapters: ChapterMeta[] };

// Each folder under public/blogs is one series. Title/description live here
// rather than frontmatter because they're inconsistently present (or absent
// entirely) across the five series' frontmatter schemas — see chapter
// ordering/slug note below for why filenames, not frontmatter, drive those.
const SERIES_CONFIG: Record<string, Omit<SeriesInfo, "folder">> = {
  "java-zero-to-advanced-series": {
    slug: "java",
    title: "Java: Zero to Advanced",
    description:
      "Core Java through the JVM, concurrency, and modern language features — from fundamentals to interview prep.",
  },
  "spring-boot-zero-to-advanced-series": {
    slug: "spring-boot",
    title: "Spring Boot: Zero to Advanced",
    description:
      "Building production Spring Boot systems — REST APIs, the data layer, security, microservices, and deployment.",
  },
  "system-design-series": {
    slug: "system-design",
    title: "System Design (HLD): Zero to Advanced",
    description:
      "High-level system design fundamentals through applied case studies — caching, databases, distributed systems, and worked interview problems.",
  },
  "system-design-lld-complete": {
    slug: "system-design-lld",
    title: "System Design (LLD) in Java: Zero to Advanced",
    description:
      "Low-level design — OOP, SOLID, design patterns, and worked case studies like Parking Lot and BookMyShow, in Java.",
  },
  "ai-system-design": {
    slug: "ai-system-design",
    title: "AI System Design: Zero to Advanced",
    description:
      "Designing production ML and LLM systems — data pipelines, training infra, RAG, agents, and real case studies.",
  },
};

// Every chapter file is named `NN-slug.mdx`. That numeric prefix is the only
// ordering/slug signal consistent across all five series — frontmatter uses
// `chapter`, `seriesOrder`, or nothing at all depending on the series, and
// `slug` is only present in two of the five. Filenames are the source of truth.
const FILENAME_RE = /^(\d+)-(.+)\.mdx$/;

// The LLD series ends with three "Interview Rapid-Fire Review" chapters named
// `interview-N-slug.mdx` instead of `NN-slug.mdx`. They were silently skipped
// by FILENAME_RE alone. They are the closing chapters of their series, so
// they are numbered after the highest `NN-` chapter in the same folder
// (interview-1 becomes max + 1, and so on) and keep their full stem as slug.
const INTERVIEW_RE = /^interview-(\d+)-(.+)\.mdx$/;

let cache: Map<string, Chapter[]> | null = null;

// This content is plain Markdown written without any intent to embed real
// JSX — but `@mdx-js/mdx`'s evaluate() always parses MDX, which treats any
// bare `<` as a potential JSX tag start and any bare `{...}` as a JS
// expression to evaluate. Two shapes in this content trigger that:
// comparison operators / generic wildcards (`x <= now()`, `List<? extends
// Number>`), and plain-English set notation (`{version, traffic_percentage}`)
// or JSON-ish inline examples. Standard Markdown never needs a literal,
// unescaped `<` or `{` outside a code span, so escaping both — only outside
// fenced code blocks and inline code spans, which MDX already leaves
// untouched — fixes this without altering how any real code sample renders.
function sanitizeForMdx(markdown: string): string {
  let inFence = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return line
        .split(/(`[^`]*`)/g)
        .map((part, i) =>
          i % 2 === 1
            ? part
            : part.replace(/<(?![a-zA-Z!/_$])/g, "&lt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;")
        )
        .join("");
    })
    .join("\n");
}

function loadChaptersForFolder(folder: string): Chapter[] {
  const dir = path.join(BLOGS_DIR, folder);
  const config = SERIES_CONFIG[folder];
  if (!config || !fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => FILENAME_RE.test(f) || INTERVIEW_RE.test(f));
  const highestNumbered = files.reduce((max, f) => {
    const m = f.match(FILENAME_RE);
    return m ? Math.max(max, parseInt(m[1], 10)) : max;
  }, 0);

  const chapters: Chapter[] = files.map((file) => {
    const numbered = file.match(FILENAME_RE);
    const interview = numbered ? null : file.match(INTERVIEW_RE)!;
    const order = numbered ? parseInt(numbered[1], 10) : highestNumbered + parseInt(interview![1], 10);
    const slug = numbered ? numbered[2] : file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content: rawContent } = matter(raw);
    const content = sanitizeForMdx(rawContent);

    const partLabel =
      typeof data.partTitle === "string"
        ? data.partTitle
        : typeof data.part === "string"
          ? data.part
          : typeof data.part === "number"
            ? `Part ${data.part}`
            : "Chapters";

    return {
      seriesSlug: config.slug,
      slug,
      order,
      title: typeof data.title === "string" ? data.title : slug,
      description: typeof data.description === "string" ? data.description : "",
      partLabel,
      tags: Array.isArray(data.tags) ? data.tags : [],
      readingTimeText: readingTime(content).text,
      content,
    };
  });

  return chapters.sort((a, b) => a.order - b.order);
}

function getCache(): Map<string, Chapter[]> {
  if (!cache) {
    cache = new Map(Object.keys(SERIES_CONFIG).map((folder) => [folder, loadChaptersForFolder(folder)]));
  }
  return cache;
}

function folderForSeriesSlug(seriesSlug: string): string | undefined {
  return Object.keys(SERIES_CONFIG).find((f) => SERIES_CONFIG[f].slug === seriesSlug);
}

function stripContent(chapters: Chapter[]): ChapterMeta[] {
  return chapters.map(({ content: _content, ...meta }) => meta);
}

export function getAllSeries(): SeriesWithChapters[] {
  const c = getCache();
  return Object.entries(SERIES_CONFIG).map(([folder, info]) => ({
    folder,
    ...info,
    chapters: stripContent(c.get(folder) ?? []),
  }));
}

export function getSeriesBySlug(seriesSlug: string): SeriesWithChapters | null {
  const folder = folderForSeriesSlug(seriesSlug);
  if (!folder) return null;
  return {
    folder,
    ...SERIES_CONFIG[folder],
    chapters: stripContent(getCache().get(folder) ?? []),
  };
}

export function getChapter(seriesSlug: string, chapterSlug: string): Chapter | null {
  const folder = folderForSeriesSlug(seriesSlug);
  if (!folder) return null;
  return (getCache().get(folder) ?? []).find((c) => c.slug === chapterSlug) ?? null;
}

export function getAdjacentChapters(
  seriesSlug: string,
  order: number
): { prev: ChapterMeta | null; next: ChapterMeta | null } {
  const folder = folderForSeriesSlug(seriesSlug);
  const chapters = folder ? (getCache().get(folder) ?? []) : [];
  const index = chapters.findIndex((c) => c.order === order);
  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}

export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const text = match[2].trim();
      headings.push({ id: slugger.slug(text), text, depth });
    }
  }

  return headings;
}
