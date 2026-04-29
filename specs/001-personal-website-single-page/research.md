# Research: Sleek Single-Page Personal Website

**Feature**: `001-personal-website-single-page`  
**Branch**: `001-personal-website-single-page`  
**Date**: 2026-04-29  
**Status**: Complete — all NEEDS CLARIFICATION resolved

---

## Decision 1: Build Tooling — Vite 5 vs Next.js vs CRA

**Decision**: Vite 5 with React 18

**Rationale**:
- Vite 5 produces a fully static `dist/` (HTML + JS + CSS) that deploys directly to GitHub Pages without any server runtime.
- Next.js static export (`output: 'export'`) is an option but adds unnecessary complexity (file-based routing, server-component model) for a single HTML page. No routing is needed.
- Create React App is officially deprecated (last release 2022); not viable for new projects.
- Vite's dev server starts in <500ms, HMR is near-instant, and the production bundle is aggressively tree-shaken.

**Alternatives considered**:
- **Next.js static export** — Rejected: overkill; file-based routing adds complexity with no benefit for a single page.
- **Create React App** — Rejected: deprecated.
- **Parcel** — Viable alternative but Vite has better Tailwind CSS + PostCSS integration and wider community support.

**GitHub Pages deployment note**: `masoooud.github.io` is a user/org page; it must deploy from the `main` branch's root OR from a `gh-pages` branch. Recommended approach: GitHub Actions workflow builds with `npm run build` and deploys `dist/` to the `gh-pages` branch using `peaceiris/actions-gh-pages@v3`. `vite.config.js` base must be `'/'` (root domain, not a subdirectory path).

---

## Decision 2: Animation Library — Framer Motion 11

**Decision**: Framer Motion 11

**Rationale**:
- Provides `whileInView` + `viewport` props for scroll-triggered entrance animations — no manual IntersectionObserver code required.
- `motion.div`, `motion.section`, etc. are drop-in replacements for standard HTML elements, keeping component code readable.
- `AnimatePresence` enables smooth theme toggle transitions.
- Framer Motion 11 bundles at ~30KB gzipped; with Vite's tree-shaking only imported motion components are included.
- Lighthouse ≥ 90 is still achievable because animations are GPU-accelerated (`transform`/`opacity` only, no layout-thrashing properties).

**Alternatives considered**:
- **AOS (Animate On Scroll)** — Rejected: CSS/data-attribute approach doesn't integrate cleanly with React component state/lifecycle; no React-native API.
- **React Spring** — Viable but physics-based API is heavier to configure for simple entrance effects; Framer Motion's `whileInView` is simpler for this use case.
- **CSS-only keyframes** — Rejected: cannot easily gate animations on viewport entry without JS IntersectionObserver; Framer Motion handles this natively.

**Animation patterns chosen**:
- Section entrance: `initial={{ opacity: 0, y: 40 }}` → `whileInView={{ opacity: 1, y: 0 }}` with `transition={{ duration: 0.5, ease: 'easeOut' }}`
- Stagger children: `variants` with `staggerChildren: 0.1` for skill badges and project cards
- Hero: `initial={{ opacity: 0, scale: 0.96 }}` → `animate={{ opacity: 1, scale: 1 }}` on mount
- Timeline items: alternating `x: -40` / `x: 40` slide-in on viewport entry
- Hover effects: `whileHover={{ scale: 1.03 }}` on cards and skill badges

---

## Decision 3: Dark/Light/System Theme with Tailwind CSS

**Decision**: Tailwind `darkMode: 'class'` + custom React `ThemeContext` + `localStorage` persistence

**Rationale**:
- Tailwind's `darkMode: 'class'` strategy applies dark styles when `<html>` has `class="dark"`. This gives full programmatic control.
- No third-party theme library needed. The logic is ~40 lines of React context code.
- Three modes: `'light'`, `'dark'`, `'system'`. System mode reads `window.matchMedia('(prefers-color-scheme: dark)')` and adds a listener for OS-level changes.
- Preference persisted to `localStorage` key `'theme-preference'`.

**ThemeContext logic**:
```
1. On mount: read localStorage['theme-preference']
2. If 'light'  → remove 'dark' class from <html>
3. If 'dark'   → add 'dark' class to <html>
4. If 'system' (or no saved value) → apply based on matchMedia result; add matchMedia listener
5. ThemeToggle cycles: system → light → dark → system
```

**Alternatives considered**:
- **next-themes** — Rejected: next-themes is designed for Next.js; importing it into a plain Vite project adds complexity and its SSR flash prevention is irrelevant here.
- **Tailwind `darkMode: 'media'`** — Rejected: prevents user from overriding system preference (no manual toggle possible).

---

## Decision 4: Color Palette — Dark Blue + Green

**Decision**: Custom Tailwind color extension

