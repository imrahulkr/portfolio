import { siteConfig } from "@/data/site-config";

// Live LeetCode stats, fetched on the server from LeetCode's public GraphQL
// endpoint. That endpoint is unofficial and undocumented, so everything here
// is defensive: any failure returns null and the About section falls back to
// the static figures in data/stats.ts instead of breaking.
//
// Results are cached for an hour (Next's fetch cache), so the page stays
// statically served and LeetCode is called at most about once an hour, not
// on every visit. The browser can't call LeetCode directly (CORS).
export type Difficulty = { solved: number; total: number };

export type LeetCodeBadge = { name: string; icon: string };

export type LeetCodeStats = {
  username: string;
  solved: number;
  total: number;
  easy: Difficulty;
  medium: Difficulty;
  hard: Difficulty;
  badgeCount: number;
  // Newest first, as LeetCode returns them.
  recentBadges: LeetCodeBadge[];
};

const ENDPOINT = "https://leetcode.com/graphql";

const QUERY = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal { acSubmissionNum { difficulty count } }
      badges { displayName icon }
    }
    allQuestionsCount { difficulty count }
  }
`;

type Counts = { difficulty: string; count: number }[];

function countFor(list: Counts | undefined, difficulty: string): number {
  return list?.find((c) => c.difficulty === difficulty)?.count ?? 0;
}

function absoluteIcon(icon: string): string {
  return icon.startsWith("/") ? `https://leetcode.com${icon}` : icon;
}

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  const username = siteConfig.leetcodeUsername;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-stats)",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;

    const json = await res.json();
    const user = json?.data?.matchedUser;
    const solvedList: Counts | undefined = user?.submitStatsGlobal?.acSubmissionNum;
    const totalList: Counts | undefined = json?.data?.allQuestionsCount;
    if (!user || !solvedList || !totalList) return null;

    const solved = countFor(solvedList, "All");
    const total = countFor(totalList, "All");
    // A zero here means the response shape changed, not a real profile.
    if (solved <= 0 || total <= 0) return null;

    const badges: { displayName: string; icon: string }[] = Array.isArray(user.badges) ? user.badges : [];

    return {
      username,
      solved,
      total,
      easy: { solved: countFor(solvedList, "Easy"), total: countFor(totalList, "Easy") },
      medium: { solved: countFor(solvedList, "Medium"), total: countFor(totalList, "Medium") },
      hard: { solved: countFor(solvedList, "Hard"), total: countFor(totalList, "Hard") },
      badgeCount: badges.length,
      recentBadges: badges.slice(0, 3).map((b) => ({ name: b.displayName, icon: absoluteIcon(b.icon) })),
    };
  } catch {
    return null;
  }
}
