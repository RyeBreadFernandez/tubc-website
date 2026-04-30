@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# TUBC Website — Claude Instructions

## Stack
- **Framework**: Next.js 16 (App Router) with React 19
- **Styling**: Tailwind CSS v4 + shadcn/ui (CSS-variable based, no tailwind.config.js)
- **Database**: Supabase (postgres + RLS + auth)
- **Language**: TypeScript

## Design System — Color Tokens
Always use semantic token names, never raw hex or oklch values in components.

| Token | Semantic name | Use |
|---|---|---|
| `bg-background` | parchment | page backgrounds |
| `bg-secondary` | sand | card/section fills |
| `bg-muted` | moss | subtle fills |
| `bg-accent` | sage | highlights, tags |
| `text-foreground` | bark | body text |
| `text-muted-foreground` | soil | secondary/caption text |
| `bg-primary` / `text-primary` | terra | CTAs, links, active states |
| `border-border` | warm border | dividers, input borders |

Dark mode variant is `.dark *` — use `dark:` prefix. No arbitrary color values.

## File & Routing Conventions
- All pages live in `app/` using the App Router — no `pages/` directory
- Server components by default; add `"use client"` only when you need browser APIs or hooks
- API routes live in `app/api/`
- Shared UI components in `components/ui/` (shadcn primitives)
- Feature-level components in `components/` (e.g. `Navbar.tsx`, `CalendarEvents.tsx`)
- Read `node_modules/next/dist/docs/` before writing any Next.js-specific code

## Supabase Conventions
- Client-side: use `@supabase/ssr` createBrowserClient
- Server-side: use `@supabase/ssr` createServerClient with cookie store
- Never use `@supabase/auth-helpers-nextjs` for new code (legacy)
- RLS is enabled — anonymous writes route through `app/api/` server actions to use the service role key
- Service role key is in `SUPABASE_SERVICE_ROLE_KEY` — never expose it client-side

## Component Patterns
- Use shadcn primitives from `components/ui/` before writing custom UI
- `cn()` utility (clsx + tailwind-merge) for conditional classNames
- Forms use `react-hook-form`
- Toasts use `sonner` (not react-hot-toast for new code)
- Icons from `lucide-react` or `@heroicons/react`

## TypeScript
- Strict mode — no `any` unless absolutely unavoidable
- Prefer `interface` for component props, `type` for unions/aliases
- No implicit `any` from untyped Supabase queries — type the response

## What NOT to Do
- Don't add `tailwind.config.js` — this project uses Tailwind v4 CSS-first config
- Don't use `pages/` directory — App Router only
- Don't use `getServerSideProps` or `getStaticProps` — use React Server Components
- Don't hardcode color values — always use the token system above
- Don't bypass RLS from the client — route writes through API routes
- Don't use `@supabase/auth-helpers-nextjs` for new code

## Git Branch Naming
All branches **must** have a descriptive name that explains what the branch does. Random or generated names are not acceptable.

Use the format `type/short-description`:
- `feat/public-trip-submission`
- `fix/trip-log-date-parsing`
- `improve/seo-metadata`
- `chore/remove-stale-branches`

Never use auto-generated names like `claude/nice-pare-55ef84`.

## Commands
```bash
npm run dev      # start dev server at localhost:3000
npm run build    # type-check + build (run after every change)
npm run lint     # ESLint — auto-runs via PostToolUse hook on .ts/.tsx edits
```

## Architecture

### Supabase client files
Three files in `utils/supabase/` — use the right one for context:
- `client.ts` — browser client (`createBrowserClient`), for `"use client"` components
- `server.ts` — server client (`createServerClient` + cookie store), for Server Components and API routes
- `middleware.ts` — session refresh, used by `middleware.ts` at repo root

### Auth
There is no public login/signup flow. The `/login`, `/signup`, and `/auth` routes have been removed. The Navbar has no auth state.

### Trip logs
Stored in the `trip_logs` Supabase table with a `slug` field and `published` boolean. The public submission form is at `/trip-logs/submit` and posts to `app/api/submit-trip/route.ts`, which uses the service role key to bypass RLS and insert rows + upload cover images to Supabase Storage. The officer review page is at `/dashboard/review` — publish/unpublish actions also use the service role key.

### Calendar
`app/api/calendar/route.ts` fetches upcoming events from the Google Calendar API (calendar ID: `uclabackpackingclub@gmail.com`) using `GOOGLE_CALENDAR_API_KEY`. The `CalendarEvents` component calls this route client-side.

### Utilities
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `lib/utils/placeholder.ts` — `getMountainPlaceholder()` for trip log cover image fallbacks

## Verification
After making changes, always run:
```
npm run build
```
If the build passes, the change is safe. TypeScript errors and import issues surface here.
