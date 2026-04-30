# UI Component Contracts

**Feature**: `001-personal-website-single-page`  
**Date**: 2026-04-29  
**Purpose**: Define the public interface (props, behavior, accessibility) for every React component. Implementors MUST adhere to these contracts. Changes to contracts require updating this file first.

---

## Layout Components

### `Navbar`

**File**: `src/components/layout/Navbar.jsx`  
**Purpose**: Sticky top navigation bar. Links to all 6 sections. Contains `ThemeToggle`. Collapses to hamburger on mobile.

**Props**: _(no external props — reads `navItems` from `src/data/resume.js` internally)_

**Behavior**:
- Sticks to top of viewport (`position: sticky; top: 0; z-index: 50`)
- Background: semi-transparent with backdrop blur; becomes fully opaque after user scrolls past Hero
- Active section link is highlighted in accent color (driven by `useScrollSpy` hook)
- Mobile (< 768px): hamburger `<button>` toggles a slide-down menu; menu closes on link click or outside click
- Desktop (≥ 768px): horizontal list of links
- Smooth scroll on link click via CSS `scroll-behavior: smooth` on `<html>`

**Accessibility**:
- `<nav aria-label="Main navigation">`
- Mobile toggle: `<button aria-label="Open menu" aria-expanded={isOpen}>`
- Active link: `aria-current="page"` on the currently active `<a>`
- All links keyboard-focusable with visible focus ring

**Animation**: Framer Motion `initial={{ y: -60, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}` on mount, `transition={{ duration: 0.4 }}`

---

### `ThemeToggle`

**File**: `src/components/layout/ThemeToggle.jsx`  
**Purpose**: 3-state theme toggle button cycling: `system → light → dark → system`

**Props**: _(no external props — reads/writes `ThemeContext` internally)_

**Behavior**:
- Current state icons: `Monitor` (system), `Sun` (light), `Moon` (dark)
- Click cycles to next state
- Tooltip/aria-label reflects next action (e.g., "Switch to light mode")
- Keyboard: activates on `Enter` and `Space`

**Accessibility**:
- `<button aria-label="Switch to [next] mode">`
- Icon has `aria-hidden="true"`

**Animation**: Icon crossfade via Framer Motion `AnimatePresence` with `initial={{ opacity: 0, rotate: -90 }}` → `animate={{ opacity: 1, rotate: 0 }}` → `exit={{ opacity: 0, rotate: 90 }}`

---

## Section Components

### `Hero`

**File**: `src/components/sections/Hero.jsx`  
**Purpose**: Full-viewport-height opening section with name, tagline, and CTAs.

**Props**: _(reads `profile` from `src/data/resume.js` internally)_

**Behavior**:
- Section `id="hero"`, full viewport height (`min-h-screen`)
- Displays: `profile.name`, `profile.tagline`, `profile.summary` (truncated to 1 sentence in hero), two CTA buttons: "View My Work" (scrolls to `#projects`) and "Download CV" (links to `profile.resumePdf`)
- Optional: subtle animated background (CSS gradient or particle effect via canvas — kept to < 2KB JS)
- Scroll indicator arrow at bottom center

**Accessibility**:
- `<section aria-labelledby="hero-heading">`
- `<h1 id="hero-heading">` for the name
- CTA "Download CV": `<a href="/resume.pdf" download aria-label="Download Masoud Moharrami's CV">`

**Animation**:
- `<h1>`: `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}` delay `0.1s`
- Tagline: same, delay `0.3s`
- CTAs: same, delay `0.5s`
- Scroll indicator: pulse animation via CSS `animate-bounce`

---

### `About`

**File**: `src/components/sections/About.jsx`  
**Purpose**: Professional summary section.

**Props**: _(reads `profile` from `src/data/resume.js` internally)_

**Behavior**:
- Section `id="about"`
- Displays `profile.summary` as a styled paragraph
- Optional: 2-column layout on desktop — text on left, stylized avatar/avatar-placeholder on right

**Accessibility**:
- `<section aria-labelledby="about-heading">`
- `<h2 id="about-heading">About</h2>`

**Animation**: Section entrance `initial={{ opacity: 0, y: 40 }}` → `whileInView={{ opacity: 1, y: 0 }}` `viewport={{ once: true, margin: '-100px' }}`

---

### `Skills`

**File**: `src/components/sections/Skills.jsx`  
**Purpose**: Displays all skill groups as labelled badge clusters.

**Props**: _(reads `skillGroups` from `src/data/resume.js` internally)_

**Behavior**:
- Section `id="skills"`
- Each `SkillGroup` rendered as a card: icon + label heading + row of `SkillBadge` chips
- Desktop: 2–3 column grid of skill group cards
- Mobile: single column

**Accessibility**:
- `<section aria-labelledby="skills-heading">`
- `<h2 id="skills-heading">Skills</h2>`
- Each group: `<div role="group" aria-labelledby="skills-[id]-label">`

**Animation**: Group cards stagger in with `variants={{ container: { staggerChildren: 0.1 } }}` on `whileInView`

---

### `Experience`

**File**: `src/components/sections/Experience.jsx`  
**Purpose**: Vertical timeline of all 7 work roles.

**Props**: _(reads `roles` from `src/data/resume.js` internally)_

**Behavior**:
- Section `id="experience"`
- Desktop: centered vertical line, alternating left/right `TimelineItem` cards
- Mobile: single column, left-aligned line
- Roles displayed in order of `roles` array (reverse-chronological — `isCurrent` first)

