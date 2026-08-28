import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";
import { pricingContent } from "@/lib/content";

export const metadata: Metadata = { title: "B2B Pricing | HarvestFlow", description: pricingContent.landing.metadataDescription };

export default function PricingPage() {
  return <SectionLanding eyebrow="B2B Pricing" title={pricingContent.landing.title} intro={pricingContent.landing.intro} links={pricingContent.landing.links} />;
}
