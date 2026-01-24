## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-28 - Explicit State vs. Disabled Buttons
**Learning:** Relying solely on a disabled button state (e.g., "Territory Claimed") to convey ownership status is insufficient for both UX and accessibility. Users need to know *who* owns it, not just that it's unavailable.
**Action:** Always provide explicit status text (e.g., "Owned by: Player 1") alongside action buttons, especially when the button is disabled.
