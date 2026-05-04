---
name: naro-components
description: NĀRO UI component patterns, section structures, and interaction rules for building the NĀRO website on GitHub Pages. Use when building any page section, UI component, or interactive element for NĀRO. Always load naro-brand alongside this skill.
---

# NĀRO Component Patterns

> This skill defines how NĀRO UI is built. Always apply `naro-brand` tokens.
> Stack: Vanilla HTML + CSS + minimal JS. No frameworks. GitHub Pages compatible.

---

## Core Principles

1. **Structure before style** — get the HTML semantic and accessible first
2. **One motion per section** — maximum one animated element per viewport
3. **Progressive disclosure** — show less, reveal on interaction
4. **Mobile-first** — all components are designed for mobile, enhanced for desktop

---

## Navigation

```html
<nav class="nav">
  <a class="nav__logo" href="/">NĀRO</a>
  <ul class="nav__links">
    <li><a href="/close">NĀRO Close</a></li>
    <li><a href="/about">About</a></li>
    <li><a class="nav__cta" href="/contact">Get Started</a></li>
  </ul>
</nav>
```

Rules:
- Logo: wordmark only, Satoshi Bold, `--color-foreground`
- Links: General Sans uppercase, `--text-sm`, `letter-spacing: 0.12em`
- CTA link: styled as minimal button with `--color-accent` border
- Nav is sticky, background `--color-background` at 95% opacity, no shadow
- No hamburger menus with JS if avoidable — use `<details>` for mobile nav

---

## Hero Section

```html
<section class="hero">
  <span class="hero__label">NĀRO Close</span>
  <h1 class="hero__heading">Follow-up that closes deals.</h1>
  <p class="hero__sub">AI-powered quote follow-up for B2B companies. No manual effort.</p>
  <a class="btn btn--primary" href="/contact">Request Access</a>
</section>
```

Rules:
- Label: General Sans uppercase, `--color-neutral`, `--text-xs`
- Heading: Satoshi Bold, `--text-5xl` desktop / `--text-3xl` mobile, max 8 words
- Sub: Inter Regular, `--text-lg`, `--color-neutral`, max 2 lines
- Single CTA — never two competing buttons in hero
- No hero images — type-led, whitespace-led

---

## Button Styles

```css
/* Primary — Deep Teal fill */
.btn--primary {
  background: var(--color-accent);
  color: #ffffff;
  font-family: 'General Sans', sans-serif;
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background 200ms ease-out;
}
.btn--primary:hover {
  background: var(--color-hover);
}

/* Secondary — outline only */
.btn--secondary {
  background: transparent;
  color: var(--color-foreground);
  border: 1px solid var(--color-foreground);
  font-family: 'General Sans', sans-serif;
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: var(--space-2) var(--space-4);
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 200ms ease-out, color 200ms ease-out;
}
.btn--secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

Rules:
- Never more than one primary button per section
- Ghost/text buttons for low-priority actions
- No icon-only buttons without accessible labels
- No button border-radius above 2px

---

## Feature / Value Proposition Section

```html
<section class="features">
  <div class="features__grid">
    <div class="feature">
      <span class="feature__number">01</span>
      <h3 class="feature__title">Automated follow-up</h3>
      <p class="feature__body">Claude drafts and sends personalised follow-ups for every unanswered quote. You approve once.</p>
    </div>
    <!-- repeat -->
  </div>
</section>
```

Rules:
- Number labels: Satoshi Bold, `--text-4xl`, `--color-neutral`, opacity 0.3
- Title: Satoshi Bold, `--text-xl`
- Body: Inter Regular, `--text-base`, `--color-neutral`
- Grid: 3 columns desktop, 1 column mobile
- No card borders, no card backgrounds — spacing alone separates items
- No icons — numbers are the visual anchor

---

## Social Proof / Case Study Section

```html
<section class="proof">
  <blockquote class="quote">
    <p class="quote__text">"We went from 20% to 61% quote conversion in six weeks."</p>
    <cite class="quote__source">
      <span class="quote__name">Jan de Vries</span>
      <span class="quote__role">Commercial Director, [Company]</span>
    </cite>
  </blockquote>
</section>
```

Rules:
- Quote text: Satoshi Bold, `--text-2xl`, centered, max 20 words
- No quotation mark decorations — the `<blockquote>` is semantic enough
- Source: General Sans uppercase, `--text-xs`, `--color-neutral`
- One quote per section — never a carousel

---

## CTA Section (Bottom of Page)

```html
<section class="cta-section">
  <h2 class="cta-section__heading">Ready to close more deals?</h2>
  <p class="cta-section__sub">Three pilot spots open. No setup cost.</p>
  <a class="btn btn--primary" href="/contact">Apply for Pilot</a>
</section>
```

Rules:
- Background: `--color-foreground` (dark section, white text) — the one moment of contrast
- Heading: Satoshi Bold, `--text-4xl`, color `#ffffff`
- Sub: Inter Regular, `--color-neutral`
- Single CTA only
- Full-width section, centered content, `--space-12` padding

---

## Footer

```html
<footer class="footer">
  <span class="footer__brand">NĀRO</span>
  <nav class="footer__nav">
    <a href="/privacy">Privacy</a>
    <a href="/contact">Contact</a>
  </nav>
  <span class="footer__legal">© 2025 NĀRO. KvK [number].</span>
</footer>
```

Rules:
- Minimal — brand name, essential links, legal line only
- No social icons unless explicitly requested
- Font: General Sans uppercase, `--text-xs`
- Border-top: `1px solid var(--color-foreground)` at 10% opacity
- No footer background color — inherits page background

---

## Animation Rules

When animation is needed:
```css
/* Standard entrance — fade up */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeUp 400ms ease-out forwards;
}
```

Rules:
- Duration: 300–400ms maximum
- Easing: always `ease-out`
- Trigger: IntersectionObserver, not scroll events
- One animated element per section — never animate entire grids at once
- No parallax, no scroll-jacking, no transform-heavy effects

---

## File Structure Convention (GitHub Pages)

```
/
  index.html          — homepage
  /close/
    index.html        — NĀRO Close product page
  /about/
    index.html
  /contact/
    index.html
  /assets/
    /css/
      tokens.css      — CSS custom properties only
      base.css        — reset + typography
      components.css  — all component styles
    /js/
      main.js         — minimal JS only
    /fonts/           — self-hosted fonts
```

Rules:
- No build tools required — plain HTML/CSS/JS only
- CSS split into tokens → base → components (import order matters)
- Fonts self-hosted for performance and privacy
- No external CSS frameworks (no Bootstrap, no Tailwind CDN)
