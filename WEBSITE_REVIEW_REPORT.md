# TUBC Website Review Report

Date: 2026-05-10
Workspace: `/Users/ryanfernandez/TUBC-Website`

## Audit Coverage

- Read `AGENTS.md` and the local Next.js 16 docs for App Router pages/layouts, metadata, route handlers, accessibility, forms, images, robots, sitemap, and JSON-LD before implementation work.
- Reviewed all routes under `app/`, shared components, auth/server actions, Supabase helpers, sitemap/robots, metadata, public assets, and resource content.
- Ran `npm run lint`: passed.
- Ran `npm run build`: passed.
- Ran browser checks on `/`, `/about`, `/trips`, `/trip-logs`, `/resources`, `/gallery`, `/newsletter`, `/faq`, `/resources/gear-rental`, `/resources/entrance-fees`, and `/trip-logs/submit`: no console errors found.
- Ran `npm audit --omit=dev`: found 6 vulnerabilities, including high-severity advisories affecting `next@16.2.2`.

## Critical Issues

1. Public trip-log submission is abusable.
   - File: `app/api/submit-trip/route.ts`
   - The public POST route uses `SUPABASE_SERVICE_ROLE_KEY`, accepts untrusted form fields, has no server-side schema validation, no MIME/size limits, no rate limiting or spam guard, and accepts a client-provided `author_id`.
   - Impact: attackers can create arbitrary unpublished rows, upload storage objects, spoof authors, and consume storage/server resources.

2. Public staff/member images include camera and GPS metadata.
   - Files: multiple assets under `public/staff/` and `public/staff-group.jpg`.
   - Verified with macOS metadata tools. Examples with GPS metadata include `abigail-lynch.jpg`, `anna-stuart.jpg`, `ellie-sellman.jpg`, `kristi-tomlinson.jpg`, `maris-durant-bender.jpg`, `meg-houseworth.jpg`, `oscar-bowring.jpg`, `sloane-beeli.jpg`, and `katherine-chen.png`.
   - Impact: member photos expose location/device information that should not ship publicly.

## High Priority Issues

1. Officer publish/unpublish ignores database errors.
   - File: `app/dashboard/review/actions.ts`
   - The update result is not checked before revalidation.

2. Signup confirmation redirect trusts the request `Origin` header.
   - File: `app/auth/actions.ts`
   - This should use a canonical site URL instead of a request-controlled origin.

3. `npm audit --omit=dev` reports vulnerable dependencies.
   - Files: `package.json`, `package-lock.json`
   - Next should be updated to the patched line recommended by npm audit, then audit/build should be rerun.

4. Trip detail pages are incomplete.
   - File: `app/trip-logs/[slug]/page.tsx`
   - `photos` is hardcoded to `[]` and author is hardcoded to `A TUBC Member`; submitted/stored data is not fully represented.

5. Trip submission gives no trackable pending status.
   - Files: `app/trip-logs/submit/SubmitTripClient.tsx`, dashboard routes.
   - After submission, users are redirected to `/trip-logs`, where the unpublished submission is invisible.

6. Trips/events is not a real discovery workflow.
   - File: `app/trips/page.tsx`
   - It depends on a calendar embed/cards and Slack. There is no filterable list with difficulty, region, capacity/status, or signup state.

7. Newsletter is missing from the sitemap.
   - File: `app/sitemap.ts`

8. `/dashboard` redirect route is missing noindex metadata, and robots disallows `/dashboard/` but not `/dashboard`.
   - Files: `app/dashboard/page.tsx`, `app/robots.ts`

9. Root Open Graph metadata is incomplete.
   - File: `app/layout.tsx`
   - Root `openGraph` lacks `title` and `description`.

10. JSON-LD scripts do not escape `<`.
    - Files: many pages using `dangerouslySetInnerHTML`.
    - Dynamic trip data and FAQ data should use a shared safe JSON-LD serializer.

11. OG metadata declares `1200x630` while source images have different dimensions/aspects.
    - Files: multiple page metadata exports and public images.
    - Either create real 1200x630 OG crops or update metadata to match actual assets.

## Accessibility Issues

1. Primary/accent color contrast fails WCAG AA in common states.
   - Files: `app/globals.css`, `components/ui/button.tsx`, `components/NewsletterSignup.tsx`, and many pages.
   - `terra` on parchment and parchment text on terra are around 2.99:1.

2. The trip photo cropper is pointer-only.
   - File: `app/trip-logs/submit/SubmitTripClient.tsx`
   - Keyboard users cannot move or resize the crop area; missing cover/difficulty errors are toast-only.

