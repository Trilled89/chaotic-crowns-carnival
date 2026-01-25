## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2026-01-25 - Explicit Ownership State
**Learning:** Relying solely on disabled button states or color coding to convey ownership in territory games excludes colorblind and screen reader users. Explicit text labels (e.g., "Owner: Player 1") are essential for clarity and accessibility.
**Action:** Always include a text-based status row for ownership or critical state, reducing reliance on purely visual indicators.
