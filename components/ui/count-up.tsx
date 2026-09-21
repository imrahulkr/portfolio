"use client";

// Animates a numeric prefix counting up on mount (e.g. "1,500" -> types out),
// leaving any non-numeric suffix/prefix (like "+", "%", "×") untouched.
// This is the one deliberate motion moment in the hero stat panel.
import { useEffect, useMemo, useRef, useState } from "react";

export function CountUp({ value }: { value: string }) {
  const match = useMemo(() => value.match(/^([^\d]*)([\d,]+)(.*)$/), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [match]);

  useEffect(() => {
    if (!started || !match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr.replace(/,/g, ""), 10);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(`${prefix}${target.toLocaleString()}${suffix}`);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frameId: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [started, match]);

  return <span ref={ref}>{match ? display : value}</span>;
}
