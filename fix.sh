#!/usr/bin/env bash
set -euo pipefail

# ───────────────────────────────────────────────────────────────
# HarvestFlow — Pitch Deck / Glass Slide Redesign
#
# Direction:
#   - Each major section becomes a full 100dvh "slide"
#   - Pure white background only
#   - No gradients anywhere
#   - Heavy glassmorphism: translucent white panels, blur, soft shadows
#   - Font sizing scales with display size via root clamp + rem-based type
#   - Pitch-deck formatting: sticky slide headers, stat panels,
#     horizontal card decks, compact slide bodies
#
# Files changed:
#   - app/layout.tsx
#   - app/components/ui/SectionHead.tsx
#   - app/components/sections/PixelHarvest.tsx
#   - app/styles/globals.css
#   - app/styles/pixel-art.css
# ───────────────────────────────────────────────────────────────

mkdir -p app/styles
mkdir -p app/components/ui
mkdir -p app/components/sections

cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import "~/styles/globals.css";
import "~/styles/pixel-art.css";

export const metadata: Metadata = {
  title: "HarvestFlow — From Yield to Income, Seamlessly",
  description:
    "HarvestFlow is an offline-first agri-tech platform connecting smallholder farmers to markets, insights, and financing across emerging agricultural economies.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 90'%3E%3Crect width='80' height='90' rx='14' fill='%23059669'/%3E%3Cellipse cx='40' cy='30' rx='7' ry='14' fill='white'/%3E%3Cpath d='M40 60 C40 68 15 72 15 72 C40 80 78 72 78 72' stroke='rgba(255,255,255,.8)' stroke-width='5' fill='none'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=IBM+Plex+Mono:wght@400;500;600;700&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FFFFFF" />
      </head>
      <body>{children}</body>
    </html>
  );
}
EOF

cat > app/components/ui/SectionHead.tsx << 'EOF'
import { type ReactNode } from "react";

interface SectionHeadProps {
  title: string;
  serifWord: string;
  num: string;
  children?: ReactNode;
}

export function SectionHead({ title, serifWord, num, children }: SectionHeadProps) {
  return (
    <div className="section-head gs-fade">
      <div className="section-head-main">
        <span className="num">{num}</span>
        <h2>
          {title} <span className="serif">{serifWord}</span>
        </h2>
      </div>
      {children}
    </div>
  );
}
EOF

cat > app/components/sections/PixelHarvest.tsx << 'EOF'
import { useEffect, useRef, useState } from "react";
import { SectionHead } from "~/components/ui/SectionHead";
import { PIXELS } from "~/data/pixels";
import { scan } from "~/lib/pixel-art";

