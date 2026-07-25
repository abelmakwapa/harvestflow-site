"use client";

import { audienceProfiles } from "@/lib/content";
import Link from "next/link";
import AsciiVideo from "@/components/AsciiVideo";
import Reveal from "@/components/Reveal";
import { ArrowRight, Check } from "lucide-react";

export default function LearnClient({ slug }: { slug: string }) {
  const p = audienceProfiles.find((x) => x.slug === slug);
  if (!p) return null;
  const Icon = p.icon;

  return (
    <div className="bg-cream text-ink">
      <section className="px-6 pb-12 pt-10 md:pt-14">
        <div className="mx-auto max-w-5xl">
          <Link href="/ecosystem" className="inline-flex items-center gap-2 font-mono text-sm text-clay transition-colors hover:text-ink">
            <span aria-hidden="true">{"<"}</span> Back to ecosystem
          </Link>

          <Reveal className="mt-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-ink bg-lav text-ink">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-leaf">{p.navLabel}</span>
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
              {p.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-clay">{p.detailIntro}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <div className="overflow-hidden rounded-[1.75rem] border-2 border-ink bg-paper shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]">
              <AsciiVideo src={p.video} symbol=">" label={p.title} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto max-w-5xl space-y-16">
          {p.detailSections.map((sec, i) => (
            <Reveal key={sec.heading}>
              <div className="grid gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12">
                <div className="font-mono text-sm font-semibold text-leaf">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{sec.heading}</h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-clay md:text-base">{sec.body}</p>
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                        <span className="mt-0.5 font-mono text-base leading-none text-leaf" aria-hidden="true">{">"}</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-[2rem] border-2 border-ink bg-ink p-10 text-cream md:p-14">
              <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to put {p.navLabel.toLowerCase()} on the chain?
              </h2>
              <p className="mt-4 max-w-xl text-fog">
                Start free on the marketplace, or talk to our team about an enterprise rollout tailored to your operation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Talk to sales
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-cream bg-transparent px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-ink"
                >
                  See pricing
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80">
                {["No setup fees", "Offline-first", "Escrow-secured"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-lav" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
