# Spring Boot: Zero to Advanced — Series Syllabus

**Reference doc for planning/writing the series.** Not a blog post itself — this is the working outline to build each chapter against.

---

## Series Conventions

| Setting | Decision |
|---|---|
| Target reader | Knows core Java already; new to Spring Boot specifically |
| Spring Boot version | 3.x |
| Java version | 21 (virtual threads, records, pattern matching used where relevant) |
| Build tool for snippets | Maven |
| Format | One `.mdx` file per chapter |
| Total chapters | 43 (39 topic chapters + 4 dedicated interview chapters) |
| Interview Q&A per topic chapter | 10–15, with detailed answers and code examples where useful |

### Frontmatter schema (proposed — confirm or adjust against your CMS/content model)

```yaml
title: string
description: string
date: YYYY-MM-DD
readTime: string      # e.g. "12 min read"
series: "spring-boot"
part: number           # 1–43, drives ordering + prev/next nav
tags: string[]
```

### Chapter template (mirrors your AEM reference post)

1. Title + meta line (date, read time) + one-paragraph description + tag pills
2. Optional hero image
3. Intro — what this chapter covers and why it matters, links to adjacent chapters
4. Core sections — concept explanation → code example → diagram (where noted below)
5. **Best practices & gotchas** callout list
6. **Quick reference / cheat sheet** table
7. **Wrapping up** — 2–3 sentence recap + link to next chapter
8. **Interview Questions** — 10–15 Q&A, detailed answers, code examples where needed

---

## Part 1 — Foundations

| # | Chapter | Notes |
|---|---|---|
| 1 | Why Spring Boot? | Spring vs Spring Framework vs Java EE, what problem Boot solves |
| 2 | Spring Core Concepts You Need First | IoC, DI, Beans, ApplicationContext, bean scopes & lifecycle — *diagram: bean lifecycle* |
| 3 | Your First Spring Boot App | Spring Initializr, project structure, starters explained |
| 4 | Auto-Configuration Internals | `@SpringBootApplication`, `@EnableAutoConfiguration`, conditional annotations |
| 5 | Configuration & Profiles | `application.yml`, `@ConfigurationProperties` vs `@Value`, environment profiles |

## Part 2 — Web Layer

| # | Chapter | Notes |
|---|---|---|
| 6 | Building REST APIs | `@RestController`, mapping annotations, `ResponseEntity` |
| 7 | Validation & Global Exception Handling | `@Valid`, `@ControllerAdvice`, RFC 7807 `ProblemDetail` |
| 8 | Spring MVC Internals | DispatcherServlet, filters vs interceptors — *diagram: request flow* |

## Part 3 — Data Layer

| # | Chapter | Notes |
|---|---|---|
| 9 | Spring Data JPA Basics | Entities, Repositories, Hibernate essentials |
| 10 | Advanced Spring Data JPA | Derived queries, JPQL, Specifications, Projections, pagination/sorting |
| 11 | Transactions Deep Dive | `@Transactional`, propagation, isolation levels, pitfalls |
| 12 | Migrations & Multiple Datasources | Flyway/Liquibase, more than one DB |
| 13 | NoSQL with Spring Data | MongoDB integration, when to reach for it |

## Part 4 — Security

| # | Chapter | Notes |
|---|---|---|
| 14 | Spring Security Fundamentals | Filter chain, authentication vs authorization |
| 15 | JWT & OAuth2/OIDC | Securing REST APIs end to end — *diagram: auth flow* |
| 16 | Advanced Security | Method-level security, CORS, CSRF, RBAC/ABAC |

## Part 5 — Testing

| # | Chapter | Notes |
|---|---|---|
| 17 | Unit Testing | JUnit 5, Mockito, `@SpringBootTest`, MockMvc |
| 18 | Integration Testing | Testcontainers, `@DataJpaTest`, `@WebMvcTest` |

## Part 6 — Production Readiness

| # | Chapter | Notes |
|---|---|---|
| 19 | Actuator & Observability | Health checks, Micrometer |
| 20 | Caching | Spring Cache abstraction + Redis |
| 21 | Async & Scheduling | `@Async`, `@Scheduled`, thread pools, `CompletableFuture` |
| 22 | Logging Best Practices | SLF4J, structured logs, correlation IDs |

## Part 7 — Microservices & Distributed Systems (Deep Dive)

| # | Chapter | Notes |
|---|---|---|
| 23 | Introduction to Microservices with Spring Boot | Monolith vs microservices, decomposition strategies |
| 24 | Service Discovery with Eureka | |
| 25 | Centralized Config with Spring Cloud Config Server | |
| 26 | API Gateway Deep Dive | Spring Cloud Gateway — routing, filters, rate limiting |
| 27 | Resilience4j Deep Dive | Circuit breaker, retry, bulkhead, rate limiter — *diagram: circuit breaker states* |
| 28 | Inter-Service Communication | WebClient/RestClient, OpenFeign, gRPC overview |
| 29 | Event-Driven Architecture with Kafka | |
| 30 | Messaging with RabbitMQ | |
| 31 | Distributed Tracing & Observability | Micrometer Tracing, OpenTelemetry, Zipkin |
| 32 | Distributed Transactions & the Saga Pattern | |
| 33 | Securing Microservices | mTLS, OAuth2 client credentials, JWT propagation |
| 34 | Capstone: Designing a Microservices System | Architecture walkthrough in the spirit of a real gateway-based system — *diagram: full system architecture* |

## Part 8 — Deployment & Advanced

| # | Chapter | Notes |
|---|---|---|
| 35 | Dockerizing & Deploying Spring Boot | Containers, Kubernetes basics |
| 36 | Performance Tuning | Connection pools, the N+1 problem, JVM/GC basics |
| 37 | Java 21 & Virtual Threads in Spring Boot 3.2+ | |
| 38 | GraalVM Native Images with Spring Boot | |
| 39 | Reactive Programming with WebFlux | Mono/Flux, when reactive actually pays off |

## Part 9 — Dedicated Interview Prep

| # | Chapter | Notes |
|---|---|---|
| 40 | Interview Questions Part 1 | Core, Configuration & Web Layer |
| 41 | Interview Questions Part 2 | Data, Security & Testing |
| 42 | Interview Questions Part 3 | Microservices & Distributed Systems |
| 43 | Interview Questions Part 4 | System Design & Scenario-Based |

---

## Still open / worth confirming before writing begins
- Exact frontmatter field names if your CMS already expects something different from the schema above
- Total question count target for chapters 40–43 combined (a curated ~40–50, or exhaustive 100+)
- Whether the chapter template above should be adjusted before it's applied to all 43 chapters
