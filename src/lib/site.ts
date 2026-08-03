import type { Metadata } from "next";

export const SITE_NAME = "HarvestFlow";
export const SITE_DESCRIPTION =
  "A connected agricultural supply chain for farmers, fleets, suppliers, and enterprise buyers, with escrow-secured settlement and offline-first workflows.";
export const SITE_FAVICON_PATH = "/favicon.svg";
export const SITE_LOGO_PATH = "/logo-grayscale.svg";
export const SOCIAL_IMAGE_PATH = "/opengraph-image";

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
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_BW",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: [{ url: SOCIAL_IMAGE_PATH, width: 1200, height: 630, alt: `${SITE_NAME} — connected agricultural supply chains` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE_PATH],
    },
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
