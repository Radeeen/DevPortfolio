# Portfolio Site — Design Spec

**Date:** 2026-08-18
**Owner:** R Herick Fauzi Komara Kusumah
**Status:** Approved, ready for implementation planning

---

## 1. Goal

A personal portfolio that makes a recruiter want to interview R Herick Fauzi Komara Kusumah, built around the projects he has actually shipped.

**Primary audience:** recruiters and hiring managers at Indonesian IT companies, scanning for 30–60 seconds.

**Secondary audience:** technical reviewers (tech leads, senior engineers) who click into a case study to judge whether the candidate reasons clearly.

**Success criterion:** a recruiter can identify the role fit, see one relevant project with a concrete outcome, and find contact details — without scrolling past the first two screens.

### The problem this replaces

The existing site (`radeeen.vercel.app`) lists skills as *"Python, MySQL, Tableau, C++, Data Science, HTML, CSS"* and does not mention **Laravel, Vue, Node.js/Express, or Java** anywhere. The owner currently works as a Fullstack Developer on government systems, but the site presents him as a student doing data analysis. Correcting that positioning is the single highest-value change in this project.

---

## 2. Positioning

**Headline role:** Fullstack Developer building production systems for Indonesian government institutions.

The data/ML work becomes supporting depth rather than the headline. Projects are tagged so the site can tell three different stories to three different readers without compromise:

- `fullstack` — for Laravel/Vue/Node roles
- `data-ml` — for data and machine learning roles
- `ui-ux` — for design-adjacent roles

Three differentiators to make prominent, because most junior applicants lack them:

1. Production experience inside a government institution (DPR RI, Sekretariat Jenderal)
2. A peer-reviewed publication — JUSTIN Vol 12 No 2 (2024)
3. Bank Indonesia Scholarship, 2022–2024

---

## 3. Stack

| Layer | Choice |
|---|---|
| Framework | **Nuxt 4** (Vue 3), static generation via `nuxi generate` |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Content | `@nuxt/content` v3 — Markdown files, queried at build time |
| Images | `@nuxt/image` |
| SEO | `@nuxtjs/seo` — sitemap, robots, OG tags, JSON-LD |
| Fonts | `@nuxt/fonts` — Inter (UI), JetBrains Mono (numerals and labels) |
| Animation | `motion-v` — subtle fade/rise on scroll only |
| Hosting | Vercel, auto-deploying from GitHub on push to `main` |
| Repo | Public GitHub repository |

**No UI component library for v1.** shadcn-vue was considered and rejected — a five-page site needs perhaps eight bespoke components, and a dependency would add more configuration than it removes. Revisit only if component count grows.

### Why Nuxt rather than Next.js

Vue is already in the owner's production stack at work (Laravel + Vue + Node/Express + MySQL). Building in Nuxt demonstrates a paid skill rather than a hobby one, and pairs coherently with the Laravel backend experience — one story a hiring manager understands immediately, rather than two unrelated skills.

Next.js has more total job listings, particularly for remote and international roles. **If the target shifts to remote/international work, revisit this decision** — that listing volume would outweigh the coherence argument.

### Why static generation

No database, no server runtime, nothing to rot. A portfolio whose backend has quietly died is worse than no portfolio. Content lives in Git, so it is versioned and cannot be lost.

---

## 4. Site structure

| Route | Contents |
|---|---|
| `/` | Hero → 3 featured projects → experience snapshot → skills → contact |
| `/projects` | All projects, filterable by tag (`fullstack` · `data-ml` · `ui-ux`) |
| `/projects/[slug]` | Full case study |
| `/about` | Bio, experience timeline, education, publication, awards, organisational leadership |
| `/cv.pdf` | Static download, linked from the header |

**Featured on the homepage:** Modular Monolith Platform, Sentiment Analysis, License Plate Recognition — one heavyweight per skill area.

**Contact:** direct `mailto:`, WhatsApp (`wa.me`), and LinkedIn links. No contact form — Indonesian recruiters reach out by email or WhatsApp directly, and a form adds a third-party dependency that can fail silently.

---

## 5. Content model

Each project is one Markdown file in `content/projects/`. Adding a project means adding a file; no code changes.

### Frontmatter

```yaml
---
title: string            # full project title
slug: string             # URL segment
date: YYYY-MM            # for ordering
summary: string          # one sentence, used on cards and meta description
tags: [fullstack|data-ml|ui-ux]
role: string             # e.g. "Solo — thesis research"
team: string | null      # e.g. "Cross-functional team, Agile"
stack: [string]          # technologies
metrics:                 # 2-4 headline numbers for the metric band
  - value: string
    label: string
featured: boolean        # appears on homepage
cover: string | null     # path under /public/img/projects/
links:                   # omitted entirely when confidential
  repo: string | null
  demo: string | null
confidential: boolean    # suppresses links, shows an explanatory note
---
```

### Body — the same five headings on every project

