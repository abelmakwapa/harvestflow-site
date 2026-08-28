"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Handshake, Menu, X } from "lucide-react";
import { navEntries, type MegaLink } from "@/lib/content";

function menuId(label: string) {
  return `nav-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function MegaPrimary({ link, onNavigate }: { link: MegaLink; onNavigate: () => void }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
    >
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
    </Link>
  );
}

function MegaSecondaryLink({ link, onNavigate }: { link: MegaLink; onNavigate: () => void }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="flex items-start gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
    >
      <Icon className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">{link.title}</span>
        {link.sub && <span className="block text-xs text-clay">{link.sub}</span>}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLSpanElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  useLayoutEffect(() => {
    const trigger = openMenu ? triggerRefs.current[openMenu] : null;
    const wrap = wrapRef.current;
    const seam = seamRef.current;
    if (!trigger || !wrap || !seam) return;

    const positionSeam = () => {
      const triggerRect = trigger.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      seam.style.left = `${triggerRect.left - wrapRect.left + triggerRect.width / 2 - 6}px`;
    };

    positionSeam();
    window.addEventListener("resize", positionSeam);
    return () => window.removeEventListener("resize", positionSeam);
  }, [openMenu]);

  useGSAP(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
      );
    }
  }, [openMenu]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openMenu) triggerRefs.current[openMenu]?.focus();
      else if (mobileOpen) mobileButtonRef.current?.focus();
      closeAll();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) closeAll();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen, openMenu]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [mobileOpen]);

  const activeEntry = openMenu ? navEntries.find((entry) => entry.label === openMenu && entry.mega) : null;

  const openDesktopMenu = (label: string) => {
    setOpenMenu(label);
    setMobileOpen(false);
  };

  const focusFirstPanelLink = () => {
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
  };

  return (
    <header className={`sticky top-0 z-50 px-4 pt-4 ${pathname === "/" ? "bg-ink" : "bg-cream"}`}>
      <div
        ref={wrapRef}
        className="relative mx-auto max-w-6xl"
        onMouseLeave={() => setOpenMenu(null)}
        onBlur={(event) => {
          const nextTarget = event.relatedTarget as Node | null;
          if (nextTarget && !event.currentTarget.contains(nextTarget)) setOpenMenu(null);
        }}
      >
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-between gap-4 rounded-[1.75rem] border-2 border-ink bg-cream px-4 py-3 shadow-[0_16px_44px_-18px_rgba(0,0,0,0.4)]"
        >
          <Link href="/#top" onClick={closeAll} className="flex items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            <Image src="/logo-grayscale.svg" alt="" width={32} height={32} unoptimized className="size-8 rounded-xl" />
            <span className="font-display text-xl font-semibold tracking-tight">HarvestFlow</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navEntries.map((entry) => {
              const open = openMenu === entry.label;
              if (!entry.mega) {
                return (
                  <Link
                    key={entry.label}
                    href={entry.href}
                    onClick={closeAll}
                    aria-current={pathname === entry.href || pathname.startsWith(`${entry.href}/`) ? "page" : undefined}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink focus-visible:bg-paper focus-visible:text-ink focus-visible:outline-none"
                  >
                    {entry.label}
                  </Link>
                );
              }

              return (
                <button
                  key={entry.label}
                  ref={(element) => { triggerRefs.current[entry.label] = element; }}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={open}
                  aria-controls={`${menuId(entry.label)}-desktop`}
                  onMouseEnter={() => openDesktopMenu(entry.label)}
                  onFocus={() => openDesktopMenu(entry.label)}
                  onClick={() => {
                    setOpenMenu((current) => current === entry.label ? null : entry.label);
                    setMobileOpen(false);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      openDesktopMenu(entry.label);
                      focusFirstPanelLink();
                    }
                  }}
                  className={`group flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none ${
                    open ? "bg-paper text-ink" : "text-ink/75 hover:text-ink focus-visible:bg-paper focus-visible:text-ink"
                  }`}
                >
                  <span>{entry.label}</span>
                  <ChevronDown className={`size-3.5 opacity-60 transition-transform ${open ? "rotate-180" : "group-hover:translate-y-0.5"}`} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/contact?source=website_partnership&intent=enterprise"
              onClick={closeAll}
              className="hidden items-center gap-2 rounded-2xl border-2 border-ink bg-lav px-4 py-2 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:translate-y-0 md:inline-flex"
            >
              <Handshake className="size-4" aria-hidden="true" />
              Partner With Us
            </Link>
            <button
              ref={mobileButtonRef}
              type="button"
              onClick={() => {
                setMobileOpen((current) => !current);
                setOpenMenu(null);
              }}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-paper text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:hidden"
            >
              {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {activeEntry?.mega && (
          <div className="absolute left-0 right-0 top-full z-50 pt-2" onMouseEnter={() => setOpenMenu(activeEntry.label)}>
            <div
              ref={panelRef}
              id={`${menuId(activeEntry.label)}-desktop`}
              aria-label={`${activeEntry.label} menu`}
              className="relative rounded-3xl border-2 border-ink bg-cream p-3 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.5)]"
            >
              <span
                ref={seamRef}
                className="absolute -top-[7px] size-3 rotate-45 border-l-2 border-t-2 border-ink bg-cream"
                aria-hidden="true"
              />
              <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.5fr_1fr]">
                <div className="space-y-1 p-1">
                  {activeEntry.mega.primary.map((link) => (
                    <MegaPrimary key={link.title} link={link} onNavigate={closeAll} />
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4 border-line p-1 md:border-l md:pl-4">
                  {activeEntry.mega.secondary.map((column) => (
                    <div key={column.heading}>
                      <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-clay">{column.heading}</p>
                      <div className="mt-1 space-y-0.5">
                        {column.links.map((link) => (
                          <MegaSecondaryLink key={link.title} link={link} onNavigate={closeAll} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mt-2 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-3xl border-2 border-ink bg-cream p-3 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] md:hidden"
          >
            {navEntries.map((entry) => {
              const expanded = mobileSection === entry.label;
              return (
                <div key={entry.label} className="border-b border-line/70 last:border-0">
                  <div className="flex items-center gap-1 py-1">
                    <Link
                      href={entry.href}
                      onClick={closeAll}
                      aria-current={pathname === entry.href || pathname.startsWith(`${entry.href}/`) ? "page" : undefined}
                      className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/80 hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
                    >
                      {entry.label}
                    </Link>
                    {entry.mega && (
                      <button
                        type="button"
                        aria-label={`${expanded ? "Collapse" : "Expand"} ${entry.label} menu`}
                        aria-expanded={expanded}
                        aria-controls={`${menuId(entry.label)}-mobile`}
                        onClick={() => setMobileSection((current) => current === entry.label ? null : entry.label)}
                        className="grid size-11 place-items-center rounded-xl text-ink hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
                      >
                        <ChevronDown className={`size-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  {expanded && entry.mega && (
                    <div id={`${menuId(entry.label)}-mobile`} className="space-y-3 pb-3 pl-2">
                      <div className="space-y-1">
                        {entry.mega.primary.map((link) => (
                          <MegaPrimary key={link.title} link={link} onNavigate={closeAll} />
                        ))}
                      </div>
                      {entry.mega.secondary.map((column) => (
                        <div key={column.heading}>
                          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-clay">{column.heading}</p>
                          <div className="mt-1 space-y-0.5">
                            {column.links.map((link) => (
                              <MegaSecondaryLink key={link.title} link={link} onNavigate={closeAll} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href="/contact?source=website_partnership&intent=enterprise"
              onClick={closeAll}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-4 py-2.5 text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <Handshake className="size-4" aria-hidden="true" />
              Partner With Us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
