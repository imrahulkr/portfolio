import { ImageResponse } from "next/og";
import { getAllSeries } from "@/lib/blog";

// Node.js runtime (default for route handlers) — lib/blog.ts reads the
// filesystem via node:fs, which the edge runtime can't do.
const size = { width: 1200, height: 400 };

// Per-series signature tint, in the same spirit as the per-project
// `cardTint` exception in data/projects.ts — a scoped, documented use of
// more than one color, confined entirely to these generated banner images.
// Spring Boot's tint is Spring's own real brand green (also used for its
// icon in data/skill-icons.ts), not an invented color.
const TINTS: Record<string, string> = {
  java: "#E8823C",
  "spring-boot": "#6DB33F",
  "system-design": "#6E9BC2",
  "system-design-lld": "#A597D6",
  "ai-system-design": "#4FC3C7",
};

// No title/chapter-count text here — the page already shows both directly
// above this image, so repeating them would just be redundant. This is a
// full-canvas illustration of the topic instead of a small corner icon.
//
// IMPORTANT: each shape-drawing helper below must be called as a plain
// function (`{cup(...)}`), never used as a JSX component tag (`<Cup />`).
// Satori (next/og's renderer) silently drops SVG content when it's
// returned from a component invoked as a JSX element — confirmed by
// testing both forms directly — so these are deliberately plain functions
// whose JSX return value gets spliced inline, not separate components.

function cup(key: string, x: number, y: number, scale: number, opacity: number, color: string) {
  return (
    <g key={key} transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <ellipse cx="45" cy="88" rx="42" ry="6" stroke={color} strokeWidth="3" />
      <path d="M14 40 L20 78 Q20 84 26 84 L66 84 Q72 84 74 78 L80 40 Z" stroke={color} strokeWidth="3" fill="none" />
      <path d="M80 46 Q102 46 102 62 Q102 78 80 74" stroke={color} strokeWidth="3" fill="none" />
      <path d="M32 30 Q26 18 32 8" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M52 30 Q46 18 52 8" stroke={color} strokeWidth="2.5" fill="none" />
    </g>
  );
}

function javaScene(color: string) {
  return (
    <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none">
      {cup("c1", 130, 40, 1.1, 0.12, color)}
      {cup("c2", 980, 220, 0.9, 0.14, color)}
      {cup("c3", 870, 30, 0.6, 0.16, color)}
      <path d="M60 320 L40 340 L60 360" stroke={color} strokeWidth="4" fill="none" opacity={0.3} />
      <path d="M110 320 L130 340 L110 360" stroke={color} strokeWidth="4" fill="none" opacity={0.3} />
      <path d="M1140 70 L1160 90 L1140 110" stroke={color} strokeWidth="4" fill="none" opacity={0.3} />
      {cup("main", 430, 60, 2.6, 1, color)}
    </svg>
  );
}

function leaf(key: string, x: number, y: number, scale: number, rotate: number, opacity: number, color: string) {
  return (
    <g key={key} transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} opacity={opacity}>
      <path
        d="M85 20 C55 20 20 55 20 100 C20 112 24 116 36 116 C81 116 116 81 116 36 C116 24 112 20 100 20 Z"
        stroke={color}
        strokeWidth="3"
        fill="none"
      />
      <path d="M28 108 C55 82 82 55 108 28" stroke={color} strokeWidth="2.5" fill="none" />
    </g>
  );
}

function springScene(color: string) {
  return (
    <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none">
      {leaf("l1", 90, 40, 0.6, 20, 0.15, color)}
      {leaf("l2", 950, 260, 0.7, -30, 0.15, color)}
      {leaf("l3", 1020, 40, 0.5, 60, 0.18, color)}
      {leaf("l4", 140, 260, 0.55, -50, 0.15, color)}
      {leaf("main", 420, 30, 2.4, 0, 1, color)}
    </svg>
  );
}

function serverBox(key: string, x: number, y: number, color: string, opacity = 1) {
  return (
    <g key={key} transform={`translate(${x} ${y})`} opacity={opacity}>
      <rect width="70" height="46" rx="5" stroke={color} strokeWidth="3" />
      <line x1="10" y1="16" x2="60" y2="16" stroke={color} strokeWidth="2" />
      <circle cx="16" cy="34" r="3" fill={color} />
      <circle cx="28" cy="34" r="3" fill={color} />
    </g>
  );
}

function cylinder(key: string, x: number, y: number, color: string) {
  return (
    <g key={key} transform={`translate(${x} ${y})`}>
      <ellipse cx="35" cy="14" rx="35" ry="12" stroke={color} strokeWidth="3" />
      <path d="M0 14 L0 66 Q0 78 35 78 Q70 78 70 66 L70 14" stroke={color} strokeWidth="3" fill="none" />
      <path d="M0 40 Q35 52 70 40" stroke={color} strokeWidth="2" fill="none" opacity={0.7} />
    </g>
  );
}

