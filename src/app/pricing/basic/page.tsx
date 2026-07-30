import InfoPage from "@/components/InfoPage";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Basic Retailer Pricing",
  description: "Core HarvestFlow marketplace access with no monthly fee and a transparent fee only on completed trades.",
  path: "/pricing/basic",
});
export default function Page() { return <InfoPage content={{ eyebrow: "B2B Pricing", title: "Basic Retailer", intro: "$0 per month for core marketplace access. You pay only a small completed-trade fee when a purchase settles — never for browsing, listing, or placing orders.", blocks: [
  { heading: "Free core", body: "Everything an independent retailer needs to start sourcing verified smallholder supply, with no fixed platform cost.", bullets: ["Standard browsing and purchasing", "Verified listings and quality evidence", "Manual order placement", "Standard delivery bidding"] },
  { heading: "Pay only on completed trades", body: "Revenue is monetizable only when buyer acceptance, fulfillment, dispute closure, and settlement are all complete. A capped fee applies per settled purchase, with a published fee receipt.", bullets: ["1.0–2.0% of completed order value", "Caps on large orders", "No fee on listings or placed orders", "Transparent fee receipt every time"] },
  { heading: "Best for", body: "Teams testing the marketplace or buying at a manageable, hands-on volume.", bullets: ["Independent retailers", "Manual procurement workflows", "No subscription commitment"] },
] }} />; }
