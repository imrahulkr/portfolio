import { getLeetCodeStats } from "@/lib/leetcode";
import type { Difficulty } from "@/lib/leetcode";
import { stats } from "@/data/stats";
import { siteConfig } from "@/data/site-config";

// Ring geometry: three arcs (easy, medium, hard), one per third of the
// circle with a small gap between them, each filled in proportion to how
// much of that difficulty is solved. Same idea as LeetCode's own profile.
const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 10;
const ARC = CIRCUMFERENCE / 3 - GAP;
const GAP_DEGREES = (GAP / RADIUS) * (180 / Math.PI);

const TIERS = [
  { key: "easy", label: "Easy", color: "var(--lc-easy)" },
  { key: "medium", label: "Med.", color: "var(--lc-medium)" },
  { key: "hard", label: "Hard", color: "var(--lc-hard)" },
] as const;

const linkClass =
  "text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm";

function Ring({ tiers, solved, total }: { tiers: { color: string; data: Difficulty }[]; solved: number; total: number }) {
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
        {tiers.map(({ color, data }, i) => {
          const rotation = -90 + i * 120 + GAP_DEGREES / 2;
          const ratio = data.total > 0 ? Math.min(data.solved / data.total, 1) : 0;
          return (
            <g key={i} transform={`rotate(${rotation} 60 60)`}>
              <circle
                cx="60"
                cy="60"
                r={RADIUS}
                fill="none"
                stroke={color}
                strokeOpacity="0.22"
                strokeWidth="7"
                strokeDasharray={`${ARC} ${CIRCUMFERENCE}`}
              />
              {ratio > 0 && (
                <circle
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  stroke={color}
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.max(ARC * ratio, 1)} ${CIRCUMFERENCE}`}
                />
              )}
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-heading text-xl font-semibold leading-none text-text">{solved.toLocaleString()}</span>
        <span className="mt-1 text-xs leading-none text-text-soft">of {total.toLocaleString()}</span>
        <span className="mt-1 text-xs leading-none text-text-soft">solved</span>
      </div>
    </div>
  );
}

export async function LeetCodeCard() {
  const data = await getLeetCodeStats();
  const profileUrl = siteConfig.links.leetcode;

  // Fallback when LeetCode can't be reached: the static figure from
  // data/stats.ts (which spans LeetCode, GfG, and CodeStudio).
  if (!data) {
    const fallback = stats[1];
    return (
      <div className="card-glow relative rounded-2xl border border-border bg-bg p-6">
        <p className="text-sm font-medium text-text-soft mb-3">LeetCode</p>
        <p className="font-heading text-3xl font-semibold text-accent">{fallback.value}</p>
        <p className="mt-1 text-base text-text">{fallback.label}</p>
        <a href={profileUrl} className={`mt-4 inline-block ${linkClass}`}>
          View LeetCode profile →
        </a>
      </div>
    );
  }

  const tiers = TIERS.map((t) => ({ ...t, data: data[t.key] }));

  return (
    <div className="card-glow relative rounded-2xl border border-border bg-bg p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-text-soft">LeetCode</p>
        <a href={profileUrl} className={linkClass}>
          @{data.username} →
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Ring tiers={tiers.map((t) => ({ color: t.color, data: t.data }))} solved={data.solved} total={data.total} />
        <ul className="grid min-w-[8rem] flex-1 grid-cols-1 gap-2">
          {tiers.map((t) => (
            <li key={t.key} className="rounded-lg border border-border bg-surface px-3 py-2 text-center">
              <span className="block text-xs font-medium" style={{ color: t.color }}>
                {t.label}
              </span>
              <span className="block text-sm font-semibold text-text">
                {t.data.solved}/{t.data.total}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {data.badgeCount > 0 && (
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="text-xs text-text-soft">Badges</p>
            <p className="font-heading text-xl font-semibold text-text">{data.badgeCount}</p>
            {data.recentBadges[0] && (
              <p className="mt-0.5 text-xs text-text-soft">Latest: {data.recentBadges[0].name}</p>
            )}
          </div>
          <ul className="flex items-center gap-2" aria-label="Recent badges">
            {data.recentBadges.map((badge) => (
              <li key={badge.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={badge.icon}
                  alt={badge.name}
                  title={badge.name}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="h-11 w-11 object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
