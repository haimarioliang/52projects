# Track Spec: Enhanced Organization and Tracking

## Overview
This track aims to improve the organization and descriptive power of the 52 Projects Tracker by adding automatic date ranges to weeks, implementing a flexible tagging system, expanding project status options, and visually grouping weeks into quarters.

## Functional Requirements
- **Automated Date Ranges:**
  - Each week in the dashboard will display its corresponding date range (e.g., "Week 1: Jan 1 - Jan 7").
  - Dates are calculated automatically based on the current calendar year.
- **Tagging System:**
  - Users can add multiple tags to a project via the edit modal.
  - New tags can be created on the fly by typing them into an input field.
  - Tags will be displayed as small badges on the project cards in the dashboard.
- **Expanded Status Options:**
  - Two new statuses will be added: `Done (No Ship)` and `Failed`.
  - These statuses will have unique visual styles (colors) consistent with the dark mode theme.
- **Quarterly Visual Dividers:**
  - The dashboard list will be organized into four quarters:
    - Q1: Weeks 1-13
    - Q2: Weeks 14-26
    - Q3: Weeks 27-39
    - Q4: Weeks 40-52
  - Clear visual headers or dividers will separate these quarters in the grid/list view.

## Technical Changes
- **Database Schema:** Update the `projects` table to support a `tags` column (likely as a comma-separated string or a JSON-like text field for simplicity in this stack).
- **Backend:** Update API handlers to store and retrieve the new status values and tags.
- **Frontend:**
  - Update `script.js` with a utility to calculate week dates.
  - Modify the `renderProjects` function to insert quarterly dividers and display dates/tags.
  - Enhance the edit modal with a tag input field.

## Design Constraints
- **Minimalism:** Ensure the addition of dates, tags, and dividers doesn't clutter the clean dark mode aesthetic.
- **Color Palette:** Select appropriate colors for `Done (No Ship)` (e.g., orange/amber) and `Failed` (e.g., dark red) that fit the existing theme.
