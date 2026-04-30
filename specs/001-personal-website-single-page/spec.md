# Feature Specification: Sleek Single-Page Personal Website

**Feature Branch**: `001-personal-website-single-page`  
**Created**: 2026-04-29  
**Status**: Draft  
**Input**: User description: "I want my website look interesting and sleek, something that would stand out. should have below sections: Hero, About, Skills, Experience, Projects, Contact. the data can be fetched from the attached md file."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - First-Time Visitor Gets an Instant Professional Impression (Priority: P1)

A recruiter or potential employer lands on the website for the first time. Within seconds they see Masoud's name, title, and a clear call-to-action to view his resume or contact him. The visual design is modern and polished — it immediately communicates professionalism and technical credibility.

**Why this priority**: The hero section is the first thing any visitor sees; if it fails to engage, no other section matters. This is the single highest-value touchpoint.

**Independent Test**: Open the deployed URL on desktop and mobile. Verify the hero is visible above the fold, displays the correct name and tagline, and the CTA link is clickable — without scrolling further.

**Acceptance Scenarios**:

1. **Given** a visitor opens the website URL, **When** the page loads, **Then** the hero section is fully visible above the fold with Masoud's full name ("Masoud Moharrami"), a professional tagline, and at least one call-to-action button.
2. **Given** the hero is visible, **When** the visitor clicks the call-to-action, **Then** they are either scrolled to the Contact section or a downloadable CV is triggered.
3. **Given** a visitor on a mobile device (≥ 320 px wide), **When** the page loads, **Then** the hero content is legible, not clipped, and the CTA remains tappable.

---

### User Story 2 - Visitor Reviews Skills and Experience (Priority: P2)

A technical interviewer scrolls through the page to assess Masoud's technical depth. They read the Skills section to see grouped competencies, then the Experience section to see a chronological career history with concrete achievements.

**Why this priority**: Skills and experience are the core evaluation content; recruiters spend the most time here after the hero impression.

**Independent Test**: Scroll to the Skills section and verify all skill groups from the resume appear. Scroll to Experience and verify at minimum three employer entries with titles, dates, and at least one achievement bullet each.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to Skills, **When** they view the section, **Then** skills are visually grouped into categories matching the resume (Languages, Cloud & DevOps, Databases, Tools, System Design).
2. **Given** a visitor scrolls to Experience, **When** they view the section, **Then** every role from the resume is listed in reverse-chronological order with company name, title, date range, and at least one achievement.
3. **Given** a visitor on any screen width ≥ 320 px, **When** they view Skills or Experience, **Then** all content is readable without horizontal scrolling.

---

### User Story 3 - Visitor Explores Projects (Priority: P3)

A curious visitor wants to see what Masoud has built. They scroll to the Projects section and find a curated list of notable projects with brief descriptions, making it easy to understand the scope of his work.

**Why this priority**: Projects demonstrate applied skills; important for technical credibility but less urgent than the mandatory content sections above.

**Independent Test**: Scroll to Projects and verify at least three projects are listed, each with a name, short description, and relevant technologies used.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to Projects, **When** they view the section, **Then** at least three projects are displayed, each with a title and a 1–2 sentence description.
2. **Given** a project is displayed, **When** the visitor reads it, **Then** the technologies or context (e.g., React Native, Kubernetes) are clearly mentioned.

---

### User Story 4 - Visitor Contacts Masoud (Priority: P4)

A recruiter or collaborator wants to reach out. They scroll to the Contact section and find email and social profile links clearly displayed, enabling them to initiate contact with no friction.

**Why this priority**: Contact is the conversion endpoint; it must exist and work, but is reached only after the visitor is already interested.

**Independent Test**: Scroll to Contact and verify at least an email address (or mailto link), GitHub link, and LinkedIn link are present and clickable.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to Contact, **When** they view the section, **Then** they see at least: a GitHub profile link, a LinkedIn profile link, and a way to send an email.
2. **Given** the visitor clicks a contact link, **When** the action resolves, **Then** they are taken to the correct external destination or their email client opens pre-addressed to Masoud's email.

---

### Edge Cases

