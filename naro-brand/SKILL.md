---
name: naro-brand
description: NĀRO brand identity, design tokens, color system, typography, and visual language. Use when building any UI, component, page, or layout for the NĀRO website or any NĀRO product.
---

# NĀRO Brand Identity

## Brand DNA

NĀRO is Japandi Tech — Muji meets Linear.
Minimalist. Premium. Japanese-inspired restraint.

The aesthetic is defined by what is removed, not what is added.
Every element must earn its place. Silence is a design choice.

---

## Color Tokens

Always use CSS custom properties. Never hardcode hex values.

```css
:root {
  --color-background: #F5F5F3; /* Warm Off-White — primary background */
  --color-foreground: #0A0A0A; /* Zen Black — text, borders, icons */
  --color-accent:     #0E7C66; /* Deep Teal — CTAs, active states, highlights */
  --color-neutral:    #94A3B8; /* Smokey Grey — secondary text, placeholders */
  --color-hover:      #0A5C4D; /* Teal Hover — hover state for accent elements */
  --color-sand:       #F3EEE7; /* Sand — print variant, doc backgrounds */
}
```

Usage rules:
- Background is always `--color-background` or white. Never arbitrary greys.
- Body text is always `--color-foreground`.
- Accent is used sparingly — one focal point per section, maximum.
- Neutral is for supporting text only, never for headings or CTAs.
- Sand is for document-style sections or subtle surface variation.

---

## Typography

### Font Stack

```css
/* Headings */
font-family: 'Satoshi', 'Neue Montreal', sans-serif;
font-weight: 700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;
line-height: 1.7;

/* UI Labels */
font-family: 'General Sans', sans-serif;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 0.12em;
```

### Type Scale

```css
:root {
  --text-xs:   0.75rem;   /* 12px — captions, meta */
  --text-sm:   0.875rem;  /* 14px — UI labels, footnotes */
  --text-base: 1rem;      /* 16px — body copy */
  --text-lg:   1.125rem;  /* 18px — lead text */
  --text-xl:   1.25rem;   /* 20px — small headings */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-5xl:  3rem;      /* 48px — hero headings */
  --text-6xl:  3.75rem;   /* 60px — display */
}
```

Typography rules:
- Headings: Satoshi/Neue Montreal Bold only. Never light weight for headings.
- Body: Inter Regular at 1.7 line-height. Generous, breathable text.
- Labels: General Sans, uppercase, tracked out. Used for nav, tags, section markers.
- Never mix more than two font families in one section.

---

## Spacing System

Base unit: 8px. All spacing is a multiple of 8.

```css
:root {
  --space-1:  8px;
  --space-2:  16px;
  --space-3:  24px;
  --space-4:  32px;
  --space-6:  48px;
  --space-8:  64px;
  --space-12: 96px;
}
```

Spacing rules:
- Section padding: minimum `--space-12` top and bottom.
- Component internal spacing: `--space-3` to `--space-4`.
- Never use arbitrary pixel values. Always reference the scale.
- Generous whitespace is intentional — it communicates premium.

---

## Layout Principles

- Max content width: 1200px, centered.
- Column grid: 12 columns, 24px gutters.
- Sections are full-width backgrounds with centered content containers.
- Asymmetry is allowed and encouraged — not everything needs to be centered.
- Let content breathe. Crowding is a brand violation.

---

## NĀRO Never Does

These are absolute constraints. No exceptions.

- ❌ No gradients — backgrounds are flat, never gradient fills
- ❌ No drop shadows — elevation is communicated through spacing, not shadow
- ❌ No rounded corners on structural elements (cards, sections, containers)
  - Buttons may have subtle border-radius: 2px maximum
- ❌ No stock photos — visuals are abstract, typographic, or product-only
- ❌ No AI buzzwords in copy — no "leverage", "cutting-edge", "revolutionary", "harness"
- ❌ No busy animations — transitions max 300ms, easing: ease-out
- ❌ No decorative icons for their own sake
- ❌ No borders used as decoration — borders are structural only
- ❌ No multiple accent colors — Deep Teal is the only accent

---

## Tone in Code Comments and Naming

Variable names, class names, and comments should reflect the brand:
- Clean, descriptive, no cleverness for its own sake
- BEM or utility-first naming — no cryptic abbreviations
- Comments explain *why*, not *what*
