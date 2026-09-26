// Real numbers only, each traceable to data/experience.ts or data/stats.ts.
// The blog chapter count is computed at build time in
// components/home/impact.tsx so it can't drift out of date.
export type ImpactItem = { value: string; label: string };

export const impactItems: ImpactItem[] = [
  { value: "20%", label: "efficiency gain from a codebase refactor on a critical enterprise application" },
  { value: "~25 min", label: "of manual effort saved per developer task by automating audit verification" },
  { value: "3×", label: "Infosys INSTA Award recipient, 2023 to 2025" },
];
