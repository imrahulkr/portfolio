export type ExperienceEntry = {
  company: string;
  role: string;
  duration: string;
  location: string;
  achievements: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "Infosys Ltd.",
    role: "Tech Analyst",
    duration: "January 2026 — Present",
    location: "Pune, India",
    achievements: [
      "Promoted in recognition of strong technical ownership and consistent delivery of enterprise solutions.",
      "Develop and optimize Java/Spring Boot REST APIs, SQL queries, and backend workflows to improve application performance and reliability.",
    ],
  },
  {
    company: "Infosys Ltd.",
    role: "Senior System Engineer",
    duration: "October 2023 — December 2025",
    location: "Pune, India",
    achievements: [
      "Designed and built a full-stack audit tracking platform for monitoring sensitive database changes across enterprise systems.",
      "Automated audit verification workflows, cutting manual effort by roughly 25 minutes per developer task.",
    ],
  },
  {
    company: "Infosys Ltd.",
    role: "System Engineer",
    duration: "September 2021 — September 2023",
    location: "Pune, India",
    achievements: [
      "Served as technical owner for a critical enterprise application supporting core business operations.",
      "Refactored the existing codebase, improving application efficiency by 20%.",
    ],
  },
];
