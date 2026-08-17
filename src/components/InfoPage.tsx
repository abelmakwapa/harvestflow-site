import { Sprout, ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { pages } from "@/lib/pages";
import type { PageContent } from "@/lib/pages";
import Link from "next/link";
import AppLink from "@/components/AppLink";
import { notFound } from "next/navigation";

export default function InfoPage({ slug, content }: { slug?: string; content?: PageContent }) {
  const registeredContent = slug && slug in pages ? pages[slug as keyof typeof pages] as PageContent : undefined;
  const c: PageContent = content ?? registeredContent ?? notFound();

  const backLink = c.eyebrow === "Company"
    ? { href: "/company", label: "Back to company" }
    : c.eyebrow === "Infrastructure"
      ? { href: "/infrastructure", label: "Back to infrastructure" }
      : c.eyebrow === "B2B Pricing"
        ? { href: "/pricing", label: "Back to pricing" }
        : c.eyebrow === "Legal"
          ? { href: "/", label: "Back to home" }
          : { href: "/ecosystem", label: "Back to ecosystem" };
  const defaultCta = {
    heading: "Ready to get started?",
    body: "Start free on the marketplace, or talk to our team about an enterprise rollout tailored to your operation.",
    primary: { label: "Talk to sales", href: "/contact?source=website_sales&intent=enterprise" },
    secondary: { label: "See pricing", href: "/pricing" },
    benefits: ["No setup fees", "Offline-first", "Escrow-secured"],
  };
  const cta = c.cta === false ? null : (c.cta ?? defaultCta);

  return (
    <main className="bg-cream text-ink">
      <section className="px-5 pb-12 pt-10 sm:px-6 md:pt-14">
        <div className="mx-auto max-w-5xl">
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-2 font-mono text-sm text-clay transition-colors hover:text-ink"
          >
            <span aria-hidden="true">{"<"}</span> {backLink.label}
          </Link>

          <Reveal className="mt-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-ink bg-lav text-ink">
                <Sprout className="size-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
                {c.eyebrow}
              </span>
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
              {c.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-clay">{c.intro}</p>
            {c.notice && (
              <p role="note" className="mt-6 max-w-2xl rounded-2xl border border-leaf/30 bg-lav px-5 py-4 text-sm leading-relaxed text-leaf">
                {c.notice}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-6">
        <div className="mx-auto max-w-5xl space-y-16">
          {c.blocks.map((b, i) => (
            <Reveal key={b.heading}>
              <div className="grid gap-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12">
                <div className="font-mono text-sm font-semibold text-leaf">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                    {b.heading}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-clay md:text-base">
                    {b.body}
                  </p>
                  {b.bullets && (
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {b.bullets.map((x) => (
                        <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                          <span className="mt-0.5 font-mono text-base leading-none text-leaf" aria-hidden="true">
                            {">"}
                          </span>
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {b.actions && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {b.actions.map((action) => (
                        <Link key={action.href} href={action.href} className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-ink bg-paper px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-ink hover:text-cream">
                          {action.label}<ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {cta && <section className="px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="rounded-[2rem] border-2 border-ink bg-ink p-7 text-cream sm:p-10 md:p-14">
              <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {cta.heading}
              </h2>
              <p className="mt-4 max-w-xl text-fog">
                {cta.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {slug === "quality-grading" ? <AppLink
                  destination="grade"
                  query={{ intent: "farmer" }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Grade produce
                  <ArrowRight className="size-4" aria-hidden="true" />
                </AppLink> : <Link
                  href={cta.primary.href}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {cta.primary.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>}
                {cta.secondary && <Link
                  href={cta.secondary.href}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-cream bg-transparent px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-ink"
                >
                  {cta.secondary.label}
                </Link>}
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80">
                {(cta.benefits ?? []).map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="size-4 text-lav" aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>}
    </main>
  );
}
