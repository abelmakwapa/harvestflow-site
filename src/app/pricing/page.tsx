import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";
import { pricingContent } from "@/lib/content";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({ title: "B2B pricing", description: pricingContent.landing.metadataDescription, path: "/pricing" });

export default function PricingPage() {
  return <SectionLanding eyebrow="B2B Pricing" title={pricingContent.landing.title} intro={pricingContent.landing.intro} links={pricingContent.landing.links} />;
}
