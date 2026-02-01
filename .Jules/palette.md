## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2026-02-01 - Semantic Description Lists for Stats
**Learning:** Game dashboards frequently display key-value statistics (like Power: 50) using generic divs. This breaks the semantic relationship between the label and the value for screen reader users, making the data harder to interpret.
**Action:** Use Description Lists (`<dl>`, `<dt>`, `<dd>`) for all key-value data displays. Wrap pairs in a `div` if flexbox styling is needed, and ensure purely decorative icons are hidden with `aria-hidden="true"`.
