# Specification: Restore Global Notes with Minimalist Navigation

## 1. Overview
This track focuses on re-implementing the "Dumb Ideas" global note function while simultaneously introducing a more compact header using a hamburger menu. The goal is to provide a central scratchpad accessible from any page via a streamlined navigation interface.

## 2. Functional Requirements

### 2.1 Global Notes (Dumb Ideas)
- **Modal Component:** A dedicated modal window for free-form brainstorming.
- **Label:** "Dumb Ideas".
- **Storage:** Use a single-row SQLite table (`global_notes`) to persist the content.
- **Auto-Save:** Content should automatically save to the database as the user types (with a short debounce).

### 2.2 Minimalist Navigation (Hamburger Menu)
- **Compact Header:** Replace the horizontal list of links with a single hamburger menu icon.
- **Menu Items:**
    - Dashboard
    - Year Stats
    - Dumb Ideas (opens the global notes modal)
- **Overlay:** Clicking the hamburger icon reveals the menu links in a clean overlay.

### 2.3 Visual Polish
- **Consistency:** Ensure the modal and menu overlay match the existing dark mode aesthetic.
- **Animations:** Implement subtle transitions for opening the menu and modal.

## 3. Non-Functional Requirements
- **Performance:** Modal and menu interactions must be instantaneous.
- **Mobile First:** The hamburger menu should provide a clean and intuitive experience on smaller screens.

## 4. Out of Scope
- Per-project notes.
- Dedicated ideas page (using a modal instead).