export function PixelHarvest() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (listRef.current) scan(listRef.current);
  }, []);

  useEffect(() => {
    if (!listRef.current) return;

    const rows = listRef.current.querySelectorAll(".pxshow-row");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.pxIndex));
        });
      },
      { threshold: 0.5 }
    );

    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    setActive(i);
    const row = listRef.current?.querySelector(`#pixel-scene-${PIXELS[i].scene}`);
    row?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="section" id="pixels">
      <SectionHead title="Pixel" serifWord="Harvest" num="[ 005 / live identities ]" />

      <p className="pxshow-intro gs-fade">
        Seven solutions, seven living identities — <span className="hl">each one drawn on an 8-colour, 64-pixel grid</span>, light enough to ship over a 2G connection. Hover any card to wake it up.
      </p>

      <div className="pxshow-nav gs-fade" aria-label="Navigate Pixel Harvest scenes">
        {PIXELS.map((p, i) => (
          <button
            key={p.scene}
            className={`pxshow-jump ${active === i ? "is-active" : ""}`}
            onClick={() => jumpTo(i)}
            aria-controls={`pixel-scene-${p.scene}`}
          >
            <i>{p.num.replace("s//", "")}</i>
            <span>{p.title.replace(/<[^>]+>/g, "").split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="pxshow-list" ref={listRef}>
        {PIXELS.map((p, i) => (
          <article
            key={p.scene}
            className={`pxshow-row gs-fade ${active === i ? "is-active" : ""}`}
            id={`pixel-scene-${p.scene}`}
            tabIndex={-1}
            data-px-index={String(i)}
            data-pixel-hover=""
          >
            <div className="pxshow-text">
              <span className="pxshow-num">{p.num}</span>
              <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
              <p>{p.desc}</p>
              <div className="work-tags">{p.tags.map((t) => <span key={t} className="work-tag">{t}</span>)}</div>
            </div>

            <div className="pxshow-art">
              <div className="pxshow-frame">
                <canvas data-pixel={p.scene} data-scale="4" />
              </div>
              <span className="px-label">{p.label}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
EOF

cat > app/styles/globals.css << 'EOF'
/* ═══════════════════════════════════════════════════════════
   HARVESTFLOW — PITCH DECK GLASS SLIDES
   100dvh slides · white background · no gradients · glassmorphism
   ═══════════════════════════════════════════════════════════ */

:root {
  --bg: #FFFFFF;

  --ink: #13251D;
  --ink-2: #1B352A;

  --muted: rgba(19,37,29,.70);
  --faint: rgba(19,37,29,.50);

  --line: rgba(19,37,29,.12);
  --line-2: rgba(19,37,29,.07);

  --green: #0B7C4D;
  --green-deep: #075E3A;
  --mint: #0B7C4D;
  --terra: #C2410C;
  --amber: #B45309;
  --sky: #0369A1;

  --glass: rgba(255,255,255,.55);
  --glass-strong: rgba(255,255,255,.78);
  --glass-border: rgba(19,37,29,.08);

  --shadow:
    0 1.5rem 4rem rgba(19,37,29,.10),
    0 .35rem 1.2rem rgba(19,37,29,.06),
    inset 0 1px 0 rgba(255,255,255,.95);

  --shadow-lg:
    0 2.5rem 7rem rgba(19,37,29,.14),
    0 .75rem 2rem rgba(19,37,29,.08),
    inset 0 1px 0 rgba(255,255,255,.95);

  --sans: 'Manrope', sans-serif;
  --serif: 'Fraunces', serif;
  --mono: 'IBM Plex Mono', monospace;

  --nav-h: 4.75rem;
  --slide-pad: clamp(1.25rem, 4vw, 3.5rem);

  /* scale root type with display size */
  font-size: clamp(14px, 0.95vw + 8px, 22px);
  font-size: clamp(14px, 0.95vw + 0.45dvh, 22px);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

::selection {
  background: var(--green);
  color: #fff;
}

html {
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
  background: var(--bg);
  color-scheme: light;
}

body {
  font-family: var(--sans);
  background: var(--bg);
  color: var(--ink);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}

/* remove all previous texture / grain */
body::before,
body::after {
  content: none;
}

body.no-scroll {
  overflow: hidden;
}

img,
svg,
canvas {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}

h1, h2, h3, h4 {
  text-wrap: balance;
}

:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 3px;
}

.serif {
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  letter-spacing: -.01em;
}

.mono {
  font-family: var(--mono);
}

/* ═══════════════════════════════════════════════════════════
   GLASS BASE
   ═══════════════════════════════════════════════════════════ */

:where(
  .nav,
  .nav-links.open,
  .hero-trust-item,
  .hero-context,
  .section-head,
  .profile-lede,
  .profile-fact,
  .profile-pixels,
  .filter-chip,
  .view-toggle,
  .work-item,
  .work-grid .work-card,
  .work-tag,
  .proof-copy,
  .proof-stack,
  .proof-flow-step,
  .proof-device,
  .phase-card,
  .eng-stat,
  .eng-commit,
  .team-card,
  .impact-cell,
  .contact-info,
  .form,
  .field input,
  .field select,
  .field textarea,
  .pxshow-intro,
  .pxshow-nav,
  .pxshow-row,
  .pxshow-frame,
  .pxshow-jump,
  .footer-top,
  .footer-bottom,
  .marquee,
  .btn-ghost,
  .loader-overlay
) {
  background: var(--glass);
  -webkit-backdrop-filter: blur(1.5rem) saturate(160%);
  backdrop-filter: blur(1.5rem) saturate(160%);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow);
}

/* ═══════════════════════════════════════════════════════════
   LOADER
   ═══════════════════════════════════════════════════════════ */

.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: rgba(255,255,255,.88);
  color: var(--ink);
  border: none;
  box-shadow: none;
}

.loader-overlay canvas {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  border-radius: 1.5rem;
  border: 1px solid rgba(255,255,255,.9);
  box-shadow: var(--shadow-lg);
}

.loader-line {
  font-family: var(--mono);
  font-size: .8rem;
  letter-spacing: .12em;
  color: var(--muted);
}

.loader-line .cur {
  display: inline-block;
  width: .5rem;
  height: .9rem;
  background: var(--green);
  vertical-align: -2px;
  animation: blink 1s steps(1) infinite;
}

.loader-log {
  font-family: var(--mono);
  font-size: .65rem;
  letter-spacing: .1em;
  color: var(--faint);
  display: flex;
  flex-direction: column;
  gap: .35rem;
  min-height: 3rem;
  text-align: center;
}

.loader-log .ok {
  color: var(--green);
}

.loader-pct {
  font-family: var(--mono);
  font-size: .7rem;
  letter-spacing: .2em;
  color: var(--green);
}

/* ═══════════════════════════════════════════════════════════
   NAV — floating glass pill
   ═══════════════════════════════════════════════════════════ */

.nav {
  position: fixed;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  z-index: 900;
  width: min(72rem, calc(100% - 2rem));
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: .75rem 1rem;
  border-radius: 999px;
  background: var(--glass-strong);
  transition: background .3s, box-shadow .3s, border-color .3s;
}

.nav.scrolled {
  background: rgba(255,255,255,.9);
  box-shadow: var(--shadow-lg);
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: .6rem;
  position: relative;
  z-index: 2;
}

.nav-brand svg {
  flex-shrink: 0;
}

.nav-brand svg ellipse[fill="#6EE7B7"] {
  fill: var(--green) !important;
}

.nav-brand svg path[stroke="#6EE7B7"] {
  stroke: var(--green) !important;
}

.nav-brand-name {
  font-size: .95rem;
  font-weight: 800;
  letter-spacing: -.02em;
  color: var(--ink);
}

.nav-brand-name span {
  color: var(--green);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: clamp(.6rem, 1.4vw, 1.4rem);
}

.nav-links a {
  position: relative;
  font-family: var(--mono);
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: lowercase;
  color: var(--muted);
  transition: color .25s;
}

.nav-links a i {
  font-style: normal;
  color: var(--terra);
  margin-right: .35rem;
}

.nav-links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -.35rem;
  height: 1px;
  width: 100%;
  background: var(--green);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .3s;
}

.nav-links a:hover {
  color: var(--ink);
}

.nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-cta {
  font-family: var(--mono);
  font-size: .62rem;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
  padding: .65rem 1.1rem;
  border-radius: 999px;
  background: var(--green);
  color: #fff;
  box-shadow: var(--shadow);
  transition: background .3s, transform .3s;
}

.nav-cta i {
  font-style: normal;
}

.nav-cta:hover {
  background: var(--green-deep);
  transform: translateY(-1px);
}

.nav-burger {
  display: none;
  flex-direction: column;
  gap: .32rem;
  padding: .25rem;
  position: relative;
  z-index: 960;
}

.nav-burger span {
  width: 1.35rem;
  height: 2px;
  border-radius: 2px;
  background: var(--ink);
  display: block;
  transition: all .3s;
}

@media (max-width: 900px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .nav-burger {
    display: flex;
  }

  .nav {
    padding: .7rem .9rem;
  }

  .nav-brand-name {
    font-size: .85rem;
  }
}

.nav-links.open {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  position: fixed;
  inset: 0;
  z-index: 950;
  background: rgba(255,255,255,.94);
  padding: calc(var(--nav-h) + 2rem) 1.75rem 2rem;
  overflow: auto;
  border-radius: 0;
  border: none;
  box-shadow: none;
}

.nav-links.open a {
  font-family: var(--sans);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--ink);
}

.nav-links.open a i {
  display: inline-block;
  min-width: 2.2rem;
  color: var(--terra);
}

.nav-links.open a::after {
  display: none;
}

.nav.menu-open {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}

.nav.menu-open .nav-brand {
  z-index: 960;
}

.nav.menu-open .nav-burger span:nth-child(1) {
  transform: translateY(.5rem) rotate(45deg);
}

.nav.menu-open .nav-burger span:nth-child(2) {
  opacity: 0;
}

.nav.menu-open .nav-burger span:nth-child(3) {
  transform: translateY(-.5rem) rotate(-45deg);
}

/* ═══════════════════════════════════════════════════════════
   HERO — title slide
   ═══════════════════════════════════════════════════════════ */

.hero {
  height: 100vh;
  height: 100dvh;
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: calc(var(--nav-h) + .75rem) var(--slide-pad) 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background: var(--bg);
  scroll-snap-align: start;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: rgba(19,37,29,.18) transparent;
}

.hero-glow {
  display: none;
}

.hero-field {
  position: absolute;
  inset: auto 0 0 0;
  width: 100%;
  height: clamp(8rem, 24dvh, 16rem);
  opacity: .55;
  pointer-events: none;
}

.hero-field g:first-child path {
  stroke: rgba(19,37,29,.08);
}

.hero-field g:last-child path {
  stroke: rgba(11,124,77,.18);
}

.hero-top {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-trust {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .75rem;
  width: min(100%, 42rem);
}

.hero-trust-item {
  border-radius: 1.25rem;
  padding: .85rem 1rem;
}

.hero-trust-item b {
  display: block;
  font-size: .95rem;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: .3rem;
}

.hero-trust-item span {
  display: block;
  font-family: var(--mono);
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--muted);
  line-height: 1.45;
}

.hero-meta {
  text-align: right;
  font-family: var(--mono);
  font-size: .6rem;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--faint);
  line-height: 2;
}

.hero-meta .avail {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: .55rem;
  color: var(--muted);
}

.hero-meta .avail::before {
  content: '';
  width: .45rem;
  height: .45rem;
  border-radius: 50%;
  background: var(--green);
  animation: pulse 2s infinite;
}

.hero-title-wrap {
  position: relative;
  z-index: 2;
  margin: auto 0;
  padding: 1rem 0;
}

.hero-title {
  font-size: clamp(3.2rem, 11vw, 8rem);
  font-weight: 800;
  line-height: .92;
  letter-spacing: -.05em;
  color: var(--ink);
}

.hero-title .row {
  display: flex;
  align-items: baseline;
  gap: .05em;
  overflow: hidden;
}

.hero-title .word {
  display: inline-block;
}

.hero-title .flow {
  font-family: var(--serif);
  font-style: italic;
  color: var(--green);
  -webkit-text-stroke: 0;
}

.hero-title .reg {
  font-size: .18em;
  font-weight: 700;
  color: var(--terra);
  -webkit-text-stroke: 0;
  letter-spacing: 0;
  align-self: flex-start;
  margin-top: .45em;
}

.hero-value {
  position: relative;
  z-index: 2;
  margin-bottom: .75rem;
  font-size: clamp(1.35rem, 2.6vw, 2.3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -.03em;
  max-width: 46rem;
  color: var(--ink);
}

.hero-value .serif {
  color: var(--green);
  font-size: 1.05em;
}

.hero-poetic {
  position: relative;
  z-index: 2;
  font-size: clamp(.95rem, 1.35vw, 1.2rem);
  line-height: 1.55;
  color: var(--muted);
  max-width: 44rem;
}

.hero-poetic .serif {
  color: var(--green);
}

.hero-poetic .type {
  color: var(--ink);
  border-right: 2px solid var(--green);
  padding-right: .2rem;
}

.hero-sub-row {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-context {
  max-width: 24rem;
  border-radius: 1.25rem;
  padding: 1rem 1.1rem;
  font-size: .85rem;
  line-height: 1.55;
  color: var(--muted);
}

.hero-context b {
  color: var(--green);
}

.hero-ctas {
  display: flex;
  gap: .75rem;
  flex-wrap: wrap;
}

.hero-scroll {
  position: relative;
  z-index: 2;
  text-align: center;
  font-family: var(--mono);
  font-size: .58rem;
  letter-spacing: .25em;
  text-transform: lowercase;
  color: var(--faint);
  padding: .6rem 0;
}

.hero-scroll span {
  display: inline-block;
  animation: drift 2.4s ease-in-out infinite;
}

.hero .marquee {
  margin: 0 calc(-1 * var(--slide-pad));
}

@media (max-width: 820px) {
  .hero {
    padding-top: calc(var(--nav-h) + .5rem);
  }

  .hero-trust {
    display: flex;
    gap: .6rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .hero-trust::-webkit-scrollbar {
    display: none;
  }

  .hero-trust-item {
    flex: 0 0 12rem;
  }

  .hero-meta {
    text-align: left;
  }

  .hero-meta .avail {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .hero-context {
    display: none;
  }

  .hero-ctas .btn:last-child {
    display: none;
  }

  .hero-sub-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-height: 700px) {
  .hero-title {
    font-size: clamp(2.6rem, 9vw, 5rem);
  }

  .hero-value {
    font-size: 1.1rem;
  }

  .hero-poetic {
    font-size: .85rem;
  }
}

/* ═══════════════════════════════════════════════════════════
   BUTTONS
   ═══════════════════════════════════════════════════════════ */

.btn {
  display: inline-flex;
  align-items: center;
  gap: .6rem;
  font-family: var(--mono);
  font-size: .68rem;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
  padding: .9rem 1.5rem;
  border-radius: 999px;
  white-space: nowrap;
  position: relative;
  transition: transform .3s, background .3s, border-color .3s, color .3s, box-shadow .3s;
}

.btn span {
  position: relative;
  z-index: 1;
}

.btn-solid {
  background: var(--green);
  color: #fff;
  box-shadow: var(--shadow);
}

.btn-solid:hover {
  background: var(--green-deep);
  transform: translateY(-2px);
}

.btn-ghost {
  color: var(--ink);
}

.btn-ghost:hover {
  border-color: rgba(11,124,77,.35);
  color: var(--green);
  transform: translateY(-2px);
}

.btn .arr {
  transition: transform .3s;
}

.btn:hover .arr {
  transform: translateX(4px);
}

/* ═══════════════════════════════════════════════════════════
   MARQUEE
   ═══════════════════════════════════════════════════════════ */

.marquee {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  border-left: 0;
  border-right: 0;
  overflow: hidden;
  white-space: nowrap;
  padding: .7rem 0;
  position: relative;
  z-index: 2;
}

.marquee-track {
  display: inline-flex;
  animation: marq 30s linear infinite;
  will-change: transform;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 1.6rem;
  padding-right: 1.6rem;
  font-size: .8rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--muted);
}

.marquee-item .dot {
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
  background: var(--terra);
  flex-shrink: 0;
}

.marquee-item em {
  font-style: normal;
  color: var(--green);
}

/* ═══════════════════════════════════════════════════════════
   SLIDE SCAFFOLD
   ═══════════════════════════════════════════════════════════ */

.section {
  height: 100vh;
  height: 100dvh;
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  padding: calc(var(--nav-h) + 1rem) var(--slide-pad) 1.25rem;
  background: var(--bg);
  scroll-snap-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(19,37,29,.18) transparent;
}

.section-head {
  position: sticky;
  top: calc(var(--nav-h) + .35rem);
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  border-radius: 1.5rem;
  padding: .85rem 1rem;
  margin: 0;
  background: var(--glass-strong);
}

.section-head-main {
  display: flex;
  align-items: center;
  gap: .9rem;
  min-width: 0;
}

.section-head h2 {
  font-size: clamp(1.5rem, 3vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -.03em;
  text-transform: none;
  line-height: 1;
  color: var(--ink);
}

.section-head h2 .serif {
  color: var(--green);
}

.section-head .num {
  font-family: var(--mono);
  font-size: .58rem;
  font-weight: 800;
  letter-spacing: .14em;
  color: #fff;
  background: var(--green);
  padding: .4rem .55rem;
  border-radius: 999px;
  white-space: nowrap;
}

.section-head .work-controls {
  margin: 0;
  width: auto;
}

/* ═══════════════════════════════════════════════════════════
   PROFILE
   ═══════════════════════════════════════════════════════════ */

#profile .profile-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}

.profile-lede {
  border-radius: 2rem;
  padding: clamp(1.5rem, 3vw, 3rem);
  font-size: clamp(1.25rem, 2.3vw, 2.1rem);
  line-height: 1.35;
  color: var(--muted);
  overflow: auto;
}

.profile-lede .hl {
  color: var(--ink);
}

.profile-lede .g {
  color: var(--green);
}

.profile-lede .t {
  color: var(--terra);
}

.profile-lede .a {
  color: var(--amber);
}

.profile-lede .serif {
  color: var(--green);
  font-size: 1.08em;
}

.profile-side {
  display: grid;
  gap: 1rem;
  min-height: 0;
  overflow: auto;
  align-content: start;
}

.profile-fact {
  border-radius: 1.5rem;
  padding: 1.1rem 1.25rem;
}

.profile-fact h4 {
  font-family: var(--mono);
  font-size: .6rem;
  font-weight: 800;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: .5rem;
}

.profile-fact p {
  font-size: .85rem;
  line-height: 1.6;
  color: var(--muted);
}

.profile-pixels {
  border-radius: 1.5rem;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.profile-pixels canvas {
  border-radius: 1rem;
  border: 1px solid var(--line);
  background: #fff;
}

.profile-pixels figcaption {
  font-family: var(--mono);
  font-size: .55rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--faint);
  margin-top: .5rem;
  text-align: center;
}

@media (max-width: 900px) {
  #profile .profile-grid {
    grid-template-columns: 1fr;
  }
}

/* ═══════════════════════════════════════════════════════════
   SOLUTIONS
   ═══════════════════════════════════════════════════════════ */

#solutions {
  gap: 1rem;
}

.work-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-row {
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
}

.filter-chip {
  font-family: var(--mono);
  font-size: .58rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  padding: .5rem .85rem;
  border-radius: 999px;
  color: var(--muted);
  box-shadow: none;
  transition: all .3s;
}

.filter-chip:hover {
  color: var(--ink);
  border-color: rgba(19,37,29,.2);
}

.filter-chip.active {
  background: var(--green);
  color: #fff;
  border-color: var(--green);
}

.view-toggle {
  display: flex;
  gap: .25rem;
  border-radius: 999px;
  padding: .25rem;
}

.view-toggle button {
  font-family: var(--mono);
  font-size: .6rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: lowercase;
  padding: .45rem .9rem;
  border-radius: 999px;
  color: var(--muted);
  transition: all .3s;
}

.view-toggle button.active {
  background: var(--green);
  color: #fff;
}

.work-list {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(17rem, 1fr);
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: .5rem 0 1rem;
  align-items: stretch;
  scrollbar-width: thin;
}

.work-item {
  border-radius: 1.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;
  position: relative;
  transition: transform .3s, box-shadow .3s;
}

.work-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.work-item::before,
.work-item .hover-marquee {
  display: none;
}

.work-num {
  font-family: var(--mono);
  font-size: .62rem;
  letter-spacing: .14em;
  color: var(--terra);
}

.work-title {
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -.02em;
  line-height: 1.1;
  color: var(--ink);
}

.work-desc {
  font-size: .85rem;
  line-height: 1.6;
  color: var(--muted);
}

.work-tags {
  display: flex;
  gap: .45rem;
  flex-wrap: wrap;
  margin-top: .25rem;
}

.work-tag {
  font-family: var(--mono);
  font-size: .52rem;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: .35rem .6rem;
  border-radius: 999px;
  color: var(--muted);
  box-shadow: none;
}

.work-view {
  margin-top: auto;
  font-family: var(--mono);
  font-size: .62rem;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--green);
  display: inline-flex;
  align-items: center;
  gap: .45rem;
}

.work-view .arr {
  transition: transform .3s;
}

.work-item:hover .work-view .arr {
  transform: translate(3px, -3px);
}

.work-grid {
  flex: 1;
  min-height: 0;
  display: none;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
  overflow: auto;
  padding: .5rem 0 1rem;
}

.work-grid .work-card {
  border-radius: 1.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;
  min-height: 20rem;
  transition: transform .3s, box-shadow .3s;
}

.work-grid .work-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.work-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  z-index: 1;
}

.work-card-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  background: rgba(11,124,77,.08);
  border: 1px solid rgba(11,124,77,.18);
  font-family: var(--mono);
  font-size: .8rem;
  font-weight: 800;
  color: var(--green);
}

.work-card-index::before {
  content: '/';
  color: var(--terra);
  margin-right: 1px;
}

.work-cat {
  font-family: var(--mono);
  font-size: .52rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: .4rem .6rem;
  background: rgba(255,255,255,.6);
}

.work-grid .work-card .work-title {
  font-size: 1.15rem;
  position: relative;
  z-index: 1;
}

.work-grid .work-card .work-desc {
  position: relative;
  z-index: 1;
}

.work-grid .work-card .work-tags {
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.solutions.grid-mode .work-list {
  display: none;
}

.solutions.grid-mode .work-grid {
  display: grid;
}

@media (max-width: 820px) {
  .work-list {
    grid-auto-columns: minmax(15rem, 80vw);
  }
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT PROOF
   ═══════════════════════════════════════════════════════════ */

#proof {
  background: var(--bg);
}

.proof-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(0, 1.4fr);
  gap: 1.5rem;
  align-items: stretch;
}

.proof-copy {
  border-radius: 2rem;
  padding: 1.5rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.proof-kicker {
  font-family: var(--mono);
  font-size: .6rem;
  font-weight: 800;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--amber);
}

.proof-lede {
  font-size: clamp(1.25rem, 2.2vw, 2rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -.02em;
  color: var(--ink);
}

.proof-lede .serif {
  color: var(--green);
  font-size: 1.06em;
}

.proof-note {
  font-size: .85rem;
  line-height: 1.7;
  color: var(--muted);
}

.proof-stack {
  border-radius: 1.25rem;
  overflow: hidden;
}

.proof-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: .75rem .9rem;
  border-top: 1px solid var(--line-2);
}

.proof-row:first-child {
  border-top: 0;
}

.proof-row span {
  font-family: var(--mono);
  font-size: .55rem;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--faint);
}

