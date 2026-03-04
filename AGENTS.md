# Agent Guidelines: Shouhizei (GST/VAT calculator)

## Project Overview

Shouhizei (消費税) is a lightweight, interactive, and responsive GST/VAT calculator built with vanilla HTML, CSS, and JavaScript. The project provides a fast, privacy-focused, and framework-free tool for calculating consumption taxes across different countries using a local data source (`rates.json`). The primary goal is to provide a simple, accessible, and framework-free tool for calculating consumption taxes globally.

## Tech Stack

### Core Technologies (Mandatory)
- **HTML5**: Semantic markup, native form validation, and ARIA attributes for accessibility.
- **CSS3**: Modern layout (Grid, Flexbox) and Custom Properties for theming.
- **Vanilla JavaScript (ES6+)**: Pure DOM manipulation, no external frameworks or libraries.
- **Deno**: Used for the local development server, code formatting, and linting.
- **Makefile**: Task runner for common operations (`serve`, `format`, `lint`).

### Prohibited Technologies
- ❌ **React, Vue, Angular, or any JS frameworks**: Keep it framework-free.
- ❌ **Tailwind CSS, Bootstrap, or heavy CSS frameworks**: Use native CSS or a minimal classless framework (e.g., Pico CSS).
- ❌ **TypeScript**: Use vanilla JavaScript for simplicity and zero build step.
- ❌ **Build tools (Webpack, Vite, etc.)**: No build process is required for this static site.
- ❌ **HTMX**: Not suitable for this static-site project.

## Core Architecture

The project follows a simple static-site structure focused on performance and maintainability:

```text
shouhizei/
├── web/                   # Website source files
│   ├── index.html         # Main entry point (UI structure)
│   ├── css/
│   │   ├── variables.css  # Global CSS variables (colours, spacing)
│   │   └── styles.css     # Main layout and component styling
│   ├── js/
│   │   ├── rates.json     # External tax rate data (fetched at runtime)
│   │   ├── theme.js       # Dark/Light mode logic (localStorage persisted)
│   │   ├── utils.js       # Reusable helpers (formatting, toast, clipboard)
│   │   └── calculator.js  # Core calculation and DOM interaction logic
│   └── assets/
│       └── shouhizei.png  # Visual assets (logo, favicon)
├── AGENTS.md              # Project guidelines for AI agents
├── LICENSE                # GPL v3 Licence
├── Makefile               # Task automation
├── README.md              # Documentation for developers
└── serve.ts               # Deno development server
```

### Data Flow & Logic
1.  **Initialization**: `index.html` loads all scripts and styles. `calculator.js` fetches `rates.json` upon startup.
2.  **Calculation**: User input triggers real-time calculations using pure functions in `calculator.js` and formatting helpers in `utils.js`.
3.  **Persistence**: User preferences (selected country, theme) are persisted via `localStorage`.
4.  **UI Updates**: Terminology (GST, VAT, IVA, etc.) and currency symbols update dynamically based on the selected country's data.

## Coding Standards

### Naming Conventions
- **HTML**: Use `kebab-case` for IDs and class names (e.g., `country-select`, `tax-rate-label`).
- **JavaScript**: 
  - Use `camelCase` for variables, functions, and constants (e.g., `handleCountryChange`, `ratesData`).
  - Use descriptive names that reflect purpose (e.g., `priceExclInput` vs `input1`).
- **CSS**: Use BEM or simple semantic class naming (e.g., `calculator-form`, `theme-toggle`).

### General Patterns
- **Functional Approach**: Prefer pure functions for calculations; separate calculation logic from DOM manipulation.
- **British English**: Use British English spelling (e.g., `colour`, `optimised`, `centre`) for both code comments and user-facing text.
- **No Build Step**: Do not add build tools or transpilers. The code must run directly in modern browsers.
- **Progressive Enhancement**: Ensure core functionality works without JavaScript (basic form); enhance with JS.

