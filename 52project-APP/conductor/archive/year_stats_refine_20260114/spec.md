# Specification: Year Stats UI Refinement

## 1. Overview
This track aims to refine the "Year Stats" page by improving the layout of the 52-dot grid and cleaning up the header area. Specifically, the stats grid will be reorganized into quarterly rows, and the horizontal progress bar will be removed in favor of a simpler text-based summary.

## 2. Functional Requirements

### 2.1 Stats Grid Layout Refinement
- **Quarterly Rows:** Reorganize the 52-dot grid so that each row represents exactly one quarter (13 weeks).
- **Structure:**
    - Row 1: Weeks 1-13 (Q1)
    - Row 2: Weeks 14-26 (Q2)
    - Row 3: Weeks 27-39 (Q3)
    - Row 4: Weeks 40-52 (Q4)
- **Visual Distinction:** Ensure the grid structure clearly reflects these four rows, making it easier to scan quarterly progress.

### 2.2 Header Cleanup (Stats Page Only)
- **Remove Progress Bar:** Delete the `#progress-container` and its children (the horizontal bar) from the `stats.html` header.
- **Maintain Progress Text:** Retain the numerical progress text (e.g., "X/52 completed") but reposition it as a clean text element (e.g., inside the header or below the "Year Progress" title).

## 3. Non-Functional Requirements
- **Consistency:** The changes should maintain the dark mode minimalist aesthetic.
- **Responsiveness:** The quarterly row layout should be handled gracefully on mobile (e.g., possibly collapsing or adjusting spacing while maintaining the quarterly grouping).

## 4. Out of Scope
- Adding new metrics or charts.
- Adding interactivity (clicks) to the dots in this phase.
