import "server-only";
import type { Metadata } from "next";
import { audienceProfiles } from "@/lib/content";
import { pages } from "@/lib/pages";
import { createPageMetadata } from "@/lib/site";

export function metadataForContent(slug: keyof typeof pages, path: `/${string}`): Metadata {
  const content = pages[slug];
  return createPageMetadata({ title: content.title, description: content.intro, path });
}

export function metadataForAudience(slug: (typeof audienceProfiles)[number]["slug"], path: `/${string}`): Metadata {
  const profile = audienceProfiles.find((item) => item.slug === slug);
  if (!profile) throw new Error(`Unknown audience profile: ${slug}`);
  return createPageMetadata({ title: profile.title, description: profile.summary, path });
}
