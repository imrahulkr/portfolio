# Rahul Kumar — Portfolio

A personal portfolio and technical blog built with Next.js (App Router) and
TypeScript. Homepage, project case studies, a résumé page, and a 329-chapter
MDX blog spanning five series, all driven by typed data files rather than
hardcoded content.

**Live tech stack:** Next.js 15 · React 18 · TypeScript · Tailwind CSS ·
MDX (`@mdx-js/mdx`) · `next-themes` · Resend (contact email) · Google
reCAPTCHA v3 (optional)

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # next lint
```

---

## Environment variables

Create `.env.local` in the project root. Every variable is optional — the
site builds and runs with none of them set, degrading gracefully (the
contact form fails closed with an error message, the reCAPTCHA widget
simply doesn't render, and the site URL falls back to `example.com`).

| Variable | Required for | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Contact form actually sending email | Used server-side in [app/api/contact/route.ts](app/api/contact/route.ts). Without it, the API route responds but no email is sent. |
| `CONTACT_FROM_EMAIL` | Auto-reply to people who use the contact form | A sender on a domain verified with Resend, e.g. `Rahul Kumar <hello@yourdomain.com>`. Also used as the sender of the notification email. Without it the sandbox sender is used and the auto-reply is skipped, because the sandbox can only deliver to the Resend account owner. |
| `NEXT_PUBLIC_SITE_URL` | Correct URLs in `sitemap.xml`, `robots.txt`, Open Graph images, `metadataBase` | Falls back to `https://example.com`. Set once a real domain is live. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Contact form spam protection (client widget) | Must be set together with `RECAPTCHA_SECRET_KEY` — the widget only renders when both are present. |
| `RECAPTCHA_SECRET_KEY` | Contact form spam protection (server verification) | Verified server-side in the same API route. |

The contact form also has a honeypot field and a per-IP rate limit (5 messages
per 15 minutes, in memory, see [lib/rate-limit.ts](lib/rate-limit.ts)) that run
regardless of reCAPTCHA configuration. The limiter is per server instance, so on
serverless hosting it is a speed bump, not a hard global cap.

---

## Project structure

```
app/
  page.tsx                     Homepage (hero, focus areas, featured
                                projects, experience, skills, about, contact)
  layout.tsx                   Root layout — fonts, theme provider,
                                command palette, metadataBase
  not-found.tsx                Branded 404
  opengraph-image.tsx          Site-wide OG image (next/og, code-generated)
  sitemap.ts / robots.ts       SEO, driven by data/site-config.ts
  api/contact/route.ts         Contact form handler (Resend + reCAPTCHA)
  projects/[slug]/page.tsx     Project case-study pages
  resume/page.tsx              Résumé page (sidebar + content layout)
  blog/page.tsx                Blog index — 5 topic cards
  blog/[series]/page.tsx       Chapter list for one series, grouped by part
  blog/[series]/banner-image/  Code-generated per-series banner (next/og)
  blog/[series]/[chapter]/     MDX chapter reader with prev/next nav

components/
  layout/                      Navbar, footer
  hero/                        Homepage hero
  home/                        Homepage sections (about, contact, experience,
                                featured-projects, focus-areas, skills)
  projects/                    Case-study building blocks (architecture
                                diagram/thumb, browser-frame mock, decision
                                cards)
  blog/                        Table of contents (scroll-spy sidebar)
  command-palette/             ⌘K command palette
  ui/                          Small shared primitives (count-up, reveal)
  theme-provider.tsx           next-themes wrapper

data/                          All real content — see "Content model" below
lib/blog.ts                    MDX loading, frontmatter normalization,
                                series config
public/blogs/<series>/         329 source .mdx chapter files
public/resume.pdf              Downloadable résumé
DESIGN.md                      Locked design system (tokens, type scale,
                                color rules)
```

---

## Content model

Content lives in `/data`, never hardcoded inside components:

- [data/site-config.ts](data/site-config.ts) — name, role, email, social links
- [data/projects.ts](data/projects.ts) — typed project entries (stack,
  architecture, challenges, results, card visuals/tints)
- [data/experience.ts](data/experience.ts) — work history timeline
- [data/skills.ts](data/skills.ts) — focus areas + skill list
- [data/skill-icons.ts](data/skill-icons.ts) — brand icon mapping (real logos
  only, via `react-icons`)
- [data/stats.ts](data/stats.ts) — homepage hero stat panel figures

Where real information isn't available yet, the codebase uses an
`[Add ...]` placeholder convention instead of inventing content — see
`components/home/about.tsx` for the current unfilled fields
(`currentlyBuilding`, `currentlyLearning`, `interestedIn`).

