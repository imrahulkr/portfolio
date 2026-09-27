"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

// Code blocks and wide tables in blog chapters scroll sideways on narrow
// screens. A scrollable region must be reachable by keyboard (WCAG 2.1.1), but
// giving every block a tab stop would add dozens of stops per chapter. So a
// block only becomes focusable, and is announced as a labelled region, while
// its content actually overflows.
function useOverflows<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, overflows] as const;
}

const focusStyle = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function ScrollablePre({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
  const [ref, overflows] = useOverflows<HTMLPreElement>();
  return (
    <pre
      ref={ref}
      className={`${className ?? ""} ${focusStyle}`}
      tabIndex={overflows ? 0 : undefined}
      role={overflows ? "region" : undefined}
      aria-label={overflows ? "Code example, scrollable" : undefined}
      {...props}
    />
  );
}

export function ScrollableTable({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  const [ref, overflows] = useOverflows<HTMLTableElement>();
  return (
    <table
      ref={ref}
      className={`${className ?? ""} ${focusStyle}`}
      tabIndex={overflows ? 0 : undefined}
      aria-label={overflows ? "Table, scrollable" : undefined}
      {...props}
    />
  );
}
