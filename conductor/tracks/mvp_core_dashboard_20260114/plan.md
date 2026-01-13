# Track Plan: MVP: Core Dashboard and Tracking

## Phase 1: Foundation and Backend Setup [checkpoint: 77afbd3]
- [x] Task: Initialize Node.js project and install dependencies (express, sqlite3, cors) c3dd8ef
- [x] Task: Set up SQLite database schema (projects table with week, title, description, status) 25a7a50
- [x] Task: Implement `GET /api/projects` endpoint to retrieve all weeks (initializing 52 records if empty) af8c067
- [x] Task: Implement `PATCH /api/projects/:week` endpoint to update project data 20be66d
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation and Backend Setup' (Protocol in workflow.md)

## Phase 2: Frontend Scaffolding and Dashboard
- [x] Task: Create basic HTML structure and CSS for dark mode minimalist theme 6b9435b
- [ ] Task: Implement JavaScript to fetch and display the list of 52 weeks from the API
- [ ] Task: Implement status toggle functionality on the dashboard with immediate UI feedback
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Frontend Scaffolding and Dashboard' (Protocol in workflow.md)

## Phase 3: Project Details and Refinement
- [ ] Task: Implement a modal or inline editor for project title and description
- [ ] Task: Integrate the editor with the `PATCH` API endpoint
- [ ] Task: Final styling polish and responsiveness check
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Project Details and Refinement' (Protocol in workflow.md)