**Accessibility**:
- `<section aria-labelledby="experience-heading">`
- `<h2 id="experience-heading">Experience</h2>`
- Timeline: `<ol aria-label="Work history">` with `<li>` per role

**Animation**: Each `TimelineItem` slides in from alternating sides — see `TimelineItem` contract below.

---

### `Projects`

**File**: `src/components/sections/Projects.jsx`  
**Purpose**: Grid of project cards.

**Props**: _(reads `projects` from `src/data/resume.js` internally)_

**Behavior**:
- Section `id="projects"`
- Desktop: 2–3 column responsive grid
- Mobile: single column
- Each project: `ProjectCard` component

**Accessibility**:
- `<section aria-labelledby="projects-heading">`
- `<h2 id="projects-heading">Projects</h2>`
- Cards list: `<ul aria-label="Featured projects">` with `<li>` per card

**Animation**: Cards stagger in with `staggerChildren: 0.08` on `whileInView`

---

### `Contact`

**File**: `src/components/sections/Contact.jsx`  
**Purpose**: Contact links — GitHub, LinkedIn, Email.

**Props**: _(reads `profile` from `src/data/resume.js` internally)_

**Behavior**:
- Section `id="contact"`
- Three link blocks: GitHub icon + URL, LinkedIn icon + URL, Mail icon + email
- Each link: `target="_blank" rel="noopener noreferrer"`
- Optional: copy-to-clipboard button on email

**Accessibility**:
- `<section aria-labelledby="contact-heading">`
- `<h2 id="contact-heading">Contact</h2>`
- Link text is descriptive: `<a aria-label="GitHub profile (opens in new tab)">`

**Animation**: Links fade in with stagger `0.15s` on `whileInView`

---

## UI Primitive Components

### `SectionHeading`

**File**: `src/components/ui/SectionHeading.jsx`  
**Purpose**: Reusable section title with accent-colored underline.

**Props**:
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | ✅ | — | `id` attribute for `aria-labelledby` wiring |
| `children` | `ReactNode` | ✅ | — | Heading text |
| `className` | `string` | optional | `''` | Additional Tailwind classes |

**Renders**: `<h2 id={id} className="...">{children}</h2>` with a decorative `<span>` underline in accent color.

---

### `TimelineItem`

**File**: `src/components/ui/TimelineItem.jsx`  
**Purpose**: Single work history entry in the experience timeline.

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `role` | `Role` | ✅ | Role object from `data-model.md` |
| `index` | `number` | ✅ | Position in timeline (0-based); used to determine left/right alternation on desktop |

**Behavior**:
- Desktop: even `index` → card on left, odd `index` → card on right
- Mobile: always left-aligned
- Displays: `role.title`, `role.company`, `role.location`, date range (`role.startDate – role.endDate`), `role.achievements` as `<ul>`
- `role.isCurrent === true`: accent-color border, "Present" badge

**Accessibility**:
- `<li>` wrapping element (inside `<ol>` in `Experience`)
- Date range in `<time>` element: `<time dateTime="2023-01">Jan 2023</time>`

**Animation**: 
- `index % 2 === 0`: `initial={{ opacity: 0, x: -40 }}` → `whileInView={{ opacity: 1, x: 0 }}`
- `index % 2 !== 0`: `initial={{ opacity: 0, x: 40 }}` → `whileInView={{ opacity: 1, x: 0 }}`
- `transition={{ duration: 0.5, ease: 'easeOut' }}`
- `viewport={{ once: true, margin: '-80px' }}`

---

### `SkillBadge`

**File**: `src/components/ui/SkillBadge.jsx`  
**Purpose**: Individual skill chip/tag.

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | ✅ | Skill display name |

**Renders**: `<span>` styled as a pill badge with JetBrains Mono font, accent border, hover glow effect.

**Animation**: `whileHover={{ scale: 1.06 }}` `transition={{ type: 'spring', stiffness: 400 }}`

---

### `ProjectCard`

**File**: `src/components/ui/ProjectCard.jsx`  
**Purpose**: Display card for a single project.

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `project` | `Project` | ✅ | Project object from `data-model.md` |

**Behavior**:
- Displays: `project.name`, `project.company`, `project.description`, tech tags (rendered as `SkillBadge` each)
- If `project.link` is provided: "View Project" icon button (opens in new tab)
- Card has border + subtle background; hover lifts with shadow

**Accessibility**:
- `<article aria-label="{project.name} project">`

**Animation**: `whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(16,185,129,0.15)' }}`

---

## Custom Hook

### `useScrollSpy`

**File**: `src/hooks/useScrollSpy.js`  
**Purpose**: Returns the `id` of the currently visible section for Navbar active-link highlighting.

**Signature**:
```js
function useScrollSpy(sectionIds: string[], options?: IntersectionObserverInit): string | null
```

**Behavior**:
- Creates one `IntersectionObserver` watching all provided section elements
- Returns the `id` of the section whose top edge is nearest the viewport top
- Re-evaluates on scroll; updates are debounced via `requestAnimationFrame`

---

## Context

### `ThemeContext`

**File**: `src/context/ThemeContext.jsx`  
**Purpose**: Provides theme state to the entire app.

**Exported**:
```js
export const ThemeContext = createContext(null);
export function ThemeProvider({ children }) { ... }
export function useTheme() { return useContext(ThemeContext); }
```

**Shape** (see data-model.md Theme State section)

**Side effects**:
- Reads/writes `localStorage['masoud-portfolio-theme']`
- Adds/removes `'dark'` class on `document.documentElement`
- Adds `matchMedia` change listener when `theme === 'system'`
- Cleans up listener on unmount or theme change away from `'system'`
