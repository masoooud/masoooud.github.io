# Data Model: Sleek Single-Page Personal Website

**Feature**: `001-personal-website-single-page`  
**Branch**: `001-personal-website-single-page`  
**Date**: 2026-04-29  
**Source of truth**: `Masoud Moharrami - Resume.md`

This is a static site — there is no database. The "data model" defines the JavaScript content objects in `src/data/resume.js` that feed all components.

---

## Entity: `Profile`

Represents the owner's top-level identity, displayed in the Hero and About sections.

```js
// src/data/resume.js
export const profile = {
  name: 'Masoud Moharrami',
  tagline: 'Back-End Engineer & Cloud Specialist',
  summary: `Back-end expert with a proven track record for delivering enterprise
applications. Adept at designing and optimizing microservices, improving
application performance, and collaborating in agile environments. Passionate
about evolving as a developer and constantly looking for opportunities to learn.`,
  location: 'Toronto, ON',
  github: 'https://github.com/masoooud',
  linkedin: 'https://linkedin.com/in/masoud-moharrami', // TODO: confirm URL
  email: 'hello@masoudmoharrami.dev',                   // TODO: confirm email
  resumePdf: '/resume.pdf',                              // TODO: provide PDF
};
```

**Fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | ✅ | Full legal name |
| `tagline` | `string` | ✅ | 3–6 word professional tagline for hero |
| `summary` | `string` | ✅ | 2–4 sentence professional bio for About section |
| `location` | `string` | ✅ | City + province |
| `github` | `string (URL)` | ✅ | GitHub profile link |
| `linkedin` | `string (URL)` | ✅ | LinkedIn profile link (TODO) |
| `email` | `string (email)` | ✅ | Contact email (TODO) |
| `resumePdf` | `string (path)` | optional | Relative path to PDF in `public/` |

---

## Entity: `SkillGroup`

Represents a category of technical competencies, displayed in the Skills section as a labelled group of badge chips.

```js
export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    icon: 'Code2',           // Lucide icon name
    items: ['Java', 'Golang', 'JavaScript', 'Node.js', 'React', 'React Native', 'Angular'],
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    icon: 'Cloud',
    items: ['Azure', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Helm', 'Service Mesh'],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: 'Database',
    items: ['Azure SQL', 'Redis', 'PostgreSQL'],
  },
  {
    id: 'tools',
    label: 'Tools & Methods',
    icon: 'Wrench',
    items: ['Git', 'Jira', 'Jenkins', 'Agile', 'Scrum'],
  },
  {
    id: 'system-design',
    label: 'System Design',
    icon: 'Cpu',
    items: [
      'High-level Architecture',
      'Microservices',
      'API Design',
      'Fault Tolerance',
      'Scalability',
      'Performance Optimization',
    ],
  },
];
```

**SkillGroup fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique slug identifier |
| `label` | `string` | ✅ | Display name of category |
| `icon` | `string` | ✅ | Lucide icon component name |
| `items` | `string[]` | ✅ | List of individual skill names |

---

## Entity: `Role`

Represents a single work experience entry. All 7 roles from the resume are included. Displayed in the Experience section as a vertical timeline.

```js
export const roles = [
  {
    id: 'cibc-consultant',
    company: 'CIBC Capital Markets',
    location: 'Toronto, ON',
    title: 'Consultant, Application Developer',
    startDate: 'Jan 2023',
    endDate: 'Present',
    isCurrent: true,
    achievements: [
      'Developing scalable microservices in Java and Golang, utilizing Kubernetes for container orchestration.',
      'Integrated Helm for managing Kubernetes applications, improving deployment consistency and reducing configuration management overhead by 25%.',
      'Used Service Mesh to enhance inter-service communication, improve observability, and implement traffic management for microservices.',
      'Implemented CI/CD pipelines to cut deployment time.',
      'Improved system reliability using Redis caching.',
      'Mentored junior developers in best practices for Java and Golang, increasing team productivity and code quality.',
    ],
  },
  {
    id: 'cibc-senior',
    company: 'CIBC Capital Markets',
    location: 'Toronto, ON',
    title: 'Senior Application Developer',
    startDate: 'Oct 2021',
    endDate: 'Jan 2023',
    isCurrent: false,
    achievements: [
      'Boosted system performance by 20% through application optimizations, including improved database queries and caching strategies.',
      'Migrated legacy systems to Docker and Kubernetes.',
      'Managed and scaled applications across environments using Helm, ensuring consistent and reliable deployments.',
      'Leveraged Service Mesh to streamline microservices communication, enhancing monitoring, tracing, and fault tolerance.',
      'Optimized CI/CD pipelines to reduce deployment overhead.',
    ],
  },
  {
    id: 'cibc-engineer',
    company: 'CIBC Capital Markets',
    location: 'Toronto, ON',
    title: 'Software Engineer',
    startDate: 'May 2021',
    endDate: 'Oct 2021',
    isCurrent: false,
    achievements: [
      'Contributed to migration from monolith to microservices.',
      'Designed RESTful APIs and improved system integration across platforms.',
      'Debugged and optimized application performance, reducing latency by 15%.',
    ],
  },
  {
    id: 'synapps-react',
    company: 'SynApps',
    location: 'Remote',
    title: 'React Developer',
    startDate: 'Dec 2020',
    endDate: 'May 2021',
    isCurrent: false,
    achievements: [
      'Built healthcare application GUI using JavaScript, ES6, React, React Hooks, Redux, and Next.js.',
      'Applied Higher-Order Components to improve code reusability.',
      'Integrated Axios with REST APIs to fetch and secure data.',
    ],
  },
  {
    id: 'aftabnet',
    company: 'Aftabnet Communication Group',
    location: 'Remote',
    title: 'React & React Native Developer',
    startDate: 'Jun 2020',
    endDate: 'Dec 2020',
    isCurrent: false,
    achievements: [
      'Bourseeco — Developed a stock exchange mobile application using React Native and Redux.',
      'Yekjakala — Developed a wholesale shopping mobile application using React Native and Redux.',
    ],
  },
  {
    id: 'kian-tejarat',
    company: 'Kian Tejarat Sharif Co.',
    location: 'Remote',
    title: 'React Native Developer',
    startDate: 'Oct 2019',
    endDate: 'Dec 2019',
    isCurrent: false,
    achievements: [
      'DigiPower — Built a quoting application for an electrical engineering company using React Native.',
      'Concert Plus — Built an application for concert reservation and artist fan page management using React Native.',
    ],
  },
  {
    id: 'samantel',
    company: 'kish Cell Pars (SamanTel)',
    location: 'Remote',
    title: 'React Native Developer',
    startDate: 'Jul 2017',
    endDate: 'Oct 2019',
    isCurrent: false,
    achievements: [
      'MySamanTel — Developed a React Native mobile app for SamanTel telecom users to pay bills and top up prepaid SIM cards.',
    ],
  },
];
```

