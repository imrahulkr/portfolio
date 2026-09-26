"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FiSearch, FiX } from "react-icons/fi";

type Entry = {
  title: string;
  description: string;
  part: string;
  tags: string[];
  url: string;
  series: string;
};

type Indexed = Entry & { titleLower: string; haystack: string };

const MAX_RESULTS = 40;

function scoreEntry(entry: Indexed, tokens: string[]): number {
  let score = 0;
  for (const token of tokens) {
    if (!entry.haystack.includes(token)) return 0;
    score += 1;
    if (entry.titleLower.includes(token)) score += 3;
    if (entry.titleLower.startsWith(token)) score += 2;
  }
  return score;
}

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<Indexed[] | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const requested = useRef(false);

  function ensureLoaded() {
    if (requested.current) return;
    requested.current = true;
    fetch("/blog/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json() as Promise<Entry[]>;
      })
      .then((data) =>
        setEntries(
          data.map((e) => ({
            ...e,
            titleLower: e.title.toLowerCase(),
            haystack: [e.title, e.part, e.series, e.description, ...e.tags].join(" ").toLowerCase(),
          }))
        )
      )
      .catch(() => {
        requested.current = false;
        setFailed(true);
      });
  }

  // Deep link from the command palette: /blog#search focuses the field.
  useEffect(() => {
    if (window.location.hash === "#search") {
      inputRef.current?.focus();
      ensureLoaded();
    }
  }, []);

  const tokens = useMemo(() => query.toLowerCase().split(/\s+/).filter(Boolean), [query]);

  const results = useMemo(() => {
    if (!entries || tokens.length === 0) return [];
    return entries
      .map((entry, index) => ({ entry, index, score: scoreEntry(entry, tokens) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, MAX_RESULTS)
      .map((r) => r.entry);
  }, [entries, tokens]);

  const searching = tokens.length > 0;

  return (
    <div id="search" className="mb-10">
      <label htmlFor="blog-search" className="sr-only">
        Search all chapters
      </label>
      <div className="relative">
        <FiSearch aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft" />
        <input
          ref={inputRef}
          id="blog-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            ensureLoaded();
          }}
          onFocus={ensureLoaded}
          placeholder="Search all chapters, e.g. “HashMap” or “rate limiter”"
          autoComplete="off"
          className="w-full rounded-lg border border-border bg-bg py-3 pl-11 pr-11 text-base text-text placeholder:text-text-soft focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-text-soft hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FiX aria-hidden className="h-4 w-4" />
          </button>
        )}
      </div>

      <div role="status" aria-live="polite" className="mt-3 text-sm text-text-soft">
        {failed && "Search couldn't load. Refresh the page to try again."}
        {!failed && searching && !entries && "Loading…"}
        {!failed && searching && entries && (
          results.length === 0
            ? "No chapters match that search."
            : `${results.length}${results.length === MAX_RESULTS ? "+" : ""} matching chapter${results.length === 1 ? "" : "s"}`
        )}
      </div>

      {results.length > 0 && (
        <ul className="mt-3 flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border">
          {results.map((r) => (
            <li key={r.url}>
              <Link
                href={r.url}
                className="block px-5 py-3.5 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              >
                <span className="block text-base font-medium text-text">{r.title}</span>
                <span className="block text-sm text-text-soft">
                  {r.series}
                  {r.part ? ` · ${r.part}` : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
