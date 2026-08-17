import InfoPage from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "In-App Escrow Vault",
  description: "How HarvestFlow records funding conditions and releases settlement against delivery and quality evidence.",
  path: "/infrastructure/escrow",
});
export default function Page() { return <InfoPage content={{ eyebrow: "Infrastructure", title: "In-App Escrow Vault", intro: "Funds stay locked until delivery and quality are verified by both sides.", blocks: [
  { heading: "Lock on agreement", body: "The buyer funds the order when terms are accepted, removing payment uncertainty before goods move.", bullets: ["Terms recorded before funding", "Funds reserved for the trade", "Clear status for every participant"] },
  { heading: "Release on proof", body: "Settlement is tied to delivery and quality evidence instead of manual invoice chasing.", bullets: ["Proof-of-delivery trigger", "Quality confirmation", "Automated release when the agreed conditions pass"] },
  { heading: "Disputes stay protected", body: "Contested funds remain held while signed records and evidence are reviewed.", bullets: ["Evidence-backed review", "Immutable event trail", "No unilateral release"] },
] }} />; }
