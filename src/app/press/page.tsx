import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, FileText, Newspaper, Sprout } from "lucide-react";
import Reveal from "@/components/Reveal";

const PDF_URL = "/press/harvestflow-field-notes-july-2026.pdf";

export const metadata: Metadata = {
  title: "Press Room | HarvestFlow",
  description: "HarvestFlow publications, company information, and media resources.",
};

export default function PressRoomPage() {
  return (
    <main className="bg-cream text-ink">
      <section className="px-6 pb-14 pt-10 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl border-2 border-ink bg-lav">
                <Newspaper className="size-5" aria-hidden="true" />
              </span>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Press room</p>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">
              Stories from a more connected food chain.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-clay">
              HarvestFlow publications, company information, and media resources for journalists and partners.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28" aria-labelledby="latest-publication">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-leaf">Latest publication</p>
              <h2 id="latest-publication" className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                HarvestFlow Field Notes
              </h2>
            </div>
            <span className="hidden font-mono text-xs text-clay sm:block">ISSUE 01 / 17 PAGES</span>
          </div>

          <Reveal>
            <article className="overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-[0_28px_70px_-40px_rgba(21,18,13,0.65)]">
              <div className="grid lg:grid-cols-[minmax(360px,1.08fr)_minmax(0,0.92fr)]">
                <Link
                  href="/company/press/seed-to-shelf"
                  className="group relative block overflow-hidden border-b-2 border-ink bg-ink lg:border-b-0 lg:border-r-2"
                  aria-label="Read HarvestFlow Field Notes: Seed to Shelf"
                >
                  <Image
                    src="/press/harvestflow-field-notes/page-01.webp"
                    alt="Cover of HarvestFlow Field Notes issue 01, Seed to Shelf"
                    width={1530}
                    height={990}
                    preload
                    sizes="(min-width: 1024px) 43vw, 100vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                </Link>

                <div className="flex flex-col p-7 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-leaf">
                    <span className="rounded-full border border-leaf/25 bg-lav px-3 py-1.5">Field Notes 01</span>
                    <span className="rounded-full border border-ink/15 px-3 py-1.5">25 July 2026</span>
                  </div>
                  <h3 className="mt-7 max-w-xl font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
                    Seed to Shelf
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-clay md:text-lg">
                    A 17-page field guide to the connected agricultural supply chain: aggregation and quality grading,
                    offline access, logistics, buyer traceability, supplier tools, escrow, and reputation.
                  </p>

                  <dl className="mt-8 grid gap-4 border-y border-line py-6 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-clay">Published by</dt>
                      <dd className="mt-1 font-semibold">HarvestFlow Press Room</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] font-semibold uppercase tracking-widest text-clay">Visual source</dt>
                      <dd className="mt-1 font-semibold">Supplied WARKITCHEN Issue 041 pages</dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/company/press/seed-to-shelf"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-5 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                    >
                      Read full issue <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={PDF_URL}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-transparent px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-cream"
                    >
                      Download PDF <Download className="size-4" aria-hidden="true" />
                    </a>
                  </div>

                  <p className="mt-auto pt-8 text-xs leading-relaxed text-clay">
                    Rights clearance and final attribution for the retained source artwork and photography are required before public release.
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="border-t-2 border-ink bg-ink px-6 py-20 text-cream md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <Reveal>
            <div className="rounded-[2rem] border border-cream/20 p-8 md:p-10">
              <FileText className="size-6 text-lav" aria-hidden="true" />
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight">Company information</h2>
              <p className="mt-4 max-w-md leading-relaxed text-fog">
                HarvestFlow connects farmers, fleets, B2B buyers, and agricultural suppliers on one escrow-secured,
                offline-first platform.
              </p>
              <Link href="/company/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-lav hover:text-cream">
                Read about HarvestFlow <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-[2rem] border border-cream/20 p-8 md:p-10">
              <Sprout className="size-6 text-lav" aria-hidden="true" />
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight">Media enquiries</h2>
              <p className="mt-4 max-w-md leading-relaxed text-fog">
                Request interviews, product information, or approved brand materials from the HarvestFlow team.
              </p>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-lav hover:text-cream">
                Contact the team <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
