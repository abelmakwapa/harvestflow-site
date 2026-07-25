"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AsciiVideo from "@/components/AsciiVideo";
import VideoPreview from "@/components/VideoPreview";
import Reveal from "@/components/Reveal";
import {
  Sprout, Truck, ShoppingCart, Package, ShieldCheck, Star, Landmark, MapPin, Wallet,
  CreditCard, Phone, Building2, Globe, Database, Smartphone, MessageSquare, ArrowRight,
  Check, X, type LucideIcon,
} from "lucide-react";
import {
  segments, audienceProfiles, infrastructurePillars, pricingTiers, integrations,
  platforms, traditionalPains, agriWins, ribbonEvents,
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

const asciiPalettes: Record<string, string> = {
  farmers: "^></",
};

function Wave({ className = "" }: { className?: string }) {
  return (
    <div className={`wave ${className}`} aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} style={{ animationDelay: `${(i % 9) * 0.09}s` }} />
      ))}
    </div>
  );
}

function FloatChip({ icon: Icon, className, rotate, delay }: { icon: LucideIcon; className: string; rotate: string; delay: string }) {
  return (
    <div className={`pointer-events-none absolute hidden md:block ${className}`} style={{ transform: `rotate(${rotate})` }}>
      <div className="floaty rounded-2xl border-2 border-ink bg-paper p-2.5 shadow-[0_14px_34px_-10px_rgba(0,0,0,0.45)]" style={{ animationDelay: delay }}>
        <Icon className="size-5 text-ink" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [activeId, setActiveId] = useState(audienceProfiles[0].slug);

  const articleRefs = useRef<Record<string, HTMLElement | null>>({});
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicatorRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef(activeId);
  const firstRun = useRef(true);

  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  // Scroll-spy for the sticky rail (logic; the visual slide is GSAP below).
  useEffect(() => {
    const els = audienceProfiles.map((p) => articleRefs.current[p.slug]).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).dataset.role ?? "";
          ratios.set(id, e.isIntersecting ? e.intersectionRatio : 0);
        });
        let best = activeIdRef.current;
        let max = 0;
        ratios.forEach((v, k) => { if (v > max) { max = v; best = k; } });
        if (max > 0 && best !== activeIdRef.current) setActiveId(best);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // GSAP-animated sliding highlight behind the active rail item.
  useGSAP(() => {
    const el = navItemRefs.current[activeId];
    const ind = indicatorRef.current;
    if (!el || !ind) return;
    if (firstRun.current) {
      gsap.set(ind, { y: el.offsetTop, height: el.offsetHeight, opacity: 1 });
      firstRun.current = false;
    } else {
      gsap.to(ind, { y: el.offsetTop, height: el.offsetHeight, duration: 0.35, ease: "power2.out" });
    }
  }, [activeId]);

  const seg = segments[active];
  const SegIcon = seg.icon;

  return (
    <>
      <main id="top">
        {/* ------------------------------------------------------------- hero */}
        <section className="relative overflow-hidden bg-ink text-cream">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-2 lg:pb-32 lg:pt-24">
            <div>
              <Reveal>
                <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                  The Complete Agricultural Supply Chain.{" "}
                  <span className="italic text-lav">From Seed to Shelf.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-fog">
                  A centralized ecosystem connecting farmers, suppliers, logistics, and enterprise buyers. Powered by secure escrow, offline-first trading, and algorithmic quality control.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="/ecosystem" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0">
                    Open Marketplace <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-cream bg-cream px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0">
                    Explore Enterprise Partnerships
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-12 text-sm font-medium text-cream/80">Select one to see HarvestFlow in action.</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {segments.map((s, i) => {
                    const on = i === active;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setActive(i)}
                        className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${on ? "border-cream bg-cream text-ink" : "border-cream/40 text-cream/85 hover:border-cream"}`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative">
                <FloatChip icon={Sprout} className="-left-5 -top-6" rotate="-8deg" delay="0s" />
                <FloatChip icon={Truck} className="-right-6 top-12" rotate="10deg" delay="0.6s" />
                <FloatChip icon={MapPin} className="-left-7 bottom-20" rotate="6deg" delay="1.1s" />
                <FloatChip icon={ShieldCheck} className="-right-5 -bottom-6" rotate="-10deg" delay="0.3s" />
                <div className="relative rounded-[2rem] border-2 border-cream/80 bg-ink p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-cream/30 bg-cream/5 text-lav">
                        <SegIcon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-fog">Live preview</p>
                        <p className="font-display text-lg font-semibold">{seg.label}</p>
                      </div>
                    </div>
                    <span className="relative flex items-center gap-2 text-xs font-medium text-cream/80">
                      <span className="relative grid h-2.5 w-2.5 place-items-center">
                        <span className="pulse-ring absolute inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
                      </span>
                      LIVE
                    </span>
                  </div>
                  <p className="mt-6 min-h-[3.5rem] text-base leading-relaxed text-cream/90">{seg.preview}</p>
                  <div className="mt-6 flex items-end justify-between rounded-2xl border border-cream/15 bg-cream/[0.03] p-5">
                    <div>
                      <p className="font-display text-4xl font-semibold text-lav">{seg.metric}</p>
                      <p className="mt-1 text-xs text-fog">{seg.metricLabel}</p>
                    </div>
                    <Wave className="text-cream/70" />
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs text-fog">
                      <span>Quality confidence</span><span>{seg.bar}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream/10">
                      <div className="h-full rounded-full bg-lav transition-[width] duration-500 ease-out" style={{ width: `${seg.bar}%` }} />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm text-cream/80">
                    <ShieldCheck className="size-4 text-lav" aria-hidden="true" />
                    Funds held in escrow until verified delivery
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------ integrations band */}
        <section className="relative overflow-hidden bg-leaf py-12 text-cream">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-coral/30 blur-2xl" />
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-cream/70">Integrates with the tools you already run</p>
          <div className="marquee">
            <div className="marquee__track">
              {[...integrations, ...integrations].map((it, i) => {
                const Icon = it.icon;
                return (
                  <span key={i} className="flex shrink-0 items-center gap-3 px-10 text-2xl font-semibold tracking-tight text-cream/85">
                    <Icon className="size-6" aria-hidden="true" />{it.name}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------- ecosystem: Warp-style rail */}
        <section id="ecosystem" className="scroll-mt-28 bg-cream">
          <div className="mx-auto w-full max-w-6xl px-6 pt-24 md:pt-32">
            <Reveal className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-leaf">The ecosystem</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Built for every link in the chain</h2>
              <p className="mt-5 text-lg leading-relaxed text-clay">
                Four roles, one continuous chain. Pick a link on the left and watch it stream live as an ASCII matrix — the same offline-first engine that runs on a feature phone.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
              {/* sticky rail (NOT wrapped in a transform reveal: that breaks sticky) */}
              <nav className="hidden lg:sticky lg:top-24 lg:block lg:self-start" aria-label="Ecosystem roles">
                <div className="relative flex flex-col gap-1">
                  <div ref={indicatorRef} className="pointer-events-none absolute left-0 right-0 top-0 rounded-lg bg-ink opacity-0" aria-hidden="true" />
                  {audienceProfiles.map((p) => {
                    const Icon = p.icon;
                    const isActive = activeId === p.slug;
                    return (
                      <a
                        key={p.slug}
                        ref={(el) => { navItemRefs.current[p.slug] = el; }}
                        href={`#role-${p.slug}`}
                        onClick={() => setActiveId(p.slug)}
                        className={`group relative z-10 flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors ${isActive ? "text-cream" : "text-clay hover:text-ink"}`}
                      >
                        <span className={`grid size-6 shrink-0 place-items-center rounded-md border border-ink/15 bg-lav text-ink transition-opacity ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`}>
                          <Icon className="size-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.28em]">{p.navLabel}</span>
                      </a>
                    );
                  })}
                </div>
              </nav>

              {/* stacked articles */}
              <div className="flex flex-col gap-20">
                {audienceProfiles.map((p) => {
                  const Icon = p.icon;
                  const usesNativeVideo = p.slug === "logistics" || p.slug === "suppliers";
                  return (
                    <article
                      key={p.slug}
                      id={`role-${p.slug}`}
                      data-role={p.slug}
                      ref={(el) => { articleRefs.current[p.slug] = el; }}
                      className="scroll-mt-28"
                    >
                      <Reveal>
                        <div className="mb-7 overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
                          {usesNativeVideo ? (
                            <VideoPreview src={p.video} label={p.title} />
                          ) : (
                            <AsciiVideo
                              src={p.video}
                              palette={asciiPalettes[p.slug] ?? ">"}
                              label={p.title}
                            />
                          )}
                        </div>
                      </Reveal>
                      <Reveal delay={0.05}>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-2.5 lg:hidden">
                                <span className="grid size-6 place-items-center rounded-md border border-ink/15 bg-lav text-ink">
                                  <Icon className="size-3.5" aria-hidden="true" />
                                </span>
                                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-clay">{p.navLabel}</span>
                              </div>
                              <h3 className="max-w-2xl font-display text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
                            </div>
                            <a
                              href={`/ecosystem/${p.slug}`}
                              className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-md bg-ink px-3.5 py-2 font-mono text-sm font-medium text-cream transition-colors hover:bg-ink/90"
                            >
                              {p.ctaLabel}
                              <ArrowRight className="size-3.5" aria-hidden="true" />
                            </a>
                          </div>
                          <p className="max-w-xl text-[15px] leading-relaxed text-clay md:text-base">{p.summary}</p>
                        </div>
                      </Reveal>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- stat statement */}
        <section className="bg-cream px-6 pb-8 pt-16 md:pb-16 md:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <h2 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
                <span className="relative inline-block">
                  4x faster
                  <svg className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full text-lav md:h-4" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 8 C 60 2, 120 12, 180 6 S 280 2, 298 7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>{" "}
                settlements
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-clay">
                Funds release the moment quality is verified — no waiting on paperwork, no chasing invoices, no broker float. Money moves at the speed of the harvest.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------- comparison */}
        <section className="bg-cream px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-[2rem] border-2 border-ink bg-paper p-8 md:p-10">
                <p className="text-sm font-medium text-clay">Traditional trading</p>
                <p className="mt-3 font-display text-6xl font-semibold tracking-tight md:text-7xl">14 days</p>
                <p className="mt-2 text-clay">average time for a farmer to get paid</p>
                <div className="my-7 h-px w-full bg-line" />
                <ul className="space-y-3">
                  {traditionalPains.map((pain) => (
                    <li key={pain} className="flex gap-3 text-[15px] text-clay">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-ink/30"><X className="size-3" aria-hidden="true" /></span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[2rem] border-2 border-ink bg-[radial-gradient(120%_120%_at_72%_12%,#3b2a18_0%,#15120d_62%)] p-8 text-cream md:p-10">
                <div className="pointer-events-none absolute inset-0 flex items-center">
                  <div className="w-full -rotate-6">
                    <div className="marquee marquee--fast">
                      <div className="marquee__track">
                        {[...ribbonEvents, ...ribbonEvents].map((ev, i) => (
                          <span key={i} className="shrink-0 whitespace-nowrap px-8 text-sm text-cream/55" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>• {ev}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-cream/70">HarvestFlow</p>
                  <p className="mt-3 font-display text-6xl font-semibold tracking-tight md:text-7xl">Same day</p>
                  <p className="mt-2 text-cream/70">escrow-secured release, on confirmation</p>
                </div>
                <div className="relative z-10 flex justify-center py-6">
                  <span className="inline-flex items-center gap-3 rounded-full border border-cream/40 bg-ink/40 px-5 py-2.5 text-cream"><Wave className="text-cream" /></span>
                </div>
                <ul className="relative z-10 space-y-3">
                  {agriWins.map((win) => (
                    <li key={win} className="flex gap-3 text-[15px] text-cream/90">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lav text-ink"><Check className="size-3" aria-hidden="true" /></span>
                      <span>{win}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------- infrastructure */}
        <section id="infrastructure" className="scroll-mt-28 overflow-hidden bg-ink px-6 py-24 text-cream md:py-32">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-lav">Trust &amp; security</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Infrastructure you can trust</h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {infrastructurePillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <Reveal key={pillar.title} delay={i * 0.05}>
                    <div className="h-full rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-lav/60">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-lav/40 bg-lav/10 text-lav"><Icon className="size-6" aria-hidden="true" /></span>
                      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{pillar.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-fog">{pillar.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* --------------------------------------------- don't guess / grade */}
        <section className="overflow-hidden bg-cream px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <h2 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
                <span className="text-clay">Don&rsquo;t guess.</span> Grade.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-clay">
                Every lot is scored by algorithmic quality control before it ever reaches a buyer — so premium produce earns premium pricing, automatically.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/ecosystem" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0">
                  Open Marketplace <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-transparent px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream">
                  Talk to sales
                </Link>
              </div>
              <div className="mt-8 flex justify-center">
                <span className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-paper px-5 py-2.5 text-ink"><Wave className="text-ink" /></span>
              </div>
              <p className="mt-10 text-sm text-clay">Available on Web, Android, USSD &amp; SMS</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {platforms.map((pl) => {
                  const Icon = pl.icon;
                  return (
                    <span key={pl.label} className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-sm font-medium text-ink">
                      <Icon className="size-4" aria-hidden="true" />{pl.label}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------------- pricing */}
        <section id="pricing" className="scroll-mt-28 bg-cream px-6 pb-28 md:pb-36">
          <div className="mx-auto max-w-4xl">
            <Reveal className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-leaf">B2B pricing</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Enterprise supply chain management</h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {pricingTiers.map((tier, i) => (
                <Reveal key={tier.title} delay={i * 0.05}>
                  <div className={`relative flex h-full flex-col rounded-[1.75rem] bg-paper p-8 ${tier.highlighted ? "border-2 border-lavdeep" : "border-2 border-line"}`}>
                    {tier.highlighted && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border-2 border-ink bg-lav px-3 py-1 text-xs font-semibold text-ink">Most popular</span>
                    )}
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{tier.title}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-display text-5xl font-semibold tracking-tight">{tier.price}</span>
                      <span className="text-sm text-clay">{tier.cadence}</span>
                    </div>
                    <ul className="mt-7 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-[15px] leading-relaxed text-clay">
                          <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${tier.highlighted ? "bg-lav text-ink" : "border border-ink/30 text-ink"}`}>
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tier.highlighted ? "/contact" : "/#top"}
                      className={`mt-8 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0 ${tier.highlighted ? "bg-lav text-ink" : "bg-transparent text-ink hover:bg-ink hover:text-cream"}`}
                    >
                      {tier.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
