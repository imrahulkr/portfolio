export type Decision = {
  title: string;
  description: string;
};

export type ArchitectureNode = {
  label: string;
  detail: string;
  // Technologies this node uses, shown as small chips. Names should match
  // keys in data/skill-icons.ts so they pick up a real logo.
  tech?: string[];
  // True when the piece is designed but not built yet. Drawn dashed with a
  // "Planned" tag so the diagram never implies more than exists.
  planned?: boolean;
};

export type CardVisual = "architecture" | "browser-frame";

// Per-project signature tint for the card's visual panel — a deliberate,
// documented exception to the single-accent rule (see DESIGN.md), scoped
// to this one spot. Muted/desaturated to match the site's restrained tone,
// not saturated brand colors.
export type CardTint = { light: string; dark: string };

export type Fact = { label: string; value: string };
export type Metric = { value: string; label: string };

export type FlowStep = { label: string; detail: string };
export type Flow = { title: string; intro?: string; steps: FlowStep[] };

export type AccessRule = { route: string; access: string; detail: string };

export type FeatureGroup = { title: string; items: string[] };
export type Challenge = { title: string; description: string };
export type TechGroup = { label: string; items: string[] };

export type RoadmapState = "done" | "in-progress" | "next";
export type RoadmapItem = { title: string; state: RoadmapState };
// `asOf` is shown next to the heading so the reader knows how fresh it is.
export type Roadmap = { title: string; asOf: string; items: RoadmapItem[] };

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
  screenshot?: string; // real homepage screenshot for cardVisual: "browser-frame" (path under /public); falls back to a text placeholder when unset
  backgroundTexture?: string; // decorative-only image behind an architecture diagram (path under /public) — never a real product screenshot, never shown in a browser-chrome frame

  // Case-study content. Everything below is optional and every section on
  // the page is omitted when its field is empty. Facts here were checked
  // against the project's real code or live site, not invented.
  overview?: string;
  problem?: string;
  solution?: string;
  facts?: Fact[];
  metrics?: Metric[];
  metricsNote?: string; // where and when the metrics were counted
  architecture?: ArchitectureNode[];
  flow?: Flow;
  accessModel?: AccessRule[];
  features?: string[];
  featureGroups?: FeatureGroup[];
  decisions?: Decision[];
  challenges?: string;
  challengeList?: Challenge[];
  roadmap?: Roadmap;
  techGroups?: TechGroup[];
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
    // Deep link to the branch that holds the checkout, payments, and React
    // frontend. The default branch (master) is still the early skeleton.
    github: "https://github.com/imrahulkr/ecomProject/tree/feature-add-frontend",
    liveUrl: undefined,
    featured: true,
    cardVisual: "architecture",
    cardTint: { light: "#8A6234", dark: "#C99A5F" },
    backgroundTexture: "/projects/E-Commerce.png",

    overview:
      "A multi-role e-commerce platform built to support three distinct workflows — Customer, Seller, and Admin — spanning product catalog, cart, checkout, orders, inventory, and payments in a single system.",
    problem:
      "Multi-role e-commerce systems have to keep customer-facing checkout fast and simple while giving sellers and admins reliable control over inventory and orders — without one role's actions corrupting another's view of the system (e.g. two customers checking out the last unit of stock at once).",
    solution:
      "Role-based access control on top of Spring Security separates what each of the three roles can see and do, while the checkout path itself was built around idempotency and concurrency-safe inventory reservations so simultaneous orders can't oversell stock.",

    facts: [
      { label: "Type", value: "Personal project" },
      { label: "Role", value: "Solo developer" },
      { label: "Started", value: "December 2025" },
      { label: "Status", value: "In development, on a feature branch" },
      { label: "Stack", value: "Java 21 · Spring Boot 4 · React · PostgreSQL" },
    ],
    metrics: [
      { value: "66", label: "REST API endpoints" },
      { value: "22", label: "frontend pages" },
      { value: "13", label: "database migrations" },
      { value: "2", label: "payment providers" },
    ],
    metricsNote: "Counted from the feature-add-frontend branch, August 2026.",

    architecture: [
      {
        label: "React client",
        detail: "Customer, Seller, and Admin views",
        tech: ["React", "Vite", "Tailwind CSS", "TanStack Query"],
      },
      {
        label: "Spring Boot API",
        detail: "Spring Security · JWT · OAuth2 · RBAC",
        tech: ["Java", "Spring Boot", "Spring Security", "Bucket4j"],
      },
      {
        label: "PostgreSQL",
        detail: "Product catalog, orders, inventory",
        tech: ["PostgreSQL", "Flyway"],
      },
      {
        label: "Stripe / Razorpay",
        detail: "Provider-agnostic payments with verified webhooks",
        tech: ["Stripe", "Razorpay"],
      },
      {
        label: "Transactional email",
        detail: "Event-driven order, payment, and account emails",
        tech: ["Thymeleaf", "Resend", "Spring Retry"],
      },
    ],

    flow: {
      title: "Checkout lifecycle",
      intro: "What happens between the customer clicking Pay and the order being confirmed.",
      steps: [
        {
          label: "Request arrives with an idempotency key",
          detail:
            "Every checkout and retry-payment request carries an Idempotency-Key header. A stored request hash means a replay returns the original response, and a different payload under the same key is rejected.",
        },
        {
          label: "Order and stock reserved atomically",
          detail:
            "One database transaction creates the order, its items, and a stock reservation using a conditional update, so the last unit can't be sold twice.",
        },
        {
          label: "Payment provider called outside the transaction",
          detail:
            "The healthiest of Stripe or Razorpay is chosen unless the customer picks one. The network call runs after the transaction has committed, never inside it.",
        },
        {
          label: "Webhook verified and deduplicated",
          detail:
            "The provider's signature is checked, the payload is mapped to a provider-agnostic event, and a unique constraint on provider and event id drops any redelivery.",
        },
        {
          label: "Order reconciled",
          detail:
            "The order moves to paid or payment failed, reservations are confirmed or released back to stock, and the matching confirmation or failure email is sent.",
        },
      ],
    },

    accessModel: [
      { route: "/api/auth/**", access: "Open", detail: "Sign up, sign in, email verification, password reset" },
      { route: "/api/public/**", access: "Open", detail: "Browse and search categories and products" },
      {
        route: "/api/payments/webhooks/**",
        access: "Signature-verified",
        detail: "Stripe and Razorpay callbacks, rejected without a valid signature",
      },
      { route: "/api/seller/**", access: "Seller or Admin", detail: "Product management and seller orders" },
      {
        route: "/api/admin/**",
        access: "Admin only",
        detail: "Users, sellers, orders, categories, and seller applications",
      },
      { route: "Everything else", access: "Signed-in users", detail: "Cart, addresses, checkout, and orders" },
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
    featureGroups: [
      {
        title: "Storefront",
        items: [
          "Product catalog with search",
          "Category browsing with sorting and pagination",
          "Shopping cart",
          "Delivery/shipping options",
          "Mobile-responsive design",
        ],
      },
      {
        title: "Checkout and payments",
        items: [
          "Checkout flow",
          "Payment integration (Stripe, Razorpay)",
          "Idempotent checkout and retry-payment",
          "Health-based payment provider routing",
          "Verified, deduplicated payment webhooks",
        ],
      },
      {
        title: "Orders and inventory",
        items: [
          "Order management and tracking",
          "Inventory management",
          "Stock reservations that expire automatically",
          "Abandoned-cart reminder emails",
          "Shipping and delivery confirmation emails",
        ],
      },
      {
        title: "Accounts and security",
        items: [
          "User accounts (login, profile, order history)",
          "Google and GitHub sign-in with account linking",
          "Email verification and password reset",
          "Rotating refresh tokens with reuse detection",
          "Rate-limited password-reset requests",
          "Security measures (fraud checks, backups)",
        ],
      },
      {
        title: "Seller and admin tools",
        items: [
          "Seller applications with admin approval",
          "Seller product management and image uploads",
          "Admin dashboard",
          "Local-disk or Amazon S3 image storage",
        ],
      },
    ],

    decisions: [
      {
        title: "Rotating refresh tokens with theft detection",
        description:
          "Access tokens are short-lived JWTs. Refresh tokens rotate on every use and belong to a family, so presenting an already-used token outside a short grace window revokes the whole family. The grace window keeps two browser tabs racing a silent refresh from logging the user out.",
      },
      {
        title: "Idempotency keys on checkout",
        description:
          "Checkout and retry-payment requests are idempotent. The request hash is stored, so a retried request (network blip, double-click) returns the original result instead of creating a duplicate order.",
      },
      {
        title: "Concurrency-safe inventory reservations",
        description:
          "Stock is reserved with a single conditional update that only succeeds while enough units remain, never a read-then-write. Reservations are confirmed on payment, released on failure, and expired by a scheduled job.",
      },
      {
        title: "Webhook verification and deduplication",
        description:
          "Stripe and Razorpay webhooks are signature-verified, mapped to one provider-agnostic event, and deduplicated by a unique constraint, so a redelivered event can't process a payment twice.",
      },
      {
        title: "No database transaction across a network call",
        description:
          "Order and reservation commit atomically, but the payment provider call happens afterward, outside any transaction, so a slow gateway can never hold a database connection or lock.",
      },
      {
        title: "Pluggable payment providers with health-based routing",
        description:
          "Stripe and Razorpay sit behind one interface and a registry. A rolling success and failure tracker ranks them, so checkout picks the healthiest provider when the customer doesn't choose.",
      },
      {
        title: "Money as integer minor units",
        description:
          "Prices and totals are stored as integer minor units (paise) plus a currency column instead of floating point. A migration converted the original decimal columns to this format.",
      },
    ],

    challengeList: [
      {
        title: "Refresh requests that looked like theft",
        description:
          "React's double-invoked effects and multiple browser tabs can fire the same silent refresh at once, which looks identical to a replayed stolen token. A short grace window plus an atomic conditional revoke separates a harmless duplicate from real reuse.",
      },
      {
        title: "Transactions that silently did nothing",
        description:
          "A Spring method that calls its own transactional method skips the proxy, so the transaction never applies. The order-creation and reservation-expiry logic were extracted into separate components, and open-in-view was turned off so a failed dedup insert couldn't poison the surrounding transaction.",
      },
      {
        title: "Evolving a schema that already had data",
        description:
          "Older tables were managed by Hibernate while newer ones needed reviewable migrations. Flyway now owns new changes on top of the existing schema and production only validates it. Later migrations even converted the money columns to minor units.",
      },
      {
        title: "Duplicate and out-of-order payment events",
        description:
          "Payment providers redeliver webhooks and can send them in any order. Deduplication at the database plus a reconciliation listener that moves orders between states keeps every order consistent regardless.",
      },
    ],

    roadmap: {
      title: "Build status",
      asOf: "August 2026",
      items: [
        { title: "Authentication: JWT, refresh rotation, Google and GitHub sign-in, password reset", state: "done" },
        { title: "Catalog, cart, and checkout APIs with idempotency", state: "done" },
        { title: "Stripe and Razorpay payments with verified webhooks", state: "done" },
        { title: "Stock reservations with automatic expiry", state: "done" },
        { title: "Seller applications and admin APIs", state: "done" },
        { title: "React storefront: browse, search, and product detail", state: "done" },
        { title: "React cart, checkout, orders, seller portal, and admin screens", state: "in-progress" },
        { title: "Polish: loading states, empty states, responsive pass", state: "next" },
      ],
    },

    techGroups: [
      {
        label: "Backend",
        items: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "Bucket4j", "Spring Retry", "Thymeleaf"],
      },
      { label: "Data and storage", items: ["PostgreSQL", "Flyway", "Amazon S3"] },
      { label: "Auth", items: ["JWT", "OAuth2", "Google OAuth"] },
      { label: "Payments and email", items: ["Stripe", "Razorpay", "Resend"] },
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Zustand", "React Hook Form", "Zod", "Axios", "React Router"],
      },
      { label: "API docs", items: ["Swagger/OpenAPI"] },
    ],
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
    screenshot: "/projects/sidhant-home.png",

    overview:
      "A public-facing website for SIDHANT, a non-profit organization operating at the state and national level across healthcare, education, community development, and rural development programs. The site covers the organization's work areas, partner organizations, a media gallery, and a donation flow, and is live in production.",
    problem:
      "An NGO working across healthcare, education, and community development needs a credible, professional web presence — partners and donors need to see the organization's programs, partner network, and impact clearly to build trust.",
    solution:
      "A full site covering program areas, partner organizations, a photo gallery, and a donation flow — built solo with React on the frontend and Node.js on the backend, deployed live on Hostinger.",

    facts: [
      { label: "Type", value: "Volunteer project for a non-profit" },
      { label: "Role", value: "Solo developer" },
      { label: "Status", value: "Live in production" },
      { label: "Hosting", value: "Hostinger" },
      { label: "Stack", value: "React · Node.js" },
    ],
    metrics: [
      { value: "9", label: "program areas presented" },
      { value: "7", label: "main pages" },
      { value: "6", label: "partner organizations featured" },
    ],
    metricsNote: "Counted from the live site.",

    features: [
      "Public program/service pages",
      "Partner organization showcase",
      "Photo gallery",
      "Donation page",
      "Contact and join-us forms",
    ],
    featureGroups: [
      {
        title: "Programs and story",
        items: [
          "Nine program areas: healthcare, education, community development, training and research, rural development, environment sustainability, drug abuse awareness, women empowerment, and skill development",
          "Mission and vision",
          "About Us page",
          "Annual report page",
        ],
      },
      {
        title: "Trust and credibility",
        items: ["Partner organization showcase", "Photo gallery of events and field work"],
      },
      {
        title: "Getting involved",
        items: ["Donation page", "Join Us form", "Contact Us form"],
      },
    ],

    challenges:
      "The gallery draws from a large set of event and field photos across multiple categories, which meant balancing a rich visual presentation against page load performance — especially important since many site visitors, including donors and community members, may be on slower connections.",

    techGroups: [
      { label: "Frontend", items: ["React"] },
      { label: "Backend", items: ["Node.js"] },
      { label: "Hosting", items: ["Hostinger"] },
    ],
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
    backgroundTexture: "/projects/fluxgate.png",

    overview:
      "FluxGate is an API gateway with a microservice architecture, built to consolidate authentication across services and to work hands-on with distributed systems patterns — caching, rate limiting, event streaming, and service-to-service communication. It's under active development, with coding underway across all three services below.",
    problem:
      "Consolidating authentication and cross-cutting concerns (rate limiting, caching) across multiple services, rather than duplicating that logic in each one.",
    solution:
      "A gateway service acts as the single entry point, secured by default, with Redis behind caching and rate limiting and Kafka carrying events. Two services sit behind it: an API-management service backed by MySQL and an analytics service backed by MongoDB. Each is its own Spring Boot application, so they can be built, deployed, and scaled independently.",

    facts: [
      { label: "Type", value: "Personal project" },
      { label: "Role", value: "Solo developer" },
      { label: "Started", value: "September 2026" },
      { label: "Status", value: "In active development" },
      { label: "Stack", value: "Java 21 · Spring Boot 4.1 · Kafka · Redis" },
    ],
    metrics: [
      { value: "3", label: "Spring Boot services" },
      { value: "4", label: "infrastructure pieces: Redis, Kafka, MySQL, MongoDB" },
    ],
    metricsNote: "Counted from the repository, September 2026.",

    architecture: [
      { label: "React client", detail: "Gateway management interface", tech: ["React"], planned: true },
      {
        label: "smart-gateway-service",
        detail: "Routing, rate limiting, caching via Redis",
        tech: ["Redis", "Apache Kafka", "OAuth2"],
      },
      {
        label: "api-management-service",
        detail: "Manages API definitions and routing configuration",
        tech: ["MySQL", "Spring Data JPA", "Apache Kafka"],
      },
      {
        label: "analytics-service",
        detail: "Analytics via Kafka event streaming",
        tech: ["MongoDB", "Apache Kafka"],
      },
    ],

    features: [
      "Redis-based response caching",
      "Redis-based rate limiting",
      "Apache Kafka for service-to-service messaging",
      "Spring Security across services",
    ],

    decisions: [
      {
        title: "One service per concern",
        description:
          "The gateway, API management, and analytics are separate Spring Boot applications on ports 8080, 8081, and 8082, so each can change and scale without touching the others.",
      },
      {
        title: "A datastore that fits each service",
        description:
          "Relational MySQL for API management, MongoDB for analytics data, and Redis for gateway caching and rate limiting, instead of forcing every workload into one database.",
      },
      {
        title: "Secure by default",
        description:
          "Every service denies all requests except its health endpoint unless they are authenticated, and each one ships with the OAuth2 resource-server starter for token validation.",
      },
      {
        title: "Events over synchronous calls",
        description:
          "All three services include Kafka support, laying the groundwork for feeding analytics from streamed events rather than blocking the request path.",
      },
    ],

    roadmap: {
      title: "Roadmap",
      asOf: "September 2026",
      items: [
        { title: "Three-service Maven scaffold on Java 21 and Spring Boot 4.1", state: "done" },
        { title: "Health endpoint on every service", state: "done" },
        { title: "Secure-by-default baseline: every route except health requires authentication", state: "done" },
        { title: "Redis-based response caching", state: "next" },
        { title: "Redis-based rate limiting", state: "next" },
        { title: "Kafka event flow between the gateway and analytics", state: "next" },
        { title: "OAuth2 token validation at the gateway", state: "next" },
        { title: "API definitions and routing rules in api-management-service", state: "next" },
        { title: "Analytics ingestion and storage in MongoDB", state: "next" },
        { title: "React management interface", state: "next" },
      ],
    },

    techGroups: [
      { label: "Services", items: ["Java", "Spring Boot", "Spring Security", "Spring Data JPA"] },
      { label: "Data and messaging", items: ["Redis", "Apache Kafka", "MySQL", "MongoDB"] },
      { label: "Auth", items: ["OAuth2"] },
      { label: "Frontend (planned)", items: ["React"] },
    ],
    results: [],
  },
];
