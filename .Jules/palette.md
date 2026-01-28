## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2025-01-28 - Explicit Status vs. Action State
**Learning:** Relying on disabled button text (e.g., "Territory Claimed") to convey state (Ownership) forces users to hunt for information. Explicitly listing status details (like "Owner: Player 1") alongside other attributes makes the state scannable and accessible.
**Action:** When an action is disabled due to a state change (like being claimed), ensure the *reason* or the *resultant state* is displayed as a dedicated information field, not just as button text.