**Role fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique slug |
| `company` | `string` | ✅ | Employer name |
| `location` | `string` | ✅ | City or "Remote" |
| `title` | `string` | ✅ | Job title |
| `startDate` | `string` | ✅ | "Mon YYYY" format |
| `endDate` | `string` | ✅ | "Mon YYYY" or "Present" |
| `isCurrent` | `boolean` | ✅ | True if current role — highlights with accent color |
| `achievements` | `string[]` | ✅ | Bullet-point achievements from resume |

---

## Entity: `Project`

Represents a notable project highlighted in the Projects section. Sourced exclusively from the resume.

```js
export const projects = [
  {
    id: 'mysamantel',
    name: 'MySamanTel',
    company: 'kish Cell Pars (SamanTel)',
    description:
      'A mobile self-service app for SamanTel telecom users to pay bills and top up prepaid SIM cards.',
    tech: ['React Native', 'Redux'],
    category: 'mobile',
  },
  {
    id: 'bourseeco',
    name: 'Bourseeco',
    company: 'Aftabnet Communication Group',
    description: 'A mobile application for the Iranian stock exchange, providing market data and trading features.',
    tech: ['React Native', 'Redux'],
    category: 'mobile',
  },
  {
    id: 'yekjakala',
    name: 'Yekjakala',
    company: 'Aftabnet Communication Group',
    description: 'A wholesale shopping mobile app enabling bulk product discovery and ordering.',
    tech: ['React Native', 'Redux'],
    category: 'mobile',
  },
  {
    id: 'beauty-life',
    name: 'Beauty Life',
    company: 'Freelance',
    description: 'A mobile app for booking and managing appointments at hair salons and beauty studios.',
    tech: ['React Native'],
    category: 'mobile',
  },
  {
    id: 'digipower',
    name: 'DigiPower',
    company: 'Kian Tejarat Sharif Co.',
    description:
      'A quoting application for electrical engineers to configure and sell products and services based on customer selections.',
    tech: ['React Native'],
    category: 'mobile',
  },
  {
    id: 'concert-plus',
    name: 'Concert Plus',
    company: 'Kian Tejarat Sharif Co.',
    description: 'A concert reservation platform with artist fan page management.',
    tech: ['React Native'],
    category: 'mobile',
  },
];
```

**Project fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | ✅ | Unique slug |
| `name` | `string` | ✅ | Project display name |
| `company` | `string` | ✅ | Employer/client context |
| `description` | `string` | ✅ | 1–2 sentence description |
| `tech` | `string[]` | ✅ | Technology tags |
| `category` | `string` | optional | `'mobile'` \| `'web'` \| `'backend'` for future filtering |

---

## Entity: `NavItem`

Drives the sticky navigation bar.

```js
export const navItems = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];
```

---

## Theme State (runtime — not persisted as content)

Managed by `ThemeContext`, not part of `resume.js`.

```js
// ThemeContext state shape
{
  theme: 'system' | 'light' | 'dark',   // current user preference
  resolvedTheme: 'light' | 'dark',       // actual applied theme (system → resolved)
  setTheme: (theme) => void,
}
```

**Validation rules**:
- `theme` MUST be one of `'system'`, `'light'`, `'dark'`
- `localStorage` key: `'masoud-portfolio-theme'`
- On unrecognized value in localStorage: fall back to `'system'`

---

## Color Design Tokens

Defined as Tailwind CSS extensions in `tailwind.config.js` and as CSS custom properties in `src/index.css`.

```js
// tailwind.config.js — extend colors
colors: {
  navy: {
    950: '#0D1B2A',
    900: '#132238',
    800: '#1B2E45',
    700: '#243C5A',
  },
  accent: {
    DEFAULT: '#10B981',  // emerald-600 — light mode
    dark:    '#34D399',  // emerald-400 — dark mode
  },
}
```

**State transitions for Experience timeline**:
```
Role.isCurrent === true  →  accent color border + "Present" badge
Role.isCurrent === false →  muted border, year range only
```
