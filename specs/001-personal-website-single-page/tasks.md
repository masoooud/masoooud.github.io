# Tasks: Sleek Single-Page Personal Website

**Input**: Design documents from `/specs/001-personal-website-single-page/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ui-components.md ✅, quickstart.md ✅

**Tech Stack**: React 18 + Vite 5 + Tailwind CSS 3.4 + Framer Motion 11 + Lucide React  
**Target**: Static site deployed to GitHub Pages via GitHub Actions  
**Animation Profile**: Heavy — canvas particles (Hero), parallax scroll, continuous ambient loops, staggered entrances, interactive hover effects. `prefers-reduced-motion` override required.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[Story]**: User story this task belongs to (US1–US4)
- Exact file paths are specified per task

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Bootstrap the Vite + React project with all required tooling and deployment infrastructure.

- [X] T001 Initialize Vite + React project at repo root (`npm create vite@latest . -- --template react`) then install all dependencies: `npm install framer-motion lucide-react` and dev dependencies: `npm install -D tailwindcss postcss autoprefixer` then run `npx tailwindcss init -p`
- [X] T002 Configure Tailwind CSS — replace `tailwind.config.js` with `darkMode: 'class'`, custom `navy` (950/900/800/700) and `accent` (DEFAULT/dark) colors, `Inter` and `JetBrains Mono` font families, content paths `['./index.html', './src/**/*.{js,jsx}']`
- [X] T003 [P] Configure `vite.config.js` with `base: '/'`, `build: { outDir: 'dist' }`, and React plugin
- [X] T004 [P] Create GitHub Actions deploy workflow at `.github/workflows/deploy.yml` — triggers on push to `main`, runs `npm ci && npm run build`, deploys `dist/` to `gh-pages` branch via `peaceiris/actions-gh-pages@v3`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure — data, theming, utilities, and shell — that ALL user stories depend on. No user story work can begin until this phase is complete.

**⚠️ CRITICAL**: Complete all foundational tasks before starting Phase 3+

- [X] T005 Create `src/data/resume.js` exporting all content objects: `profile` (name, tagline, summary, location, github `https://github.com/masoooud`, linkedin `https://www.linkedin.com/in/masoud-moharrami/`, email `m.masoud.1991@gmail.com`, resumePdf `/resume.pdf`), `skillGroups` (5 groups: languages/cloud-devops/databases/tools/system-design each with id/label/icon/items), `roles` (all 7 roles in reverse-chronological order with isCurrent flag), `projects` (6 projects: MySamanTel, Bourseeco, Yekjakala, Beauty Life, DigiPower, Concert Plus), `navItems` (6 anchor links)
- [X] T006 [P] Create `src/context/ThemeContext.jsx` — 3-mode context (`'system' | 'light' | 'dark'`), reads/writes `localStorage['masoud-portfolio-theme']`, applies/removes `'dark'` class on `document.documentElement`, `matchMedia` listener when in system mode, exports `ThemeProvider` and `useTheme` hook
- [X] T007 [P] Create `src/hooks/useScrollSpy.js` — accepts array of section IDs, uses `IntersectionObserver` to track which section is currently in the viewport, returns the active section ID string
- [X] T008 [P] Create `src/components/ui/SectionHeading.jsx` — accepts `id`, `label`, optional `subtitle` props; renders `<h2>` with accent-colored bottom border underline; Framer Motion `whileInView` fade-in entrance `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }`
- [X] T009 [P] Set up `index.html` — Vite entry point with `<title>Masoud Moharrami — Back-End Engineer & Cloud Specialist</title>`, Google Fonts preconnect for Inter + JetBrains Mono, `<noscript>` fallback block with message "For the full experience, please enable JavaScript. View the resume on GitHub: https://github.com/masoooud", Open Graph meta tags (title, description, og:image placeholder)
- [X] T010 [P] Create `src/index.css` — Tailwind directives (`@tailwind base/components/utilities`), Google Fonts `@import`, `html { scroll-behavior: smooth }`, `body` dark/light base colors via Tailwind classes
- [X] T011 Create `src/main.jsx` wrapping `<App />` in `<ThemeProvider>` and `React.StrictMode`, mounting to `#root`
- [X] T012 Create `App.jsx`
- [X] T031 [P] Create `public/resume.pdf` placeholder — add a minimal PDF (or empty text file renamed to `.pdf`) at `public/resume.pdf` so the "Download CV" CTA does not 404; add code comment `// TODO: Replace with real resume PDF before deployment`
- [X] T032 [P] Create `public/favicon.ico` — generate a simple 32×32 ICO with navy background and white/emerald "M" initials (use a favicon generator tool or commit any valid ICO as placeholder); referenced by T027's `<link rel="icon">` — layout shell importing and rendering all 6 section components in order (`Navbar`, `Hero`, `About`, `Skills`, `Experience`, `Projects`, `Contact`) with `<main>` wrapper; section order matches `navItems`

