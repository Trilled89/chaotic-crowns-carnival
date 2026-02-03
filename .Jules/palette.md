## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-28 - Description Lists for Data Display
**Learning:** Using `div`s for key-value pairs (like stats) creates a poor experience for screen readers. Description Lists (`<dl>`, `<dt>`, `<dd>`) provide semantic relationships between the label and the value.
**Action:** When displaying attributes or statistics (e.g., Territory Power, Resources), use a Description List structure. Ensure icons used for decoration are hidden (`aria-hidden="true"`).