- What happens when the visitor's browser has JavaScript disabled? The page MUST still display all content (no JS-only content rendering).
- What happens on very small screens (320 px width)? Text and buttons must remain readable; no overflow or clipping.
- What happens if a section anchor link is clicked mid-scroll? The page MUST smooth-scroll to the target section without jumping.
- What happens if an external link (GitHub, LinkedIn) is broken? Links must open in a new tab; the main page remains unaffected.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST render as a single scrollable HTML document with six named sections: Hero, About, Skills, Experience, Projects, Contact.
- **FR-002**: The Hero section MUST display Masoud Moharrami's full name, a professional tagline ("Back-end Engineer & Cloud Specialist" or equivalent), at least one call-to-action element, and a profile photo (`/src/assets/profile.jpg` or equivalent path).
- **FR-003**: The About section MUST display a 2–4 sentence professional summary consistent with the resume summary. Hobbies and personal interests are explicitly excluded.
- **FR-004**: The Skills section MUST display technical competencies grouped by category: Languages, Cloud & DevOps, Databases, Tools, System Design.
- **FR-005**: The Experience section MUST list every role from the resume in reverse-chronological order, including company, title, date range, and key achievements.
- **FR-006**: The Projects section MUST highlight at least three notable projects sourced from the resume (e.g., MySamanTel, Bourseeco, DigiPower, Beauty Life), each with a name, description, and technology context.
- **FR-007**: The Contact section MUST include a GitHub profile link, a LinkedIn profile link, and an email contact mechanism.
- **FR-008**: A sticky or scroll-triggered navigation bar MUST allow visitors to jump to any of the six sections via anchor links.
- **FR-009**: The design MUST be visually distinctive using a heavy animation profile: particle/canvas background in the Hero, parallax depth effects on scroll, continuous ambient animations (e.g., floating elements or gradient loops), section entrance animations with staggered children, and interactive hover effects on all cards and badges. A `prefers-reduced-motion` media query MUST disable or minimize all motion for accessibility compliance (WCAG AA). Note: heavy animations may impact Lighthouse performance (SC-002); bundle size and animation performance must be monitored.
- **FR-010**: All page content MUST have a no-JS fallback: a `<noscript>` message with a direct link to the GitHub resume MUST be present. Full content rendering requires JavaScript (React SPA — justified deviation from progressive enhancement; documented in plan.md Complexity Tracking).
- **FR-011**: The page MUST be fully responsive across mobile (≥ 320 px), tablet (≥ 768 px), and desktop (≥ 1200 px).
- **FR-012**: All external links MUST open in a new tab (`target="_blank"` with `rel="noopener noreferrer"`). Exception: `mailto:` links are exempt from `target="_blank"` as they invoke the system email client, not a browser tab.

### Key Entities

- **Section**: A named, anchor-linked content block within the single page (Hero, About, Skills, Experience, Projects, Contact). Each section has an `id`, a heading, and section-specific content.
- **Role**: A work experience entry with fields: company name, job title, date range, location, and a list of achievement bullets.
- **Project**: A highlighted work item with fields: project name, short description, technology tags, and optionally a link.
- **Skill Group**: A category of technical skills with a label (e.g., "Cloud & DevOps") and a list of items.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All six sections (Hero, About, Skills, Experience, Projects, Contact) are visible and correctly populated when the page is opened in a browser with no errors in the browser console.
- **SC-002**: The page achieves a Lighthouse performance score ≥ 90 on desktop.
- **SC-003**: The page achieves a Lighthouse accessibility score ≥ 90.
- **SC-004**: All content renders correctly on screen widths of 320 px, 768 px, and 1440 px — verified by visual inspection in browser dev tools.
- **SC-005**: A first-time visitor can locate and click the Contact links within 30 seconds of landing on the page.
- **SC-006**: All seven roles from the resume appear in the Experience section in reverse-chronological order.
- **SC-007**: All external links (GitHub, LinkedIn, email) are functional and open in a new tab.

## Clarifications

### Session 2026-04-29

- Q: What should the Contact section use for email contact? → A: `mailto:` link only — pure static, no third-party service
- Q: What is your actual email address and LinkedIn URL? → A: email = `m.masoud.1991@gmail.com`, LinkedIn = `https://www.linkedin.com/in/masoud-moharrami/`
- Q: Should the Hero section include a profile photo? → A: Yes — include a real profile photo (image to be provided)
- Q: Should the About section include hobbies (soccer, volleyball, camping)? → A: No — professional summary only
- Q: What animation intensity should the site use? → A: Heavy — parallax, continuous loops, particle backgrounds
- Analysis remediation (2026-04-29): FR-010 clarified (React SPA + noscript fallback); FR-012 mailto exception added; tasks.md updated with T031 (resume.pdf), T032 (favicon), T033 (Lighthouse audit); T010 deduplicated; T018 index prop made explicit

## Assumptions

- Masoud's GitHub username is `masoooud` (inferred from the repository URL `masoooud.github.io`).
- A profile photo will be provided by Masoud and placed at `src/assets/profile.jpg`. A placeholder image is acceptable during development.
- LinkedIn profile URL: `https://www.linkedin.com/in/masoud-moharrami/`
- Email address: `m.masoud.1991@gmail.com`
- The "Projects" section draws from mobile apps listed in the resume; no additional projects beyond the resume are fabricated.
- The visual theme (color palette, fonts) will default to a dark-background, light-text design with a single accent color — a common pattern for developer portfolios. This can be adjusted during implementation.
- The Contact section uses a plain `mailto:` link — no third-party form service (e.g., Formspree) required. Pure static approach with no external dependencies.
- The site is hosted on GitHub Pages; the existing Jekyll configuration (`_config.yml`) may be replaced with plain HTML/CSS/JS if a Jekyll-free approach is simpler.
- Smooth-scroll behavior is implemented via CSS (`scroll-behavior: smooth`) or a small vanilla JS snippet — no full JavaScript framework.
