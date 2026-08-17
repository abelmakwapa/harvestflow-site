import InfoPage from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Digital Identity and Finance",
  description: "Verified identity and transaction records designed to support trusted trade and permissioned access to finance.",
  path: "/infrastructure/digital-identity",
});
export default function Page() { return <InfoPage content={{ eyebrow: "Infrastructure", title: "Digital Identity & Finance", intro: "Each verified transaction builds a financial identity that can unlock better access to capital.", blocks: [
  { heading: "Verified participant identity", body: "Tiered checks connect every trade to a known person or organization.", bullets: ["Role-aware verification", "Business and personal profiles", "Controlled document retention"] },
  { heading: "A ledger built from trade", body: "Payments, deliveries, and ratings form a usable operating history.", bullets: ["Tamper-evident records", "Revenue and fulfillment history", "Exportable statements"] },
  { heading: "A path to finance", body: "Consistent performance gives lenders better evidence for underwriting.", bullets: ["Cash-flow visibility", "Verified transaction history", "Permissioned data sharing"] },
] }} />; }
