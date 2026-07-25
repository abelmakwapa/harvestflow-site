import InfoPage from "@/components/InfoPage";
export default function Page() { return <InfoPage content={{ eyebrow: "B2B Pricing", title: "Compare plans", intro: "Choose core marketplace access or an enterprise workflow tailored to your operation.", blocks: [
  { heading: "Basic Retailer — Free", body: "Core marketplace access with manual purchasing and standard delivery bidding.", bullets: ["$0 per month", "Standard marketplace access", "Manual order placement", "Standard support"] },
  { heading: "Enterprise — Custom", body: "Priority sourcing, automation, fleet allocation, and direct integration.", bullets: ["Custom commercial terms", "Priority bulk harvests", "Quality guarantees", "API and inventory integration"] },
] }} />; }
