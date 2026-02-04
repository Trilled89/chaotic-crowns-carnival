## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.

## 2024-10-27 - Three.js Canvas Sizing in Flex Layouts
**Learning:** Three.js canvases within flex containers (specifically `flex-1`) may collapse to zero height if the parent container does not have an explicit height (e.g., `h-full`), especially in headless environments like Playwright.
**Action:** Ensure wrapper divs around `GameScene` or similar canvas components have `h-full` when placed inside `flex-1` containers.
