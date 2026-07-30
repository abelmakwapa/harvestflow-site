import type { Metadata } from "next";

export const SITE_NAME = "HarvestFlow";
export const SITE_DESCRIPTION =
  "A connected agricultural supply chain for farmers, fleets, suppliers, and enterprise buyers, with escrow-secured settlement and offline-first workflows.";

const DEFAULT_SITE_URL = "https://harvestflow.bw";

function normalizedOrigin(value: string | undefined, fallback: string): string {
  try {
    const url = new URL(value?.trim() || fallback);
    if (url.protocol !== "http:" && url.protocol !== "https:") return fallback;
    return url.origin;
  } catch {
    return fallback;
  }
}

export const SITE_URL = normalizedOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : DEFAULT_SITE_URL,
);

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: `/${string}` | "/";
  noIndex?: boolean;
}

export function createPageMetadata({ title, description, path, noIndex = false }: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_BW",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export const CANONICAL_ROUTES = [
  "/",
  "/ecosystem",
  "/ecosystem/farmers",
  "/ecosystem/logistics",
  "/ecosystem/buyers",
  "/ecosystem/suppliers",
  "/ecosystem/how-it-works",
  "/ecosystem/use-cases",
  "/ecosystem/quality-grading",
  "/infrastructure",
  "/infrastructure/escrow",
  "/infrastructure/rating-protocol",
  "/infrastructure/digital-identity",
  "/infrastructure/security",
  "/infrastructure/compliance",
  "/pricing",
  "/pricing/basic",
  "/pricing/enterprise",
  "/pricing/compare",
  "/company",
  "/company/about",
  "/company/careers",
  "/company/blog",
  "/company/press",
  "/company/press/seed-to-shelf",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export type CanonicalRoute = (typeof CANONICAL_ROUTES)[number];