### Blog system

The blog is a **topics → chapters** structure, not a flat post list:

- `/blog` — 5 topic cards (Java, Spring Boot, System Design HLD, System
  Design LLD, AI System Design)
- `/blog/[series]` — chapter list for that topic, grouped by part, with a
  code-generated banner illustration
- `/blog/[series]/[chapter]` — the reader, with a scroll-spy table of
  contents and Previous/Next navigation within that series

Source content is 329 `.mdx` files under `public/blogs/<folder>/NN-slug.mdx`.
Because the five series' frontmatter schemas are inconsistent with each
other, [lib/blog.ts](lib/blog.ts) derives chapter order and slugs from the
filename's `NN-` prefix rather than trusting frontmatter, and its
`SERIES_CONFIG` is the single source of truth for each series' display
title, description, and URL slug. MDX is evaluated directly via
`@mdx-js/mdx`'s `evaluate()` (not `next-mdx-remote`) with `remark-gfm` +
`rehype-slug` + `rehype-highlight`, and raw content is sanitized before
evaluation since it's plain Markdown prose (not JSX) that can contain
characters MDX's parser would otherwise choke on.

Reading time is computed uniformly from each chapter's real content via
`reading-time`, not from inconsistent frontmatter fields.

---

## Design system

All visual decisions — color tokens, type scale, fonts, the single-accent
rule and its small set of explicitly scoped exceptions (ambient body
gradient, contact glow, per-project card tints, brand icon colors) — are
locked in [DESIGN.md](DESIGN.md). Don't introduce new colors or arbitrary
`text-[Npx]` values outside of what's documented there.

---

## Features

- Responsive navbar with mobile menu and theme toggle (light/dark/system,
  via `next-themes`)
- ⌘K command palette — in-page navigation, jump to any project or blog
  chapter, open social links, toggle theme
- Project case studies with architecture diagrams/thumbnails or browser-frame
  mockups, decision cards, and optional challenges/results sections (omitted
  entirely when a project has no real content there, rather than showing
  placeholder text)
- 329-chapter MDX blog across 5 series with scroll-spy table of contents,
  syntax highlighting, and responsive tables/code blocks
- Contact form → Resend email delivery, with honeypot + optional reCAPTCHA
  v3 spam protection, per-IP rate limiting, and an optional auto-reply
- Résumé page (`/resume`) with a downloadable PDF
- Code-generated Open Graph images (site-wide and per blog series) via
  `next/og`
- SEO: `sitemap.xml`, `robots.txt`, metadata, all driven by
  `data/site-config.ts`
- Accessibility: focus-visible rings site-wide, correct landmark/heading
  structure, `aria-live` regions on form feedback, `prefers-reduced-motion`
  respected in animations
- Self-hosted fonts via `next/font/google` (no external CDN round-trip)

---

## Before you deploy — placeholders left on purpose

- `NEXT_PUBLIC_SITE_URL` isn't set — sitemap/robots/OG metadata fall back to
  `example.com` until a real domain exists
- `RESEND_API_KEY` — contact form won't send email without it (still
  degrades gracefully)
- `components/home/about.tsx` — `currentlyBuilding`, `currentlyLearning`,
  `interestedIn` are still `[Add ...]` placeholders (real personal content
  only the site owner can supply)
- `data/projects.ts` — FluxGate's MySQL/MongoDB split and some
  challenges/decisions are unset since that project is still actively being
  built
- 56 blog chapters reference `/diagrams/*.svg` images that don't exist yet
  and render as labeled placeholders instead

---

## Real project facts

Case studies are built strictly from real information — nothing invented:

- **ecomProject** — [github.com/imrahulkr/ecomProject](https://github.com/imrahulkr/ecomProject).
  Java/Spring Boot backend, React frontend, PostgreSQL, Stripe/Razorpay.
  Multi-role (Customer/Seller/Admin) e-commerce platform.
- **SIDHANT** — [sidhantdel.org](https://sidhantdel.org). React + Node.js,
  deployed on Hostinger. Repo is private per the organization's requirement;
  only the live URL is linkable.
- **FluxGate** — [github.com/imrahulkr/fluxgate](https://github.com/imrahulkr/fluxgate).
  API gateway, Spring Boot + React, microservices (`smart-gateway-service`,
  `api-management-service`, `analytics-service`), Redis, Kafka, MySQL +
  MongoDB. Actively in progress — presented with a "Currently building"
  badge, not as finished.