**Checkpoint**: Foundation ready — all 6 data sets, theming, scroll spy, and shell in place. User story phases can now begin.

---

## Phase 3: User Story 1 — First-Time Visitor Gets an Instant Professional Impression (Priority: P1) 🎯 MVP

**Goal**: Hero visible above the fold with name, tagline, profile photo, CTAs, and animated particle background. Sticky navbar with theme toggle.

**Independent Test**: Open the deployed URL — verify hero is fully visible above the fold with Masoud's full name, tagline, profile photo, and at least one working CTA button. Verify navbar is sticky and theme toggle cycles through system/light/dark.

### Implementation for User Story 1

- [X] T013 [P] [US1] Create `src/components/layout/ThemeToggle.jsx` — `<button>` cycling `system → light → dark → system`, Lucide icons `Monitor/Sun/Moon`, Framer Motion `AnimatePresence` icon crossfade (`opacity: 0, rotate: -90` → `opacity: 1, rotate: 0` → `opacity: 0, rotate: 90`), `aria-label="Switch to [next] mode"`
- [X] T014 [P] [US1] Create `src/components/layout/Navbar.jsx` — sticky top nav reading `navItems` from `src/data/resume.js`, integrates `useScrollSpy` to highlight active section link in accent color (`aria-current="page"`), semi-transparent + backdrop-blur background becoming opaque after scroll past Hero, mobile hamburger with Framer Motion slide-down menu (Lucide `Menu`/`X`), desktop horizontal links, contains `<ThemeToggle />`, mount animation `{ y: -60, opacity: 0 } → { y: 0, opacity: 1 }` duration 0.4s, `<nav aria-label="Main navigation">`
- [X] T015 [P] [US1] Add profile photo placeholder — copy or create `src/assets/profile.jpg` (use a 400×400 px placeholder image; note in a code comment that the real photo should replace this file before deployment)
- [X] T016 [US1] Create `src/components/sections/Hero.jsx` — full-viewport (`min-h-screen`), section `id="hero"`, `<h1>` for `profile.name` with stagger delay 0.1s, tagline delay 0.3s, CTA row delay 0.5s, profile photo as circular `<img>` with `alt="Masoud Moharrami"` and decorative emerald ring, two CTA buttons ("View My Work" → `#projects`, "Download CV" → `profile.resumePdf` with `download` attr), canvas-based particle animation as absolute-positioned background (`<canvas>` element with `requestAnimationFrame` loop rendering floating emerald dots with parallax depth — keep canvas JS ≤ 2 KB inlined in component), scroll-down indicator with `animate-bounce` CSS at bottom center, `prefers-reduced-motion` check disables canvas loop

**Checkpoint**: US1 complete — hero visible above fold, navbar sticky, theme toggle working, profile photo displayed, CTA links functional.

---

## Phase 4: User Story 2 — Visitor Reviews Skills and Experience (Priority: P2)

**Goal**: About section with professional summary, Skills section with grouped animated badges, Experience section with alternating parallax timeline of all 7 roles.

**Independent Test**: Scroll to About — verify professional summary text. Scroll to Skills — verify all 5 skill groups appear with their items. Scroll to Experience — verify all 7 roles are present in reverse-chronological order with company, title, date range, and achievements.

### Implementation for User Story 2

