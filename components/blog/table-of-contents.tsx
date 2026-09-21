"use client";

import { useEffect, useRef, useState } from "react";
import type { Heading } from "@/lib/blog";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  // The scrollable box is the <nav> (it carries overflow-y-auto + max-h);
  // the <ul> inside it has no overflow of its own. Scrolling had to target
  // this ref, not the list — setting scrollTop on a non-scrolling element
  // is a silent no-op, which is why the sidebar never actually moved.
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // Not IntersectionObserver: with a narrow trigger band, a fast scroll
    // (flick-scrolling, or Page Down) can carry a heading through that band
    // between two observer callbacks without ever reporting "intersecting"
    // — the active heading then goes stale and stays stuck on an earlier
    // one, however far below it the reader actually is, which is why the
    // sidebar wasn't auto-scrolling: it correctly had nothing new to
    // scroll to. Recomputing directly off each heading's real position on
    // every scroll tick can't skip a heading this way, at any scroll speed.
    const referenceY = () => window.innerHeight * 0.25;
    const computeActiveId = () => {
      const ref = referenceY();
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= ref) {
          current = el.id;
        } else {
          break;
        }
      }
      return current;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setActiveId(computeActiveId());
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  useEffect(() => {
    const container = navRef.current;
    if (!activeId || !container) return;
    const activeLink = container.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
    if (!activeLink) return;
    // Deliberately not activeLink.scrollIntoView() — per spec that scrolls
    // *every* scrollable ancestor, including the page itself, to bring the
    // target fully into the viewport. That fought the user's own scrolling:
    // every time the active heading changed, the whole page would jump to
    // reposition this sidebar link. Adjusting this container's own
    // scrollTop instead keeps the effect confined to this list.
    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    if (linkRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - linkRect.top;
    } else if (linkRect.bottom > containerRect.bottom) {
      container.scrollTop += linkRect.bottom - containerRect.bottom;
    }
  }, [activeId]);

  if (headings.length === 0) return null;

  return (
    // Sticky within the viewport, but capped to it — a long chapter's
    // heading list would otherwise overflow off the bottom of the screen
    // and keep scrolling with the page past where it's still reachable.
    // Once it hits that cap it scrolls internally instead (see the
    // scrollTop effect above), never the page itself. A left border keeps
    // it visually separated from the article rather than butting up
    // against it with only a gap.
    <nav
      ref={navRef}
      aria-label="Table of contents"
      className="scrollbar-none sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto md:border-l md:border-border md:pl-6"
    >
      <p className="text-xs font-medium text-text-soft uppercase tracking-wide mb-3">On this page</p>
      <ul className="flex flex-col gap-2 text-sm">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li key={h.id} style={{ paddingLeft: h.depth === 3 ? "0.75rem" : 0 }}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block border-l-2 pl-2 -ml-px transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm ${
                  isActive
                    ? "border-accent text-accent font-medium"
                    : "border-transparent text-text-soft hover:text-text hover:border-border"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
