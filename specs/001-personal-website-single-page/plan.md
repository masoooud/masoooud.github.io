# Implementation Plan: Sleek Single-Page Personal Website

**Branch**: `001-personal-website-single-page` | **Date**: 2026-04-29 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/001-personal-website-single-page/spec.md`

## Summary

Build Masoud Moharrami's personal portfolio as a single-page React 18 application using Vite 5 and Tailwind CSS 3.4. The page contains six mandatory sections (Hero, About, Skills, Experience, Projects, Contact), features dark/light/system theme switching, a vertical timeline experience layout, Framer Motion scroll animations, and a dark-blue + green color palette. The output is a fully static `dist/` deployed to GitHub Pages via GitHub Actions.

## Technical Context

**Language/Version**: JavaScript ES2022+ / Node.js 20 (build-time only; no runtime server)  
**Primary Dependencies**: React 18, Tailwind CSS 3.4, Vite 5, Framer Motion 11, Lucide React  
**Storage**: N/A — static site; `localStorage` for theme preference only  
**Testing**: Vitest + React Testing Library (optional; no test requirement in spec)  
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge); deployed as static files on GitHub Pages  
**Project Type**: Static web application (Vite-built React SPA, output: static HTML/CSS/JS)  
**Performance Goals**: Lighthouse performance ≥ 90 on desktop (SC-002); Lighthouse accessibility ≥ 90 (SC-003)  
**Constraints**: Static output only (no SSR, no backend); responsive ≥ 320 px; WCAG 2.1 AA contrast; all content present without JS (noscript fallback)  
**Scale/Scope**: Single page, 6 sections, ~15 React components, 1 developer

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Single-Page Architecture | ✅ PASS | React SPA with no React Router; all 6 sections in one `index.html` DOM tree; anchor `<a href="#id">` links with CSS `scroll-behavior: smooth` |
| II. Content Completeness | ✅ PASS | All 6 mandatory sections (Hero, About, Skills, Experience, Projects, Contact) covered in FR-001–FR-007 |
| III. Static-First Performance | ⚠️ JUSTIFIED VIOLATION | React is prohibited "unless complexity is explicitly justified and approved." **Justification**: User explicitly requested React.js. Vite build output is 100% static (HTML/JS/CSS in `dist/`); no runtime server. Framer Motion requires React. Dark/light/system theme management is cleanest with React context. Lighthouse ≥ 90 remains achievable with Vite tree-shaking + code splitting. Documented in Complexity Tracking. |
| IV. Responsive & Accessible | ✅ PASS | Tailwind responsive prefixes (`sm:`, `md:`, `lg:`); semantic HTML5 via React components; color palette verified WCAG AA (see research.md Decision 4) |
| V. Professional Identity Integrity | ✅ PASS | All content sourced exclusively from `Masoud Moharrami - Resume.md`; no fabrication |

**Post-Phase-1 re-check**: All 5 principles pass. Complexity Tracking justification for Principle III is documented below.

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-website-single-page/
├── plan.md              # This file
├── research.md          # Phase 0 output ✅
├── data-model.md        # Phase 1 output ✅
├── quickstart.md        # Phase 1 output ✅
├── contracts/           # Phase 1 output ✅
│   └── ui-components.md
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Sticky nav with section links + theme toggle
│   │   └── ThemeToggle.jsx     # 3-state toggle: system / light / dark
│   ├── sections/
│   │   ├── Hero.jsx            # Full-viewport hero with name, tagline, CTAs
│   │   ├── About.jsx           # Professional summary paragraph
│   │   ├── Skills.jsx          # Grouped skill badges by category
│   │   ├── Experience.jsx      # Timeline container
│   │   ├── Projects.jsx        # Project card grid
│   │   └── Contact.jsx         # Social links + email
│   └── ui/
│       ├── SectionHeading.jsx  # Reusable section title with accent underline
│       ├── TimelineItem.jsx    # Single timeline entry (role)
│       ├── SkillBadge.jsx      # Individual skill tag chip
│       └── ProjectCard.jsx     # Project display card
├── context/
│   └── ThemeContext.jsx        # dark/light/system state + localStorage
├── data/
│   └── resume.js               # All content from resume.md as JS objects
├── hooks/
│   └── useScrollSpy.js         # Active section detection for nav highlighting
├── App.jsx                     # Section assembly + layout shell
├── main.jsx                    # React DOM entry
└── index.css                   # Tailwind directives + CSS custom properties

public/
├── favicon.ico
└── resume.pdf                  # TODO: Masoud to provide

index.html                      # Vite entry; includes <noscript> fallback
vite.config.js                  # base: '/', build: { outDir: 'dist' }
tailwind.config.js              # darkMode: 'class', custom color tokens
postcss.config.js
package.json
.github/
└── workflows/
    └── deploy.yml              # Build + deploy dist/ to gh-pages branch
```

**Structure Decision**: Single-project web application layout. All source under `src/`. Data separated from components via `src/data/resume.js` for clean content maintainability. No `tests/` directory in MVP (no test requirement in spec).  

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| React 18 (Principle III: "no heavy SPA frameworks") | User explicitly requested React.js. Framer Motion's `whileInView` API requires React. Dark/light/system theme toggling is cleanest with React Context (3 modes, localStorage persistence, OS listener). Component-based structure keeps 15+ UI elements maintainable. | Vanilla JS + CSS: Animation system would require manual IntersectionObserver wiring for every section, custom DOM class manipulation for theme, and no component reuse. Net result: equivalent or greater complexity with worse maintainability. Plain HTML/CSS cannot deliver Framer Motion's declarative scroll animations. |
| `<noscript>` fallback instead of true no-JS SSR (FR-010 partial compliance) | Next.js SSG (which enables true no-JS rendering) was rejected in Decision 1 as unnecessary overhead for a single page. | No-JS full render requires SSR/SSG (Next.js), which conflicts with the user's explicit choice of Vite + React and the static-GitHub-Pages deployment model. The `<noscript>` fallback with a direct GitHub link to the resume is the standard industry mitigation. |
