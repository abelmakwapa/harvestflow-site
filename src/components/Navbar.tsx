"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sprout, ChevronDown, Menu, X, Handshake, type LucideIcon } from "lucide-react";
import { navEntries, type MegaLink } from "@/lib/content";

function MegaPrimary({ link }: { link: MegaLink }) {
  const Icon = link.icon;
  return (
    <a href={link.href} className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-paper">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-ink/10 bg-cream text-ink">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          {link.title}
          {link.badge && (
            <span className="rounded bg-coral px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
              {link.badge}
            </span>
          )}
        </span>
        {link.sub && <span className="mt-0.5 block text-xs text-clay">{link.sub}</span>}
      </span>
    </a>
  );
}

function MegaSecondaryLink({ link }: { link: MegaLink }) {
  const Icon = link.icon;
  return (
    <a href={link.href} className="flex items-start gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-paper">
      <Icon className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">{link.title}</span>
        {link.sub && <span className="block text-xs text-clay">{link.sub}</span>}
      </span>
    </a>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [seam, setSeam] = useState<{ left: number; width: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useLayoutEffect(() => {
    if (!openMenu) { setSeam(null); return; }
    const el = triggerRefs.current[openMenu];
    if (el) setSeam({ left: el.offsetLeft, width: el.offsetWidth });
  }, [openMenu]);

  useGSAP(() => {
    if (panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
    }
  }, [openMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenMenu(null); setMenuOpen(false); } };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { window.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);

  const activeEntry = openMenu ? navEntries.find((e) => e.label === openMenu && e.mega) : null;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div ref={wrapRef} className="relative mx-auto max-w-6xl" onMouseLeave={() => setOpenMenu(null)}>
        <nav className="flex items-center justify-between gap-4 rounded-[1.75rem] border-2 border-ink bg-cream px-4 py-3 shadow-[0_16px_44px_-18px_rgba(0,0,0,0.4)]">
          <a href="/#top" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-ink text-cream">
              <Sprout className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">HarvestFlow</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navEntries.map((entry) => {
              const open = openMenu === entry.label;
              return (
                <a
                  key={entry.label}
                  ref={(el) => { triggerRefs.current[entry.label] = el; }}
                  href={entry.href}
                  onMouseEnter={() => setOpenMenu(entry.mega ? entry.label : null)}
                  onFocus={() => setOpenMenu(entry.mega ? entry.label : null)}
                  onClick={() => setOpenMenu(null)}
                  className={`group flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    open ? "bg-paper text-ink" : "text-ink/75 hover:text-ink"
                  }`}
                >
                  <span>{entry.label}</span>
                  {entry.mega && (
                    <ChevronDown className={`size-3.5 opacity-60 transition-transform ${open ? "rotate-180" : "group-hover:translate-y-0.5"}`} aria-hidden="true" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/contact"
              className="hidden items-center gap-2 rounded-2xl border-2 border-ink bg-lav px-4 py-2 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0 md:inline-flex"
            >
              <Handshake className="size-4" aria-hidden="true" />
              Partner With Us
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-paper text-ink md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {activeEntry && activeEntry.mega && (
          <div
            ref={panelRef}
            className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 rounded-3xl border-2 border-ink bg-cream p-3 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)]"
          >
            {seam && (
              <span
                className="absolute -top-[7px] size-3 rotate-45 border-l-2 border-t-2 border-ink bg-cream"
                style={{ left: seam.left + seam.width / 2 - 6 }}
                aria-hidden="true"
              />
            )}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.5fr_1fr]">
              <div className="space-y-1 p-1">
                {activeEntry.mega.primary.map((link) => (
                  <MegaPrimary key={link.title} link={link} />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-4 border-line p-1 md:border-l md:pl-4">
                {activeEntry.mega.secondary.map((col) => (
                  <div key={col.heading}>
                    <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">{col.heading}</p>
                    <div className="mt-1 space-y-0.5">
                      {col.links.map((link) => (
                        <MegaSecondaryLink key={link.title} link={link} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-3xl border-2 border-ink bg-cream p-3 md:hidden">
          {navEntries.map((entry) => (
            <a
              key={entry.label}
              href={entry.href}
              onClick={() => { setMenuOpen(false); setOpenMenu(null); }}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-paper"
            >
              {entry.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-4 py-2.5 text-sm font-semibold text-ink"
          >
            <Handshake className="size-4" aria-hidden="true" />
            Partner With Us
          </a>
        </div>
      )}
    </header>
  );
}
