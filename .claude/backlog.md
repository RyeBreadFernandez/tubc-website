# TUBC Website — Improvement Backlog

_Last updated: 2026-05-05 by /improve_

---

## P1 — Critical (broken or unvisitable)

- [ ] **[/trip-logs] Runtime crash** — Supabase throws "URL and Key are required" in the worktree environment; page completely unvisitable. Env vars `SUPABASE_URL` / `SUPABASE_ANON_KEY` missing from some envs. | `app/trip-logs/page.tsx`
- [ ] **[/trips] Calendar always shows "coming soon"** — `GOOGLE_CALENDAR_API_KEY` not set → `/api/calendar` returns 503 → `CalendarEvents` shows unconfigured fallback to every visitor. | `components/CalendarEvents.tsx`, `app/api/calendar/route.ts`
- [ ] **[/trips] Google Calendar iframe blocked** — `net::ERR_ABORTED` on the monthly-view embed; renders as a blank void with zero fallback. | `app/trips/page.tsx`
- [ ] **[/gallery] Entire page is a placeholder** — "Photos coming soon" is the only content. Should be hidden from the nav until real content exists, or filled with real photos. | `app/gallery/page.tsx`
- [ ] **[/] Homepage trip logs section empty** — "Trip logs coming soon" is the second thing a visitor sees on the homepage. Publish at least one trip log or replace with a CTA. | `app/page.tsx`

---

## P2 — Important (significant UX or SEO impact)

- [ ] **[Global] PageHero alt text is always empty** — `alt=""` is hardcoded in the `PageHero` component, meaning every hero image on About, Trips, FAQ, Trip Logs has no alt text. | `components/ui/PageHero.tsx` line 16
- [ ] **[/about] Abigail Lynch missing photo** — no `imageUrl` in `data/staff.ts`; she renders a letter-initial fallback while all other staff have photos. | `data/staff.ts`
- [ ] **[/about] Staff bio inconsistency** — bios range from 2 words ("Handling the money") to full paragraphs to missing entirely (Kristi Tomlinson). The grid looks unfinished. | `data/staff.ts`
- [ ] **[/newsletter] No persuasive content** — a single form with "First issue dropping soon" is not a page. Needs at least a sample topic list, past issues, or an honest preview of what subscribers get. | `app/newsletter/page.tsx`
- [ ] **[/trips] "What's Coming Up" heading with no content** — heading appears above the fallback message; should be hidden when the API is not configured. | `app/trips/page.tsx`
- [ ] **[/about] Stat "1500+ Active members"** — needs verification; an inflated number undermines trust. | `app/about/page.tsx`
- [ ] **[/resources/*] Most sub-pages are unaudited stubs** — `trail-guides`, `how-to-pack`, `vocab`, `backcountry-cooking`, `first-aid`, `la-hiking`, `parks-monuments`, `entrance-fees` may have thin or placeholder content. Only `packing-list`, `gear-rental`, and `where-to-go` confirmed to have real content. | `app/resources/*/page.tsx`

---

## P3 — Nice to have (polish)

- [ ] **[/faq] No hero image** — opens with a plain text header while every other page has a landscape photo. | `app/faq/FAQClient.tsx`
- [ ] **[/newsletter] Minimal layout** — no hero, no visual hierarchy beyond the form. | `app/newsletter/page.tsx`
- [ ] **[/about] Hero image crops as a thin letterbox** — `about-hero.jpg` may be too short; check image dimensions or PageHero aspect ratio. | `public/about-hero.jpg`, `components/ui/PageHero.tsx`
- [ ] **[/resources/*] No breadcrumb on sub-pages** — back link says "← Resources" with no sub-section context; users landing directly have no orientation. | resource sub-page layouts
- [ ] **[/resources/where-to-go] No difficulty legend** — Easy / Moderate / Expert badges with no explanation of what they mean for a backpacking trip. | `app/resources/where-to-go/page.tsx`
- [ ] **[/resources/gear-rental] Pricing table overflows on mobile** — 9 columns with no horizontal scroll wrapper. | `app/resources/gear-rental/page.tsx`
- [ ] **[Global/Navbar] Transparent active state too subtle** — white underline on dark hero overlay is easy to miss. | `components/Navbar.tsx`
- [ ] **[Global/Footer] Duplicate newsletter form** — footer subscribe form and `/newsletter` page form with no indication they're the same list. | footer component

---

## Completed improvements (2026-05-05)

- [x] **SEO** — Twitter card metadata added to all 21 pages; title format standardized to `"Page | The Backpacking Club at UCLA"`; BreadcrumbList JSON-LD added to all inner pages; Organization JSON-LD added to homepage. | branch: `improve/seo-metadata`
- [x] **A11y** — Fixed 10 files: form labels, ARIA attributes, keyboard nav (Escape on dropdown, Enter/Space on drop zones), table scope attributes, decorative SVG `aria-hidden`, screen-reader-friendly link text, newsletter form wrapped in `<form>`. | branch: `improve/a11y-fixes`
- [x] **Content** — Rewrote staff bios, hero/CTA copy, about page, gallery stub, newsletter pitch, trip-log submit form, seminars descriptions, and where-to-go destination entries. | branch: `improve/content-refresh`
- [x] **Animations** — Scroll-reveal, hero stagger, button lift/glow/ripple, nav underlines, dropdown animation, card hover lift. | branch: `improve/seo-metadata-twitter-jsonld` → merged to main
