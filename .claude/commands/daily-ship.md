# /daily-ship — Pick and Ship Backlog Items

Pick the 1-2 highest-priority uncompleted items from the backlog, implement them, validate, and commit. This is the core autonomous improvement loop.

## What This Does

Reads the backlog, selects the best items to tackle right now, dispatches feature-dev as a subagent in worktree isolation to implement them, validates with build-validator, and commits the result.

## Steps

1. **Read the backlog:**
   ```
   cat .claude/improvements/backlog.md
   ```

2. **Select 1-2 items** using this decision logic:
   - Pick from Critical tier first, then High, then Medium
   - Skip items that are already marked `[x]` (done) or `[~]` (in progress)
   - Prefer items with a specific file path noted — these are more actionable
   - Skip items that require visual testing (ux-auditor items) or are content-only (content-refresher items) — those agents handle their own domains
   - If the backlog is empty or all items are complete, run pm-agent to refresh it first

3. **Dispatch feature-dev as a subagent** (with `isolation: "worktree"`) to implement the selected items.
   - Pass the selected items explicitly in the prompt so the agent knows exactly what to build
   - The agent should run `npm run build && npm run lint` before finishing and fix any errors

4. **After feature-dev completes**, run build-validator to confirm the build is clean.

5. **Mark items done in backlog** — change `[ ]` to `[x]` and move to Completed section.

6. **Commit** if not already committed by the agent:
   ```bash
   git add -A
   git commit -m "feat: [description of what was shipped]"
   ```

7. **Report** what was shipped and what's next in the backlog.

## Usage

One-shot:
```
/daily-ship
```

Autonomous loop (ships improvements every hour):
```
/loop 1h /daily-ship
```

## Safeguards

- Never ship if the build fails — revert and report
- Never modify Critical security-related items without explicit user approval
- If an item turns out to be more complex than expected, add it back to the backlog with a `[~]` marker and pick a simpler item instead
