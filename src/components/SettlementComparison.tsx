import Reveal from "@/components/Reveal";
import { Check, X } from "lucide-react";
import { agriWins, ribbonEvents, traditionalPains } from "@/lib/content";

function Wave() {
  return (
    <div className="wave" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} style={{ animationDelay: `${(i % 9) * 0.09}s` }} />
      ))}
    </div>
  );
}

export default function SettlementComparison() {
  return (
    <section className="bg-cream px-6 pb-8 pt-16 md:pb-16 md:pt-24">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="font-display text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
            <span className="relative inline-block">
              4x faster
              <svg
                className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full text-lav md:h-4"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
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

      <div className="mx-auto mt-16 grid max-w-6xl items-stretch gap-6 md:mt-24 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-[2rem] border-2 border-ink bg-paper p-8 text-left md:p-10">
            <p className="text-sm font-medium text-clay">Traditional trading</p>
            <p className="mt-3 font-display text-6xl font-semibold tracking-tight md:text-7xl">14 days</p>
            <p className="mt-2 text-clay">average time for a farmer to get paid</p>
            <div className="my-7 h-px w-full bg-line" />
            <ul className="space-y-3">
              {traditionalPains.map((pain) => (
                <li key={pain} className="flex gap-3 text-[15px] text-clay">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-ink/30">
                    <X className="size-3" aria-hidden="true" />
                  </span>
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[2rem] border-2 border-ink bg-[radial-gradient(120%_120%_at_72%_12%,#3b2a18_0%,#15120d_62%)] p-8 text-left text-cream md:p-10">
            <div className="pointer-events-none absolute inset-0 flex items-center">
              <div className="w-full -rotate-6">
                <div className="marquee marquee--fast">
                  <div className="marquee__track">
                    {[...ribbonEvents, ...ribbonEvents].map((event, i) => (
                      <span key={i} className="shrink-0 whitespace-nowrap px-8 text-sm text-cream/55" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
                        • {event}
                      </span>
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
              <span className="inline-flex items-center gap-3 rounded-full border border-cream/40 bg-ink/40 px-5 py-2.5 text-cream">
                <Wave />
              </span>
            </div>
            <ul className="relative z-10 space-y-3">
              {agriWins.map((win) => (
                <li key={win} className="flex gap-3 text-[15px] text-cream/90">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lav text-ink">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
