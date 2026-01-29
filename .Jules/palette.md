## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-28 - Explicit Status vs Disabled States
**Learning:** Relying on a disabled button (e.g., "Territory Claimed") to convey ownership status is insufficient for accessibility and clarity. Screen reader users might not understand *why* it's disabled or *who* owns it. Decorative icons next to text can create noise if not hidden.
**Action:** Explicitly display status information (e.g., "Owner: Player 1") in text. Always apply `aria-hidden="true"` to decorative icons that accompany descriptive text.
