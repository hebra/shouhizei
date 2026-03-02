# Agent Guidelines: Shouhizei (GST/VAT calculator)

## Project Overview

This document serves as the source of truth for all AI agents working on the Shouhizei project. It defines the technical stack, requirements, standards, and implementation guidelines.

## Project Type

Static website with an interactive GST/VAT calculator.

## Technology Stack

### Core Technologies (Mandatory)

- **HTML5** - Semantic markup, native form validation
- **CSS3** - Modern CSS with Grid, Flexbox, Custom Properties
- **Vanilla JavaScript (ES6+)** - No frameworks, native DOM manipulation

### Prohibited Technologies

- ❌ React, Vue, Angular, or any JavaScript frameworks
- ❌ Tailwind CSS, Bootstrap, or heavy CSS frameworks
- ❌ TypeScript (keep it simple with vanilla JS)
- ❌ Build tools (Webpack, Vite, etc.) - no build process required
- ❌ HTMX (requires server, not suitable for static sites)

### Optional Lightweight Enhancements

**Visualisation (Choose One):**
- Canvas API (native) - More control, steeper learning curve
- SVG (native) - Scalable, accessible graphs

**Minimal CSS Framework (Optional):**
- **Pico CSS** (~10KB) - Minimal, semantic, classless
- **Simple.css** (~4KB) - Classless styling, drop-in solution
- **Water.css** (~2KB) - Classless, dark mode support
- **None** - Custom CSS preferred

**Icons (Optional):**
- Feather Icons or Heroicons (SVG)
- Unicode symbols (✓, ✗, ⚠, 📊) - Zero dependencies

## Project Structure

```
shouhizei/
├── web/
│   ├── index.html
│   ├── css/
│   │   ├── styles.css
│   │   └── variables.css (optional)
│   ├── js/
│   │   ├── calculator.js
│   │   └── utils.js (optional)
│   └── assets/
│       └── favicon.ico
├── AGENTS.md (this file)
├── Makefile
├── README.md
└── serve.ts (Deno server)
```

## Core Requirements

### Calculator Functionality

**Required Inputs:**
- Country dropdown selector
- GST/VAT rate (pre-populated depending on country selected)
- Price with tax input
- Price without tax input
- The price inputs are either-or

**Required Outputs:**
- Total amount after GST/VAT
- Total GST/VAT amount
- Price breakdown (with/without tax)


### User Experience Requirements

**Input Validation:**
- All inputs must be positive numbers
- Use HTML5 native validation attributes (`required`, `min`, `max`, `step`)
- Provide clear error messages

**Interaction Patterns:**
- Real-time calculation (on input change) OR button-triggered calculation
- Clear/reset button to restore defaults
- Responsive design (mobile-first approach)
- Keyboard navigation support
- Print-friendly styles

**Visual Feedback:**
- Success/error states
- Smooth transitions (CSS only)
- Clear visual hierarchy

### Accessibility Requirements (Mandatory)

- Semantic HTML5 elements (`<main>`, `<section>`, `<form>`, `<label>`)
- Proper form labels associated with inputs
- ARIA attributes where needed (`aria-label`, `aria-describedby`)
- Keyboard navigation (tab order, enter to submit)
- Focus indicators (visible focus states)
- Screen reader friendly (test with screen readers)
- Sufficient colour contrast (WCAG AA minimum)

### Responsive Design Requirements

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Approach:**
- Mobile-first CSS
- CSS Grid for layout
- Flexbox for component alignment
- Media queries for responsive adjustments
- Touch-friendly targets (minimum 44x44px)

## Code Standards

### HTML Standards

```html
<!-- Use semantic HTML5 -->
<main>
  <section class="calculator">
    <h1>Shouhizei — GST/VAT Calculator</h1>
    <form id="calculator-form">
      <label for="country">Country</label>
      <select id="country">
        <!-- List of countries -->
      </select>
      <label for="gstvat">GST/VAT (%)</label>
      <input 
        type="number" 
        id="gstvat" 
        name="gstvat" 
        required 
        min="1" 
        max="100"
        step="0.01"
      >
      <!-- More inputs -->
    </form>
  </section>
</main>
```

**Rules:**
- Use semantic elements
- Include proper meta tags (viewport, description, charset)
- Add lang attribute to `<html>`
- Include favicon
- Validate HTML (W3C validator)

### CSS Standards

```css
/* Use CSS Custom Properties for theming */
:root {
  --primary-colour: #2563eb;
  --secondary-colour: #64748b;
  --background-colour: #ffffff;
  --text-colour: #1e293b;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}

/* Mobile-first approach */
.calculator {
  display: grid;
  gap: var(--spacing-unit);
}

/* Tablet and above */
@media (min-width: 768px) {
  .calculator {
    grid-template-columns: 1fr 1fr;
  }
}
```

