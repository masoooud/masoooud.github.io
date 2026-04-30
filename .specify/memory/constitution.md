<!--
SYNC IMPACT REPORT
==================
Version change: (uninitialized) → 1.0.0
Added sections:
  - Core Principles (5 principles)
  - Technology Stack
  - Development Workflow
  - Governance
Modified principles: N/A (initial ratification)
Removed sections: N/A
Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check gates reference these principles
  ✅ .specify/templates/spec-template.md — No structural changes required; principles align
  ✅ .specify/templates/tasks-template.md — No structural changes required; phases align
Follow-up TODOs: None — all fields fully defined
-->

# Masoud Moharrami Personal Website Constitution

## Core Principles

### I. Single-Page Architecture

The website MUST be a single scrollable page with no separate routes or multi-page navigation.
All content sections (hero, about, skills, experience, projects, contact) MUST live within
one HTML document. In-page anchor links are permitted for smooth scroll navigation.
No server-side routing or multi-file page structure is allowed.

**Rationale**: A personal portfolio is scanned quickly; a single page removes friction and
keeps all information immediately accessible without page-load interruptions.

### II. Content Completeness

The page MUST include all of the following sections — none may be omitted:

- **Hero** — Full name, professional tagline, and primary call-to-action (e.g., contact or CV link)
- **About** — Short professional summary (2–4 sentences) derived from the resume
- **Skills** — Grouped technical competencies (languages, cloud/DevOps, databases, tools)
- **Experience** — Chronological work history with company, title, dates, and key achievements
- **Projects** — At least one highlighted personal or professional project with a brief description
- **Contact** — At minimum: email, GitHub profile link, and LinkedIn profile link

Adding additional sections (e.g., blog, testimonials) is permitted but MUST NOT replace
any of the six mandatory sections above.

### III. Static-First Performance

The site MUST be deliverable as a static artifact (pure HTML/CSS/JS or Jekyll-generated).
No backend server, database, or runtime server-side processing is permitted.
JavaScript usage MUST be minimal and purposeful; no heavy SPA frameworks (React, Angular,
Vue) unless the complexity is explicitly justified and approved.
Page MUST achieve a Lighthouse performance score ≥ 90 on desktop.

**Rationale**: GitHub Pages serves static files; runtime dependencies add deployment
complexity with no benefit for a personal portfolio.

### IV. Responsive & Accessible Design

The layout MUST be fully responsive across mobile (≥ 320 px), tablet (≥ 768 px), and
desktop (≥ 1200 px) viewports.
Semantic HTML5 elements MUST be used (`<header>`, `<nav>`, `<section>`, `<footer>`, etc.).
Color contrast MUST meet WCAG 2.1 AA minimum (4.5:1 for body text).
All images MUST have descriptive `alt` attributes.
Interactive elements MUST be keyboard-navigable.

### V. Professional Identity Integrity

All content MUST accurately reflect Masoud Moharrami's actual professional background.
Content MUST be sourced from or consistent with `Masoud Moharrami - Resume.md`.
No fabricated project descriptions, inflated titles, or invented skills are permitted.
Contact links MUST point to real, owned profiles/addresses.

**Rationale**: A personal website is a professional trust signal; inaccurate content
undermines credibility.

## Technology Stack

- **Hosting**: GitHub Pages (`masoooud.github.io`)
- **Build**: Jekyll (already configured via `_config.yml`) or plain static HTML — either is acceptable
- **Styling**: CSS (with or without a preprocessor); a utility framework (e.g., Tailwind CSS) is
  permitted if it does not require a non-static build pipeline
- **Scripting**: Vanilla JavaScript only, unless a justified exception is documented in the feature spec
- **Fonts/Icons**: Web-safe fonts or Google Fonts; icon libraries (e.g., Font Awesome) permitted via CDN
- **No runtime dependencies**: No Node.js server, no PHP, no database

## Development Workflow

- All changes are made on a feature branch and merged to `main` via pull request
- Each feature spec MUST reference at least one of the Core Principles as a compliance gate
- Before marking any task complete, verify the change does not violate Principles I–V
- Lighthouse audit MUST be run before any visual/layout change is considered done
- Resume (`Masoud Moharrami - Resume.md`) is the single source of truth for biographical content;
  update the resume first, then propagate changes to the website

## Governance

This constitution supersedes all other project conventions. Amendments require:

1. A written rationale explaining why the change is needed
2. A version bump following semantic versioning:
   - **MAJOR**: Removal of a mandatory section (Principle II) or fundamental architecture change
   - **MINOR**: Addition of a new mandatory principle or new mandatory section
   - **PATCH**: Clarifications, wording improvements, non-breaking additions to existing principles
3. `LAST_AMENDED_DATE` MUST be updated on every amendment

All implementation tasks MUST pass the Constitution Check gate defined in `plan-template.md`
before work begins.

**Version**: 1.0.0 | **Ratified**: 2026-04-29 | **Last Amended**: 2026-04-29
