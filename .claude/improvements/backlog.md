# TUBC Improvement Backlog

_Last updated: 2026-04-28 — seeded from initial codebase audit_

## Critical — Site is broken or content is missing

- [ ] Gallery page is a stub with no content — needs photo grid using trip cover images from Supabase storage | file: app/gallery/page.tsx
- [ ] Newsletter page has no backend — form submissions go nowhere | file: app/newsletter/page.tsx
- [ ] Individual resource sub-pages are empty stubs (12 routes under /resources/*) — need actual backpacking content | file: app/resources/*/page.tsx

## High — Significant UX or SEO impact

- [ ] Staff photos: `imageUrl` field exists in `data/staff.ts` but is never rendered on the About page | file: app/about/page.tsx
- [ ] Trip log detail page — verify MDX content actually renders; page may be showing empty body | file: app/trip-logs/[slug]/page.tsx
- [ ] Add metadata (title, description, openGraph) to pages missing it: /gallery, /newsletter, /trips, /trip-logs, /resources and sub-pages | file: multiple app/**/page.tsx
- [ ] Trip logs listing needs filtering — no way to filter by difficulty, date, or location | file: app/trip-logs/page.tsx
- [ ] About page copy sounds AI-generated — needs authentic UCLA outdoor club voice | file: app/about/page.tsx

## Medium — Polish and maintenance

- [ ] Standardize toasts: remove `react-hot-toast`, use `sonner` everywhere | file: check all app/ and components/
- [ ] Migrate `@supabase/auth-helpers-nextjs` usages to `@supabase/ssr` (legacy package) | file: check all app/ and components/
- [ ] Add ARIA labels to Navbar: mobile sheet toggle, dropdown trigger, close button | file: components/Navbar.tsx
- [ ] Add skip-to-content link as first focusable element for keyboard users | file: app/layout.tsx
- [ ] Add `aria-current="page"` to active nav links | file: components/Navbar.tsx
- [ ] Add JSON-LD structured data: WebSite schema on homepage, Organization on About | file: app/page.tsx, app/about/page.tsx
- [ ] Add `loading="lazy"` to trip log card images (below the fold) | file: app/trip-logs/page.tsx
- [ ] FAQ answers feel too formal — rewrite to be more conversational | file: data/faq.ts

## Low — Nice to have

- [ ] Alt text audit: verify all `<Image>` components have descriptive alt text | file: all components
- [ ] TypeScript: add explicit return types to untyped Supabase query responses | file: app/trip-logs/page.tsx, app/dashboard/page.tsx
- [ ] Replace boilerplate README with actual project documentation | file: README.md
- [ ] Canonical URL: verify canonical points to www.tubcla.com consistently | file: app/layout.tsx
- [ ] Add keyboard focus styles (visible focus ring) to interactive elements that lack them | file: global CSS

## Completed

_Items moved here when done_
