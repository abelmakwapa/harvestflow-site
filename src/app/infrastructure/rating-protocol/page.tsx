import InfoPage from "@/components/InfoPage";
export default function Page() { return <InfoPage content={{ eyebrow: "Infrastructure", title: "Universal Rating Protocol", intro: "A shared reputation record makes accountability portable across every HarvestFlow workflow.", blocks: [
  { heading: "Ratings after every trade", body: "Both sides complete structured feedback after settlement.", bullets: ["Mandatory post-trade review", "Role-specific criteria", "Verified transactions only"] },
  { heading: "Reputation follows the work", body: "Performance history travels with farmers, drivers, buyers, and suppliers.", bullets: ["Portable trust record", "Recent activity weighting", "Visible reliability signals"] },
  { heading: "Fair review controls", body: "Evidence and appeals protect participants from misleading feedback.", bullets: ["Dispute workflow", "Fraud pattern monitoring", "Audit-ready moderation"] },
] }} />; }
