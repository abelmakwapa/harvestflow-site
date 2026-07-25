import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="px-6 py-32 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-leaf">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl">Off the map</h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-clay">That page isn&rsquo;t part of the chain. Let&rsquo;s get you back to the marketplace.</p>
      <a
        href="/"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
      >
        Back home
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </section>
  );
}
