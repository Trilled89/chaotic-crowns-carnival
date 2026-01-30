## 2024-10-27 - Semantic Lists for Game State
**Learning:** Game interfaces often use generic divs for player lists, making it hard for screen reader users to know how many players are in the game or navigate between them efficiently. Active states indicated only by color or icons leave blind users in the dark.
**Action:** Always use `ul` and `li` for lists of entities (players, items, etc.) and ensure active states (like "Current Turn") have text alternatives (e.g., `sr-only` text), not just visual cues.
## 2024-05-22 - Three.js Optimization
**Learning:** Reusing Geometry and cloning Materials significantly improves instantiation performance (3x faster in this case) and reduces memory pressure compared to creating new instances in a loop.
**Action:** Applied this pattern in GameScene.tsx for hexagon grid creation.
