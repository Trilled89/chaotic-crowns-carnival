## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-27 - Overlay Control and Decorative Icons
**Learning:** Overlays like "Territory Info" that lack explicit close buttons trap users who might want to dismiss the info without taking action. Decorative icons (like those used for stats) must be explicitly hidden (`aria-hidden="true"`) to avoid cluttering screen reader output with redundant information.
**Action:** Always include a dismiss action (close button) on overlays and audit icons next to descriptive text to ensure they are marked as decorative.
