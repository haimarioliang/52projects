# Specification: UI Refinement & Stats Page

## 1. Overview
This track focuses on refining the user interface and core date logic. Key changes include expanding project statuses with rapid "click-to-cycle" interaction, implementing a new Monday-to-Monday date calculation system for the 52 weeks, and migrating progress visualization to a dedicated "Stats" page.

## 2. Functional Requirements

### 2.1 Rapid Status Cycling (Dashboard)
- **Interaction:** Clicking the status indicator for a project will cycle through the available statuses immediately.
- **Status Sequence:** `Not Started` -> `In Progress` -> `Done` -> `Failed` -> `Skipped` -> (loops back to `Not Started`).
- **Visual Feedback:** Distinct colors for each state (Grey, Blue, Green, Red, Yellow).

### 2.2 Date Logic Overhaul (Monday-to-Monday)
- **Logic Change:** Update the date generation utility to calculate weeks based on Monday-to-Monday intervals.
- **Scope:** This applies to all 52 weeks of the current year.
- **Display:** The dashboard should display these new Monday-based date ranges for each week item.

### 2.3 Progress Logic
- **Counting Rule:** Statuses `Done`, `Failed`, and `Skipped` count as 1 "completed" unit for the year.
- **Incomplete:** `Not Started` and `In Progress` do not count toward the total.

### 2.4 Stats Page
- **New Page:** A dedicated view showing a grid of 52 dots.
- **Visualization:** 52 circles, each colored according to the status of its corresponding week.
- **Navigation:** Clear links to switch between the main "Dashboard" and the "Stats" page.

## 3. Non-Functional Requirements
- **Efficiency:** Status updates must be persisted immediately.
- **Accuracy:** Date calculations must accurately reflect the Monday-start calendar for the current year.
