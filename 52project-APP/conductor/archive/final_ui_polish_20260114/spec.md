# Specification: Final UI/UX Polish (Minimalist Terminal Style)

## 1. Overview
This is the final refinement track before deployment. The goal is to achieve perfect visual consistency by strictly adhering to a "Minimalist Terminal" aesthetic across all pages. This involves a comprehensive typography audit and a standardized spacing system.

## 2. Functional Requirements

### 2.1 Typography Audit (Monospace Everywhere)
- **Universal Font:** Update the global CSS to ensure every text element (headers, paragraphs, buttons, input placeholders, labels, and metadata) uses the primary monospaced font.
- **Fallbacks:** Ensure a robust monospaced fallback stack (e.g., `'Courier New', Courier, monospace`).

### 2.2 Standardized Spacing & Grid
- **Alignment:** Align all layout elements (gaps, margins, padding) to a consistent 10px / 20px / 40px increment system to ensure a structured, "blocked" terminal feel.
- **Dashboard Grid:** Ensure the 5-column grid has perfectly uniform spacing and that card content is consistently aligned.

### 2.3 Cross-Page Consistency
- **Header Sync:** Ensure the header layout (Side-by-side title and nav links) is identical in style and spacing on `index.html`, `stats.html`, and `ideas.html`.
- **Theme Standard:** Verify that the background is true black (`#000`) across all views to maximize contrast.

## 3. Non-Functional Requirements
- **Legibility:** Ensure that despite the monospaced font, all text remains highly legible with appropriate line-heights.
- **Minimalism:** Remove any remaining non-essential visual depth (shadows, gradients, or unnecessary borders).

## 4. Out of Scope
- Adding new features or pages.
- Changing the functional logic of the quarterly drawers or status toggles.
