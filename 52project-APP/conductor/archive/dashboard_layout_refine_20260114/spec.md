# Specification: Dashboard Layout Refinement & Header Restoration

## 1. Overview
This track refines the dashboard layout to use a consistent 4-column grid within full-width quarterly drawers and restores the horizontal navigation layout in the header, placing links on the same row as the title.

## 2. Functional Requirements

### 2.1 Dashboard Grid Layout
- **Quarter Containers:** Maintain the collapsible drawer functionality for Q1-Q4.
- **Grid Structure:** Inside each quarter content area, projects must be organized in a 4-column grid on desktop.
- **Responsiveness:** The grid should automatically adjust to a 2-column layout on medium/small screens.
- **Full Width:** Quarters and headers should utilize the available width (up to the max-width of 1200px).

### 2.2 Header Restoration (Horizontal Layout)
- **Remove Hamburger:** The hamburger menu and navigation overlay will be removed.
- **Same-Row Layout:** The main title ("52 Projects") and the navigation links ("Dashboard", "Year Stats", "Dumb Ideas") will be placed on the same horizontal row.
- **Alignment:** Title on the left, navigation links on the right (flexbox layout).

## 3. Non-Functional Requirements
- **Minimalist Aesthetic:** Adhere to the existing high-contrast dark mode terminal theme.
- **Interaction:** Maintain smooth expand/collapse transitions for the quarterly drawers.

## 4. Out of Scope
- Changing the "Dumb Ideas" modal logic (only the access button location changes).
