# Track Plan: Enhanced Organization and Tracking

## Phase 1: Database and Backend Updates [checkpoint: 35ba07b]
- [x] Task: Update database schema to include 'tags' column c13d0a1
    - [ ] Write Tests: Verify `projects` table can store and retrieve tags
    - [ ] Implement: Update `db.js` schema and migration logic
- [x] Task: Update API to support new statuses and tags 95c0efd
    - [ ] Write Tests: Verify `PATCH` and `GET` handle `Done (No Ship)`, `Failed`, and tags
    - [ ] Implement: Update `app.js` validation and logic
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Database and Backend Updates' (Protocol in workflow.md)

## Phase 2: Core Logic and Utility Updates [checkpoint: bfa89ac]
- [x] Task: Implement week date calculation utility 6db545e
    - [ ] Write Tests: Verify correct date ranges for various weeks and leap years
    - [ ] Implement: Create `public/utils.js` (or add to `script.js`) with date logic
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Logic and Utility Updates' (Protocol in workflow.md)

## Phase 3: Frontend UI Enhancements
- [ ] Task: Implement Quarterly Dividers in Dashboard
    - [ ] Write Tests: Verify dividers appear at weeks 1, 14, 27, and 40
    - [ ] Implement: Update `renderProjects` in `script.js` and add styles to `style.css`
- [ ] Task: Update Project Cards with dates and tags
    - [ ] Write Tests: Verify date ranges and tag badges render correctly on cards
    - [ ] Implement: Update HTML generation in `renderProjects`
- [ ] Task: Enhance Edit Modal with Tag Input and New Statuses
    - [ ] Write Tests: Verify new status options are selectable and tags can be added
    - [ ] Implement: Update modal HTML and `saveProject` logic in `script.js`
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Frontend UI Enhancements' (Protocol in workflow.md)