- [X] T017 [P] [US2] Create `src/components/ui/SkillBadge.jsx` — accepts `label` prop; styled chip with navy background and accent text; Framer Motion `whileHover={{ scale: 1.06 }}` spring transition; `prefers-reduced-motion` check disables hover animation
- [X] T018 [P] [US2] Create `src/components/ui/TimelineItem.jsx` — accepts two props: `role` (company, title, startDate, endDate, isCurrent, achievements) and `index: number` (0-based position, passed by `Experience.jsx` via `roles.map((r, i) => <TimelineItem role={r} index={i} />)`); desktop: even `index` → card on left, odd `index` → card on right; vertical center line connector dot; Framer Motion `whileInView` entrance from alternating sides `{ x: index % 2 === 0 ? -40 : 40, opacity: 0 } → { x: 0, opacity: 1 }`, `viewport={{ once: true, margin: '-80px' }}`; `isCurrent` roles highlighted with accent color badge; `<li>` element for semantic timeline list
- [X] T019 [P] [US2] Create `src/components/sections/About.jsx` — section `id="about"`, `<SectionHeading id="about-heading" label="About" />`, two-column desktop layout (text left, profile photo right), renders `profile.summary` as styled paragraph, profile photo circular with emerald ring, Framer Motion `whileInView` entrance `{ opacity: 0, y: 40 } → { opacity: 1, y: 0 }`, `<section aria-labelledby="about-heading">`
- [X] T020 [US2] Create `src/components/sections/Skills.jsx` — section `id="skills"`, `<SectionHeading id="skills-heading" label="Skills" />`, maps `skillGroups` to card grid (2–3 cols desktop, 1 col mobile), each card shows Lucide icon + group label + row of `<SkillBadge />` chips, Framer Motion stagger container `staggerChildren: 0.1` on `whileInView`, continuous ambient gradient loop on each card via `animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}` with `transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}`, `<section aria-labelledby="skills-heading">`, `<div role="group" aria-labelledby>` per group
- [X] T021 [US2] Create `src/components/sections/Experience.jsx` — section `id="experience"`, `<SectionHeading id="experience-heading" label="Experience" />`, maps `roles` array to `<TimelineItem />` components, centered vertical line for desktop via CSS, `<ol aria-label="Work history">` semantic wrapper, Framer Motion `useScroll` + `useTransform` for subtle parallax Y shift on the center line (parallax depth effect), `<section aria-labelledby="experience-heading">`

**Checkpoint**: US2 complete — About, Skills, and Experience all render correctly with animations. All 7 roles visible in reverse-chronological order. All 5 skill groups displayed.

---

## Phase 5: User Story 3 — Visitor Explores Projects (Priority: P3)

**Goal**: Projects section with animated card grid showing all 6 resume projects with descriptions and tech tags.

**Independent Test**: Scroll to Projects — verify at least 3 (ideally all 6) project cards are displayed, each with a title, description, and technology tags.

### Implementation for User Story 3

- [X] T022 [P] [US3] Create `src/components/ui/ProjectCard.jsx` — accepts `project` prop (name, company, description, tech, category); card layout with project name, company badge, description paragraph, tech tag row; Framer Motion `whileHover={{ y: -4, boxShadow: '...' }}` lift effect; optional external link button if `project.link` present (opens in new tab with `rel="noopener noreferrer"`); `<li>` element
- [X] T023 [US3] Create `src/components/sections/Projects.jsx` — section `id="projects"`, `<SectionHeading id="projects-heading" label="Projects" />`, responsive 2–3 column grid of `<ProjectCard />` components mapping `projects` array, Framer Motion stagger container `staggerChildren: 0.08` on `whileInView`, floating particle ambient loop as section background (CSS radial-gradient animation looping at `6s` interval), `<ul aria-label="Featured projects">` wrapper, `<section aria-labelledby="projects-heading">`

**Checkpoint**: US3 complete — all 6 project cards visible with stagger animation on scroll into view.

---

## Phase 6: User Story 4 — Visitor Contacts Masoud (Priority: P4)

**Goal**: Contact section with GitHub, LinkedIn, and mailto links — all functional, opening in new tab.

**Independent Test**: Scroll to Contact — verify GitHub link, LinkedIn link, and email mailto link are all present and clickable. Click each link and confirm it opens in a new tab to the correct destination.

### Implementation for User Story 4

