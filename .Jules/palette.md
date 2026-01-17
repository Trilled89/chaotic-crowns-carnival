# Palette's Journal

## 2024-05-22 - Accessible Names vs Visible Text
**Learning:** Adding an `aria-label` to a button overrides its visible text for accessible name calculation. This caused Playwright's `get_by_role("button", name="Text")` to fail because it matches against the accessible name (the `aria-label`), not the inner text.
**Action:** When adding `aria-label` for better context (e.g., "Claim this territory" vs "Claim Territory"), update tests to query by the new accessible name to verify the a11y enhancement works.
