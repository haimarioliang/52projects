# Implementation Plan - Dashboard Layout Refinement & Header Restoration

## Phase 1: Header Restoration [checkpoint: f815605]
- [x] Task: Write failing test to verify navigation links are visible in the header and the hamburger toggle is absent.
- [x] Task: Update `public/index.html` and `public/stats.html` to restore horizontal navigation links and remove the hamburger menu/overlay.
- [x] Task: Update `public/style.css` to implement the same-row flex layout for the title and navigation.
- [x] Task: Conductor - User Manual Verification 'Header Restoration' (Protocol in workflow.md)

## Phase 2: Dashboard Grid Refinement
- [ ] Task: Write failing test to verify 4-column grid layout for projects.
- [ ] Task: Update `public/style.css` to enforce a 4-column grid for `.quarter-content` on desktop and a 2-column fallback for mobile.
- [ ] Task: Update `public/script.js` (if necessary) to ensure the `quarter-content` divs are correctly styled as grids.
- [ ] Task: Conductor - User Manual Verification 'Dashboard Grid Refinement' (Protocol in workflow.md)
