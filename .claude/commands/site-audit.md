# /site-audit — Full Site Audit

Run the PM agent and UX auditor in parallel to get a fresh read on the site's current state. This is a read-mostly pass that updates the backlog — it doesn't implement changes.

## What This Does

Two agents work simultaneously:
- **pm-agent (Sydney)** — Scans the codebase for gaps and rewrites the prioritized backlog
- **ux-auditor (Quinn)** — Visits the live site, screenshots every page, flags visual/UX issues

Together they give you both a code-level and a user-level perspective.

## Steps

1. **Confirm localhost:3000 is running.** The ux-auditor needs the dev server. If it's not up, run `npm run dev` first.

2. **Dispatch pm-agent and ux-auditor in parallel as subagents.**
   - pm-agent: reads `app/` and `components/`, rewrites `.claude/improvements/backlog.md`
   - ux-auditor: visits every public route, appends visual findings to the backlog

3. **After both complete**, print the full contents of `.claude/improvements/backlog.md`.

4. **Recommend the top 3 items** to tackle next based on priority and effort.

## Usage

```
/site-audit
```

Run this:
- At the start of a new work session to reprioritize
- After a big feature launch to catch regressions
- On a schedule: `/loop 6h /site-audit` keeps the backlog fresh

## After the Audit

To implement the highest-priority items:
```
/daily-ship
```

To run a full parallel implementation pass:
```
/improve
```
