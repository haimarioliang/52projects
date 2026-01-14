# Specification: Collapsible Quarterly Drawers

## 1. Overview
This track introduces collapsible quarterly sections (drawers) to the main dashboard. This organization aims to reduce vertical scrolling and allow the user to focus on the current quarter's projects while keeping others easily accessible.

## 2. Functional Requirements

### 2.1 Quarterly Drawers (Dashboard)
- **Collapsible Sections:** Group projects by quarter (Q1-Q4). Each quarter will act as a toggleable section.
- **Interaction:** Clicking a quarter header toggles the visibility of the projects within that quarter.
- **Visual Feedback:** The quarter header will serve as the toggle. A subtle color change or underline when hovered/clicked will indicate interactivity (no explicit +/- or arrow icons).
- **Default State:** Upon initial load, only the quarter containing the current date will be expanded. All other quarters will be collapsed.

### 2.2 Dashboard Layout
- **Rendering Logic:** Update `renderProjects` to wrap each quarter's project cards in a dedicated container.
- **Transition:** Implement smooth CSS transitions for expanding and collapsing the drawers.

## 3. Non-Functional Requirements
- **Efficiency:** The dashboard must load and calculate the current quarter instantly.
- **Consistency:** Maintain the existing high-contrast dark theme.
- **Mobile First:** The collapsible sections should significantly improve the vertical navigation experience on mobile devices.

## 4. Out of Scope
- Persisting the expanded/collapsed state across browser refreshes (state resets to "Focused View" on reload).
- Adding new project metadata.
