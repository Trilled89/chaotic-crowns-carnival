## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-27 - Disabled State != Hidden Info
**Learning:** Preventing selection of "disabled" or "claimed" items (like territories) hides critical context from users. A disabled action (Claim) shouldn't mean the object itself is uninspectable.
**Action:** Always allow inspection of disabled items so users can understand *why* it's unavailable (e.g., "Owner: Player 1").
