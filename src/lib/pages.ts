export interface PageBlock {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface PageContent {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: PageBlock[];
}

export const pages: Record<string, PageContent> = {
  about: {
    eyebrow: "Company",
    title: "Building the rails for real-world trade",
    intro:
      "HarvestFlow is building the rails for real-world trade — connecting farmers, fleets, buyers, and suppliers on one escrow-secured, offline-first platform.",
    blocks: [
      {
        heading: "Our mission",
        body: "Move money and goods at the speed of the harvest, without the brokers and paperwork that lock small producers out of fair markets.",
        bullets: ["Fair prices, set by quality not by who you know", "Offline-first tools that work on a feature phone", "One ledger that turns trade history into credit"],
      },
      {
        heading: "What we build",
        body: "A single ecosystem for farmers, fleets, buyers, and suppliers — bound together by escrow and algorithmic quality control.",
        bullets: ["Escrow-secured settlements", "Algorithmic quality grading", "End-to-end parcel tracking"],
      },
      {
        heading: "Where we operate",
        body: "We start where the gaps are widest and expand market by market.",
        bullets: ["East & West Africa launch markets", "USSD & SMS coverage from day one", "Local field teams on the ground"],
      },
    ],
  },
  careers: {
    eyebrow: "Careers",
    title: "Help rebuild the supply chain",
    intro: "We are a small team tackling a huge, unfair system. If you care about real-world impact, we should talk.",
    blocks: [
      {
        heading: "Open roles",
        body: "We hire across engineering, operations, and field teams.",
        bullets: ["Remote-first engineering", "Field operations & partnerships", "Enterprise sales & support"],
      },
      {
        heading: "How we work",
        body: "Small teams, real users, measurable impact.",
        bullets: ["Ship weekly, learn in the field", "Default to transparency", "Optimise for the offline case"],
      },
    ],
  },
  press: {
    eyebrow: "Press",
    title: "Newsroom",
    intro: "Everything journalists and partners need about HarvestFlow, in one place.",
    blocks: [
      {
        heading: "Latest",
        body: "Recent announcements from the team.",
        bullets: ["HarvestFlow closes pre-seed round", "One million tonnes graded on-platform", "USSD trading live in three markets"],
      },
      {
        heading: "Press kit",
        body: "Logos, facts, and spokespersons.",
        bullets: ["Brand assets & guidelines", "Company fact sheet", "Media enquiries via /contact"],
      },
    ],
  },
  blog: {
    eyebrow: "Blog",
    title: "Field notes",
    intro: "Field notes, engineering deep-dives, and product updates from the HarvestFlow team.",
    blocks: [
      {
        heading: "Recent posts",
        body: "Notes from the field and the codebase.",
        bullets: ["Designing for offline-first", "How algorithmic grading works", "Escrow, explained simply"],
      },
      {
        heading: "Newsletter",
        body: "One short update a month, no spam.",
        bullets: ["Product releases", "Field stories", "Policy & market notes"],
      },
    ],
  },
  help: {
    eyebrow: "Help Center",
    title: "How can we help?",
    intro: "Search the guides below, or reach a human in minutes.",
    blocks: [
      { heading: "Getting started", body: "Go from sign-up to first trade.", bullets: ["Create your account", "List your first lot", "Place or accept an order"] },
      { heading: "Account & payments", body: "Manage money, ratings, and access.", bullets: ["Escrow & payout timing", "Ratings & dispute flow", "USSD & SMS setup"] },
      { heading: "Still stuck", body: "Real humans, fast replies.", bullets: ["Talk to support", "Talk to sales", "System status"] },
    ],
  },
  security: {
    eyebrow: "Security",
    title: "Security you can audit",
    intro: "How HarvestFlow protects funds, data, and the integrity of every offline action.",
    blocks: [
      { heading: "Escrow by default", body: "Funds are locked on deal and released only on verified delivery and quality.", bullets: ["No float, no chasing invoices", "Release tied to proof of delivery", "Dispute hold with evidence"] },
      { heading: "Data & access", body: "Least-privilege access and encryption in transit and at rest.", bullets: ["Role-based access control", "Encryption in transit & at rest", "Audit log of every action"] },
      { heading: "Offline integrity", body: "Offline actions are signed and reconciled, never silently merged.", bullets: ["Tamper-evident timestamps", "Conflict-aware sync queue", "Verifiable receipt chain"] },
    ],
  },
  compliance: {
    eyebrow: "Compliance",
    title: "Built for regulated buyers",
    intro: "The controls and exports regulated buyers and institutions rely on.",
    blocks: [
      { heading: "Reporting-ready", body: "Exports and trails that satisfy regulated buyers.", bullets: ["BIH & BAM ready exports", "Per-lot audit trails", "Immutable transaction history"] },
      { heading: "Identity & KYC", body: "Verified participants across the chain.", bullets: ["Tiered identity verification", "Sanctions & watchlist checks", "Document retention controls"] },
    ],
  },
  "use-cases": {
    eyebrow: "Use cases",
    title: "One platform, every workflow",
    intro: "See how each link in the chain puts HarvestFlow to work.",
    blocks: [
      { heading: "For cooperatives", body: "Aggregate member harvests and negotiate as one.", bullets: ["Shared collection points", "Transparent member payouts", "Volume pricing unlocked"] },
      { heading: "For cold-chain fleets", body: "Win loads that match your vehicle and route.", bullets: ["Reefer-aware routing", "Live temperature telemetry", "Offline proof of delivery"] },
      { heading: "For institutional buyers", body: "Source verified volume with the paperwork you need.", bullets: ["Spec-driven sourcing", "End-to-end tracking", "Compliance-ready exports"] },
    ],
  },
  "quality-grading": {
    eyebrow: "Quality",
    title: "Algorithmic quality grading",
    intro: "The algorithmic system that turns produce quality into fair, transparent pricing.",
    blocks: [
      { heading: "How scoring works", body: "Every lot is scored on objective inputs before it is listed.", bullets: ["Moisture, weight & defect inputs", "Objective A+ to C grades", "Photo & sensor evidence attached"] },
      { heading: "Why it matters", body: "Premium produce earns premium pricing, automatically.", bullets: ["No subjective haggling", "Buyers trust the grade", "Farmers paid for true quality"] },
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    intro: "How we collect, use, and protect your information.",
    blocks: [
      { heading: "What we collect", body: "Only what is needed to run trades and protect the chain.", bullets: ["Account & identity details", "Transaction & device records", "No sale of personal data"] },
      { heading: "How we use it", body: "To operate, secure, and improve the platform.", bullets: ["Fulfil and settle orders", "Prevent fraud & abuse", "Meet legal obligations"] },
      { heading: "Your rights", body: "Access, correct, or delete your data at any time.", bullets: ["Export your data", "Request correction", "Request deletion"] },
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "The rules that govern your use of HarvestFlow.",
    blocks: [
      { heading: "Your account", body: "You are responsible for activity under your account.", bullets: ["Keep credentials secure", "Provide accurate details", "One account per entity"] },
      { heading: "Transactions & escrow", body: "Escrow terms govern every trade on the platform.", bullets: ["Funds held until confirmation", "Fees shown before you commit", "Disputes resolved via ratings & evidence"] },
      { heading: "Liability", body: "The platform connects parties; it is not a party to the goods.", bullets: ["As-is marketplace listings", "Capped liability where permitted", "Governing law per region"] },
    ],
  },
};
