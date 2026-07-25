import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";

export const metadata: Metadata = { title: "Ecosystem | HarvestFlow", description: "Explore every participant and workflow in the HarvestFlow ecosystem." };

export default function EcosystemPage() {
  return <SectionLanding eyebrow="Ecosystem" title="Every link in the chain, connected." intro="Explore the dedicated tools and workflows for farmers, fleets, buyers, and suppliers." links={[
    { title: "Farmers", description: "Aggregate, grade, and sell direct.", href: "/ecosystem/farmers" },
    { title: "Logistics", description: "Bid on loads and deliver with route context.", href: "/ecosystem/logistics" },
    { title: "B2B Buyers", description: "Source verified volume with traceability.", href: "/ecosystem/buyers" },
    { title: "Suppliers", description: "Reach active producer networks directly.", href: "/ecosystem/suppliers" },
    { title: "How it works", description: "Follow the complete seed-to-shelf flow.", href: "/ecosystem/how-it-works" },
    { title: "Use cases", description: "See workflows by role and region.", href: "/ecosystem/use-cases" },
    { title: "Quality grading", description: "Understand objective algorithmic scoring.", href: "/ecosystem/quality-grading" },
  ]} />;
}
