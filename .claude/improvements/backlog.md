# TUBC Improvement Backlog

_Last updated: 2026-04-28 — Quinn (UX audit) findings added_

## Critical — Site is broken or content is missing

- [ ] Gallery page is a stub with no content — needs photo grid using trip cover images from Supabase storage | file: app/gallery/page.tsx
- [x] Newsletter page wired up — POST /api/newsletter, controlled input, sonner toasts — done by Casey
- [ ] Individual resource sub-pages are empty stubs (12 routes under /resources/*) — need actual backpacking content | file: app/resources/*/page.tsx
- [x] **[Quinn]** /trips hero subtitle replaced with real UX copy — done by Casey
- [ ] **[Quinn]** /trips Google Calendar iframe renders as a blank white void — large dead space on the page, likely blocked by X-Frame-Options | file: app/trips/page.tsx
- [x] **[Quinn]** /newsletter Subscribe button wired — done by Casey
- [ ] **[Quinn — SEO]** Canonical domain is split: some pages may use inconsistent hostnames — consolidate everything to `uclabackpackingclub.com` | file: app/layout.tsx

## High — Significant UX or SEO impact

- [ ] Staff photos: `imageUrl` field exists in `data/staff.ts` but is never rendered on the About page | file: app/about/page.tsx
- [ ] Trip log detail page — verify MDX content actually renders; page may be showing empty body | file: app/trip-logs/[slug]/page.tsx
- [x] Add metadata (title, description, openGraph) to pages missing it — done by Morgan (SEO) | file: multiple app/**/page.tsx
- [ ] Trip logs listing needs filtering — no way to filter by difficulty, date, or location | file: app/trip-logs/page.tsx
- [x] About page copy sounds AI-generated — rewritten by Alex (content) | file: app/about/page.tsx
- [ ] **[Quinn]** /about shows only 3 staff members with letter-initial placeholder avatars — looks like a template, not a real club | file: data/staff.ts, app/about/page.tsx
- [ ] **[Quinn]** Hero images (cottonwood-lakes.jpg, about-hero.jpg, trip-logs-hero.jpg) are 3456×3456px originals — LCP is slow, first paint shows dark overlay with no visible photo | file: public/*.jpg
- [ ] **[Quinn]** / "Latest Trip Logs" shows empty-state placeholder to every visitor because DB has no published logs — section should be hidden or replaced with a real CTA when empty | file: app/page.tsx

## Medium — Polish and maintenance

- [ ] Standardize toasts: remove `react-hot-toast`, use `sonner` everywhere | file: check all app/ and components/
- [ ] Migrate `@supabase/auth-helpers-nextjs` usages to `@supabase/ssr` (legacy package) | file: check all app/ and components/
- [ ] Add ARIA labels to Navbar: mobile sheet toggle, dropdown trigger, close button | file: components/Navbar.tsx
- [ ] Add skip-to-content link as first focusable element for keyboard users | file: app/layout.tsx
- [ ] Add `aria-current="page"` to active nav links | file: components/Navbar.tsx
- [x] Add JSON-LD structured data: WebSite schema on homepage, Organization on About — done by Morgan (SEO) | file: app/page.tsx, app/about/page.tsx
- [ ] Add `loading="lazy"` to trip log card images (below the fold) | file: app/trip-logs/page.tsx
- [x] FAQ answers feel too formal — rewritten by Alex (content) | file: data/faq.ts
- [ ] **[Quinn]** CalendarEvents skeleton loading state shows gray blocks with no explanation — users can't tell if the page is broken or loading | file: components/CalendarEvents.tsx
- [ ] **[Quinn]** /newsletter has redundant copy: "Quarterly Dispatches" eyebrow + "delivered four times a year" body say the same thing | file: app/newsletter/page.tsx

## Low — Nice to have

- [ ] Alt text audit: verify all `<Image>` components have descriptive alt text | file: all components
- [ ] TypeScript: add explicit return types to untyped Supabase query responses | file: app/trip-logs/page.tsx, app/dashboard/page.tsx
- [ ] Replace boilerplate README with actual project documentation | file: README.md
- [ ] Canonical URL: verify canonical points to uclabackpackingclub.com consistently | file: app/layout.tsx
- [ ] Add keyboard focus styles (visible focus ring) to interactive elements that lack them | file: global CSS
- [ ] **[Quinn]** /resources sub-page destination cards (JMT, Yosemite, etc.) are display-only with no link — if intentional, fine; otherwise add links | file: app/resources/*/page.tsx

## Completed

_Items moved here when done_
