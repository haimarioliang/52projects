# Initial Concept

simple 52 projects tracking app

# Product Guide: 52 Projects Tracker

## Target Audience
- **The Developer (Personal Use):** Designed specifically for the user to track their own progress through the "52 Projects in 52 Weeks" challenge.

## Core Value Proposition
- **Clarity & Accountability:** Provides a straightforward, visual way to see the status of all 52 projects at a glance, helping to maintain momentum throughout the year.
- **Project Documentation:** Serves as a central log for project titles and descriptions, creating a portfolio-like record of the journey.

## Key Features
- **Project Dashboard:** A clean list view displaying all 52 weeks.
- **Quarterly Organization:** Weeks are visually grouped into four quarters (Q1-Q4) for better long-term tracking.
- **Automated Date Ranges:** Each week automatically displays its corresponding date range, aligned to Monday-to-Monday cycles.
- **Status Tracking:** Simple toggles or indicators for each project's status (e.g., "Not Started", "In Progress", "Done").
- **Expanded Statuses:** Support for distinct statuses: "Not Started", "In Progress", "Done", "Failed", and "Skipped".
- **Flexible Tagging:** Ability to add multiple custom tags to each project for categorization.
- **Project Details:** Capability to click into a specific week/project to input and edit the project's title and description.
- **Stats Page:** A dedicated view featuring a 52-dot grid, organized into quarterly rows, to visualize yearly progress at a glance.

## Platform
- **Web Application:** Accessible via a web browser for easy access.

# Product Requirements

## Functional Requirements
- **Dashboard View:**
  - Display a list of 52 items representing each week.
  - Show the current status of each project clearly (e.g., color-coded icons).
  - Allow status toggling directly from the dashboard.
- **Project Details:**
  - Provide a detail view or modal for each week.
  - Allow editing of the project title.
  - Allow editing of the project description.
  - Save changes automatically or via a "Save" button.
- **Data Persistence:**
  - Store all project data (week number, title, description, status) in a SQLite database.
  - Ensure data persists across browser refreshes and server restarts.

## Non-Functional Requirements
- **Performance:** The app should load instantly and handle 52 records with no perceptible lag.
- **Usability:** The interface must be intuitive and distraction-free, adhering to the dark mode minimalist design.
- **Reliability:** Data must be saved reliably to the database to prevent loss of progress.
