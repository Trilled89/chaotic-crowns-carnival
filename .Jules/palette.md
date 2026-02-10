## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-27 - Explicit Status Text
**Learning:** Relying solely on disabled states (like a grayed-out "Territory Claimed" button) forces users to guess *why* an action is unavailable. Screen readers might just say "dimmed" or "unavailable" without context.
**Action:** Always provide explicit status text (e.g., "Owned by Player 1") in disabled buttons or adjacent text to explain the state.