- [X] T024 [US4] Create `src/components/sections/Contact.jsx` — section `id="contact"`, `<SectionHeading id="contact-heading" label="Contact" />`, three link blocks: GitHub (`profile.github`, Lucide `Github` icon, `aria-label="GitHub profile (opens in new tab)"`), LinkedIn (`profile.linkedin`, Lucide `Linkedin` icon), Email (`mailto:${profile.email}`, Lucide `Mail` icon, copy-to-clipboard button on email address using `navigator.clipboard.writeText`); all links `target="_blank" rel="noopener noreferrer"` except mailto; Framer Motion stagger fade-in `staggerChildren: 0.15` on `whileInView`; `<section aria-labelledby="contact-heading">`

**Checkpoint**: US4 complete — all three contact links present, functional, and opening in correct destinations.

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility compliance, motion safety, performance tuning, and pre-deployment verification.

- [X] T025 [P] Add global `prefers-reduced-motion` handling — (a) in `src/index.css` add `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`; (b) in each Framer Motion component use Framer Motion's `useReducedMotion()` hook and short-circuit all `whileInView` / `animate` variant props to instantaneous opacity-only transitions when the hook returns `true`; (c) in `Hero.jsx` canvas loop check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before calling `requestAnimationFrame`
- [X] T026 [P] Verify all external links in `Contact.jsx` and `ProjectCard.jsx` use `target="_blank" rel="noopener noreferrer"` per FR-012; audit all `<a>` tags site-wide
- [X] T027 [P] Add Open Graph and Twitter Card meta tags to `index.html` — `og:title`, `og:description`, `og:url`, `og:image` (placeholder), `twitter:card: summary_large_image`; add `<link rel="icon" href="/favicon.ico">`
- [X] T028 Verify SC-006: scroll through Experience section and confirm all 7 roles appear in reverse-chronological order (CIBC Consultant → CIBC Senior → CIBC Engineer → SynApps → Aftabnet → Kian Tejarat → SamanTel); fix ordering in `src/data/resume.js` if needed
- [X] T029 Verify SC-004 responsive layouts — open site in browser dev tools at 320 px, 768 px, and 1440 px widths; confirm no horizontal overflow, no clipped text, all CTAs tappable; fix any Tailwind responsive class issues
- [X] T030 Verify SC-007 and SC-005 — confirm GitHub link (`https://github.com/masoooud`), LinkedIn link (`https://www.linkedin.com/in/masoud-moharrami/`), and email (`m.masoud.1991@gmail.com`) are all correct and functional
- [X] T033 Run Lighthouse audit (desktop) against the locally-served production build (`npm run build && npx serve dist`); verify performance score ≥ 90 (SC-002) and accessibility score ≥ 90 (SC-003); if performance < 90: reduce particle count in Hero canvas, add `loading="lazy"` to profile photo, audit Framer Motion bundle contribution; if accessibility < 90: fix missing aria labels or contrast issues

---

## Phase 7: Post-Launch Enhancements (May 2026)

**Purpose**: Visual polish and content improvements applied after initial deployment based on user feedback.

- [X] T034 Update `src/data/resume.js` — (a) rewrite `profile.summary` with `**bold**` keyword markers (`Back-end expert`, `Enterprise Microservices`, `Cloud-Native`, `Performance Optimization`, `Agile delivery`) for accent-colored rendering; (b) add `profile.summaryLong` preserving the original prose summary for the About section; (c) add `capabilities` array (4 entries: Microservices & Cloud-Native, Performance Optimization, CI/CD & DevOps, System Architecture) each with `id`, `icon` (Lucide name string), `title`, `description`
- [X] T035 Update `tailwind.config.js` — add custom `animation: { 'spin-slow': 'spin 6s linear infinite' }` for the About section photo gradient ring
- [X] T036 Update `src/components/sections/Hero.jsx` — (a) import `profile.jpg` and render circular avatar (`w-28 h-28 rounded-full ring-4 ring-accent`) above "Hello, I'm" greeting; (b) update summary rendering to parse `**text**` markers and wrap matched segments in `<strong className="text-accent dark:text-accent-dark">` for accent-colored bold keywords
- [X] T037 Update `src/components/sections/About.jsx` — full redesign: (a) add inline stats row (`9+ Years Experience`, `4+ Years in Back-End`, `15+ Enterprise Apps Shipped`) with accent-colored values; (b) split `summaryLong` into two shorter paragraphs; (c) add location pill badge and "Open to senior / staff roles" availability badge using Lucide `MapPin` + `Briefcase`; (d) replace square photo with circular crop inside a slow-spinning conic-gradient ring (`animate-spin-slow`); (e) add labeled `Core Strengths` horizontal divider between bio and cards; (f) render `capabilities` as a 4-column card grid with Lucide icons, `shadow-md` base elevation, and `hover:-translate-y-1 hover:shadow-xl` lift effect

