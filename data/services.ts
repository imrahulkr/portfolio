export type ServiceIcon = "server" | "monitor" | "layers" | "zap";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
  tags: string[];
};

// Freelance offerings. Wording stays within work already reflected in
// data/projects.ts and data/experience.ts — no invented clients or results.
// No rates or availability are shown publicly; every card points to Contact.
export const services: Service[] = [
  {
    title: "Backend & API development",
    description:
      "Java and Spring Boot services with secure authentication, payment integrations, and clean REST APIs, built to stay reliable under real traffic.",
    icon: "server",
    tags: ["Java", "Spring Boot", "PostgreSQL"],
  },
  {
    title: "Full-stack web applications",
    description:
      "End-to-end products with React on the front and a solid API behind it, taken from first commit through to a live deployment.",
    icon: "monitor",
    tags: ["React", "Node.js", "Tailwind CSS"],
  },
  {
    title: "System design & architecture",
    description:
      "Service boundaries, caching, messaging, and data modeling planned before code is written, so the system can grow with your product.",
    icon: "layers",
    tags: ["Microservices", "Redis", "Kafka"],
  },
  {
    title: "Performance & refactoring",
    description:
      "Untangling slow queries and hard-to-change code in existing systems. A refactor I led on an enterprise application improved its efficiency by 20%.",
    icon: "zap",
    tags: ["SQL tuning", "Refactoring", "Code review"],
  },
];
