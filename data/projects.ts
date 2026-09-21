export type Decision = {
  title: string;
  description: string;
};

export type ArchitectureNode = {
  label: string;
  detail: string;
};

export type CardVisual = "architecture" | "browser-frame";

// Per-project signature tint for the card's visual panel — a deliberate,
// documented exception to the single-accent rule (see DESIGN.md), scoped
// to this one spot. Muted/desaturated to match the site's restrained tone,
// not saturated brand colors.
export type CardTint = { light: string; dark: string };

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
  status?: "in-progress";
  cardVisual: CardVisual; // how the featured-project card shows its visual block
  cardTint: CardTint; // signature color for the card's visual panel background

  overview?: string;
  problem?: string;
  solution?: string;
  architecture?: ArchitectureNode[];
  features?: string[];
  decisions?: Decision[];
  challenges?: string;
  results?: string[];
};

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "Full-Stack E-Commerce Platform",
    description:
      "A multi-role e-commerce platform supporting Customer, Seller, and Admin workflows across product catalog, cart, checkout, orders, inventory, and payments.",
    category: "Full-stack",
    technologies: ["Java", "Spring Boot", "Spring Security", "React", "PostgreSQL", "Stripe", "Razorpay", "JWT", "OAuth2"],
    github: "https://github.com/imrahulkr/ecomProject",
    liveUrl: undefined,
    featured: true,
    cardVisual: "architecture",
    cardTint: { light: "#8A6234", dark: "#C99A5F" },

    overview:
      "A multi-role e-commerce platform built to support three distinct workflows — Customer, Seller, and Admin — spanning product catalog, cart, checkout, orders, inventory, and payments in a single system.",
    problem:
      "Multi-role e-commerce systems have to keep customer-facing checkout fast and simple while giving sellers and admins reliable control over inventory and orders — without one role's actions corrupting another's view of the system (e.g. two customers checking out the last unit of stock at once).",
    solution:
      "Role-based access control on top of Spring Security separates what each of the three roles can see and do, while the checkout path itself was built around idempotency and concurrency-safe inventory reservations so simultaneous orders can't oversell stock.",
    architecture: [
      { label: "React client", detail: "Customer, Seller, and Admin views" },
      { label: "Spring Boot API", detail: "Spring Security · JWT · OAuth2 · RBAC" },
      { label: "PostgreSQL", detail: "Product catalog, orders, inventory" },
      { label: "Stripe / Razorpay", detail: "Payment processing via webhook verification" },
    ],
    features: [
      "Product catalog with search",
      "Shopping cart",
      "Checkout flow",
      "Payment integration (Stripe, Razorpay)",
      "User accounts (login, profile, order history)",
      "Order management and tracking",
      "Admin dashboard",
      "Inventory management",
      "Delivery/shipping options",
      "Security measures (fraud checks, backups)",
      "Mobile-responsive design",
    ],
    decisions: [
      {
        title: "Rotating refresh tokens over long-lived sessions",
        description:
          "Authentication uses JWT access tokens with rotating refresh tokens rather than long-lived sessions, reducing the window an intercepted token stays valid across Customer, Seller, and Admin roles.",
      },
      {
        title: "Idempotency keys on checkout",
        description:
          "Checkout and payment requests are idempotent, so a retried request (network blip, double-click) can't create a duplicate order.",
      },
      {
        title: "Concurrency-safe inventory reservations",
        description:
          "Inventory is reserved at checkout with concurrency safety in mind, preventing overselling when multiple customers attempt to buy the same limited-stock item at once.",
      },
      {
        title: "Webhook verification and deduplication",
        description:
          "Stripe/Razorpay webhooks are verified and deduplicated before being applied, so a redelivered webhook event can't double-process a payment.",
      },
    ],
    challenges: undefined,
    results: [],
  },
  {
    slug: "sidhant",
    title: "SIDHANT — NGO Website",
    description:
      "A full website for SIDHANT, a Delhi-based non-profit working in healthcare, education, and community development — built solo and deployed live.",
    category: "Full-stack · Volunteer work",
    technologies: ["React", "Node.js", "Hostinger"],
    github: undefined, // repo is private per the organization's requirement
    liveUrl: "https://sidhantdel.org",
    featured: true,
    cardVisual: "browser-frame",
    cardTint: { light: "#3D7A55", dark: "#7CB78F" },

    overview:
      "A public-facing website for SIDHANT, a non-profit organization operating at the state and national level across healthcare, education, community development, and rural development programs. The site covers the organization's work areas, partner organizations, a media gallery, and a donation flow, and is live in production.",
    problem:
      "An NGO working across healthcare, education, and community development needs a credible, professional web presence — partners and donors need to see the organization's programs, partner network, and impact clearly to build trust.",
    solution:
      "A full site covering program areas, partner organizations, a photo gallery, and a donation flow — built solo with React on the frontend and Node.js on the backend, deployed live on Hostinger.",
    features: [
      "Public program/service pages",
      "Partner organization showcase",
      "Photo gallery",
      "Donation page",
      "Contact and join-us forms",
    ],
    challenges:
      "The gallery draws from a large set of event and field photos across multiple categories, which meant balancing a rich visual presentation against page load performance — especially important since many site visitors, including donors and community members, may be on slower connections.",
    results: [],
  },
  {
    slug: "fluxgate",
    title: "FluxGate",
    description:
      "An API gateway built to consolidate authentication across services and explore distributed systems patterns firsthand — currently in active development.",
    category: "Distributed systems",
    technologies: ["Java", "Spring Boot", "Spring Security", "React", "Redis", "Apache Kafka", "MySQL", "MongoDB"],
    github: "https://github.com/imrahulkr/fluxgate",
    liveUrl: undefined,
    featured: true,
    status: "in-progress",
    cardVisual: "architecture",
    cardTint: { light: "#5B4B8F", dark: "#A597D6" },

    overview:
      "FluxGate is an API gateway with a microservice architecture, built to consolidate authentication across services and to work hands-on with distributed systems patterns — caching, rate limiting, event streaming, and service-to-service communication. It's under active development, with coding underway across all three services below.",
    problem:
      "Consolidating authentication and cross-cutting concerns (rate limiting, caching) across multiple services, rather than duplicating that logic in each one.",
    architecture: [
      { label: "React client", detail: "Gateway management interface" },
      { label: "smart-gateway-service", detail: "Routing, rate limiting, caching via Redis" },
      { label: "api-management-service", detail: "Service-to-service communication" },
      { label: "analytics-service", detail: "Analytics via Kafka event streaming" },
    ],
    features: [
      "Redis-based response caching",
      "Redis-based rate limiting",
      "Apache Kafka for service-to-service messaging",
      "Spring Security across services",
    ],
    results: [],
  },
];
