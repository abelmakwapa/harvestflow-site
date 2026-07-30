# HarvestFlow site audit

Audit date: 30 July 2026  
Branch: `feat/site-audit-remediation`

This register covers the public website's code quality, route completeness, content integrity, responsive layout, interaction states, accessibility, metadata, and release readiness. Priority is based on user impact and release risk.

## P0 — release gates

These items require an owner or external evidence and cannot be completed safely in code alone.

- [ ] Obtain written rights clearance and final attribution for the WARKITCHEN-derived press artwork and photography. Until then, `/company/press` and `/company/press/seed-to-shelf` remain `noindex` and are excluded from the sitemap.
- [ ] Confirm the production lead endpoint and monitored support mailbox. Production intentionally returns `503` when `HARVESTFLOW_API_URL` is absent rather than silently posting to localhost.
- [ ] Validate the claims in the content evidence register below. Remove, qualify, or cite every unsupported claim before launch.
- [ ] Legal/privacy review of the privacy policy, terms, escrow language, regional availability, retention rules, and dispute wording for every launch jurisdiction.

## P0 — completed remediation

- [x] Audited all 28 canonical routes and the legacy redirect routes.
- [x] Replaced empty or placeholder careers, blog, and help-centre content with truthful states and useful actions.
- [x] Added useful success, validation, retry, rate-limit, and unavailable states to the contact journey.
- [x] Added request-size enforcement, validation, normalization, bot handling, submission IDs, and production-safe API configuration.
- [x] Removed the incorrect buyer video from the farmers profile and replaced it with a role-appropriate code-native visual.
- [x] Moved the support control away from form controls and added hydration readiness, focus management, escape handling, a backdrop, and a mobile-safe dialog.
- [x] Fixed 320px horizontal overflow in hero, pricing, role, and comparison grids.
- [x] Added a skip link, visible focus indicators, one main landmark per route, field-level error relationships, larger touch targets, and reduced-motion support.
- [x] Added honest 404 behavior and permanent redirects for legacy content URLs.

## P1 — completed remediation

- [x] Normalized mobile typography, responsive padding, grid minimum widths, card spacing, CTA hierarchy, and active navigation states.
- [x] Added complete per-route titles, descriptions, canonical URLs, Open Graph/Twitter metadata, generated social artwork, sitemap, robots, and web-app manifest.
- [x] Added baseline response hardening: no framework disclosure, MIME sniffing protection, clickjacking denial, a strict referrer policy, and restrictive browser feature permissions.
- [x] Improved video performance with lazy preload behavior, visibility-aware playback, capped ASCII rendering, and canvas allocation reuse.
- [x] Replaced production localhost fallbacks with explicit production URLs or clear service-unavailable behavior.
- [x] Added typed content slugs and route metadata helpers to reduce silent missing-page failures.

## P2 — regression and maintenance checklist

- [x] Unit checks cover lead validation, bot handling, payload limits, normalization, submission IDs, and canonical-route normalization.
- [x] Browser checks cover contact persistence, retry, validation, duplicate submissions, keyboard support, touch support, and a 320px support dialog.
- [x] Route checks cover every canonical page for status, one main landmark, one visible H1, title, canonical URL, and 320px horizontal overflow.
- [x] Route checks cover legacy redirects and a useful no-index 404.
- [ ] Add production monitoring for failed lead submissions and alert an accountable owner.
- [ ] Re-run the route and interaction suites for every significant navigation, layout, or content change.
- [ ] Re-test Safari/iOS and a physical low-bandwidth Android device before public launch.
- [ ] Compress or stream the 6.9 MB logistics and 8.2 MB supplier videos; keep poster/fallback behavior verified on slow connections.

## Content evidence register

The following statements are product or business assertions, not facts that can be proven from this repository. An accountable stakeholder should attach a source, date, scope, and approval, or replace the copy with a clearly labelled target/illustration.

| Area | Claims requiring evidence |
| --- | --- |
| Homepage role metrics | `+22%` average price uplift, `98%` on-time delivery, quality score threshold, and the visual progress values |
| Settlement comparison | `4x faster`, `14 days`, and same-day release |
| Markets and operations | East and West Africa launch markets, local field teams, and feature-phone coverage from day one |
| Compliance | BIH/BAM-ready exports, sanctions/watchlist checks, retention controls, and regulated-buyer readiness |
| Product availability | Web, Android, USSD, SMS, live tracking, temperature telemetry, escrow behavior, algorithmic grading, and finance workflows |
| Commercials | All price bands, fees, caps, partner-service rates, annual-contract wording, and priority/guaranteed supply claims |
| Integrations | M-Pesa, Google Maps, Stripe, Twilio, SAP, USAID, Oracle, and Flutterwave names must not imply a live integration or endorsement without proof |
| Technical/security | Encryption at rest, signed offline actions, tamper evidence, immutable/on-chain records, role access, and API/export readiness |

## Route coverage

- Home: `/`
- Ecosystem: `/ecosystem`, four role pages, how it works, use cases, and quality grading
- Infrastructure: `/infrastructure`, escrow, rating protocol, digital identity, security, and compliance
- Pricing: `/pricing`, basic, enterprise, and comparison
- Company: `/company`, about, careers, blog, press room, and publication detail
- Support/legal: `/contact`, `/privacy`, and `/terms`

## Merge verification

- [x] `npm run lint`
- [x] `npx tsc --noEmit`
- [x] `npm test` — 15 passed
- [x] `npm run build` — 50 static outputs generated
- [x] `npm run test:e2e` — 36 passed
- [x] Representative visual pass at 320, 375, 768, and 1440 CSS pixels