1. **Context** — who needed this, what problem existed
2. **My role** — solo or team, which parts were the owner's specifically
3. **Approach** — the technical decisions, and *why* they were made
4. **Result** — what changed, with numbers where available
5. **What I'd do differently** — optional but encouraged; reads as engineering maturity

Consistent headings mean a reviewer learns the shape once and can skim every subsequent project.

---

## 6. Project inventory

Data below is confirmed. Anything unconfirmed is listed in §11 and must not be invented.

### 6.1 Modular Monolith Platform — `fullstack`, featured

Multi-module Laravel platform for a government institution's internal operations.

Measured from the codebase: **9 functional modules · 309 controllers · 141 service classes · 397 models · 122 migrations · 1,370 Blade templates · 11 database connections.** Laravel 12, PHP 8.2, Tailwind 4, Vite 7, `nwidart/laravel-modules` 10.

Architecture worth describing: modular monolith with per-module MVC, a mandatory service layer keeping controllers thin, FormRequest validation, a base model standardising audit columns and database connections, and server-side DataTables for large datasets.

**Confidentiality — binding constraint.** The internal system name must never appear. Module names must never appear; they map to internal government unit names. No internal keys, credentials, connection strings, or configuration values.

**Naming DPR RI is explicitly permitted** — confirmed by the owner on 2026-08-18. His CV already states publicly that he builds for DPR RI's internal operations, so the institution may be named throughout the site. Only the system's internals are restricted.

**Visuals:** screenshots are presumed unavailable. Use generated architecture diagrams instead, which serve a technical reviewer better than UI screenshots.

### 6.2 Sentiment Analysis with a Green Computing Lens — `data-ml`, featured

Thesis research, published in JUSTIN Vol 12 No 2 (2024).

Dataset: **2,841 comments — 1,041 TikTok, 1,800 YouTube.**

| Metric | Extra Trees | Random Forest |
|---|---|---|
| Accuracy | 92% | 90.3% |
| Macro F1 | 0.62 | 0.53 |
| Energy | 0.0248 kWh | 0.0213 kWh |
| Carbon | 265.81 kgCO₂eq/yr | 57.41 kgCO₂eq/yr |
| Processing time | 22 min | 8 min |

Per-class figures (test rows: 102 negative, 2,412 neutral, 142 positive) are available and may be shown as a table.

**Framing:** lead with the green-computing trade-off, not the accuracy number. *"Random Forest gave up 1.7 percentage points of accuracy for 2.75× faster processing"* is a genuine engineering argument and is far more distinctive than "I did sentiment analysis."

**Mandatory honesty note.** The dataset is heavily imbalanced — 2,412 neutral against 102 negative. Always predicting "neutral" scores approximately 91%, so 92% accuracy is barely above the majority-class baseline; macro F1 of 0.62 and negative-class recall of 0.21 reflect this. The case study must name this weakness in "What I'd do differently" and propose class weighting, SMOTE, or stratified resampling. Stating the limitation before an interviewer finds it is a stronger signal than the accuracy figure itself.

### 6.3 License Plate Recognition — `data-ml`, featured

Vehicle plate detection and recognition at a government facility gate. YOLOv8 (Ultralytics) for detection, OCR for plate text, MySQL for persistence — recording plate number, vehicle type, and entry/exit timestamps.

Confirmed figures: **256ms inference per frame** (≈4 FPS on live video), **0.95 OCR confidence** on the sampled plate.

**Status must be stated plainly: a working prototype, not completed, because the internship period ended.** The engineering stands on its own and does not need embellishment. A candidate who scopes their claims accurately reads as trustworthy; one who implies production deployment and then falters under questioning does not.

### 6.4 Parliament Building Navigation Map — `fullstack`

Interactive 3D navigation map with location search and fastest-route selection. Built with **Unity 3D, Figma, and Blender**.

Note: **Blender appears nowhere on the current CV or portfolio.** 3D modelling is a distinctive skill for a fullstack developer and should be added to the skills list.

The existing process diagram (Mapping → 3D Building Design → Route & Description Making → Implementation → Demo) is good and should be used. Behance gallery: `behance.net/gallery/228053885/Parliament-Navigation-Map` — it currently carries no written description, so this case study will be the project's first real explanation.

### 6.5 Partner Dataset Analysis — `data-ml`

Analysis of partner datasets supporting DPR RI meetings and decision-making, processed and visualised in Tableau. Shorter entry — no metrics currently available.

### 6.6 SIMPAN SPBE Tasikmalaya — `ui-ux`

UI prototype for a municipal government website: stakeholder and end-user research, responsive design in Figma, handoff to developers. Behance gallery: `behance.net/gallery/227999671/SPBE-KOTA-TASIKMALAYA` (13 images, no description text).

---

## 7. Visual direction

**Direction A — Technical Minimal.** Dark, restrained, monospace numerals, metrics given visual weight. The aesthetic signals "engineer" before a word is read.

