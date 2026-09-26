# Project context for Claude Code

This file is auto-loaded by Claude Code from the project root. It captures
context from the design/planning conversation that produced this codebase,
so work continues consistently without re-litigating settled decisions.

## Status

**Done:**
- Global design system (DESIGN.md) — color tokens, type scale, fonts
- Navigation — sticky navbar, mobile menu, theme toggle
- Homepage — hero, focus areas, featured projects, experience, skills,
  about, contact
- Project data model — data/projects.ts, typed, data-driven
- Project case-study pages — /projects/[slug] for all 3 real projects
  (ecomProject, SIDHANT, FluxGate)
- Dark/light mode — system-default with manual toggle (next-themes)
- Next.js 15 `params`-as-`Promise` fix in `app/projects/[slug]/page.tsx`
  (`generateMetadata` and the page component now `await params`)
- Real contact form — `components/home/contact.tsx` posts to
  `app/api/contact/route.ts`, which sends via Resend (needs
  `RESEND_API_KEY` in `.env.local`; degrades gracefully without one).
  Sender address still uses Resend's sandbox domain (`onboarding@resend.dev`)
  until a real domain is verified with Resend.
- Real LinkedIn/LeetCode URLs in `data/site-config.ts` (no longer
  `REPLACE_ME`)
- SEO basics: `app/sitemap.ts` and `app/robots.ts` (Next.js file
  conventions), both driven by `siteUrl` in `data/site-config.ts`
  (reads `NEXT_PUBLIC_SITE_URL` env var, falls back to
  `https://example.com` until a real domain exists — same source now
  used by `metadataBase` in `app/layout.tsx`)
- Accessibility pass: `focus-visible` rings added to every interactive
  element site-wide (navbar, hero, footer, featured-projects, contact,
  project case-study page); mobile menu button now has
  `aria-expanded`/`aria-controls`; theme toggle and hamburger
  `aria-label`s now reflect current/target state instead of being
  static; `Footer` moved to be a sibling of `<main>` instead of nested
  inside it (was breaking the landmark structure on both the homepage
  and `/projects/[slug]`); added an `sr-only` `<h2>` to `FocusAreas` to
  fix a heading-hierarchy skip (h1 → h3); `Reveal` and `CountUp`
  animations now respect `prefers-reduced-motion`; decorative SVGs
  (theme icons, hamburger, architecture-diagram connectors) marked
  `aria-hidden`; contact form now has `role="alert"`/`role="status"`
  on error/success messages, `aria-busy` while sending, visible
  `*`-required markers, and stronger (ring, not just border-color)
  focus indicators on inputs

- Performance pass: fonts migrated from Google Fonts CDN `@import` to
  `next/font/google` (self-hosted woff2, no external CDN round-trip) —
  Public Sans/Source Sans 3/JetBrains Mono loaded in `app/layout.tsx`
  via CSS variables matching the existing `--font-*` names, so
  `tailwind.config.ts` needed no changes. Image optimization wasn't
  applicable — no `<img>`/`<Image>` exists anywhere yet (all visuals
  are CSS/SVG).

- Command palette (⌘K) — `components/command-palette/command-palette.tsx`,
  dependency-free, mounted globally in `app/layout.tsx`. Opens on
  Cmd/Ctrl+K or via the "Search ⌘K" button in the navbar (desktop and
  mobile); commands cover in-page navigation, jumping to any project
  case study, opening GitHub/LinkedIn/LeetCode/resume, and toggling
  theme. Arrow keys + Enter to select, Escape to close, filters by
  substring match. Verified interactively with a scripted Playwright
  session (open via shortcut, filter, navigate, close, reopen via
  button) since this is JS-driven behavior a build/typecheck can't
  confirm.

