import type { Metadata } from "next";
import SectionLanding from "@/components/SectionLanding";

export const metadata: Metadata = { title: "Infrastructure | HarvestFlow", description: "The trust, settlement, identity, and compliance rails behind HarvestFlow." };

export default function InfrastructurePage() {
  return <SectionLanding eyebrow="Infrastructure" title="The rails behind every trade." intro="Explore the systems that secure settlement, accountability, identity, and compliance across the platform." links={[
    { title: "In-App Escrow Vault", description: "Funds stay protected until delivery is verified.", href: "/infrastructure/escrow" },
    { title: "Universal Rating Protocol", description: "Portable accountability for every participant.", href: "/infrastructure/rating-protocol" },
    { title: "Digital Identity & Finance", description: "Turn successful trades into a usable financial record.", href: "/infrastructure/digital-identity" },
    { title: "Security", description: "Review the controls protecting funds and data.", href: "/infrastructure/security" },
    { title: "Compliance", description: "See identity, reporting, and audit controls.", href: "/infrastructure/compliance" },
  ]} />;
}
