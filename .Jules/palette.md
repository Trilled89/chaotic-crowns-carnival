## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-28 - Canvas Verification & Data Lists
**Learning:** In headless Playwright environments, Three.js canvases inside flexbox containers may render with 0 height due to timing issues, requiring explicit window resize events or style overrides to be testable. Also, dense property lists (like game stats) benefit significantly from `<dl>/<dt>/<dd>` structure over generic divs for screen reader association.
**Action:** Use `window.dispatchEvent(new Event('resize'))` in verification scripts for canvas apps, and refactor property grids to Description Lists for better semantics.
