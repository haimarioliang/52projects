# Implementation Plan - Restore Global Notes & Hamburger Menu

## Phase 1: Data Persistence & API
- [x] Task: Create `global_notes` table in `db.js` with initial row seeding.
- [x] Task: Implement GET and PATCH endpoints for `/api/global-notes` in `app.js`.
- [~] Task: Write failing tests verifying the new API endpoints.
- [ ] Task: Conductor - User Manual Verification 'Data Persistence & API' (Protocol in workflow.md)

## Phase 2: Hamburger Navigation
- [ ] Task: Refactor header in `index.html` and `stats.html` to include the hamburger toggle and hidden nav overlay.
- [ ] Task: Update `style.css` to style the minimalist header, hamburger icon, and navigation overlay.
- [ ] Task: Implement JavaScript logic in `script.js` to handle the hamburger menu toggle.
- [ ] Task: Conductor - User Manual Verification 'Hamburger Navigation' (Protocol in workflow.md)

## Phase 3: Global Notes UI & Interaction
- [ ] Task: Add the "Dumb Ideas" modal structure to `index.html` and `stats.html`.
- [ ] Task: Update `style.css` to style the modal scratchpad (large textarea, minimalist borders).
- [ ] Task: Implement `fetchGlobalNotes` and `saveGlobalNotes` (with auto-save debounce) logic in `script.js`.
- [ ] Task: Link the "Dumb Ideas" menu item to open the modal.
- [ ] Task: Conductor - User Manual Verification 'Global Notes UI & Interaction' (Protocol in workflow.md)
