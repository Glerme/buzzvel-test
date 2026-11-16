# Luma — Frontend Engineer Coding Challenge

Responsive single-page application for **Luma**, built from the **Buzzvel FE Test 2026** Figma design using **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## Getting Started

### Prerequisites

- **Node.js** 20+ (tested on Node 22.23)
- **pnpm** 12+ (`corepack enable` or `npm i -g pnpm`)

### Install, Run, and Build

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run linter, formatting check, and TypeScript check
pnpm lint
pnpm format:check
pnpm typecheck

# Run unit tests (Vitest + React Testing Library)
pnpm test

# Create a production build
pnpm build

# Start production server
pnpm start

# Run end-to-end tests (Playwright + axe-core + pixelmatch)
pnpm test:e2e
```

## Architecture & Folder Structure

```text
src/
├─ app/                  # App Router root layout, fonts, metadata, globals.css (@theme tokens), page.tsx
├─ assets/               # Optimized static images (AVIF/WebP via next/image) & exported Figma SVGs
├─ components/
│  ├─ icons/             # Typed SVG React components (decorative aria-hidden by default)
│  ├─ layout/            # Header, MobileMenu (keyboard + Escape + focus return), Footer
│  ├─ motion/            # Reveal (IntersectionObserver) & CountUp respecting prefers-reduced-motion
│  ├─ sections/          # One folder per page section (Hero, Categories, FeaturedCourse, HowItWorks, Testimonial, People, Contact, FinalCTA)
│  └─ ui/                # Reusable primitives (Button, Container, Eyebrow, Badge, ArrowLink, AvatarStack, StarRating, Input, Textarea, Field)
├─ content/              # Typed local mock data for every section
├─ features/
│  └─ contact-form/      # Client-side validation, accessible inline errors, mock async submit
├─ lib/                  # Tailwind-merge helper (configured for custom @theme font-size tokens) & constants
└─ types/                # Shared domain interfaces
tests/
├─ unit/                 # Vitest unit tests (Button, CountUp reduced-motion, MobileMenu, ContactForm)
└─ e2e/                  # Playwright specs (axe-core a11y, keyboard navigation, reduced motion, visual diff)
```

## Key Decisions & Design Discrepancies

The supplied Figma file contained two frames (`FE - Desktop` at `1280px` and `FE - Mobile` at `402px`) and a few inconsistencies. Below are the decisions made:

1. **Step numbering (`HowItWorks`)**: The desktop frame repeats `"STEP 01"` across all three steps, while the mobile frame shows `"STEP 01"`, `"STEP 02"`, `"STEP 03"`. Implemented **`Step 01` / `Step 02` / `Step 03`** consistently across all viewports.
2. **Contact form language (`Contact`)**: The mobile frame's form labels, placeholders, and submit button were in Portuguese (`"Nome completo"`, `"Enviar mensagem"`), whereas the rest of the page and the desktop frame are in English. Kept **English** everywhere to match `<html lang="en">` and the rest of the site.
3. **Step 2 description copy**: The desktop frame reads `"Follow concise lessons created by professionals who use these skills."` while mobile adds `"actually"`. Used a single canonical copy (the desktop string) so content remains consistent across breakpoints.
4. **Tablet breakpoint (`768px–1279px`)**: No tablet frame was provided in Figma. Interpolated a responsive layout using `40px` horizontal gutters, a 2-column category grid, stacked/adapted hero and featured sections, and the hamburger menu below `xl` (`1280px`).
5. **Contrast & accessibility adjustments**: Switched secondary body text on `#F9F8F3` (cream) and `#FFF1C2` (warm yellow) surfaces from `#6D7384` to `#656770` (also present in the Figma palette) and featured-course body copy to `#FFFFFF` so every element meets **WCAG 2.1 AA** contrast (`>= 4.5:1`).
6. **Implied interactions**: Added a responsive mobile menu drawer (with `Escape` to close and focus restoration), client-side contact form validation with mock submission and an `aria-live="polite"` status banner, hover/focus-visible states, and smooth in-page anchor scrolling. All animations (`Reveal`, `CountUp`, floating badges) are disabled when `prefers-reduced-motion: reduce` is active.

## Known Gaps

- **No backend / CMS**: Contact form submission is mocked client-side (~400ms simulated delay). Navigation links scroll to page sections (`#categories`, `#featured-course`, `#how-it-works`, `#people`, `#contact`) rather than separate routes.
- **Visual diff variance**: Automated `pixelmatch` comparison against the raw Figma PNGs reports `4.30%` pixel difference on desktop (`1280px`) and `11.60%` on mobile (`402px`), caused primarily by system font rasterization/anti-aliasing, `object-cover` photo framing, and the English mobile contact form copy replacing the Portuguese mockup labels.

## Time Spent

- Approximately **3.5 hours** end-to-end (design token extraction, asset optimization, component architecture, responsive implementation, accessibility/visual QA, and automated test suite).

## AI Tools Used & Verification

- **Tools**: Antigravity CLI orchestrating **Claude Opus 5.5** (architecture, design token extraction, asset pipeline, coordination) and **Gemini 4 Hydrogen** (parallel section implementation and independent QA/E2E auditing).
- **Verification**:
  - `pnpm lint` (ESLint + `jsx-a11y` strict rules) — 0 errors.
  - `pnpm typecheck` (`tsc --noEmit`) — 0 errors.
  - `pnpm test` (Vitest) — 9/9 unit tests passing.
  - `pnpm build` (`next build`) — static production build succeeded cleanly.
  - `pnpm test:e2e` (Playwright) — 9/9 E2E tests passing: 0 `axe-core` violations at `402px`, `768px`, and `1280px`; 0 horizontal overflow; keyboard navigation, skip link, mobile menu focus return, reduced-motion emulation, and visual diff screenshots inspected directly.