### Palette

| Token | Value | Use |
|---|---|---|
| `bg` | `#0a0a0a` | page background |
| `surface` | `#111111` | cards, raised panels |
| `border` | `#262626` | dividers, card outlines |
| `text` | `#ededed` | primary text |
| `muted` | `#a1a1a1` | secondary prose |
| `subtle` | `#8a8a8a` | smallest permitted text colour |
| `accent` | `#5eead4` | labels, metric values, links |
| `warn` | `#f59e0b` | "What I'd do differently" callouts |

**Contrast rule:** `#8a8a8a` on `#0a0a0a` is ≈5.7:1 and passes WCAG AA. Anything lighter in tone than `#8a8a8a` — including `#6b6b6b` as used in the mockups — fails AA for text below 18px and must not be used at small sizes. When in doubt, use `muted`.

### Typography

Inter for UI and prose; JetBrains Mono for numerals, labels, tags, and code. Body prose capped at ~72 characters per line.

### Motion

Fade and rise on scroll entry only. No parallax, no scroll-jacking, no cursor effects. All motion respects `prefers-reduced-motion`.

**Dark mode only.** Direction A is a dark design; supporting a light theme would double the design surface for no measurable benefit to the audience.

---

## 8. Case study page layout

**Two-column with a sticky metadata sidebar**, collapsing to a single column below the `md` breakpoint.

- **Sidebar (sticky):** year, category, role, stack chips, publication or links
- **Main column:** title → summary → metric band → the five body sections

The metadata stays visible at every scroll position, so a reviewer never has to scroll back to check the stack. This directly answers their real question — *can this person do the job I am hiring for?*

The metric band sits directly beneath the summary: 2–4 numbers, large, in monospace, each with a small uppercase label.

---

## 9. Quality targets

- Lighthouse ≥ 95 across performance, accessibility, best practices, SEO
- LCP under 1.5s on a simulated 4G connection
- WCAG 2.1 AA: contrast per §7, full keyboard navigation, visible focus states, semantic landmarks, alt text on every image
- Renders correctly at 360px width — a meaningful share of Indonesian recruiters browse on mobile
- Valid Open Graph and Twitter card metadata on every route, so shared links preview properly

---

## 10. Deployment

Public GitHub repository; Vercel connected to it, deploying automatically on push to `main`. Branch pushes produce preview URLs.

**v1 uses a Vercel subdomain.** A custom domain can be added later through the Vercel dashboard without any code change.

GitHub Pages was considered. It works — Nuxt emits static files — but requires an Actions workflow and a `baseURL` override for project-page sub-paths, which silently breaks asset paths when forgotten. Vercel is already familiar from the previous portfolio.

`.gitignore` must include `.superpowers/`, `node_modules/`, `.nuxt/`, `.output/`, and `.env`.

---

## 11. Open questions

These block specific content, not the build. Implementation proceeds; affected copy stays unwritten until resolved. **No figure may be invented to fill a gap.**

1. **Dataset arithmetic.** 2,841 comments were collected, but classification reports total 2,656 rows (102 + 2,412 + 142). Is the 185-row difference cleaning and deduplication, and is the report computed on the full cleaned set or on a test split? If it is a test split, the training set size is unknown.
2. **Carbon figures need verification.** Random Forest uses 14% less energy than Extra Trees (0.0213 vs 0.0248 kWh) but its carbon figure is 4.6× lower (57.41 vs 265.81 kgCO₂eq/yr). If emissions scale with energy, those ratios should match. There is presumably a methodological reason, but printing both side by side invites a reviewer to do the division and conclude there is an error. Confirm against the thesis before publishing both.
3. **Modular monolith visuals.** Confirm no screenshots may be published, then generate architecture diagrams instead.
4. **Missing metrics** for Navigation Map, Partner Dataset Analysis, and SIMPAN SPBE. These remain short entries until supplied.
5. **Public phone number.** The owner's mobile number appears on his CV. A `wa.me` link is the practical way recruiters make contact, but publishing a number on an indexed page attracts spam. Owner's decision. The number itself is deliberately not recorded in this repository — if a WhatsApp link is wanted, the number goes into `.env` as `NUXT_PUBLIC_WHATSAPP` and is referenced through config, never committed.

   The same applies to `cv.pdf`: committing it to a public repository puts the number and email into git history permanently. If the CV is to be downloadable, publish a redacted copy without the phone number, or accept the exposure knowingly.

---

## 12. Out of scope for v1

Deliberately excluded to get a finished site shipped:

- Blog — `@nuxt/content` makes this a small later addition
- Contact form
- Indonesian translation / i18n — **English only**, matching the CV and preserving international reach
- Custom domain
- CMS or admin panel
- Light theme
- Live ML demos — if wanted later, host separately (Hugging Face Spaces is free) and link out, rather than coupling the portfolio's uptime to a model server

A finished five-page site beats an unfinished eight-page one.
