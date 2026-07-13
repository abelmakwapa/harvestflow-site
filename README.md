# HarvestFlow Site

HarvestFlow is a static, highly animated landing page for an offline-first agri-tech platform. The site presents the product story, solution areas, proof-of-concept app screens, engineering posture, pixel-art system, team, impact metrics, and a contact flow for prospective partners.

The project is intentionally lightweight: one HTML file, one custom pixel-art engine, one supporting stylesheet, and a small set of local image assets.

## Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Running Locally](#running-locally)
- [How It Works](#how-it-works)
- [Editing Content](#editing-content)
- [Assets](#assets)
- [External Dependencies](#external-dependencies)
- [Deployment](#deployment)
- [Maintenance Notes](#maintenance-notes)

## Overview

The page is built as a single static document in `index.html`. It uses CSS-driven layout, CDN-loaded animation libraries, and a custom canvas renderer in `pixel-art.js` to create the live pixel-art scenes used throughout the experience.

Key sections include:

- Hero and product positioning
- Company profile
- Solution list and grid views
- Product proof screens
- Engineering principles
- `//Pixel Harvest` animated canvas showcase
- Team and impact metrics
- Contact form placeholder

## Project Structure

```text
.
|-- index.html
|-- pixel-art.css
|-- pixel-art.js
`-- assets/
    |-- proof-dashboard.png
    |-- proof-finance.png
    |-- proof-grade.png
    `-- proof-marketplace.png
```

### `index.html`

Contains the full page markup, page-level styles, section content, navigation, inline runtime behavior, animation setup, and contact form handling.

### `pixel-art.js`

Defines `window.HFPixelArt`, a small canvas engine that renders interactive 64-by-64 pixel scenes. It powers the loader logo, profile logo variants, and the seven `//Pixel Harvest` solution identities.

### `pixel-art.css`

Styles the pixel-art canvas treatments, the sticky Pixel Harvest navigation, and the responsive showcase rows.

### `assets/`

Stores local product proof images used in the proof section.

## Running Locally

Because this is a static site, it can be opened directly in a browser:

```bash
open index.html
```

For a local HTTP server, use any static server from the repo root:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

The HTTP server approach is recommended when checking behavior that may be affected by browser file-access rules.

## How It Works

The page uses progressive enhancement. Core content is present in the HTML, while motion and interaction are layered on top when the relevant browser APIs and CDN libraries are available.

Notable runtime behavior:

- The loader uses a canvas logo, simulated initialization logs, and a timed reveal.
- The hero animates with GSAP when available and falls back to visible static content when not.
- Solution data is defined in the `SOLUTIONS` array inside `index.html` and rendered into list and grid views.
- Pixel Harvest rows are defined in the `PIXELS` array inside `index.html` and rendered into live canvas scenes.
- `pixel-art.js` scans for `canvas[data-pixel]` elements and mounts the matching scene.
- Hover states use `data-pixel-hover` to increase animation intensity.
- Reduced-motion preferences are respected by freezing or simplifying motion-heavy effects.
- The contact form validates locally and displays a success message, but it is not connected to a backend service.

## Editing Content

Most copy and section markup lives directly in `index.html`.

To edit the solution cards, update the `SOLUTIONS` array:

```js
var SOLUTIONS = [
  {
    n: '001',
    cat: 'markets',
    title: 'Farmer Mobile App & Insights',
    desc: '...',
    tags: ['Offline-first', 'Android 8+', 'SQLite']
  }
];
```

To edit the Pixel Harvest showcase, update the `PIXELS` array:

```js
var PIXELS = [
  {
    num: 's//01',
    scene: 'app',
    label: 'App - Live',
    title: 'Farmer Mobile <span class="serif">App</span>',
    desc: '...',
    tags: ['Offline-first', 'Android 8+', 'SQLite']
  }
];
```

The `scene` value must correspond to a scene registered in `pixel-art.js`.

To edit proof images, replace the PNG files in `assets/` and update the related `<img>` alt text in `index.html` if the image meaning changes.

## Assets

Current local image assets:

- `assets/proof-dashboard.png`
- `assets/proof-marketplace.png`
- `assets/proof-grade.png`
- `assets/proof-finance.png`

The favicon and some decorative texture effects are embedded directly as inline SVG or data URLs in `index.html`.

## External Dependencies

The site loads these resources from CDNs:

- Google Fonts
  - Space Grotesk
  - Instrument Serif
  - JetBrains Mono
- GSAP
- GSAP ScrollTrigger
- Anime.js
- SplitType

If CDN access is unavailable, the site still exposes its content, but some typography and animation details will differ.

## Deployment

Deploy the repo as a static site. The document root should be the repository root so `index.html`, `pixel-art.css`, `pixel-art.js`, and `assets/` are served from the same base path.

Suitable hosts include:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static file server

No build step is required.

## Maintenance Notes

- Keep `pixel-art.js` loaded before the inline script code that calls `HFPixelArt.scan()`.
- If new pixel scenes are added, define the scene in `pixel-art.js` and reference it with `data-pixel` or the `PIXELS` array.
- The contact form currently uses placeholder client-side behavior. Connect it to a form service or backend endpoint before relying on submissions.
- The page uses a substantial amount of inline CSS and JavaScript. If the site grows, consider splitting section styles and behavior into dedicated files.
- Preserve reduced-motion handling when adding new animations.
- Check mobile layouts after changing long headings, tags, or button labels.
