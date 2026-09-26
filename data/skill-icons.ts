import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiSpringboot,
  SiSpringsecurity,
  SiHibernate,
  SiJsonwebtokens,
  SiApachemaven,
  SiReact,
  SiReactquery,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiSwagger,
  SiPostman,
  SiJira,
  SiIntellijidea,
  SiSpring,
} from "react-icons/si";
import { DiJava, DiMsqlServer } from "react-icons/di";
import {
  FiBox,
  FiLayers,
  FiCpu,
  FiPackage,
  FiCheckSquare,
  FiLayout,
  FiGlobe,
  FiGitBranch,
  FiDatabase,
  FiLock,
  FiZap,
  FiCode,
  FiTrendingUp,
  FiShield,
  FiTerminal,
  FiTool,
} from "react-icons/fi";

// Real brand icons/colors for skills that have an official logo. Skills with
// no real logo (concepts like "System design", tools with no icon in either
// set like "VS Code") are intentionally left out — they render as plain text
// in components/home/skills.tsx. Icons with an ambiguous/near-black official
// mark (GitHub, IntelliJ IDEA, JWT) omit `color` and inherit the surrounding
// text color instead of guessing a color that could vanish in dark mode.
export const skillIcons: Record<string, { icon: IconType; color?: string }> = {
  Java: { icon: DiJava, color: "#ED8B00" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  "C++": { icon: SiCplusplus, color: "#00599C" },
  "Spring Boot": { icon: SiSpringboot, color: "#6DB33F" },
  "Spring Security": { icon: SiSpringsecurity, color: "#6DB33F" },
  "Spring Data JPA": { icon: SiSpring, color: "#6DB33F" },
  Hibernate: { icon: SiHibernate, color: "#59666C" },
  JWT: { icon: SiJsonwebtokens },
  Maven: { icon: SiApachemaven, color: "#C71A36" },
  "React.js": { icon: SiReact, color: "#61DAFB" },
  "TanStack Query": { icon: SiReactquery, color: "#FF4154" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  CSS3: { icon: SiCss, color: "#1572B6" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  "SQL Server": { icon: DiMsqlServer, color: "#CC2927" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub },
  "Swagger/OpenAPI": { icon: SiSwagger, color: "#85EA2D" },
  Postman: { icon: SiPostman, color: "#FF6C37" },
  Jira: { icon: SiJira, color: "#0052CC" },
  "IntelliJ IDEA": { icon: SiIntellijidea },
};

// Items with no real brand logo (unlike skillIcons above, which are real official
// logos): generic outline icons, rendered in the site's single accent color by
// both components/home/skills.tsx and app/resume/page.tsx. Never invent a brand
// logo or color for something that doesn't have one.
export const genericSkillIcons: Record<string, IconType> = {
  SQL: FiDatabase,
  "REST APIs": FiGlobe,
  OAuth2: FiLock,
  Zustand: FiZap,
  "VS Code": FiCode,
  Microservices: FiBox,
  "System design": FiLayers,
  Multithreading: FiCpu,
  OOP: FiPackage,
  "SOLID principles": FiCheckSquare,
  "Design patterns": FiLayout,
  "RESTful architecture": FiGlobe,
  DSA: FiGitBranch,
  // Concept highlights shown on the resume page's "What I'm Doing" cards.
  Scalability: FiTrendingUp,
  Caching: FiDatabase,
  "Fault tolerance": FiShield,
  "Modern web development": FiGlobe,
  "AI-assisted development": FiTerminal,
  "AI tooling": FiTool,
};
