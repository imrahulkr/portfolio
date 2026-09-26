import { services } from "@/data/services";

// Options for the contact form's two optional dropdowns. There is
// deliberately no budget field: rates are never discussed publicly.
// Shared by the form (client) and the API route (server) so the route can
// reject values the form never offered.
export const topicOptions: string[] = [
  ...services.map((s) => s.title),
  "Full-time opportunity",
  "Something else",
];

export const timelineOptions: string[] = [
  "As soon as possible",
  "Within 1 to 3 months",
  "3 to 6 months",
  "Just exploring",
];
