---
name: website-frontend
description: Frontend website build workflow for vanilla HTML/CSS/JS projects on Mac. Use when building or editing any website page, section, or component. Handles local server, screenshot comparison, and output conventions.
---

# Website Frontend Build Workflow

## Always Do First

Before writing any frontend code:
1. Check for a `brand_assets/` folder in the project root — use any logos, colors, or style guides found there. Never invent brand values when real ones exist.
2. Check for active skills: load `naro-brand` and `naro-components` if this is a NĀRO project.
3. Check if a local server is already running before starting one.

---

## Local Server

Always serve on localhost — never screenshot a `file:///` URL.

Start the dev server from the project root:
```bash
python3 -m http.server 3000
```

Or if a `serve.mjs` exists in the project root:
```bash
node serve.mjs
```

Server runs at `http://localhost:3000`. Start in background before any screenshots. Do not start a second instance if already running.

---

## Screenshot Workflow

Puppeteer is used for screenshots on Mac. Typical install location:
```
/Users/[username]/.cache/puppeteer/
```

Take screenshot:
```bash
node screenshot.mjs http://localhost:3000
```

Screenshots save to `./screenshots/screenshot-N.png` (auto-incremented, never overwritten).

Optional label:
```bash
node screenshot.mjs http://localhost:3000 hero
# saves as screenshot-N-hero.png
```

After screenshotting, read the PNG with the Read tool and analyze it directly.

### Comparison Protocol

When a reference image is provided:
- Match layout, spacing, typography, and color **exactly**
- Use placeholder content: images via `https://placehold.co/WIDTHxHEIGHT`
- Do not improve or add to the reference design
- Do minimum 2 comparison rounds — stop only when no visible differences remain or user confirms

When comparing, be specific:
- "heading is 32px but reference shows ~24px"
- "card gap is 16px but should be 24px"
- "background is #F5F5F3 but rendering as pure white"

Check on every pass: spacing, padding, font size/weight/line-height, exact hex colors, alignment, border-radius, shadows, image sizing.

---

## Output Defaults

- Single `index.html` per page, all styles in a linked `assets/css/` file (or inline if explicitly requested)
- Vanilla HTML/CSS/JS — no frameworks, no build tools
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive using CSS custom properties and media queries
- GitHub Pages compatible — no server-side dependencies

---

## File Structure

```
/
  index.html
  /assets/
    /css/
      tokens.css       — CSS custom properties
      base.css         — reset + typography
      components.css   — component styles
    /js/
      main.js          — minimal JS only
    /fonts/            — self-hosted fonts
  /screenshots/        — build screenshots (gitignore this)
```

---

## Typography Rules

- Never use the same font for headings and body — always pair a display font with a body font
- Large headings: `letter-spacing: -0.03em`
- Body text: `line-height: 1.7`
- UI labels: uppercase + tracked out (`letter-spacing: 0.12em`)

---

## Anti-Generic Guardrails

**Colors**
- Never use framework default palettes directly
- Always derive from brand tokens via CSS custom properties
- One accent color maximum per design

**Shadows**
- No flat generic shadows
- Use layered, color-tinted shadows with low opacity when shadows are needed at all

**Gradients**
- Only if the brand permits — check brand skill first
- If used: layer multiple radial gradients, never a single linear gradient

**Animations**
- Only animate `transform` and `opacity` — never `transition-all`
- Duration: 300–400ms maximum
- Easing: `ease-out` always
- Use `IntersectionObserver` for scroll-triggered animations

**Interactive States**
- Every clickable element needs: `hover`, `focus-visible`, and `active` states
- No exceptions — accessibility and polish are non-negotiable

**Spacing**
- Use defined spacing tokens — never arbitrary pixel values
- Consistent scale, always multiples of base unit

**Depth / Layering**
- Surfaces should have a clear layering system: base → elevated → floating
- Not everything sits at the same z-plane

---

## Hard Rules

- Do not add sections or content not requested or shown in reference
- Do not "improve" a reference design — match it exactly
- Do not stop after one screenshot pass when a reference exists
- Do not use `transition-all`
- Do not hardcode hex values — always use CSS custom properties
- Do not use external CSS frameworks (no Bootstrap, no Tailwind CDN) unless explicitly requested