.proof-row b {
  font-family: var(--mono);
  font-size: .68rem;
  font-weight: 800;
  color: var(--green);
  text-align: right;
}

.proof-flow {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .6rem;
}

.proof-flow-step {
  border-radius: 1rem;
  padding: .8rem;
  min-height: 7rem;
}

.proof-flow-step i {
  font-style: normal;
  font-family: var(--mono);
  font-size: .58rem;
  color: var(--terra);
  letter-spacing: .12em;
  display: block;
  margin-bottom: .8rem;
}

.proof-flow-step strong {
  display: block;
  font-size: .88rem;
  line-height: 1.2;
  color: var(--ink);
}

.proof-flow-step span {
  display: block;
  margin-top: .45rem;
  font-size: .68rem;
  line-height: 1.45;
  color: var(--muted);
}

.proof-devices {
  min-height: 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(10rem, 18vw, 15rem);
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: .5rem 0 1rem;
  align-items: start;
  scrollbar-width: thin;
}

.proof-device {
  border-radius: 1.5rem;
  padding: .8rem;
}

.proof-device:nth-child(even) {
  transform: none;
}

.proof-device-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
  padding: 0 .2rem .7rem;
}

.proof-device-head h3 {
  font-size: .9rem;
  font-weight: 800;
  color: var(--ink);
}

