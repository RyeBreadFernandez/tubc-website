# /improve — Master Improvement Orchestrator

Dispatch the full TUBC improvement team as parallel subagents, each focused on a different domain. Run this to kick off a comprehensive improvement pass across the entire site.

## What This Does

Fans out 4 worker agents simultaneously using worktree isolation, then validates the result.

## Steps

1. **Dispatch all workers in parallel as subagents** (use the `Agent` tool with `isolation: "worktree"` for each):

   - **ux-auditor** — Screenshots every public page and appends visual findings to the backlog
   - **seo-specialist** — Audits all `page.tsx` files for missing metadata and implements what's missing
   - **a11y-guardian** — Reviews all components for accessibility violations and fixes them
   - **content-refresher** — Finds placeholder/generic content and rewrites it with authentic voice

2. **After all workers complete**, verify each agent's branch has a descriptive name. Each agent should have renamed its own branch, but if any still have the auto-generated `worktree-agent-*` name, rename them:
   ```bash
   git branch -m worktree-agent-<id> improve/<what-it-did>
   ```
   Then run the build-validator agent to confirm the codebase is clean.

3. **Report a summary** in this format:
   ```
   ## /improve Results

   ### ux-auditor (Quinn)
   [What was found and added to backlog]

   ### seo-specialist (Morgan)
   [Which pages got metadata / what was added]

   ### a11y-guardian (Jordan)
   [Which accessibility fixes were applied]

   ### content-refresher (Alex)
   [Which pages got content rewrites]

   ### Build Status
   [PASS / FAIL with details]

   ### Next Steps
   Run /daily-ship to pick up the highest-priority backlog items.
   ```

## Usage

```
/improve
```

For a lighter pass (audit only, no code changes):
```
/site-audit
```

To see the current backlog:
```
/backlog
```
