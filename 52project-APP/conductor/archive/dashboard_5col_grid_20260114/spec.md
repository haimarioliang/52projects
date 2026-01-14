# Specification: Dashboard 5-Column Grid Layout

## 1. Overview
This track updates the main project dashboard to display projects in a responsive 5-column grid layout on larger screens. This aims to provide a more information-dense view of the 52-week challenge.

## 2. Functional Requirements

### 2.1 Responsive 5-Column Grid (Dashboard)
- **Grid Structure:** Modify the CSS grid for the dashboard to display up to 5 project cards per row.
- **Responsiveness:**
    - Desktop/Large Screens: 5 columns.
    - Tablets/Medium Screens: Gracefully reduce to 3 or 2 columns.
    - Mobile/Small Screens: 1 column.
- **Consistency:** Maintain the existing 4-column quarterly container logic but allow the internal grid to flow into 5 columns.

### 2.2 Visual Adaptation
- **Scaling:** Project cards should automatically scale their width to fit the 5-column layout.
- **Preserve Content:** All existing card elements (Title, Week, Date Range, Status, Tags) must remain visible.

## 3. Non-Functional Requirements
- **Consistency:** The change must not affect the "Year Stats" page dot grid.
- **Aesthetic:** Ensure the 5-column layout maintains the minimalist high-contrast theme without feeling overcrowded.

## 4. Out of Scope
- Modifying the "Year Stats" page grid.
- Changing any project data or functional logic.