.proof-device-head span {
  font-family: var(--mono);
  font-size: .55rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--amber);
  white-space: nowrap;
}

.proof-phone {
  border: 1px solid var(--line);
  border-radius: 1rem;
  background: #fff;
  padding: .5rem;
  overflow: hidden;
}

.proof-phone img {
  width: 100%;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  object-position: top center;
  border-radius: .75rem;
  border: 1px solid var(--line);
  background: #fff;
}

@media (max-width: 1060px) {
  .proof-layout {
    grid-template-columns: 1fr;
  }

  .proof-copy {
    position: static;
  }
}

@media (max-width: 680px) {
  .proof-flow {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 440px) {
  .proof-flow {
    grid-template-columns: 1fr;
  }

  .proof-row {
    flex-direction: column;
    gap: .35rem;
  }

  .proof-row b {
    text-align: left;
  }
}

/* ═══════════════════════════════════════════════════════════
   ENGINEERING / RELIABILITY
   ═══════════════════════════════════════════════════════════ */

#engineering {
  gap: 1rem;
}

#engineering > div:first-of-type,
#engineering > div:last-of-type {
  padding-left: var(--slide-pad) !important;
  padding-right: var(--slide-pad) !important;
}

.eng-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.eng-intro p {
  border-radius: 1.5rem;
  padding: 1.25rem;
  font-size: .95rem;
  line-height: 1.55;
  color: var(--muted);
}

