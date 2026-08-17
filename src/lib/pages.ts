export interface PageBlock {
  heading: string;
  body: string;
  bullets?: string[];
  actions?: Array<{ label: string; href: string }>;
}

export interface PageCta {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  benefits?: string[];
}

export interface PageContent {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: PageBlock[];
  notice?: string;
  cta?: PageCta | false;
}

export const pages = {
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
        heading: "How we enter a market",
        body: "Each market launch depends on local operating partners, regulatory review, support coverage, and evidence that the product fits the people using it.",
        bullets: ["Validate workflows before launch", "Confirm channel and connectivity coverage", "Publish active-market availability explicitly"],
      },
    ],
  },
  careers: {
    eyebrow: "Careers",
    title: "Help rebuild the supply chain",
    intro: "We are a small team working on hard, practical problems across agricultural trade, logistics, and financial access.",
    notice: "There are no publicly listed vacancies at the moment. When a role opens, this page will include its location, scope, requirements, and application route.",
    blocks: [
      {
        heading: "Where we expect to grow",
        body: "Future hiring is likely to follow the work: product engineering, field operations, partnerships, and customer support. These are areas of interest, not active job listings.",
        bullets: ["Product and platform engineering", "Field operations and market partnerships", "Enterprise onboarding and support"],
      },
      {
        heading: "How we work",
        body: "We value small teams, direct contact with users, and evidence from the field.",
        bullets: ["Learn with the people using the product", "Default to clear ownership and documentation", "Design for intermittent connectivity from the start"],
        actions: [{ label: "Learn about the mission", href: "/company/about" }],
      },
    ],
    cta: {
      heading: "Follow the work",
      body: "Our field notes and press room are the best places to see what the team is building before the next role opens.",
      primary: { label: "Read field notes", href: "/company/blog" },
      secondary: { label: "Visit the press room", href: "/company/press" },
      benefits: ["Real product updates", "Field context", "Future roles published here"],
    },
  },
  blog: {
    eyebrow: "Blog",
    title: "Field notes",
    intro: "Field notes, product thinking, and operational lessons from the HarvestFlow team.",
    blocks: [
      {
        heading: "Seed to Shelf — Field Notes 01",
        body: "Our first published field guide follows farmers, fleets, buyers, and suppliers through one connected trade record, from aggregation and grading to delivery and settlement.",
        bullets: ["Published 25 July 2026", "17 illustrated pages", "Available to read online or download as a PDF"],
        actions: [{ label: "Read Seed to Shelf", href: "/company/press/seed-to-shelf" }],
      },
      {
        heading: "More notes are being prepared",
        body: "We will only list an article once it is published. Future notes will cover offline-first product decisions, grading evidence, escrow settlement, and market operations.",
        bullets: ["No placeholder post links", "Publication dates shown on every issue", "Source and rights notes included where relevant"],
      },
    ],
    cta: {
      heading: "Looking for company material?",
      body: "The press room contains the latest publication, company background, and the correct route for media enquiries.",
      primary: { label: "Open the press room", href: "/company/press" },
      secondary: { label: "About HarvestFlow", href: "/company/about" },
      benefits: ["Publication archive", "Company overview", "Media enquiries"],
    },
  },
  help: {
    eyebrow: "Help Center",
    title: "How HarvestFlow works",
    intro: "A practical overview of the trade flow, plus direct routes to product support and sales.",
    blocks: [
      { heading: "1. Verify and list", body: "A participant creates a role-aware account, completes the required verification, and records a lot, buying need, service, or freight capacity.", bullets: ["Role-aware identity checks", "Quality or service evidence attached", "Offline actions queued for reconciliation"] },
      { heading: "2. Match and agree", body: "The platform matches compatible participants while keeping price, grade, volume, route, and timing visible before anyone commits.", bullets: ["Spec-driven matching", "Recorded terms and offers", "Clear responsibilities for each party"] },
      { heading: "3. Fund and fulfil", body: "The buyer funds escrow, the goods move with milestone evidence, and exceptions remain visible to every authorized participant.", bullets: ["Escrow before movement", "Pickup and delivery evidence", "Offline-capable status updates"] },
      { heading: "4. Confirm and settle", body: "Delivery and quality confirmation release settlement. The completed record then contributes to each participant’s reputation and financial history.", bullets: ["Evidence-backed confirmation", "Dispute hold when needed", "Verified ratings after settlement"] },
      { heading: "Need a person?", body: "Use the support route for an existing account or talk to sales about marketplace access, integrations, and enterprise rollout.", actions: [
        { label: "Contact support", href: "/contact?source=website_support&intent=enterprise" },
        { label: "Talk to sales", href: "/contact?source=website_sales&intent=enterprise" },
      ] },
    ],
    cta: {
      heading: "Choose the workflow that fits your role",
      body: "See the detailed flow for producers, logistics teams, buyers, or agricultural suppliers.",
      primary: { label: "Explore the ecosystem", href: "/ecosystem" },
      secondary: { label: "Contact support", href: "/contact?source=website_support&intent=enterprise" },
      benefits: ["Role-specific guidance", "Offline-first workflows", "Direct support route"],
    },
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
      { heading: "Reporting controls", body: "Configurable exports and transaction records designed to support a buyer's reporting workflow.", bullets: ["Configurable data exports", "Per-lot event trails", "Recorded transaction history"] },
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
    intro: "How HarvestFlow handles personal information across the public website, account onboarding, and trade workflows.",
    notice: "Last updated 30 July 2026. Privacy requests can be submitted through the contact form; choose Support as the use case.",
    blocks: [
      { heading: "Information we collect", body: "The information depends on how you use HarvestFlow. Public-site enquiries include the details you enter in the contact form. Platform use may also require identity, organization, device, transaction, delivery, quality, and support records.", bullets: ["Contact and account information", "Identity and organization verification", "Trade, payment, logistics, quality, and support records", "Device, security, and audit events"] },
      { heading: "Why we use it", body: "We use information to provide requested services, secure accounts and funds, complete and evidence trades, respond to enquiries, comply with applicable obligations, and improve product reliability.", bullets: ["Operate and settle transactions", "Prevent fraud, misuse, and unauthorized access", "Provide support and service communications", "Meet reporting and legal obligations"] },
      { heading: "Sharing and processors", body: "Information is shared only where needed for a requested workflow, with authorized transaction participants, infrastructure and support providers, or regulators and authorities where legally required.", bullets: ["Purpose-limited access", "Contracted service providers", "Permissioned partner workflows", "No sale of personal information"] },
      { heading: "Retention and security", body: "Records are retained for as long as needed for the service, dispute handling, security, and applicable legal obligations. HarvestFlow uses access controls, encryption, audit logging, and integrity checks appropriate to the data and workflow.", bullets: ["Role-based access", "Encryption in transit and at rest", "Audit and reconciliation records", "Retention reviewed by record type"] },
      { heading: "Your choices and rights", body: "Depending on your location, you may ask to access, correct, export, object to certain processing, or delete personal information. Some records may need to be retained for legal, fraud-prevention, or transaction-integrity reasons.", actions: [{ label: "Submit a privacy request", href: "/contact?source=website_support&intent=enterprise" }] },
    ],
    cta: {
      heading: "Questions about your information?",
      body: "Send a privacy or data request through the support form. Do not include passwords, payment credentials, or other secrets.",
      primary: { label: "Contact support", href: "/contact?source=website_support&intent=enterprise" },
      secondary: { label: "Read the terms", href: "/terms" },
      benefits: ["Access requests", "Corrections", "Deletion and export requests"],
    },
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of Service",
    intro: "The core rules for using HarvestFlow’s public website and connected marketplace workflows.",
    notice: "Last updated 30 July 2026. Transaction-specific fees, escrow conditions, and partner terms shown before confirmation also form part of the agreement for that workflow.",
    blocks: [
      { heading: "Accounts and eligibility", body: "You must provide accurate information, have authority to act for the person or organization represented, protect account credentials, and promptly report suspected unauthorized access.", bullets: ["Accurate and current details", "Authority to represent the account", "Secure credentials and devices", "Verification may be required"] },
      { heading: "Marketplace responsibilities", body: "Participants remain responsible for the accuracy, legality, quality, safety, and fulfilment of their listings, bids, goods, services, and delivery commitments. HarvestFlow provides workflow infrastructure and does not take ownership of listed goods.", bullets: ["Terms visible before commitment", "Evidence attached to relevant milestones", "Applicable laws and standards still apply", "No misleading listings or manipulation"] },
      { heading: "Escrow, fees, and settlement", body: "Where escrow is offered, funds are held and released according to the conditions shown for the transaction. Fees and caps must be displayed before confirmation. Disputed funds may remain held while available evidence is reviewed.", bullets: ["Funding before fulfilment where required", "Release tied to confirmation conditions", "Visible fees and receipts", "Evidence-based dispute process"] },
      { heading: "Acceptable use", body: "You may not use HarvestFlow to commit fraud, interfere with the service, evade verification, upload unlawful or harmful material, manipulate ratings, or access data without authorization.", bullets: ["No fraudulent or deceptive activity", "No security testing without written permission", "No automated abuse or scraping", "No infringement of another party’s rights"] },
      { heading: "Availability and account action", body: "Services may change, pause, or be unavailable. Access may be limited or suspended to protect participants, investigate misuse, comply with law, or address material breaches. Where practical, affected users will receive notice and a route to support.", bullets: ["Maintenance and connectivity can affect access", "Offline records reconcile when service returns", "Security action may be immediate", "Support can review account-specific issues"] },
      { heading: "Disclaimers and liability", body: "To the extent permitted by applicable law, the service is provided without guarantees that every listing, participant, route, price, or outcome will be error-free. Mandatory consumer and statutory rights are not excluded.", bullets: ["Participant-provided information requires verification", "Indirect losses are excluded where lawful", "Liability limits cannot override mandatory law", "Regional terms may apply"] },
      { heading: "Changes and contact", body: "Material updates will be posted with a revised date. Continued use after an effective update may constitute acceptance where permitted. Contact support if you do not understand a term or need an account-specific record.", actions: [{ label: "Contact support", href: "/contact?source=website_support&intent=enterprise" }] },
    ],
    cta: {
      heading: "Need help with a term or transaction?",
      body: "Use the support form for account-specific questions, transaction records, or dispute guidance.",
      primary: { label: "Contact support", href: "/contact?source=website_support&intent=enterprise" },
      secondary: { label: "Read the privacy policy", href: "/privacy" },
      benefits: ["Account questions", "Transaction records", "Dispute guidance"],
    },
  },
} satisfies Record<string, PageContent>;

export type PageSlug = keyof typeof pages;

export function isPageSlug(value: string): value is PageSlug {
  return value in pages;
}
