import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

const PDF_URL = "/press/harvestflow-field-notes-july-2026.pdf";
const PAGE_TITLES = [
  "Seed to Shelf cover",
  "Trade should move at the speed of the harvest",
  "Four roles, one continuous flow",
  "Built around the harvest",
  "Stronger together",
  "Evidence before price",
  "Designed for the signal that drops",
  "The offline case is the real case",
  "The road is part of the product",
  "Move the load with context",
  "One market, many participants",
  "Source with proof attached",
  "Reach the people already growing",
  "Escrow by default",
  "A reputation that follows the work",
  "From seed to shelf",
  "HarvestFlow Press Room",
];

export const metadata: Metadata = {
  title: "Seed to Shelf | HarvestFlow Field Notes",
  description: "Read HarvestFlow Field Notes issue 01, a 17-page guide to the connected agricultural supply chain.",
};

export default function SeedToShelfPage() {
  return (
    <main className="bg-ink text-cream">
      <section className="px-6 pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <Link href="/company/press" className="inline-flex items-center gap-2 font-mono text-sm text-lav hover:text-cream">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to Press Room
          </Link>
          <div className="mt-9 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-lav">Field Notes 01 / July 2026</p>
              <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">Seed to Shelf</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fog">
                A field guide to how farmers, fleets, buyers, and suppliers move through one connected trade record.
              </p>
            </div>
            <a
              href={PDF_URL}
              download
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl border-2 border-cream bg-lav px-5 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Download PDF <Download className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-y border-cream/15 py-5 font-mono text-[11px] uppercase tracking-wider text-fog">
            <span>17 pages</span>
            <span>Published 25 July 2026</span>
            <span>Source: HarvestFlow Press Room</span>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0f0d] px-3 py-10 sm:px-6 md:py-16" aria-label="Publication pages">
        <ol className="mx-auto max-w-[1224px] space-y-8 md:space-y-12">
          {PAGE_TITLES.map((title, index) => {
            const pageNumber = index + 1;
            return (
              <li key={title}>
                <figure>
                  <div className="overflow-hidden rounded-sm bg-paper shadow-[0_28px_70px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
                    <Image
                      src={`/press/harvestflow-field-notes/page-${String(pageNumber).padStart(2, "0")}.webp`}
                      alt={`Page ${pageNumber}: ${title}`}
                      width={1530}
                      height={990}
                      preload={pageNumber === 1}
                      loading={pageNumber === 1 ? undefined : "lazy"}
                      sizes="(min-width: 1272px) 1224px, calc(100vw - 24px)"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-widest text-fog">
                    <span>{title}</span>
                    <span>{String(pageNumber).padStart(2, "0")} / 17</span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-t border-cream/15 px-6 py-16 text-center">
        <p className="font-display text-3xl font-semibold">Keep a copy for the field.</p>
        <a href={PDF_URL} download className="mt-6 inline-flex items-center gap-2 font-semibold text-lav hover:text-cream">
          Download the 17-page PDF <Download className="size-4" aria-hidden="true" />
        </a>
        <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-fog">
          This edition retains artwork and photography from the supplied WARKITCHEN Issue 041 pages. Rights clearance and final attribution are required before public release.
        </p>
      </section>
    </main>
  );
}
