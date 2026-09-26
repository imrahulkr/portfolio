"use client";

import { useEffect, useState } from "react";

// Sticky "On this page" bar for a case study. The active pill is computed
// from real element positions on scroll (not an IntersectionObserver band),
// so a fast scroll can never leave it stuck on an earlier section.
export function ProjectNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const key = items.map((i) => i.id).join(",");

  useEffect(() => {
    const ids = key.split(",").filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = 170;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return (
    <nav aria-label="On this page" className="sticky top-[52px] z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6">
        <ul className="scrollbar-none flex gap-1 overflow-x-auto py-2">
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`block rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active === item.id ? "bg-accent/10 font-medium text-accent" : "text-text-soft hover:text-text"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
