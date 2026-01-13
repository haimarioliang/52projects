# Track Spec: MVP: Core Dashboard and Tracking

## Overview
This track focuses on delivering the core functionality of the 52 Projects Tracker. This includes setting up the Node.js server, SQLite database, and a vanilla JavaScript frontend to display and manage project progress across 52 weeks.

## User Stories
- As a user, I want to see a list of 52 weeks on a dashboard.
- As a user, I want to toggle project status (Not Started, In Progress, Done).
- As a user, I want to edit a project's title and description.
- As a user, I want my progress to be saved permanently in a local database.

## Technical Requirements
- **Frontend:** HTML/CSS/JS (Vanilla).
- **Backend:** Node.js with Express.
- **Database:** SQLite3.
- **API Endpoints:**
    - `GET /api/projects`: Fetch all 52 projects.
    - `PATCH /api/projects/:week`: Update status, title, or description for a specific week.

## Design Constraints
- **Theme:** Dark mode first.
- **Style:** Minimalist and functional.
- **Responsiveness:** Simple grid/list that works on desktop and mobile browsers.