- Blog system rebuilt (2026-09-20) as a topics → chapters structure,
  replacing the earlier flat-post version entirely (the 2 placeholder
  posts and `components/blog/blog-search.tsx`'s category-search UI are
  gone — real content superseded them). Source content is 329 real
  `.mdx` chapters across 5 series the user dropped into
  `public/blogs/<folder>/NN-slug.mdx` (Java, Spring Boot, System
  Design HLD, System Design LLD, AI System Design). Routes: `/blog`
  (5 topic cards) → `/blog/[series]` (chapter list grouped by part) →
  `/blog/[series]/[chapter]` (reader, with Previous/Next nav within
  that series). `lib/blog.ts` normalizes all of this — the five
  series' frontmatter schemas are genuinely inconsistent (different
  field names for chapter number, part label, slug; some fields absent
  entirely in some series), so chapter order and slug are derived from
  the filename's `NN-` prefix instead of trusting any frontmatter
  field, and `SERIES_CONFIG` in that file is the single place holding
  each series' display title/description/URL slug (URL slugs chosen so
  two hardcoded cross-links already inside the content, `/blog/java`
  and `/blog/system-design`, resolve correctly).
  Still renders MDX via `@mdx-js/mdx`'s `evaluate()` directly, same as
  before and for the same reason (NOT `next-mdx-remote` — see prior
  note in this file's history if resurrected — don't reintroduce that
  package without confirming the incompatibility is fixed upstream),
  with `remark-gfm` + `rehype-slug` + `rehype-highlight`.
  `lib/blog.ts#sanitizeForMdx` escapes bare `<` (not followed by a
  tag-start character) and all `{`/`}` outside fenced code blocks and
  inline code spans before handing content to `evaluate()` — this
  content is plain Markdown never meant to embed real JSX, but
  comparison operators/generic wildcards in prose (`x <= now()`,
  `List<? extends Number>`) and plain-English set notation
  (`{version, traffic_percentage}`) are exactly the shapes MDX's JSX/
  expression parser chokes on, and both appear throughout this
  content; verified by evaluating+rendering all 329 chapters
  standalone, not just a full `next build`, since a single bad file
  fails the entire build. 56 chapters reference `/diagrams/*.svg`
  images that don't exist — the chapter page's `img` override renders
  those as a labeled placeholder (the image's own alt text) instead of
  a broken `<img>`, consistent with the `[Add ...]` convention;
  real diagrams are still a future `[Add ...]`-equivalent gap. The
  entire Java series was marked `draft: true` in its own frontmatter
  (the only series with that flag at all) — published anyway per
  explicit instruction, flag has no effect on visibility.
  Table of contents (`components/blog/table-of-contents.tsx`) reused
  unchanged. No search/filter UI on the new chapter-list pages — not
  requested, and the old category-search model doesn't map cleanly
  onto series/chapters; worth adding if 329 chapters prove hard to
  scan later. Reading time is computed uniformly via `reading-time`
  from each chapter's own content rather than trusting the 2 different,
  inconsistently-present `readTime`/`readingTime` frontmatter fields.
  Each `/blog/[series]` page has a code-generated banner image between
  the title and description — `app/blog/[series]/banner-image/route.tsx`
  uses `next/og`'s `ImageResponse` (same technique as the site-wide
  `app/opengraph-image.tsx`) to render a full-canvas topic illustration
  server-side as a real PNG: a coffee cup for Java, a leaf for Spring
  Boot (Spring's real brand green, also used in `data/skill-icons.ts`),
  a client→load-balancer→servers→DB network diagram for System Design
  HLD, a UML class/inheritance diagram for LLD, a multi-layer neural
  net for AI System Design — each with a per-series tint color (a
  scoped exception to single-accent, same spirit as `cardTint` in
  `data/projects.ts`, confined to these images). No title/chapter-count
  text in the image itself — that's already shown on the page directly
  above it; an earlier version repeated both as image text, which was
  wrong on two counts (pointless duplication, and it crowded out an
  actual illustration in favor of a small corner icon).
  Non-obvious Satori (next/og's renderer) gotcha hit while building
  this: it silently drops SVG content — no error, just missing from the
  output — when that content is returned from a helper invoked as a
  JSX component tag (`<Cup />`). Calling the same helper as a plain
  function (`{cup(...)}`) works fine, since the returned JSX is then
  spliced inline rather than crossing a component boundary. All shape
  helpers in that file are deliberately plain functions for this
  reason — verified by rendering actual PNGs standalone (not just
  trusting a build that completes without errors) after this exact
  failure mode produced a silently blank image the first time.
  Runs on the default Node.js runtime, not edge, because
  `generateStaticParams` calls into `lib/blog.ts`'s `node:fs` reads.
- GitHub integration explicitly deferred by the user — contribution
  graph needs a GitHub PAT (GraphQL-only data), repo stats alone don't
  need one; revisit if they want just the stats half.
- `public/resume.pdf` added (the user's real resume) — Resume links
  across the site now work instead of 404ing.
- Fixed a real bug in `components/ui/count-up.tsx`: `value.match(...)`
  ran on every render and returned a new array reference each time;
  since both `useEffect`s depended on that array, React treated it as
  changed on every re-render, restarting the count-up animation from
  scratch with no cleanup to cancel the previous
  `requestAnimationFrame` loop — overlapping loops raced to overwrite
  the displayed number, producing the continuous flicker (and
  nonsensical values like "-33+") the user saw in the hero stat panel.
  Fixed by memoizing `match` with `useMemo(() => ..., [value])` and
  cancelling the animation frame in the effect's cleanup. Verified with
  a scripted Playwright session sampling the displayed values 30x over
  3 seconds plus forced re-renders — settles immediately at the
  correct values (4+, 1,500+, 3×, 20%) with no flicker.
- Cross-checked `data/experience.ts` and `data/skills.ts` against the
  user's actual resume (RahulKumar_Resume.pdf) — already accurate,
  no changes needed.
- UX/navigation pass (full end-to-end review, then fixes applied):
  added `Contact` to the navbar's visible nav items (was reachable only
  via ⌘K before); dropped the redundant GitHub/LinkedIn links from the
  navbar itself (still present in Hero/Footer/Contact) to de-clutter;
  added a branded `app/not-found.tsx` instead of the default Next 404;
  added "← All projects" / "← All articles" back-links atop
  `/projects/[slug]` and `/blog/[slug]`; project case-study page no
  longer renders empty "Challenges"/"Results" sections with italic
  placeholder text when a project has no real content there — the
  section is omitted entirely until real content exists; Hero's
  "currently at Infosys" line now reads the current role from
  `data/experience.ts` (`experience[0]`) instead of being hardcoded
  text, so it can't drift out of sync with a real job change;
  homepage "Technical range" (`components/home/skills.tsx`) now
  renders each skill as a bordered pill badge instead of a
  comma-joined sentence, matching the tech-stack pill style used on
  project cards/pages; `FocusAreas` heading changed from `sr-only` to
  a small visible label so sighted users get the same context screen
  readers already had; added `app/opengraph-image.tsx` (Next's
  `next/og` `ImageResponse` convention, code-generated from
  `siteConfig` — no fabricated imagery) so social shares of the site
  or any page under it get a real preview card instead of none.
- Added a locked `error` design token (`--error`, #9A4A3F light /
  #D18579 dark) to `DESIGN.md` and `globals.css` — the contact form's
  error text (`components/home/contact.tsx`) used a raw
  `text-red-500` that wasn't part of the token system; it now uses
  `text-error`. Scoped explicitly to form/validation messages only,
  not a second decorative accent — single-accent rule still applies
  to everything else.
- Visual-interest pass (the site read as flat/monotone, especially dark
  mode) — see DESIGN.md's Colors section for full detail and rationale
  of each change, all explicitly requested/approved, not unilateral:
  widened `surface`/`border` contrast from `bg` in both themes (bands
  were imperceptible before); added a two-blob ambient accent gradient
  fixed to the `body` — this is the only gradient on the page; a
  separate Contact-section glow was added, then explicitly reverted the
  same day so every section stays synced to this one shared background
  instead of each section getting its own variant; per-project
  `cardTint` on featured-project cards
  (`data/projects.ts` → `.project-tint` in `globals.css`); real
  brand-colored tech icons in Skills via the new `react-icons`
  dependency (`data/skill-icons.ts` — only technologies with a real,
  legible-in-both-themes brand icon get one, nothing invented). A real
  JWT code excerpt (sourced from `github.com/imrahulkr/ecomProject`) was
  tried as the hero panel's background texture in place of the original
  dot-grid, then reverted the same day — it visually collided with the
  "Career snapshot" header and stat numbers sitting on top of it and
  hurt legibility, so the hero panel is back to the plain dot-grid.
- Contact section rebuilt to a centered single-column layout (was a
  2-column grid where the sparse contact-links column looked "spread
  out" against the much taller form beside it) — Name/Email now sit
  side by side, links moved to a centered row below the form, submit
  button is full-width solid-accent with a send icon, and a response-
  time line ("I'll get back to you within 24-48 hours") sits under it.
  Added optional Google reCAPTCHA v2 (explicit-render, theme-matched)
  gated behind `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (client) and
  `RECAPTCHA_SECRET_KEY` (server, verified in
  `app/api/contact/route.ts`) — inert with no visible change until both
  are set in `.env.local`; the existing honeypot field still runs
  regardless.
- Fixed dark-mode blog readability bug: chapter headings and bold/
  highlighted text were nearly invisible in dark mode. Cause was
  `@tailwind/typography`'s (`prose` class, used in
  `app/blog/[series]/[chapter]/page.tsx`) default theme, which hardcodes
  `gray-900`/`gray-700` for headings, `strong`/`b`, blockquotes, list
  markers, and table borders — those don't track this site's `--text`
  CSS variable the way body text and links already did, so in dark mode
  they rendered as dark gray on the dark background. Fixed in
  `tailwind.config.ts`'s `theme.extend.typography.DEFAULT.css` by
  pinning every text-bearing prose node (headings, strong/b, blockquote,
  hr, list markers, table head/body borders) to the same `--text`/
  `--text-soft`/`--border` variables already used for body text, code,
  and links, instead of only patching the few nodes that had already
  come up as visibly wrong. Headings were then moved from `--text` to
  `--accent` — `--text` in dark mode is near-white (#edeef0) and read as
  glaring at heading sizes; `--accent` is an existing token (already
  used for links, not a new color) and reads as legible but calmer,
  with the side benefit of visually separating headings from body copy.
- `components/blog/table-of-contents.tsx` upgraded from a static sticky
  list to a scroll-spy sidebar, reusing the same `IntersectionObserver`
  pattern already in `components/layout/navbar.tsx`: the currently-read
  heading gets a left accent border + accent text + `aria-current`.
  Also capped to `max-h-[calc(100vh-7rem)]` with internal
  `overflow-y-auto` — a long chapter's heading list previously kept
  growing past the bottom of the screen since `sticky` alone doesn't
  bound height, so on long chapters the list overflowed the viewport
  with no way to reach the lower entries. Now it scrolls internally
  once it hits that cap, and the active heading is kept in view within
  that internal scroll.
  Real bug caught right after shipping the above: the "keep active
  heading in view" step originally called
  `activeLink.scrollIntoView({ block: "nearest" })`, but per spec that
  scrolls *every* scrollable ancestor into position to reveal the
  target — including the page itself, not just the nearest scrollable
  box. Every time the active heading changed while the user scrolled,
  it yanked the whole page's scroll position to reposition this
  sidebar link, fighting the user's own scroll. Fixed by computing the
  active link's position against the list container's own
  `getBoundingClientRect()` and adjusting only `container.scrollTop`
  directly — confined to the sidebar, never touches window scroll.
  Also added `md:border-l md:border-border md:pl-6` on the nav so it
  reads as a visually separate rail from the article instead of just
  floating in an unmarked gap next to it.
  A second, more fundamental cause of "the TOC scrolls with the page":
  the grid row in `app/blog/[series]/[chapter]/page.tsx` had
  `items-start`, which sizes each grid item to its own content height
  instead of stretching to the row height. That collapsed the `<aside>`
  wrapping the TOC down to the TOC's own short height, leaving the
  sticky `<nav>` inside it no room to travel — its containing block
  ended right where the TOC's content ended, so it could never actually
  stay "stuck" while scrolling through the much taller article; it just
  scrolled away immediately. Removed `items-start` so the row uses the
  default `stretch`, giving the aside the full article-matching row
  height the sticky nav needs.
  Also hid the TOC's internal scrollbar (visible once a long chapter's
  heading list hit the `max-h`/`overflow-y-auto` cap, and read as
  clutter/squeezed on what's meant to look like plain nav text) via a
  new `.scrollbar-none` utility in `globals.css`
  (`scrollbar-width: none` + the `::-webkit-scrollbar` equivalent) —
  the element still scrolls (including auto-scroll to the active
  heading) exactly as before, only the painted scrollbar track/thumb is
  gone.
- Two more TOC fixes:
  - Widened the reading layout: the sidebar's grid column was a fixed
    `200px` inside a `max-w-4xl` container, reading as cramped/wrapped
    on longer heading text with unused space available on wider
    screens. `app/blog/[series]/[chapter]/page.tsx`'s back-link,
    header, reading grid, and prev/next nav sections all moved from
    `max-w-4xl` to `max-w-5xl` together (so they stay aligned with each
    other) and the sidebar column widened from `200px` to `260px`.
  - Replaced the `IntersectionObserver`-based active-heading tracking
    with direct scroll-position computation (`requestAnimationFrame`-
    throttled `scroll`/`resize` listeners comparing each heading's
    `getBoundingClientRect().top` against a fixed 25%-of-viewport
    reference line). The observer approach used a narrow rootMargin
    trigger band; a fast scroll could carry a heading through that band
    between two callback firings without it ever registering as
    "intersecting," leaving `activeId` stale on an earlier heading no
    matter how far past it the reader had actually scrolled — which is
    why the sidebar appeared to not auto-scroll: from its own stale
    state, there was nothing new to scroll to. Recomputing the active
    heading directly from real element positions on every scroll tick
    can't skip one this way regardless of scroll speed.
  - The actual reason nothing visibly auto-scrolled even after that fix:
    the scrollable box is the `<nav>` (it carries `overflow-y-auto` +
    `max-h`), but the auto-scroll effect was setting `scrollTop` on the
    `<ul>` ref inside it — the `<ul>` has no overflow of its own, so
    setting its `scrollTop` is a silent no-op, nothing errors, it just
    does nothing. Moved the ref onto the `<nav>` itself so the effect
    scrolls the element that's actually scrollable.
- Mobile audit of the blog system (`/blog`, `/blog/[series]`,
  `/blog/[series]/[chapter]`) after being asked directly whether it's
  mobile-friendly. Couldn't get a real-device/viewport screenshot this
  session — Playwright's Chromium binary isn't installed and this
  environment has no network path to `cdn.playwright.dev` to fetch it
  (`npx playwright install chromium` timed out) — so this was a code-
  level review, not a rendered one; worth a real check next time
  Playwright's browser is available. Found and fixed one real gap: 143
  of the 329 chapter `.mdx` files contain a Markdown table, and nothing
  made a wide one scroll horizontally on a narrow screen — it would
  have forced the whole page to scroll sideways instead. Fixed via
  `table: { display: "block", overflowX: "auto" }` in
  `tailwind.config.ts`'s typography override — a `<table>` with
  `display: block` still lays its children out as a table (they keep
  their own `table-row`/`table-cell` display values), so this scopes
  the horizontal scroll to just the table rather than needing MDX to
  wrap every table in a div. Everything else checked out already:
  `pre` code blocks get `overflow-x: auto` from `@tailwindcss/
  typography`'s own base styles; the reading-time column, TOC sidebar,
  and prev/next nav all already collapse or hide correctly at the `sm`/
  `md` breakpoints; no fixed pixel widths anywhere in the blog route
  tree (the one `max-w-[46ch]` on the chapter title is a cap, not a
  minimum, so it can't force overflow).

- New `/resume` page (`app/resume/page.tsx`), replacing the "Resume"
  link's old behavior of opening `public/resume.pdf` directly in a new
  tab — the navbar (desktop + mobile), Hero, and Contact's "Resume"
  links all now point to this page instead; the page itself has a
  "Download PDF" button linking to the actual PDF, so the file is
  still reachable, just one click further in. Modeled on a reference
  layout the user shared (sidebar + content, contact-info cards,
  icon-chip "what I'm doing" cards) but built entirely from this site's
  existing data and design tokens — no new colors (icon chips use
  `bg-accent/10` on the existing accent token, not a new one) and no
  fabricated content. Explicitly asked and confirmed before building:
  the reference's Testimonials and Clients-logo sections were dropped
  entirely (no real testimonials or client data exists for this site,
  and inventing them would violate the "never fabricate content" rule)
  rather than kept as placeholders. Sidebar shows Email (real, from
  `site-config.ts`), Phone (`[Add phone number]` — not in any data
  file), Experience (`stats[0].value` from `data/stats.ts`, "4+
  years"), and Location (`experience[0].location`, i.e. the current
  role's real location — reused rather than invented, same pattern
  Hero already uses for "currently at X"). Main content reuses
  `aboutContent` from `components/home/about.tsx` (including its two
  still-unfilled `[Add ...]` placeholders, same as the homepage),
  `focusAreas` and `skills` from `data/skills.ts`, and the full
  `experience` timeline from `data/experience.ts` — no new content
  files, this page is a different arrangement of data that already
  existed. Added to `app/sitemap.ts` and the command palette
  ("Go to Resume") for consistency with how `/blog` was wired in.
  The Currently building/learning/Interested-in block (all three still
  unfilled `[Add ...]` placeholders) was removed from this page shortly
  after — it stayed cluttered with three visible placeholders on a page
  meant to look finished; the homepage About section
  (`components/home/about.tsx`) still has it and was left untouched,
  since only the resume page's copy was called out.
  Skill pills on this page then got the same brand icons already used
  on the homepage's Skills section (`data/skill-icons.ts` — real logos
  only, concepts/tools with no official mark like "System design" or
  "VS Code" still render as plain text, unchanged rule) plus a hover
  state (`hover:border-accent hover:text-accent`) they didn't have
  before.

- Revamp Phase 1 (2026-09-26), following a full-site review and three owner decisions: audience is a balanced recruiter/client split leaning slightly toward clients; wording is freelance-friendly; NEVER show rates or availability publicly (every CTA says get in touch); gradients/glow allowed on the hero and card hover only (see DESIGN.md). Shipped: new hero (`components/hero/hero.tsx`, copy in `data/hero.ts`) with aurora glow, gradient headline phrase, primary "Get in touch" CTA and a tilted "Selected work" panel built from real project data; solid "Get in touch" button in the navbar (Resume moved into the nav links, nav collapses to the hamburger below `lg` to fit); logo marquee (`components/home/tech-strip.tsx`, real brand icons only, static wrapped row under reduced motion); Services section (`components/home/services.tsx`, copy in `data/services.ts`) replacing `FocusAreas` on the homepage (the component file and `focusAreas` data remain: the resume page still uses the data); `.card-glow` hover on project and service cards; "Go to Services" in the command palette. Revamp Phase 2 (2026-09-26) shipped: contact form now asks "What's this about?" and Timeline via optional dropdowns (options in `data/contact-options.ts`, shared with the API route so the server rejects values the form never offered; NO budget field, by decision); `app/api/contact/route.ts` rewritten with per-IP rate limiting (`lib/rate-limit.ts`, 5 per 15 min, in-memory so per server instance), field length caps, safe JSON parsing, subject-line CR/LF stripping, and a fix for a real bug: Resend's `send()` returns `{ error }` instead of throwing, and the old code ignored it and reported success even when delivery failed. A best-effort auto-reply to the sender is sent only when `CONTACT_FROM_EMAIL` (a Resend-verified domain sender) is set, because the sandbox sender can only deliver to the account owner. New homepage sections: Impact strip (`components/home/impact.tsx`, real numbers from `data/impact.ts` plus the live blog chapter count), Process (`components/home/process.tsx`, copy in `data/process.ts`), and Blog teaser (`components/home/blog-teaser.tsx`, reuses the generated `/blog/<series>/banner-image` PNGs). Homepage order is now Hero, Tech strip, Services, Projects, Impact, Process, Experience, Blog teaser, Skills, About, Contact. README env table and reCAPTCHA version (it is v3, not v2) corrected. Planned next (Phase 3): blog search, analytics, RSS, structured data, CI. Testimonials/FAQ deliberately omitted until real content exists.

- Revamp Phase 3 (2026-09-26): blog search (`components/blog/blog-search.tsx` on `/blog`, fetches the static `app/blog/search-index.json/route.ts` lazily and scores title/part/series/description/tags client-side; also reachable via "Search the blog" in the command palette through `/blog#search`); Plausible analytics (`components/analytics.tsx`, `lib/analytics.ts`), cookieless and inert until `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set, with a "Contact Submitted" event; RSS at `/blog/feed.xml` (chapters have no dates, so items carry none; permalink is the guid) with autodiscovery in the root layout; structured data via `components/seo/json-ld.tsx` (Article + BreadcrumbList on chapters, CreativeWork on projects, Blog on `/blog`) plus canonical URLs on home, blog, series, chapter and project pages; GitHub Actions CI (`.github/workflows/ci.yml`: typecheck then full production build, which renders every chapter so one bad MDX file fails CI, not production). Also fixed a real content bug: three LLD chapters named `interview-N-slug.mdx` (Part 9, Interview Rapid-Fire Review) did not match the `NN-slug.mdx` filename rule and were silently missing from the site (326 of 329 chapters loaded). `lib/blog.ts` now numbers them after the highest `NN-` chapter in their folder (59-61) and keeps the full stem as slug; all 329 now build. `next lint` is not configured (it prompts interactively), so CI runs typecheck and build only.

**Not started:**
- Real production domain — set `NEXT_PUBLIC_SITE_URL` once one exists
- `components/home/about.tsx`'s three fields (`currentlyBuilding`,
  `currentlyLearning`, `interestedIn`) are still `[Add ...]`
  placeholders — this is real personal content only the user can
  supply, deliberately not fabricated during the UX pass

## Locked decisions — do not re-litigate without explicit instruction

- **Stack**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Design tokens**: see DESIGN.md. One accent color only, no gradients or
  glows beyond a hairline border — except the small set of explicitly
  named, scoped exceptions documented in DESIGN.md's Colors section
  (ambient body gradient, Contact glow, per-project card tints, brand
  icon colors in Skills). Don't add another one without asking; don't
  treat the existing four as license to add more freely. Type scale is
  fixed (xs/sm/base/lg/xl/2xl/3xl in tailwind.config.ts) — never use
  arbitrary `text-[Npx]` values.
- **Content lives in `/data`**, never hardcoded inside components.
- **Never invent** project metrics, employers, features, or challenges.
  Where real information isn't available yet, use the `[Add ...]`
  placeholder convention already used throughout `/data/*.ts`.
- **Visual philosophy**: minimal but not empty — sections alternate
  bg/surface bands for rhythm, project cards carry real visual weight
  (architecture thumbnails or browser-frame placeholders, chosen per
  project via the `cardVisual` field), motion is deliberate and sparse
  (hero stat count-up, scroll-reveal on section entrances) rather than
  decorative.

## Real project facts — do not substitute or embellish

- **ecomProject**: github.com/imrahulkr/ecomProject — Java/Spring Boot
  backend, React frontend, PostgreSQL, Stripe/Razorpay. Multi-role
  (Customer/Seller/Admin) e-commerce platform.
- **SIDHANT**: sidhantdel.org — React + Node.js, deployed on Hostinger.
  Repo is private per the organization's requirement; only the live URL
  is linkable.
- **FluxGate**: github.com/imrahulkr/fluxgate — API gateway, Spring Boot +
  React, microservices (`smart-gateway-service`, `api-management-service`,
  `analytics-service`), Redis (caching + rate limiting), Kafka, MySQL +
  MongoDB (split not yet decided). Status: in progress, actively being
  coded. Marked with a "Currently building" badge — do not present as
  finished.

## Working agreement

The person building this project reviews and confirms design/content
decisions before implementation — don't assume silence means approval on
anything user-facing (copy, layout direction, new sections). Code-level
implementation details (e.g. how to structure a component) don't need the
same level of sign-off.
