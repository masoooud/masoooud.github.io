# Quickstart: Sleek Single-Page Personal Website

**Feature**: `001-personal-website-single-page`  
**Branch**: `001-personal-website-single-page`  
**Date**: 2026-04-29

---

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | ≥ 20.x | `node --version` |
| npm | ≥ 10.x | `npm --version` |
| Git | any | `git --version` |

---

## 1. Initialize the Project

From the repository root:

```bash
# Create a Vite + React project (answer prompts: framework=React, variant=JavaScript)
npm create vite@latest . -- --template react

# Install dependencies
npm install

# Install Tailwind CSS and PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Framer Motion
npm install framer-motion

# Install Lucide React icons
npm install lucide-react
```

---

## 2. Configure Tailwind CSS

Replace the generated `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0D1B2A',
          900: '#132238',
          800: '#1B2E45',
          700: '#243C5A',
        },
        accent: {
          DEFAULT: '#10B981',
          dark: '#34D399',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

Add to `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-slate-50 text-slate-800 dark:bg-navy-950 dark:text-slate-200 transition-colors duration-300;
  }
}
```

---

## 3. Configure Vite

Update `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

---

## 4. Add `<noscript>` Fallback

In `index.html`, inside `<body>` before the `<script>` tag:

```html
<noscript>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #0D1B2A; color: #E2E8F0; }
    a { color: #34D399; }
  </style>
  <div>
    <h1>Masoud Moharrami — Portfolio</h1>
    <p>This site requires JavaScript to display the full interactive portfolio.</p>
    <p>
      View the resume directly on
      <a href="https://github.com/masoooud/masoooud.github.io/blob/main/Masoud%20Moharrami%20-%20Resume.md"
         target="_blank" rel="noopener noreferrer">GitHub</a>.
    </p>
  </div>
</noscript>
```

---

## 5. Development Server

```bash
npm run dev
# Opens at http://localhost:5173
```

Hot Module Replacement (HMR) is active — changes in `src/` reflect instantly.

---

## 6. Project Structure Checklist

After setup, create these files in order:

```
src/data/resume.js          ← copy content from data-model.md
src/context/ThemeContext.jsx ← implement per contracts/ui-components.md
src/hooks/useScrollSpy.js   ← implement per contracts/ui-components.md
src/components/layout/Navbar.jsx
src/components/layout/ThemeToggle.jsx
src/components/ui/SectionHeading.jsx
src/components/ui/SkillBadge.jsx
src/components/ui/TimelineItem.jsx
src/components/ui/ProjectCard.jsx
src/components/sections/Hero.jsx
src/components/sections/About.jsx
src/components/sections/Skills.jsx
src/components/sections/Experience.jsx
src/components/sections/Projects.jsx
src/components/sections/Contact.jsx
src/App.jsx                  ← assembles all sections
src/main.jsx                 ← wraps App in ThemeProvider
```

---

## 7. Production Build

```bash
npm run build
# Output: dist/ (static HTML + CSS + JS)

# Preview production build locally
npm run preview
```

---

## 8. GitHub Pages Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

In GitHub repository settings → Pages: set Source to `gh-pages` branch, root `/`.

---

## 9. Pre-Deploy Checklist

Before merging to `main`:

- [ ] Run Lighthouse audit: `npm run build && npm run preview` then open Chrome DevTools → Lighthouse
  - Performance score ≥ 90
  - Accessibility score ≥ 90
- [ ] Verify all 6 sections visible at 320px, 768px, 1440px in browser dev tools
- [ ] Confirm all 7 roles appear in Experience timeline
- [ ] Test theme toggle: system → light → dark → system cycles correctly
- [ ] Confirm dark mode preference persists across page reload
- [ ] Test all external links open in new tab
- [ ] Replace all `// TODO:` placeholders in `src/data/resume.js`:
  - `profile.linkedin` — actual LinkedIn URL
  - `profile.email` — actual email address
  - `profile.resumePdf` — upload PDF to `public/resume.pdf`
- [ ] Remove `_config.yml` and Jekyll references (replaced by Vite)

---

## 10. Key Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server at `localhost:5173` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` locally for testing |
| `npm run lint` | ESLint check (if configured) |