.eng-intro p .hl {
  color: var(--ink);
}

.eng-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .75rem;
}

.eng-stat {
  border-radius: 1.25rem;
  padding: 1rem;
}

.eng-stat b {
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: -.03em;
  display: block;
  color: var(--ink);
}

.eng-stat b i {
  font-style: normal;
  color: var(--green);
}

.eng-stat span {
  font-family: var(--mono);
  font-size: .55rem;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--faint);
  margin-top: .35rem;
  display: block;
}

.eng-h-wrap {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0;
  padding: .5rem var(--slide-pad) .75rem;
  scrollbar-width: thin;
}

.eng-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(18rem, 24rem);
  gap: 1rem;
  will-change: transform;
}

.phase-card {
  border-radius: 1.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;
  min-height: 18rem;
  transition: transform .3s, box-shadow .3s;
}

.phase-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.phase-card .ph-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--mono);
}

.phase-card .ph-num {
  font-size: .68rem;
  letter-spacing: .14em;
  color: var(--terra);
}

.phase-card .ph-week {
  font-size: .55rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--faint);
}

.phase-card h3 {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -.02em;
  color: var(--ink);
}

.phase-card h3 .serif {
  color: var(--green);
}

.phase-card p {
  font-size: .82rem;
  line-height: 1.6;
  color: var(--muted);
}