### Performance & Accessibility
- **Target Metrics**: Total page size < 100KB, FCP < 1.5s, TTI < 2.5s.
- **Accessibility**: Follow WCAG AA standards, ensuring high contrast, ARIA labels, and full keyboard navigation.
- **Manual Verification**: Test across mobile (< 768px), tablet (768px - 1024px), and desktop (> 1024px).

## Agent Constraints

### Dos
- ✅ **Use semantic HTML5**: Always use `<main>`, `<section>`, `<form>`, `<label>`, etc.
- ✅ **Mobile-first CSS**: Use Grid and Flexbox for responsive layouts.
- ✅ **Native Validation**: Use HTML5 `required`, `min`, `max`, and `step` attributes.
- ✅ **JSDoc**: Add JSDoc comments for complex functions or non-obvious logic.
- ✅ **Toast Notifications**: Provide clear visual feedback for actions like copying results.
- ✅ **Error Handling**: Gracefully handle missing data or invalid inputs.

### Don'ts
- ❌ **No Frameworks**: Do not introduce any external JS or CSS frameworks.
- ❌ **No innerHTML**: Use `textContent` for displaying user-controllable data to prevent XSS.
- ❌ **No npm/Node**: Avoid `package.json` or `node_modules`. Stick to Deno for dev tasks.
- ❌ **No Absolute Paths**: Use relative paths for all internal assets and scripts.
- ❌ **No !important**: Avoid `!important` in CSS; use proper specificity.

## Mode-Specific Instructions

### [CHAT]
- Focus on high-level architectural guidance or project analysis.
- Reference `AGENTS.md` and `README.md` to ensure advice aligns with project standards.
- Do not provide code blocks that introduce new dependencies or deviate from the "No Frameworks" rule.

### [CODE]
- **Standard**: Follow the "Coding Standards" section meticulously.
- **Quality Control**: Always run `make format` and `make lint` after making changes.
- **Location**: Ensure JS logic is placed in `calculator.js`, while helpers go into `utils.js`.
- **Validation**: Ensure all inputs are positive numbers and handle `NaN` gracefully.

### [RUN_VERIFY]
- **Server**: Use `make serve` to start the Deno development server.
- **Verification**: Check changes at `http://localhost:8000`.
- **Breakpoints**: Verify layout across mobile, tablet, and desktop views.
- **Persistence**: Confirm that `localStorage` items (country, theme) are correctly updated.

### [SETUP]
- **Environment**: Ensure Deno is installed.
- **Initialization**: Use the `Makefile` for formatting and linting the environment.
- **Data Update**: If adding new country data, ensure it follows the structure in `web/js/rates.json`.

## Version History
- **v1.8** (2026-03-04) - Restructured for modularity, added mode-specific instructions, and updated license to GPL v3.
- **v1.7** (2026-03-02) - Updated project structure to include `theme.js` and `rates.json`.
- **v1.6** (2026-03-02) - Integrated currency symbols from updated `rates.json`.
- **v1.5** (2026-03-02) - Removed manual entry option from country selector.
- **v1.4** (2026-03-02) - Completed Phase 1 MVP.
- **v1.3** (2026-02-27) - Added `Makefile` for common tasks.
- **v1.2** (2026-02-27) - Added Deno serve script.
- **v1.1** (2026-02-27) - Moved website files to `web/` subfolder.
- **v1.0** (2026-02-25) - Initial guidelines established.

---

## Changelog (v1.8)
- **Restructured Document**: Reorganized sections into the required five-section format: Project Overview, Tech Stack, Core Architecture, Coding Standards, and Agent Constraints.
- **Added Mode Instructions**: Introduced dedicated guidance for CHAT, CODE, RUN_VERIFY, and SETUP modes.
- **Conflict Resolution**: Updated license information from MIT to GPL v3 to match current project status.
- **Enhanced Standards**: Added explicit naming conventions (camelCase for JS, kebab-case for IDs), patterns (British English, functional approach), and performance targets.
- **Improved Architecture Overview**: Updated folder structure description and added a data flow summary.

---

**Last Updated:** 2026-03-04
**Document Owner:** Project Team
**Review Frequency:** As needed based on project evolution
