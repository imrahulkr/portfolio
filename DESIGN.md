# Design system — locked

Single source of truth. Tokens live as CSS variables in `app/globals.css`,
wired into `tailwind.config.ts`. Use these classes, not arbitrary values.

## Theme
Default: system preference (`next-themes`). Manual toggle in navbar.

## Colors
| Token | Light | Dark |
|---|---|---|
| bg | #FBFBF9 | #0B0D0F |
| surface | #ECEAE2 | #1B1F24 |
| text | #1A1D1F | #EDEEF0 |
| text-soft | #5B6168 | #9BA0A6 |
| border | #D9D6CC | #2C2F35 |
| accent | #375D81 | #6E9BC2 |
| error | #9A4A3F | #D18579 |

`surface`/`border` were widened from `bg` on 2026-09-14 in both themes —
the original values were too close to `bg` to read as section rhythm on a
real scroll; both themes read as one flat field instead of alternating
bands.

One accent color only, plus a single semantic `error` token (form/validation
messages only — never used as a second decorative accent), with the
following explicit, requested exceptions (all added 2026-09-14, all scoped
to one spot each — don't extend any of them further without asking):

- **Ambient background gradient** — two low-opacity radial blobs in
  `--accent-rgb`, fixed to the viewport, defined once in `body` in
  `globals.css`. Sections with an explicit `bg-surface`/`bg-bg` class paint
  over it, so it only shows through the transparent sections — alternating
  band rhythm stays intact. This is the *only* gradient on the page — a
  separate Contact-section glow was tried and then explicitly reverted the
  same day so every section stays in sync with this one shared background
  rather than each section getting its own variant.
- **Per-project card tint** — each project in `data/projects.ts` has a
  `cardTint: { light, dark }` used only on that project's own featured-card
  visual panel (`.project-tint` in `globals.css`), muted/desaturated to
  match the accent's saturation level, not saturated brand colors. Not used
  anywhere else on a card (borders, text, buttons stay as before).
- **Real brand-colored tech icons in Skills** — `data/skill-icons.ts` maps
  skill labels to real Simple Icons/Devicons logos with their real brand
  hex, via the `react-icons` package. Only technologies with a verified
  real icon *and* a color that's legible in both themes get one; ambiguous
  near-black logos (GitHub, IntelliJ IDEA, JWT) inherit the surrounding
  text color instead of guessing; skills with no real logo (concepts,
  tools absent from both icon sets) stay plain text — never invent an icon
  or color for something that doesn't have a real one.

Otherwise: no gradients, glows, or shadows on UI elements beyond a hairline
border, and no further second-accent usage beyond the three exceptions above.

## Type scale (Tailwind keys — always use these, never text-[Npx])
xs 13px · sm 14px · base 16px · lg 19px · xl 26px · 2xl 34px · 3xl 46px · 4xl 58px

(Enlarged 2026-09-21 — the original scale read as small/cramped for a
portfolio site; `4xl` was added for the large centered section headings
introduced the same day via `components/ui/section-heading.tsx`, reused by
About/Experience/Skills/Featured-projects/Contact.)

Headings: Public Sans (500/600) — `font-heading`
Body: Source Sans 3 (400/500) — `font-body` (default)
Code: JetBrains Mono — `font-mono`

## Layout principles
- Minimal but not empty: alternating surface/bg bands give visible section
  rhythm; hero and project cards carry real visual weight (stat panel,
  architecture thumbnails / browser-frame placeholders), not just text.
- One deliberate motion moment (hero stat count-up) plus scroll-reveal on
  section entrances — not decoration everywhere.
- Project card visuals are chosen per project: `cardVisual: "architecture"`
  for services-based projects, `"browser-frame"` for consumer-facing sites.

## Do not
- Add a second accent color.
- Add a gradient or glow to any UI element (button, card, badge, input) —
  the one ambient background gradient on `body` is the sole exception,
  don't extend the pattern per-component.
- Fabricate project metrics, results, challenges, or employers — use the
  `[Add ...]` placeholder convention in `data/*.ts` instead.