.phase-card .ph-gate {
  margin-top: auto;
  border-top: 1px solid var(--line);
  padding-top: .75rem;
  font-family: var(--mono);
  font-size: .6rem;
  letter-spacing: .06em;
  color: var(--muted);
  line-height: 1.6;
}

.phase-card .ph-gate b {
  color: var(--green);
  font-weight: 700;
}

.eng-progress {
  height: 2px;
  background: var(--line);
  margin: 0 var(--slide-pad);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.eng-progress i {
  position: absolute;
  inset: 0;
  display: block;
  background: var(--green);
  transform: scaleX(1);
}

.eng-hint {
  font-family: var(--mono);
  font-size: .55rem;
  letter-spacing: .22em;
  text-transform: lowercase;
  color: var(--faint);
  text-align: right;
  padding: 0 var(--slide-pad);
}

.eng-commit {
  margin: 0 0 1rem;
  border-radius: 1.5rem;
  overflow: hidden;
}

.eng-commit-bar {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .7rem .9rem;
  border-bottom: 1px solid var(--line);
  background: rgba(255,255,255,.72);
}

.eng-commit-bar i {
  width: .55rem;
  height: .55rem;
  border-radius: 50%;
  display: block;
}

.eng-commit-bar i:nth-child(1) {
  background: var(--terra);
}

.eng-commit-bar i:nth-child(2) {
  background: var(--amber);
}

.eng-commit-bar i:nth-child(3) {
  background: var(--green);
}

.eng-commit-bar span {
  font-family: var(--mono);
  font-size: .6rem;
  letter-spacing: .1em;
  color: var(--faint);
  margin-left: .5rem;
}

.eng-commit-body {
  padding: 1rem;
  max-height: 16dvh;
  overflow: auto;
  font-family: var(--mono);
  font-size: .72rem;
  line-height: 1.9;
  color: var(--muted);
  white-space: pre;
}

.eng-commit-body .h {
  color: var(--green);
}

.eng-commit-body .t {
  color: var(--amber);
}

.eng-commit-body .s {
  color: var(--sky);
}

.eng-commit-body .c {
  color: var(--faint);
}

@media (max-width: 1000px) {
  .eng-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .eng-intro {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .eng-stats {
    grid-template-columns: 1fr;
  }

  .eng-track {
    grid-auto-columns: minmax(16rem, 85vw);
  }
}

/* ═══════════════════════════════════════════════════════════
   TEAM
   ═══════════════════════════════════════════════════════════ */

.team-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.team-card {
  border-radius: 2rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  transition: transform .3s, box-shadow .3s;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.team-card .role {
  font-family: var(--mono);
  font-size: .6rem;
  font-weight: 800;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--green);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.team-card .role em {
  font-style: normal;
  color: var(--faint);
}

.team-name {
  font-size: clamp(1.5rem, 2.6vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.05;
  color: var(--ink);
}

.team-name .serif {
  color: var(--green);
}

.team-bio {
  font-size: .88rem;
  line-height: 1.7;
  color: var(--muted);
  max-width: 44rem;
}

.team-sig {
  font-family: var(--mono);
  font-size: .6rem;
  letter-spacing: .12em;
  color: var(--muted);
  border-top: 1px solid var(--line);
  padding-top: .9rem;
  margin-top: auto;
}

.team-sig b {
  color: var(--amber);
  font-weight: 700;
}

@media (max-width: 820px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}

/* ═══════════════════════════════════════════════════════════
   IMPACT
   ═══════════════════════════════════════════════════════════ */

.impact {
  background: var(--bg);
  color: var(--ink);
}

.impact .section-head .num {
  background: var(--terra);
}

.impact-lede {
  font-size: clamp(1.45rem, 3.2vw, 2.8rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -.03em;
  max-width: 60rem;
  color: var(--ink);
}

.impact-lede .g {
  color: var(--green);
}

.impact-lede .t {
  color: var(--terra);
}

.impact-lede .serif {
  font-size: 1.06em;
  color: var(--green);
}

.impact-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.impact-cell {
  border-radius: 2rem;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.impact-cell b {
  font-size: clamp(2.6rem, 5.5vw, 4.6rem);
  font-weight: 800;
  letter-spacing: -.04em;
  line-height: 1;
  color: var(--ink);
}

.impact-cell b i {
  font-style: normal;
  color: var(--green);
}

.impact-cell h4 {
  font-family: var(--mono);
  font-size: .62rem;
  font-weight: 800;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--terra);
  margin: 1rem 0 .6rem;
}

.impact-cell p {
  font-size: .85rem;
  line-height: 1.65;
  color: var(--muted);
}

@media (max-width: 820px) {
  .impact-grid {
    grid-template-columns: 1fr;
  }
}

/* ═══════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════ */

.contact {
  gap: 1rem;
}

.contact-marquee {
  margin: 0 calc(-1 * var(--slide-pad));
  padding: .5rem 0;
}

.contact-marquee .marquee-track {
  animation-duration: 22s;
}

.contact-marquee .mq-word {
  font-size: clamp(2rem, 5.5vw, 4.2rem);
  font-weight: 800;
  letter-spacing: -.03em;
  text-transform: uppercase;
  padding-right: .4em;
  display: inline-flex;
  align-items: center;
  gap: .4em;
  color: var(--ink);
}

.contact-marquee .mq-word.stroke {
  color: transparent;
  -webkit-text-stroke: 1px rgba(19,37,29,.3);
}

.contact-marquee .mq-word .star {
  color: var(--amber);
  -webkit-text-stroke: 0;
  font-size: .55em;
}

@supports not (-webkit-text-stroke: 1px black) {
  .contact-marquee .mq-word.stroke {
    color: rgba(19,37,29,.22);
  }
}

.contact-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 1.5rem;
  padding-bottom: 0;
  align-items: stretch;
}

.contact-info {
  border-radius: 2rem;
  padding: 1.5rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.kicker {
  font-family: var(--mono);
  font-size: .62rem;
  font-weight: 800;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--muted);
}

.kicker b {
  color: var(--green);
  font-weight: 800;
}

.contact-info h3 {
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  font-weight: 800;
  letter-spacing: -.02em;
  line-height: 1.12;
  color: var(--ink);
}

.contact-info h3 .serif {
  color: var(--green);
}

.contact-info p {
  font-size: .88rem;
  line-height: 1.7;
  color: var(--muted);
  max-width: 36rem;
}

.contact-channels {
  display: flex;
  flex-direction: column;
  gap: .8rem;
  margin-top: auto;
}

.contact-channel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--line);
  padding-top: .75rem;
  font-family: var(--mono);
  font-size: .7rem;
  letter-spacing: .08em;
  color: var(--muted);
}

.contact-channel span:first-child {
  color: var(--faint);
  text-transform: uppercase;
  font-size: .55rem;
  letter-spacing: .18em;
}

.contact-channel a {
  position: relative;
  color: var(--ink);
}

.contact-channel a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -.2rem;
  height: 1px;
  width: 100%;
  background: var(--green);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .3s;
}

.contact-channel a:hover {
  color: var(--green);
}

.contact-channel a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.form {
  border-radius: 2rem;
  padding: 1.5rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: .45rem;
}

.field label {
  font-family: var(--mono);
  font-size: .55rem;
  font-weight: 800;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--muted);
}

