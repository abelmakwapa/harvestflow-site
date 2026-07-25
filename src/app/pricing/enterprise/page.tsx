import InfoPage from "@/components/InfoPage";
export default function Page() { return <InfoPage content={{ eyebrow: "B2B Pricing", title: "Enterprise Subscription", intro: "Custom pricing for high-volume procurement teams with integration and service requirements.", blocks: [
  { heading: "Priority supply", body: "Secure earlier access to high-yield bulk harvests and quality-matched inventory.", bullets: ["Priority bulk access", "Minimum grading thresholds", "Automated aggregation matching"] },
  { heading: "Operational support", body: "Move high-volume orders with priority fleet allocation and tailored rollout support.", bullets: ["Priority fleet allocation", "Dedicated onboarding", "Custom operating workflows"] },
  { heading: "System integration", body: "Connect procurement and inventory systems directly to HarvestFlow.", bullets: ["Inventory API integration", "Compliance-ready exports", "Role-based team access"] },
] }} />; }
