# /backlog — View and Manage the Improvement Backlog

Display the current improvement backlog with priority indicators and completion stats.

## Steps

1. **Read the backlog file:**
   ```
   cat .claude/improvements/backlog.md
   ```

2. **Print it formatted** with this summary header:
   ```
   ## TUBC Improvement Backlog
   Last updated: [date from file]

   Progress: X/Y items complete ([percentage]%)
   Critical: X remaining | High: X remaining | Medium: X remaining | Low: X remaining
   ```

3. **Then print all items** grouped by priority tier, with clear visual separation.

4. **Recommended next action**: Suggest the single best item to tackle next and which agent should handle it.

## Updating the Backlog

To add a new item:
```
Add to backlog: [item description] | priority: [Critical/High/Medium/Low] | file: [path]
```

To refresh the backlog from a fresh codebase scan:
```
/site-audit
```

To implement the top items:
```
/daily-ship
```