.field label i {
  font-style: normal;
  color: var(--terra);
}

.field input,
.field select,
.field textarea {
  font-family: var(--sans);
  font-size: .9rem;
  color: var(--ink);
  background: rgba(255,255,255,.72);
  border: 1px solid var(--line);
  border-radius: .9rem;
  padding: .7rem .8rem;
  outline: none;
  box-shadow: none;
  transition: border-color .3s, box-shadow .3s;
  appearance: none;
  -webkit-appearance: none;
  -webkit-backdrop-filter: blur(.75rem);
  backdrop-filter: blur(.75rem);
}

.field input::placeholder,
.field textarea::placeholder {
  color: rgba(19,37,29,.38);
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: rgba(11,124,77,.45);
  box-shadow: 0 0 0 .25rem rgba(11,124,77,.12);
}

.field select {
  cursor: pointer;
  padding-right: 2.2rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2313251D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right .8rem center;
}

.field select option {
  background: #fff;
  color: var(--ink);
}

.field textarea {
  resize: vertical;
  min-height: 6rem;
  line-height: 1.55;
}

.form .btn {
  align-self: flex-start;
  margin-top: .25rem;
}

.form-status {
  font-family: var(--mono);
  font-size: .65rem;
  letter-spacing: .08em;
  color: var(--mint);
  min-height: 1rem;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

/* ═══════════════════════════════════════════════════════════
   FOOTER — closing slide
   ═══════════════════════════════════════════════════════════ */

.footer {
  height: 100vh;
  height: 100dvh;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: var(--slide-pad);
  scroll-snap-align: start;
  overflow: auto;
}

.footer-top {
  width: min(72rem, 100%);
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.footer .nav-brand {
  justify-content: center;
}

.footer .nav-brand-name {
  color: var(--ink);
}

.footer .nav-brand-name span {
  color: var(--green);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-links a {
  font-family: var(--mono);
  font-size: .62rem;
  letter-spacing: .14em;
  text-transform: lowercase;
  color: var(--muted);
  transition: color .25s;
}

.footer-links a:hover {
  color: var(--green);
}

.to-top {
  font-family: var(--mono);
  font-size: .62rem;
  letter-spacing: .18em;
  text-transform: lowercase;
  color: var(--muted);
  transition: color .25s;
}

.to-top:hover {
  color: var(--green);
}

.footer-bottom {
  width: min(72rem, 100%);
  border-radius: 2rem;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  font-family: var(--mono);
  font-size: .6rem;
  letter-spacing: .1em;
  color: var(--muted);
}

.footer-bottom .g {
  color: var(--green);
}

/* ═══════════════════════════════════════════════════════════
   PIXEL DISSOLVE
   ═══════════════════════════════════════════════════════════ */

.pixel-container {
  position: relative;
  overflow: hidden;
}

.pixel-grid {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

.pixel-unit {
  opacity: 0;
}

.pixel-unit.active {
  animation: pxflash .9s steps(2) both;
}

/* ═══════════════════════════════════════════════════════════
   MOTION
   ═══════════════════════════════════════════════════════════ */

@media (prefers-reduced-motion: no-preference) {
  .gs-fade {
    opacity: 0;
    animation: fadeUp .8s cubic-bezier(.22, 1, .36, 1) forwards;
  }
}

@keyframes blink {
  50% { opacity: 0; }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(11,124,77,.35); }
  50% { box-shadow: 0 0 0 .45rem rgba(11,124,77,0); }
}

@keyframes drift {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(.35rem); }
}

@keyframes marq {
  to { transform: translateX(-50%); }
}

@keyframes pxflash {
  0% { opacity: 0; }
  25% { opacity: 1; }
  60% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ═══════════════════════════════════════════════════════════
   MOTION SAFETY
   ═══════════════════════════════════════════════════════════ */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: .001s !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001s !important;
    scroll-behavior: auto !important;
  }

  .gs-fade {
    opacity: 1 !important;
    animation: none !important;
  }

  .marquee-track,
  .hm-track {
    animation: none !important;
  }
}
EOF

cat > app/styles/pixel-art.css << 'EOF'
/* ═══════════════════════════════════════════════════════════
   HARVESTFLOW — PIXEL ART / GLASS SLIDE ADAPTER
   ═══════════════════════════════════════════════════════════ */

canvas[data-pixel] {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  display: block;
  border-radius: 1rem;
}

.px-label {
  font-family: var(--mono);
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  white-space: nowrap;
}

.px-label::before {
  content: '';
  width: .35rem;
  height: .35rem;
  border-radius: 50%;
  background: var(--green);
  animation: px-live 2.2s ease-in-out infinite;
}

@keyframes px-live {
  0%, 100% { opacity: 1; }
  50% { opacity: .3; }
}

.pxshow-intro {
  border-radius: 1.5rem;
  padding: 1rem 1.25rem;
  font-size: .92rem;
  line-height: 1.55;
  color: var(--muted);
  max-width: none;
  margin: 0;
}

.pxshow-intro .hl {
  color: var(--ink);
}

.pxshow-nav {
  position: relative;
  top: auto;
  z-index: 20;
  display: flex;
  gap: .5rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  margin: 0;
  padding: .5rem;
  border-radius: 999px;
}

.pxshow-nav::-webkit-scrollbar {
  display: none;
}

.pxshow-jump {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  min-height: 2.4rem;
  padding: 0 .9rem;
  border-radius: 999px;
  font-family: var(--mono);
  font-size: .58rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--muted);
  box-shadow: none;
  transition: color .25s, background .25s, border-color .25s;
}

