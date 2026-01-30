## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-05-21 - Explicit State Over Inference
**Learning:** Relying on disabled button states (e.g., "Territory Claimed") to convey ownership information is poor UX. Users shouldn't have to infer *why* an action is disabled; the state (who owns it) should be explicitly displayed.
**Action:** Always display the underlying status (e.g., "Owner: Player 1") in a dedicated field, keeping the action button strictly for the action itself.
