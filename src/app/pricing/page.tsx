import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";

export const metadata: Metadata = { title: "B2B Pricing | HarvestFlow", description: "HarvestFlow pricing for commercial buyers, co-ops, and programs — free for farmers, buyers pay for completed value." };

export default function PricingPage() {
  return <SectionLanding eyebrow="B2B Pricing" title="Farmers use it free. Buyers pay for completed value." intro="The buyer who reduces supply failure is the principal payer. We charge on a completed trade — after acceptance, fulfillment, dispute closure, and settlement — never on listings or applications." links={[
    { title: "Basic Retailer", description: "Free core marketplace access for independent buying teams.", href: "/pricing/basic" },
    { title: "Enterprise", description: "Workflow SaaS plus a capped completed-trade fee for high-volume buyers and co-ops.", href: "/pricing/enterprise" },
    { title: "Compare plans", description: "Review both plans and the full revenue architecture side by side.", href: "/pricing/compare" },
  ]} />;
}