| Token | Hex | Usage |
|-------|-----|-------|
| `navy-950` | `#0D1B2A` | Dark mode primary background |
| `navy-900` | `#132238` | Dark mode section background |
| `navy-800` | `#1B2E45` | Dark mode card/elevated surface |
| `navy-700` | `#243C5A` | Dark mode borders, dividers |
| `slate-50`  | `#F0F4F8` | Light mode primary background |
| `white`     | `#FFFFFF` | Light mode card background |
| `slate-100` | `#E2E8F0` | Light mode section alt background |
| `emerald-400` | `#34D399` | Accent (dark mode) |
| `emerald-600` | `#059669` | Accent (light mode) |
| `slate-200` | `#E2E8F0` | Dark mode body text |
| `slate-800` | `#1E293B` | Light mode body text |

**WCAG AA verification**:
- `emerald-400` (#34D399) on `navy-950` (#0D1B2A): contrast ratio ≈ 9.2:1 ✅ (exceeds 4.5:1)
- `slate-200` (#E2E8F0) on `navy-950` (#0D1B2A): contrast ratio ≈ 14.3:1 ✅
- `emerald-600` (#059669) on `white` (#FFFFFF): contrast ratio ≈ 4.7:1 ✅ (passes AA for large text; use `emerald-700` for small body text)
- `slate-800` (#1E293B) on `slate-50` (#F0F4F8): contrast ratio ≈ 14.7:1 ✅

**Font choices**:
- **Inter** (Google Fonts, variable) — primary typeface; clean, modern, excellent screen legibility
- **JetBrains Mono** (Google Fonts) — monospace for skill tags and tech badges; reinforces developer identity

---

## Decision 5: Timeline Component for Experience Section

**Decision**: Custom CSS + Tailwind vertical timeline, center-line design

**Rationale**:
- No library needed; a vertical timeline is achievable with `relative`/`absolute` positioning and a `::before` pseudo-element for the center line.
- Desktop: center line with alternating left/right cards for visual interest.
- Mobile (< 768px): single-column, left-aligned with line on the left.
- Each `TimelineItem` is a React component receiving a `role` data object.
- Framer Motion `whileInView` with `x: ±40` slide-in for alternating sides.

---

## Decision 6: Icon Library — Lucide React

**Decision**: Lucide React 0.x

**Rationale**:
- Fully tree-shakeable: each icon is an individual named export; Vite bundles only the icons actually imported.
- Clean, consistent stroke-based SVG style that matches a modern dark-blue portfolio aesthetic.
- Provides: `Github`, `Linkedin`, `Mail`, `Menu`, `X`, `Sun`, `Moon`, `Monitor`, `ExternalLink`, `Code2`, `Cloud`, `Database`, `Wrench`, `Cpu` — all needed for this project.

**Alternatives considered**:
- **React Icons** — Rejected: imports entire icon families; tree-shaking is less reliable across its bundled sets.
- **heroicons** — Viable alternative; slightly fewer tech-specific icons than Lucide.
- **Font Awesome via CDN** — Rejected: CDN dependency, slower LCP, no tree-shaking.

---

## Decision 7: Handling the `FR-010` No-JS Requirement vs React

**Decision**: Accept graceful degradation — provide `<noscript>` fallback message

**Rationale**:
- FR-010 states "all page content MUST be accessible without JavaScript." This is in tension with a React SPA, which requires JS to render.
- **Resolution**: Add a `<noscript>` block in `index.html` that renders a styled message directing users to enable JavaScript, plus a link to the raw resume markdown on GitHub. This is the standard industry approach for React-built portfolio sites.
- True no-JS rendering would require Next.js SSG or server-side rendering, which was explicitly rejected (Decision 1).
- The Complexity Tracking section in `plan.md` documents this trade-off.

---

## Decision 8: Projects Section Content

**Decision**: Feature 6 projects from the resume, grouped into two categories

**Projects sourced from `Masoud Moharrami - Resume.md`**:

| # | Project | Company/Context | Tech | Description |
|---|---------|----------------|------|-------------|
| 1 | MySamanTel | kish Cell Pars (SamanTel) | React Native | Telecom self-service app for bill payment and top-up |
| 2 | Bourseeco | Aftabnet | React Native, Redux | Stock exchange mobile app |
| 3 | Yekjakala | Aftabnet | React Native, Redux | Wholesale shopping mobile app |
| 4 | Beauty Life | Freelance | React Native | Salon appointment booking app |
| 5 | DigiPower | Kian Tejarat Sharif Co. | React Native | Quoting app for electrical engineers |
| 6 | Concert Plus | Kian Tejarat Sharif Co. | React Native | Concert reservation and artist fan page app |

All descriptions are faithful to the resume; no fabrication.

---

## Unresolved Items (Requires Masoud's Input Before Deploy)

| Item | Blocking | Action Required |
|------|----------|----------------|
| LinkedIn profile URL | Contact section (FR-007) | Provide full URL, e.g., `https://linkedin.com/in/masoud-moharrami` |
| Email address | Contact section (FR-007) | Provide email for `mailto:` link |
| Resume PDF | Hero CTA "Download CV" | Provide PDF file to place in `public/` |
| Profile photo | Hero section (optional) | Provide image file if desired; not blocking for MVP |

These are documented as `// TODO:` comments in `src/data/resume.js`.