3. Desktop Resources dropdown uses ARIA menu roles without menu keyboard behavior.
   - File: `components/Navbar.tsx`
   - Current behavior is a disclosure nav, not a full menu pattern.

4. Motion reduction is incomplete.
   - Files: `app/globals.css`, `components/Navbar.tsx`, `components/RouteProgressBar.tsx`, `components/SplashScreen.tsx`
   - Splash, progress, dropdown, pulse/bounce, hover movement, and custom smooth scroll still animate.

5. Calendar loading state is not announced, and calendar cards can render dead `href="#"` links.
   - File: `components/CalendarEvents.tsx`

6. Newsletter input ID is duplicated on `/newsletter`.
   - File: `components/NewsletterSignup.tsx`
   - The page-level signup and footer signup both render `id="newsletter-email"`.

7. Newsletter focus indicator is color-only/weak.
   - File: `components/NewsletterSignup.tsx`

8. Dashboard repeated controls have generic accessible names.
   - File: `app/dashboard/review/page.tsx`
   - Repeated "View", "Publish", and "Unpublish" controls should include the trip title.

9. Entrance-fee table headers are incomplete.
   - File: `app/resources/entrance-fees/page.tsx`
   - Header cells need scopes, and park names should be row headers.

## Content and IA Issues

1. Resource data is duplicated across the navbar, resources grid, and sitemap.
   - Files: `components/Navbar.tsx`, `app/resources/ResourcesClient.tsx`, `app/sitemap.ts`
   - This will drift.

2. Resource content includes time-sensitive rates/policies.
   - Files: `app/resources/entrance-fees/page.tsx`, `app/resources/gear-rental/page.tsx`
   - Fees/prices need dated "last verified" source links or should avoid exact stale numbers.

3. First-aid page contains high-stakes treatment guidance.
   - File: `app/resources/first-aid/page.tsx`
   - It should be framed as general education, point to formal training/emergency care, and avoid over-specific unsupported medical instructions.

4. Staff/about content needs a current-content pass.
   - File: `data/staff.ts`
   - Contains "Potential Treasurer", uneven bios, temporal language, and unused staff assets.

5. Gallery is a static five-photo array.
   - File: `app/gallery/page.tsx`
   - It should eventually connect to trip-log photos or curated media data.

6. Newsletter archive fetching is fragile.
   - Files: `lib/mailchimp.ts`, `app/newsletter/page.tsx`
   - It fetches account campaigns without audience scoping, no timeout, and force-dynamic/no-store behavior.

7. Deprecated/unused dependencies remain installed.
   - Files: `package.json`, `package-lock.json`
   - `@supabase/auth-helpers-nextjs` and `react-hot-toast` appear unused.

## Fix Prompt Sent To Worker Session

```text
You are working in /Users/ryanfernandez/TUBC-Website. Follow AGENTS.md exactly: read the relevant local Next.js 16 docs in node_modules/next/dist/docs before editing. You are not alone in the codebase; do not revert user changes or unrelated edits.

Goal: implement a focused, production-minded fix pass from the website audit. Prioritize concrete code/security/accessibility/SEO fixes that can be safely completed locally. Do not fake unavailable product integrations such as Slack notifications, CMS/gallery backends, or trip capacity systems. Leave clear TODO comments only when unavoidable.

Required fixes:
1. Harden public trip submission:
   - Add server-side validation in app/api/submit-trip/route.ts for title, location, trip_date, difficulty, optional miles/elevation_gain, content, and cover image.
   - Enforce allowed image MIME types and a reasonable max upload size.
   - Ignore any client-provided author_id unless a real authenticated user is available server-side.
   - Ensure uploaded cropped files use a `.jpg` filename/content type when the client exports JPEG.
   - Return clear, non-leaky errors.
2. Fix dashboard publish/unpublish data integrity:
   - Check Supabase update errors and affected row/result before revalidating.
   - Add item-specific aria labels for View/Publish/Unpublish controls.
3. Fix auth redirect safety:
   - Replace request Origin based signup emailRedirectTo with a canonical site URL env (`NEXT_PUBLIC_SITE_URL`) falling back to `https://www.uclabackpackingclub.com`, plus safeNextPath.
4. Fix accessibility issues:
   - Remove inappropriate `role="menu"`/`role="menuitem"` from the Resources dropdown or implement full keyboard behavior; choose the simpler disclosure-nav correction.
   - Improve NewsletterSignup by using unique IDs (`useId`), visible focus rings, better inline status/errors, and shadcn Input/Button if practical.
   - Add accessible loading status to CalendarEvents and render non-link cards when htmlLink is missing.
   - Add broader prefers-reduced-motion coverage and skip custom logo smooth-scroll when reduced motion is requested.
   - Add inline errors for missing difficulty/cover photo in SubmitTripClient, not toast-only.
   - Add scope/row headers to the entrance fees table.
