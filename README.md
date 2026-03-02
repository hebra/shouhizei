# Shouhizei — GST/VAT Calculator

A simple, interactive, and responsive GST/VAT calculator built with vanilla HTML, CSS, and JavaScript.

## Features

- **Country-specific Rates:** Automatically pre-populates GST/VAT rates for over 50 countries.
- **Currency Symbols:** Automatically displays the correct currency symbol based on the selected country (e.g., £, €, ¥, $).
- **Dynamic Labels:** UI labels update to reflect the correct local tax terminology (GST, VAT, Consumption Tax, etc.).
- **Real-time Calculation:** Automatically updates "Price Including Tax" when "Price Excluding Tax" is entered, and vice-versa.
- **Accessibility:** Built with semantic HTML, proper ARIA labels, and keyboard navigation support.
- **Responsive Design:** Mobile-first approach using CSS Grid and Flexbox.
- **Print Friendly:** Optimized styles for printing calculation results.

## Technologies Used

- **HTML5** (Semantic markup)
- **CSS3** (Custom Properties, Grid, Flexbox)
- **Vanilla JavaScript** (ES6+, DOM API)
- **Deno** (Optional, for local development server)

## Local Setup

To run the project locally, you can use the provided Deno server script.

### Prerequisites

- [Deno](https://deno.land/) installed on your machine.

### Running the Server

Using the `Makefile`:
```bash
make serve
```

Alternatively, run the Deno command directly:
```bash
deno run --allow-net --allow-read serve.ts
```

The site will be available at `http://localhost:8000`.

## Directory Structure

```
shouhizei/
├── web/
│   ├── index.html
│   ├── css/
│   │   ├── variables.css
│   │   └── styles.css
│   ├── js/
│   │   ├── rates.json
│   │   ├── utils.js
│   │   └── calculator.js
│   └── assets/
│       └── favicon.ico
├── AGENTS.md
├── Makefile
├── README.md
└── serve.ts
```

## Licence

MIT Licence. See `LICENSE` for details.
