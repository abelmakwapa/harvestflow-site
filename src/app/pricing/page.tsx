import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";

export const metadata: Metadata = { title: "B2B Pricing | HarvestFlow", description: "Choose a HarvestFlow plan for your buying operation." };

export default function PricingPage() {
  return <SectionLanding eyebrow="B2B Pricing" title="Start free. Scale when the operation does." intro="Choose the plan that matches your procurement volume, workflow, and integration needs." links={[
    { title: "Basic Retailer", description: "Core marketplace access for independent buying teams.", href: "/pricing/basic" },
    { title: "Enterprise", description: "Priority allocation, quality thresholds, and integrations.", href: "/pricing/enterprise" },
    { title: "Compare plans", description: "Review both plans side by side.", href: "/pricing/compare" },
  ]} />;
}