5. Fix SEO/metadata basics:
   - Add `/newsletter` to sitemap.
   - Add noindex metadata to app/dashboard/page.tsx and ensure robots covers `/dashboard`.
   - Add root openGraph title/description.
   - Add a shared JSON-LD serializer helper that escapes `<`, then use it on pages with JSON-LD, especially dynamic trip log and FAQ data.
   - Improve obviously too-short/too-long metadata descriptions when changing nearby files.
6. Fix asset privacy:
   - Strip metadata from public JPG/PNG assets under public/staff and key public hero images, preserving visual quality and filenames.
7. Clean dependencies if safe:
   - Remove unused `@supabase/auth-helpers-nextjs` and `react-hot-toast`.
   - Run npm audit fix only if it keeps the app on a compatible Next 16 patched version and then verify build/lint.

Validation:
- Run `npm run lint`.
- Run `npm run build`.
- Run `npm audit --omit=dev` and report remaining vulnerabilities.
- If practical, open the local app and spot-check `/`, `/trips`, `/newsletter`, `/trip-logs/submit`, and `/resources/entrance-fees`.

Return:
- A concise summary of changed files.
- Validation results.
- Any important risks or audit items intentionally left for a later product/data pass.
```

## Implementation Results

The fix prompt above was run in a new worker session and then reviewed from the main session.

Implemented:
- Hardened `app/api/submit-trip/route.ts` with server-side field validation, image MIME and 8 MB size limits, safer upload errors, cleanup after failed inserts, server-derived `author_id`, and JPG naming for client-cropped uploads.
- Updated `app/trip-logs/submit/SubmitTripClient.tsx` with matching client-side file type/size checks, JPG crop filenames, and inline accessible errors for missing cover photo and difficulty.
- Fixed publish/unpublish integrity in `app/dashboard/review/actions.ts` by checking update results before revalidation and revalidating the individual trip route.
- Added item-specific accessible labels in `app/dashboard/review/page.tsx`.
- Replaced request-origin signup redirects in `app/auth/actions.ts` with `NEXT_PUBLIC_SITE_URL` or `https://www.uclabackpackingclub.com`.
- Removed incorrect ARIA menu roles from the desktop Resources dropdown in `components/Navbar.tsx` and skipped custom logo smooth-scroll for reduced-motion users.
- Improved `components/NewsletterSignup.tsx` with unique `useId()` input IDs, shadcn `Input`/`Button`, inline status/error messaging, and stronger focus rings.
- Improved `components/CalendarEvents.tsx` with an accessible loading status and non-link cards when an event has no Google Calendar link.
- Expanded reduced-motion coverage in `app/globals.css`.
- Added table scopes/row headers in `app/resources/entrance-fees/page.tsx`.
- Added `lib/json-ld.ts` and replaced JSON-LD raw `JSON.stringify` usage across routed pages with an escaping serializer.
- Added `/newsletter` to `app/sitemap.ts`.
- Added noindex metadata for `app/dashboard/page.tsx` and expanded `app/robots.ts` dashboard disallow rules.
- Added root Open Graph title/description in `app/layout.tsx`.
- Removed unused `@supabase/auth-helpers-nextjs` and `react-hot-toast`.
- Updated `next` and `eslint-config-next` from `16.2.2` to `16.2.6`.
- Stripped metadata from public staff photos and key hero images while preserving filenames.

Validation after implementation:
- `npm run lint`: passed.
- `npm run build`: passed.
- `npm audit --omit=dev`: 2 moderate Next/PostCSS-linked advisories remain. `npm audit fix --force` currently proposes a breaking downgrade to `next@9.3.3`, so it was not applied.
- Metadata check on previously GPS-tagged staff images now reports no camera make and no latitude/longitude.
- Built app browser spot checks passed for `/`, `/newsletter`, `/trip-logs/submit`, and `/resources/entrance-fees`; no console errors were detected.
- Newsletter page now renders two unique generated email input IDs.

Still needs a later product/data pass:
- Public trip submission is safer but still not fully abuse-proof without rate limiting, CAPTCHA, queue moderation policy, or auth requirements.
- No fake Slack notifications, CMS-backed gallery, trip capacity/sign-up workflow, or dynamic trip photo gallery was added.
- Staff roles/bios, current resource fee/rental facts, and first-aid content should be verified by club owners before publishing major content changes.