function systemDesignScene(color: string) {
  const servers = [
    { x: 520, y: 190 },
    { x: 620, y: 190 },
    { x: 720, y: 190 },
  ];
  return (
    <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none">
      <g opacity={0.9}>
        <rect x="90" y="150" width="60" height="46" rx="5" stroke={color} strokeWidth="3" />
        <line x1="120" y1="196" x2="120" y2="216" stroke={color} strokeWidth="3" />
        <line x1="90" y1="216" x2="150" y2="216" stroke={color} strokeWidth="3" />
      </g>
      <path d="M150 173 L330 173" stroke={color} strokeWidth="3" />
      <g transform="translate(330 148)">
        <rect width="90" height="50" rx="6" stroke={color} strokeWidth="3" />
        <circle cx="45" cy="25" r="8" fill={color} />
      </g>
      {servers.map((s, i) => (
        <path key={`link${i}`} d={`M420 173 L${s.x} ${s.y + 20}`} stroke={color} strokeWidth="2.5" opacity={0.8} />
      ))}
      {servers.map((s, i) => serverBox(`srv${i}`, s.x, s.y, color))}
      <path d="M555 236 L555 280" stroke={color} strokeWidth="2.5" opacity={0.8} />
      <path d="M655 236 L780 280" stroke={color} strokeWidth="2.5" opacity={0.8} />
      <path d="M755 236 L800 280" stroke={color} strokeWidth="2.5" opacity={0.8} />
      {cylinder("db1", 520, 280, color)}
      {cylinder("db2", 760, 280, color)}
      {serverBox("bg1", 950, 60, color, 0.18)}
      {serverBox("bg2", 1050, 110, color, 0.18)}
    </svg>
  );
}

function classBox(
  key: string,
  x: number,
  y: number,
  w: number,
  h: number,
  rows: number,
  color: string,
  opacity = 1
) {
  const rowH = h / (rows + 1);
  return (
    <g key={key} transform={`translate(${x} ${y})`} opacity={opacity}>
      <rect width={w} height={h} rx="4" stroke={color} strokeWidth="3" />
      {Array.from({ length: rows }).map((_, i) => (
        <line key={i} x1="0" y1={rowH * (i + 1)} x2={w} y2={rowH * (i + 1)} stroke={color} strokeWidth="2" />
      ))}
    </g>
  );
}

function lldScene(color: string) {
  return (
    <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none">
      {classBox("p", 520, 40, 140, 70, 2, color)}
      <path d="M580 165 L600 110 L620 165 Z" stroke={color} strokeWidth="3" fill="none" />
      {classBox("c1", 420, 190, 120, 90, 2, color)}
      {classBox("c2", 640, 190, 120, 90, 2, color)}
      <path d="M480 190 L570 118" stroke={color} strokeWidth="3" />
      <path d="M700 190 L610 118" stroke={color} strokeWidth="3" />
      <path d="M540 235 L640 235" stroke={color} strokeWidth="2.5" opacity={0.85} />
      <path d="M620 230 L640 235 L620 240" stroke={color} strokeWidth="2.5" fill="none" opacity={0.85} />
      {classBox("bg1", 130, 280, 100, 60, 1, color, 0.15)}
      {classBox("bg2", 950, 60, 100, 60, 1, color, 0.15)}
    </svg>
  );
}

function aiScene(color: string) {
  const l1 = [90, 150, 210, 270];
  const l2 = [60, 120, 180, 240, 300];
  const l3 = [90, 160, 230, 300];
  const l4 = [140, 220];
  const xs = [420, 620, 820, 1000];
  return (
    <svg width="1200" height="400" viewBox="0 0 1200 400" fill="none">
      {l1.flatMap((y1) =>
        l2.map((y2) => (
          <line key={`a${y1}-${y2}`} x1={xs[0] + 8} y1={y1} x2={xs[1] - 8} y2={y2} stroke={color} strokeWidth="1" opacity={0.3} />
        ))
      )}
      {l2.flatMap((y1) =>
        l3.map((y2) => (
          <line key={`b${y1}-${y2}`} x1={xs[1] + 8} y1={y1} x2={xs[2] - 8} y2={y2} stroke={color} strokeWidth="1" opacity={0.3} />
        ))
      )}
      {l3.flatMap((y1) =>
        l4.map((y2) => (
          <line key={`c${y1}-${y2}`} x1={xs[2] + 8} y1={y1} x2={xs[3] - 8} y2={y2} stroke={color} strokeWidth="1" opacity={0.3} />
        ))
      )}
      {l1.map((y) => (
        <circle key={`l1-${y}`} cx={xs[0]} cy={y} r="9" stroke={color} strokeWidth="3" />
      ))}
      {l2.map((y) => (
        <circle key={`l2-${y}`} cx={xs[1]} cy={y} r="9" stroke={color} strokeWidth="3" />
      ))}
      {l3.map((y) => (
        <circle key={`l3-${y}`} cx={xs[2]} cy={y} r="9" stroke={color} strokeWidth="3" />
      ))}
      {l4.map((y) => (
        <circle key={`l4-${y}`} cx={xs[3]} cy={y} r="9" stroke={color} strokeWidth="3" />
      ))}
      <g opacity={0.15}>
        <rect x="60" y="60" width="18" height="18" stroke={color} strokeWidth="2" />
        <rect x="60" y="100" width="18" height="18" stroke={color} strokeWidth="2" />
        <rect x="100" y="80" width="18" height="18" stroke={color} strokeWidth="2" />
      </g>
    </svg>
  );
}

const SCENES: Record<string, (color: string) => React.ReactElement> = {
  java: javaScene,
  "spring-boot": springScene,
  "system-design": systemDesignScene,
  "system-design-lld": lldScene,
  "ai-system-design": aiScene,
};

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ series: s.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ series: string }> }) {
  const { series } = await params;
  const tint = TINTS[series] ?? "#6E9BC2";
  const scene = SCENES[series];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", backgroundColor: "#0B0D0F" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `radial-gradient(650px 400px at 15% 20%, ${tint}26, transparent 70%)`,
          }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>{scene && scene(tint)}</div>
      </div>
    ),
    { ...size }
  );
}
