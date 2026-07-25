import InfoPage from "@/components/InfoPage";
export default function Page() { return <InfoPage content={{ eyebrow: "B2B Pricing", title: "Basic Retailer", intro: "$0 per month for core marketplace browsing and purchasing.", blocks: [
  { heading: "Included", body: "Everything an independent retailer needs to start sourcing.", bullets: ["Standard browsing and purchasing", "Standard listings", "Manual order placement", "Standard delivery bidding"] },
  { heading: "Best for", body: "Teams testing the marketplace or buying at a manageable, hands-on volume.", bullets: ["Independent retailers", "Manual procurement workflows", "No subscription commitment"] },
] }} />; }
