"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 motion-reduce:opacity-100 motion-reduce:translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