.pxshow-jump i {
  font-style: normal;
  color: var(--terra);
}

.pxshow-jump:hover,
.pxshow-jump.is-active {
  color: #fff;
  background: var(--green);
  border-color: var(--green);
}

.pxshow-jump.is-active i {
  color: rgba(255,255,255,.8);
}

.pxshow-jump:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 3px;
}

.pxshow-list {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(20rem, 52rem);
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: .5rem 0 1rem;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
}

.pxshow-row {
  scroll-snap-align: center;
  border-radius: 2rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: center;
  height: min(58dvh, 34rem);
  overflow: auto;
  transition: border-color .3s, box-shadow .3s;
}

.pxshow-row.is-active {
  border-color: rgba(11,124,77,.35);
  box-shadow: var(--shadow-lg);
}

.pxshow-row.is-active .pxshow-num {
  color: var(--amber);
}

.pxshow-num {
  font-family: var(--mono);
  font-size: .62rem;
  letter-spacing: .14em;
  color: var(--terra);
  display: block;
  margin-bottom: .8rem;
}

.pxshow-num::after {
  content: '———';
  display: block;
  color: rgba(19,37,29,.25);
  letter-spacing: 0;
  margin-top: .35rem;
}

.pxshow-text h3 {
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  font-weight: 800;
  letter-spacing: -.02em;
  line-height: 1.08;
  margin-bottom: .8rem;
  color: var(--ink);
}

.pxshow-text h3 .serif {
  color: var(--green);
}

.pxshow-text p {
  font-size: .88rem;
  line-height: 1.65;
  color: var(--muted);
  max-width: 34rem;
  margin-bottom: 1rem;
}

.pxshow-art {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .8rem;
  justify-self: center;
}

.pxshow-frame {
  border-radius: 1.5rem;
  padding: .8rem;
  background: rgba(255,255,255,.7);
}

.pxshow-frame canvas {
  width: min(16rem, 100%) !important;
  height: auto !important;
  aspect-ratio: 1;
  border-radius: 1rem;
}

.pxshow-row:hover .pxshow-frame {
  border-color: rgba(11,124,77,.35);
  box-shadow: 0 0 2rem rgba(11,124,77,.12);
}

.pxshow-row:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 4px;
}

@media (max-width: 900px) {
  .pxshow-list {
    grid-auto-columns: minmax(85vw, 1fr);
  }

  .pxshow-row {
    grid-template-columns: 1fr;
    height: min(68dvh, 40rem);
    align-items: start;
  }

  .pxshow-art {
    justify-self: start;
  }

  .pxshow-frame canvas {
    width: min(13rem, 100%) !important;
  }
}

.profile-pixels canvas {
  border: 1px solid var(--line);
}

@media (prefers-reduced-motion: reduce) {
  .px-label::before {
    animation: none;
  }

  .pxshow-row:hover {
    transform: none;
  }

  .pxshow-nav {
    position: static;
  }
}
EOF

echo "✅ Redesign applied. Run: rm -rf .next && pnpm dev"
