// How a freelance engagement works. Describes the working approach only:
// no promised timelines, prices, or support terms.
export type ProcessStep = { title: string; description: string };

export const processSteps: ProcessStep[] = [
  {
    title: "Discover",
    description: "We talk through what you're building, who it's for, and what a good outcome looks like.",
  },
  {
    title: "Design",
    description: "I propose a scope, an architecture, and milestones you can review before any code is written.",
  },
  {
    title: "Build",
    description: "Development in small, working increments, with regular check-ins so you always see real progress.",
  },
  {
    title: "Ship",
    description: "Deployment, documentation, and a clean handover, so the system is yours to run and extend.",
  },
];
