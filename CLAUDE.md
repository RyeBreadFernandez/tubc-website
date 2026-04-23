@AGENTS.md

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

## Verification
After making changes, always run:
```
npm run build
```
If the build passes, the change is safe. TypeScript errors and import issues surface here.
