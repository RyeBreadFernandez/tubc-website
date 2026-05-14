# TUBC Accessibility Plan

Last updated: 2026-05-14

Goal: move the site toward WCAG 2.2 AA, starting with the public pages that new members use most: Home, About, Trips, Trip Logs, Resources, Newsletter, and FAQ.

## Completed In This Pass

- Added descriptive alt text for the Home hero image, Home staff group image, About hero image, and About staff/alumni portraits.
- Added `imageAlt` support to the shared `PageHero` component so future hero images do not have to be unlabeled.
- Changed staff and alumni names from paragraph text to card headings.
- Darkened the shared terra/primary color so primary text, buttons, and links meet stronger contrast targets on parchment backgrounds.
- Improved difficulty badge contrast for Easy, Moderate, Strenuous, and Expert labels.
- Strengthened image hero text contrast by using darker overlays and fully opaque hero subtitle text.

## Priority 1: Blockers

- Add explicit alt text data for every trip-log cover image and gallery image, instead of relying on the trip title as the image description.
- Add rate limiting or bot protection to public trip-log submission so accessible forms do not become spam targets.
- Verify all keyboard flows on `/trip-logs/submit`, especially image upload, crop controls, difficulty selection, validation errors, and submit status.
- Make sure toast messages are mirrored by inline text or live regions anywhere an error or success state matters.

## Priority 2: Contrast And Focus

- Run an automated contrast scan across every route after content updates, then fix remaining `text-primary`, muted text, and translucent text states.
- Standardize visible focus styles for links, buttons, inputs, dropdown triggers, tabs, and custom controls.
- Avoid color-only status indicators. Pair colors with text, icons, or labels for status and difficulty.
- Review all hover-only interactions and make sure the same information is available by keyboard and touch.

## Priority 3: Semantics And Screen Readers

- Confirm every page has exactly one descriptive `h1`, followed by ordered section headings.
- Add accessible names to repeated controls such as "View", "Publish", "Unpublish", "Read more", and calendar links.
- Audit ARIA usage in navigation, accordions, tabs, dialogs, and custom controls. Prefer native HTML patterns when possible.
- Check page title and H1 quality because Next.js route announcements use them for screen reader navigation.

## Priority 4: Media And Content

- Build an image inventory with owner, source, description, privacy review status, and alt text for every public image.
- Keep decorative images empty-alt, but document that decision in nearby component props or image data.
- Avoid writing alt text that repeats adjacent headings. Describe the useful visual information that is not already in nearby text.
- Review staff names, roles, and bios with club owners each quarter so profile content remains current and respectful.

## Priority 5: Validation Workflow

- Add axe or Playwright accessibility checks for Home, About, Trips, Trip Logs, Trip Log Detail, Resources, Newsletter, FAQ, Login, and Submit Trip Log.
- Add a manual keyboard QA checklist before launch: skip link, nav, dropdowns, forms, calendar, cards, modals, and error recovery.
- Test with reduced motion enabled, high contrast mode where available, browser zoom at 200 percent, and mobile screen sizes.
- Re-run `npm run lint`, `npm run build`, and browser spot checks before merging accessibility branches.

## Definition Of Done

- Automated lint/build passes.
- No known WCAG AA contrast failures on primary public pages.
- All meaningful images have useful alt text or are intentionally decorative.
- All core flows work with keyboard only.
- Form errors and async states are visible, programmatic, and not toast-only.
- New image/content submissions include an alt-text review step before publishing.
