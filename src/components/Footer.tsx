import { Sprout, Mail, MessageCircle, Globe } from "lucide-react";
import { platforms } from "@/lib/content";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="scroll-mt-28 bg-ink px-6 pb-10 pt-20 text-cream">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-cream text-ink">
                <Sprout className="size-4" aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight">HarvestFlow</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
              The complete agricultural supply chain — from seed to shelf, secured by escrow and graded by algorithm.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[Mail, MessageCircle, Globe].map((Icon, i) => (
                <Link
                  key={i}
                  href="/contact"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-cream/80 transition-colors hover:border-lav hover:text-lav"
                  aria-label="HarvestFlow contact channel"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-fog">Product</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li><Link className="transition-colors hover:text-cream" href="/ecosystem">Ecosystem</Link></li>
              <li><Link className="transition-colors hover:text-cream" href="/infrastructure">Infrastructure</Link></li>
              <li><Link className="transition-colors hover:text-cream" href="/pricing">B2B Pricing</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-fog">Platforms</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              {platforms.map((p) => (<li key={p.label}>{p.label}</li>))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-fog">Company</p>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li><Link className="transition-colors hover:text-cream" href="/company/about">About</Link></li>
              <li><Link className="transition-colors hover:text-cream" href="/company/careers">Careers</Link></li>
              <li><Link className="transition-colors hover:text-cream" href="/company/press">Press</Link></li>
              <li><Link className="transition-colors hover:text-cream" href="/company/blog">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-sm text-fog">© 2026 HarvestFlow. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-fog">
            <Link className="transition-colors hover:text-cream" href="/privacy">Privacy Policy</Link>
            <Link className="transition-colors hover:text-cream" href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