**Rules:**
- Use British English spelling (colour, centre, etc.)
- Mobile-first media queries
- CSS Custom Properties for theming
- BEM or simple class naming convention
- Avoid `!important`
- Group related styles
- Comment complex calculations or hacks

### JavaScript Standards

**Rules:**
- Use vanilla Javascript.
- Use `const` and `let`, avoid `var`
- Arrow functions for callbacks
- Template literals for strings
- Destructuring where appropriate
- Pure functions for calculations
- Separate concerns (calculation vs DOM manipulation)
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Handle errors gracefully
- Validate inputs before calculations

### File Organisation

**CSS Files:**
- `variables.css` - CSS Custom Properties (optional)
- `styles.css` - Main styles

**JavaScript Files:**
- `calculator.js` - Core calculation logic
- `utils.js` - Helper functions (optional)

**Loading Order:**
```html
<head>
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- Content -->
  <script src="js/utils.js"></script>
  <script src="js/calculator.js"></script>
</body>
```

## Local Development

For development purposes, a basic Deno server script is provided in the root directory.

**Running the server:**

```bash
make serve
```

Alternatively:

```bash
deno run --allow-net --allow-read serve.ts
```

This serves the `web/` directory at `http://localhost:8000`.

## Performance Requirements

### Target Metrics

- **Total page size:** < 100KB (excluding optional chart library)
- **HTML:** ~5-10KB
- **CSS:** ~10-20KB
- **JavaScript:** ~5-15KB
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 2.5s

### Optimisation Techniques

**For Production:**
- Minify CSS and JavaScript
- Compress images (if any)
- Use native lazy loading: `<img loading="lazy">`
- Inline critical CSS (optional)
- Enable gzip/brotli compression on hosting

**Code Optimisation:**
- Avoid unnecessary DOM queries (cache selectors)
- Debounce real-time calculations (if implemented)
- Use event delegation for multiple similar elements
- Minimise reflows and repaints

## Browser Support

**Target Browsers:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Progressive Enhancement:**
- Core functionality works without JavaScript (basic form)
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers
- Feature detection over browser detection

## Development Phases

### Phase 1: MVP (Minimum Viable Product)

**Priority: High**
- [ ] Basic HTML structure
- [ ] Simple CSS styling
- [ ] Core calculation logic
- [ ] Input validation
- [ ] Results display
- [ ] Responsive layout

**Deliverable:** Working calculator with basic styling

### Phase 2: Enhancements

**Priority: Medium**
- [ ] Improved styling and UX
- [ ] Print styles
- [ ] Accessibility improvements
- [ ] Error handling refinements

**Deliverable:** Polished, accessible calculator

### Phase 3: Advanced Features

**Priority: Low**
- [ ] Chart visualisation (Chart.js)
- [ ] Export results (CSV/print)
- [ ] Comparison calculator (multiple scenarios)
- [ ] Dark mode toggle
- [ ] Save calculations (localStorage)

**Deliverable:** Feature-rich calculator

## Hosting & Deployment

### Recommended Hosting

**Primary Recommendation: GitHub Pages**
- Free static hosting
- Version controlled
- Custom domain support
- HTTPS enabled
- Simple deployment

**Alternatives:**
- Netlify - Drag-and-drop deployment
- Vercel - Fast deployment, excellent performance
- Cloudflare Pages - Global CDN
- Surge.sh - Simple CLI deployment

### Deployment Process (GitHub Pages)

1. Create GitHub repository
2. Push code to `main` branch
3. Enable GitHub Pages in repository settings
4. Select source: `main` branch, `/web` folder (or adjust based on hosting requirements)
5. Site live at `username.github.io/repo-name/web`

### Custom Domain (Optional)

1. Add `CNAME` file with domain name
2. Configure DNS records with domain provider
3. Enable HTTPS in GitHub Pages settings

## Testing Requirements

### Manual Testing Checklist

**Functionality:**
- [ ] All calculations produce correct results
- [ ] Input validation works correctly
- [ ] Clear/reset button works
- [ ] Results display properly formatted
- [ ] Chart renders correctly (if implemented)