---

## Dependencies (User Story Completion Order)

```
Phase 1 (Setup)
    └── Phase 2 (Foundation) — MUST complete before any story
            ├── Phase 3 (US1: Hero) — MVP deliverable
            ├── Phase 4 (US2: Skills/Experience) — independent after Foundation
            ├── Phase 5 (US3: Projects) — independent after Foundation
            └── Phase 6 (US4: Contact) — independent after Foundation
                        └── Final Phase (Polish) — after all stories complete
```

**Dependency notes**:
- US1, US2, US3, US4 are independent of each other — can be implemented in any order after Phase 2
- `SectionHeading` (T008) is used by all section components; ensure it is complete before Phase 3+
- `SkillBadge` (T017) must complete before `Skills.jsx` (T020)
- `TimelineItem` (T018) must complete before `Experience.jsx` (T021)
- `ProjectCard` (T022) must complete before `Projects.jsx` (T023)
- `public/resume.pdf` (T031) must exist before T016 Hero CTA is testable
- `public/favicon.ico` (T032) must exist before T027 index.html meta tags are testable
- Lighthouse audit (T033) must run after all implementation phases are complete (T001–T030)

---

## Parallel Execution Examples

### Phase 1 parallel opportunities:
```
T001 (npm init) → T002 (Tailwind config) → T003 (Vite config) || T004 (deploy.yml)
```

### Phase 2 parallel opportunities:
```
T005 (resume.js) || T006 (ThemeContext) || T007 (useScrollSpy) || T008 (SectionHeading) || T009 (index.html) || T010 (index.css) || T031 (resume.pdf) || T032 (favicon)
T011 (main.jsx) → T012 (App.jsx)
```

### Phase 3 parallel opportunities:
```
T013 (ThemeToggle) || T014 (Navbar) || T015 (profile photo placeholder)
→ T016 (Hero) [needs T013, T014, T015]
```

### Phase 4 parallel opportunities:
```
T017 (SkillBadge) || T018 (TimelineItem) || T019 (About)
→ T020 (Skills) [needs T017]
→ T021 (Experience) [needs T018]
```

### Phase 5 parallel opportunities:
```
T022 (ProjectCard) → T023 (Projects) [needs T022]
```

### Final phase parallel opportunities:
```
T025 (reduced motion) || T026 (link audit) || T027 (OG tags)
→ T028 (verify roles order) || T029 (responsive) || T030 (contact links)
→ T033 (Lighthouse audit) [after all above pass]
```

---

## Implementation Strategy

**MVP Scope** (Phase 1 + Phase 2 + Phase 3 only):
Delivers a working page with the highest-value section (Hero) plus full infrastructure. Sufficient to deploy and share a URL. US2, US3, US4 can be added incrementally.

**Recommended delivery order**:
1. Phase 1 + Phase 2 (setup + foundation) — parallel where marked
2. Phase 3 (US1: Hero + Navbar) — first visible result
3. Phase 4 (US2: About + Skills + Experience) — core content
4. Phase 5 (US3: Projects) — portfolio showcase
5. Phase 6 (US4: Contact) — conversion endpoint
6. Final Phase (Polish) — pre-deploy quality pass

**Heavy Animation Implementation Notes**:
- Hero canvas particles: implement inline in `Hero.jsx` using a `<canvas>` ref + `useEffect` with `requestAnimationFrame`; draw ~60 emerald dots with random velocity and depth scale; check `window.matchMedia('(prefers-reduced-motion: reduce)')` before starting the loop
- Parallax: use Framer Motion `useScroll()` + `useTransform()` in `Experience.jsx` to shift the timeline center line on scroll
- Ambient loops: Framer Motion `animate` with `repeat: Infinity` on Skills cards (gradient background-position cycle) and Projects section (radial gradient pulse)
- All heavy animations MUST be disabled when `prefers-reduced-motion: reduce` is active (T025)
