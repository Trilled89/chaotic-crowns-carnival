## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2026-01-27 - Explicit Status over Disabled States
**Learning:** Relying on disabled button text (e.g., "Territory Claimed") to convey state (ownership) is insufficient because it conflates "action availability" with "status information." Users may miss the *why* (who owns it?) if it's buried in a disabled button label.
**Action:** Always separate status information (e.g., "Owned by Player 1") from action elements. Use explicit text with appropriate iconography to communicate state clearly, keeping the action button focused solely on the action (or lack thereof).
