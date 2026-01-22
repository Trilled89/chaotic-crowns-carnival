## 2026-01-22 - Semantic Lists for Player Rosters
**Learning:** Using `div` soup for list-like structures (like player rosters) deprives screen reader users of "List item X of Y" context. Visual cues like icons/colors for active state are invisible to them.
**Action:** Always use `ul`/`li` for collection data. Combine visual indicators (icons) with `aria-hidden="true"` and pair them with `sr-only` text (e.g., "Current Player:") to ensure status is conveyed to all users.
