## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2026-02-06 - Description Lists for Game Stats
**Learning:** Using generic `div`s for key-value pairs (like game stats) disconnects the label from the value for screen readers. Users have to guess which value belongs to which label if they are just reading through content.
**Action:** Use `<dl>`, `<dt>`, and `<dd>` for statistical data or attributes. This programmatically associates the label (dt) with its value (dd), allowing screen readers to announce them as a group.
