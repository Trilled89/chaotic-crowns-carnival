## 2024-05-23 - Player List Semantics
**Learning:** Using semantic `<ul>` and `<li>` with `aria-current` for player lists provides significantly better context for screen readers than nested `<div>`s, especially for turn-based games where knowing the "current" item is crucial.
**Action:** Always refactor list-based UI components (leaderboards, inventories, player lists) to use semantic list elements and appropriate ARIA attributes for active states.
