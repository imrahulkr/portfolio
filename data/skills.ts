export const skills = [
  { category: "Languages", items: ["Java", "JavaScript", "TypeScript", "C++", "SQL"] },
  {
    category: "Backend",
    items: ["Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "REST APIs", "JWT", "OAuth2", "Maven"],
  },
  { category: "Frontend", items: ["React.js", "TanStack Query", "Zustand", "Tailwind CSS", "HTML5", "CSS3"] },
  { category: "Database", items: ["PostgreSQL", "SQL Server"] },
  { category: "Tools & platforms", items: ["Git", "GitHub", "Swagger/OpenAPI", "Postman", "Jira", "IntelliJ IDEA", "VS Code"] },
  {
    category: "Core concepts",
    items: ["Microservices", "System design", "Multithreading", "OOP", "SOLID principles", "Design patterns", "RESTful architecture", "DSA"],
  },
];

// `description` is the plain-text sentence; `highlights` is the same content
// as discrete items, so the resume page can show an icon beside each one.
// Highlights that match a key in data/skill-icons.ts get that real logo or
// outline icon; keep them in sync with what the description says.
export const focusAreas = [
  {
    title: "Backend engineering",
    description: "Java, Spring Boot, REST APIs, microservices",
    highlights: ["Java", "Spring Boot", "REST APIs", "Microservices"],
  },
  {
    title: "Frontend",
    description: "React, TypeScript, modern web development",
    highlights: ["React.js", "TypeScript", "Modern web development"],
  },
  {
    title: "System design",
    description: "Scalability, caching, fault tolerance",
    highlights: ["Scalability", "Caching", "Fault tolerance"],
  },
  {
    title: "AI",
    description: "Exploring AI-assisted development and AI tooling",
    highlights: ["AI-assisted development", "AI tooling"],
  },
];
