## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-27 - Semantic Description Lists for Key-Value Data
**Learning:** Stats and attributes (like "Power: 50") are often coded as generic divs, but screen readers treat them better as Description Lists, providing context between the label and the value.
**Action:** Use `<dl>`, `<dt>`, and `<dd>` for any key-value pair displays in UI cards or sidebars.