**Responsive Design:**
- [ ] Mobile layout (< 768px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Desktop layout (> 1024px)
- [ ] Touch targets adequate size

**Browser Testing:**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Focus indicators visible
- [ ] Colour contrast sufficient
- [ ] Form labels associated

**Performance:**
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Calculations are fast
- [ ] No memory leaks

### Validation Tools

- **HTML:** W3C Markup Validation Service
- **CSS:** W3C CSS Validation Service
- **Accessibility:** WAVE, axe DevTools
- **Performance:** Lighthouse, PageSpeed Insights
- **Cross-browser:** BrowserStack (optional)

## Documentation Requirements

### README.md

Must include:
- Project description
- Features list
- Live demo link
- Installation/setup instructions
- Usage instructions
- Technologies used
- Browser support
- Licence

### Code Comments

**When to comment:**
- Complex calculations or algorithms
- Non-obvious logic
- Browser-specific hacks or workarounds
- Public API functions (JSDoc)

**When NOT to comment:**
- Self-explanatory code
- Obvious functionality
- Redundant descriptions

## Security Considerations

**Input Sanitisation:**
- Validate all user inputs
- Use `parseFloat()` for number conversion
- Prevent XSS (avoid `innerHTML` with user input)
- Use `textContent` for displaying user data

**Best Practices:**
- No sensitive data in client-side code
- No API keys or credentials
- Use HTTPS for hosting
- Content Security Policy headers (optional)

## Common Pitfalls to Avoid

### JavaScript

❌ **Don't:**
```javascript
// Using innerHTML with user input
element.innerHTML = userInput;

// Not validating inputs
const result = principal * rate; // Could be NaN

// Querying DOM repeatedly
for (let i = 0; i < 100; i++) {
  document.getElementById('result').textContent = i;
}
```

✅ **Do:**
```javascript
// Use textContent for user data
element.textContent = userInput;

// Validate inputs
const principal = parseFloat(userInput);
if (isNaN(principal) || principal <= 0) {
  showError('Invalid principal amount');
  return;
}

// Cache DOM queries
const resultElement = document.getElementById('result');
for (let i = 0; i < 100; i++) {
  resultElement.textContent = i;
}
```

### CSS

❌ **Don't:**
```css
/* Using !important unnecessarily */
.button {
  color: red !important;
}

/* Not using CSS variables */
.primary-button {
  background: #2563eb;
}
.secondary-button {
  background: #2563eb;
}
```

✅ **Do:**
```css
/* Use specificity correctly */
.button.primary {
  color: red;
}

/* Use CSS Custom Properties */
:root {
  --primary-colour: #2563eb;
}
.primary-button {
  background: var(--primary-colour);
}
```

### HTML

❌ **Don't:**
```html
<!-- Missing labels -->
<input type="number" placeholder="Principal">

<!-- Inline styles -->
<div style="color: red;">Error</div>

<!-- Non-semantic markup -->
<div class="header">
  <div class="title">Calculator</div>
</div>
```

✅ **Do:**
```html
<!-- Proper labels -->
<label for="principal">Principal Amount</label>
<input type="number" id="principal" name="principal">

<!-- External styles -->
<div class="error-message">Error</div>

<!-- Semantic markup -->
<header>
  <h1>Calculator</h1>
</header>
```

## Agent Responsibilities

### When Creating New Files

1. Follow the project structure defined above
2. Use British English spelling consistently
3. Include proper file headers/comments
4. Validate code before committing
5. Test functionality thoroughly

### When Modifying Existing Files

1. Maintain existing code style
2. Don't introduce frameworks or heavy dependencies
3. Preserve accessibility features
4. Test changes across browsers
5. Update documentation if needed

### When Reviewing Code

1. Check adherence to these guidelines
2. Verify calculations are mathematically correct
3. Ensure accessibility standards are met
4. Confirm responsive design works
5. Validate performance requirements

## Questions & Clarifications

If uncertain about any requirement:

1. Refer to this document first
2. Check existing code patterns
3. Ask the user for clarification
4. Document the decision made
5. Update this file if needed

## Version History

  - **v1.6** (2026-03-02) - Integrated currency symbols from updated `rates.json` and adjusted JS for new JSON structure
  - **v1.5** (2026-03-02) - Removed manual entry option from country selector
  - **v1.4** (2026-03-02) - Completed Phase 1 MVP, updated country data and calculations
  - **v1.3** (2026-02-27) - Added `Makefile` for common tasks (serve, format, lint)
  - **v1.2** (2026-02-27) - Added Deno serve script for local development
  - **v1.1** (2026-02-27) - Moved website files to `web/` subfolder
- **v1.0** (2026-02-25) - Initial guidelines established
  - Pure HTML/CSS/JavaScript stack
  - No frameworks or build tools
  - Focus on simplicity and performance
  - Comprehensive accessibility requirements

---

**Last Updated:** 2026-02-25  
**Document Owner:** Project Team  
**Review Frequency:** As needed based on project evolution
