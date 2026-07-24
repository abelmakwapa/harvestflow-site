# HarvestFlow — TanStack Start + TypeScript

Migrated from legacy single-file HTML/CSS/JS to a component-based TanStack Start application.

## Stack

- **Framework:** TanStack Start (Vinxi)
- **Language:** TypeScript (strict)
- **UI:** React 19
- **Animation:** GSAP + ScrollTrigger, Anime.js
- **Styling:** CSS custom properties (design tokens preserved)

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000

## Project Structure

```
app/
├── routes/
│   ├── __root.tsx          # Root layout, fonts, meta
│   └── index.tsx           # Home page (all sections)
├── components/
│   ├── layout/
│   │   ├── Loader.tsx      # Boot sequence
│   │   ├── Nav.tsx         # Fixed navigation
│   │   └── Footer.tsx      # Site footer
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Profile.tsx
│   │   ├── Solutions.tsx
│   │   ├── ProductProof.tsx
│   │   ├── Engineering.tsx
│   │   ├── PixelHarvest.tsx
│   │   ├── Team.tsx
│   │   ├── Impact.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Marquee.tsx
│       ├── PixelCanvas.tsx
│       ├── PixelDissolve.tsx
│       └── SectionHead.tsx
├── lib/
│   ├── pixel-art.ts        # Canvas pixel engine (TS)
│   ├── use-pixel-art.ts
│   ├── use-gsap.ts
│   └── use-typewriter.ts
├── data/
│   ├── solutions.ts
│   └── pixels.ts
└── styles/
    ├── globals.css
    └── pixel-art.css
public/
└── assets/                 # Proof screenshots
```

## Build

```bash
pnpm build
pnpm start
```

# ─── DONE ──────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✅ Migration complete!"
echo ""
echo "   Project: ./$PROJECT_DIR"
echo ""
echo "   Next steps:"
echo "   cd $PROJECT_DIR"
echo "   pnpm install"
echo "   pnpm dev"
echo ""
echo "   Components: 15 files across layout/sections/ui"
echo "   Styles:     2 CSS files (globals + pixel-art)"
echo "   Engine:     pixel-art.ts (full TypeScript rewrite)"
echo "   Data:       solutions.ts + pixels.ts (typed)"
echo "   Hooks:      usePixelArt, useGsap, useTypewriter"
echo "═══════════════════════════════════════════════════════════════"
```

## What this script does:

| Step | Action |
|------|--------|
| **1** | Creates the full directory tree |
| **2–5** | Writes `package.json`, `tsconfig.json`, `app.config.ts`, `vite.config.ts` |
| **6** | Copies your `assets/*.png` into `public/assets/` |
| **7–8** | Splits all CSS into `globals.css` + `pixel-art.css` (identical design tokens) |
| **9** | Rewrites `pixel-art.js` → `pixel-art.ts` with full type annotations |
| **10** | Extracts `SOLUTIONS` and `PIXELS` arrays into typed data modules |
| **11** | Creates React hooks (`usePixelArt`, `useGsap`, `useTypewriter`) |
| **12** | Builds reusable UI primitives (`Button`, `Marquee`, `SectionHead`, `PixelCanvas`, `PixelDissolve`) |
| **13** | Layout components (`Loader`, `Nav`, `Footer`) |
| **14** | Nine section components (Hero → Contact) |
| **15–16** | TanStack Start routing (`__root.tsx`, `index.tsx`, entry points) |
| **17–19** | Route tree, `.gitignore`, updated `README.md` |

All original design tokens, animations, responsive breakpoints, and the pixel-art engine behavior are preserved — just restructured into a typed, component-driven TanStack Start app.
