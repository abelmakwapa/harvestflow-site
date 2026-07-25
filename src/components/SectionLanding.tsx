import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SectionLink {
  title: string;
  description: string;
  href: string;
}

export default function SectionLanding({
  eyebrow,
  title,
  intro,
  links,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  links: SectionLink[];
}) {
  return (
    <main className="bg-cream px-6 py-14 text-ink md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-leaf">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-clay">{intro}</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex min-h-52 flex-col rounded-[2rem] border-2 border-ink bg-paper p-7 transition-transform hover:-translate-y-1 md:p-9"
            >
              <span className="font-mono text-xs font-semibold text-leaf">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-7 font-display text-3xl font-semibold tracking-tight">{link.title}</h2>
              <p className="mt-3 max-w-md leading-relaxed text-clay">{link.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold">
                Explore page <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
