import {
  Sprout, Truck, ShoppingCart, Package, ShieldCheck, Star, Landmark, MapPin, Wallet,
  CreditCard, Phone, Building2, Globe, Database, Smartphone, MessageSquare, Handshake,
  BookOpen, Grid3x3, Sparkles, LifeBuoy, Headphones, Scale, Users, FileText, Rss, BadgeCheck,
  type LucideIcon,
} from "lucide-react";

export interface NavLink { label: string; href: string; }
export interface Segment {
  key: string; label: string; icon: LucideIcon; preview: string; metric: string; metricLabel: string; bar: number;
  ctaLabel: string; ctaDestination: "marketplace" | "grade";
}
export interface DetailSection { heading: string; body: string; bullets: string[]; }
export interface AudienceProfile {
  slug: string; navLabel: string; icon: LucideIcon; title: string; video: string;
  summary: string; ctaLabel: string; detailIntro: string; detailSections: DetailSection[];
}
export interface InfrastructurePillar { icon: LucideIcon; title: string; description: string; }
export interface PricingTier { title: string; price: string; cadence: string; features: string[]; highlighted: boolean; cta: string; }
export interface PricingPageContent { eyebrow: string; title: string; intro: string; blocks: { heading: string; body: string; bullets: string[] }[]; }
export interface Integration { name: string; icon: LucideIcon; }
export interface Platform { label: string; icon: LucideIcon; }
export interface MegaLink { icon: LucideIcon; title: string; sub?: string; href: string; badge?: string; }
export interface MegaColumn { heading: string; links: MegaLink[]; }
export interface NavEntry { label: string; href: string; mega?: { primary: MegaLink[]; secondary: MegaColumn[] }; }

export const navLinks: NavLink[] = [
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "B2B Pricing", href: "/pricing" },
  { label: "Company", href: "/company" },
];

const helpCol: MegaColumn = {
  heading: "Get help",
  links: [
    { icon: LifeBuoy, title: "Help Center", sub: "Guides & FAQs", href: "/ecosystem/how-it-works" },
    { icon: Headphones, title: "Talk to support", sub: "We reply fast", href: "/contact?source=website_support" },
    { icon: Handshake, title: "Talk to sales", sub: "Enterprise plans", href: "/contact?source=website_sales&intent=enterprise" },
  ],
};

export const navEntries: NavEntry[] = [
  {
    label: "Ecosystem",
    href: "/ecosystem",
    mega: {
      primary: [
        { icon: Sprout, title: "Smallholder & Commercial Farmers", sub: "Aggregate, grade, and sell direct", href: "/ecosystem/farmers", badge: "New" },
        { icon: Truck, title: "Logistics & Fleet Drivers", sub: "Live bidding & reefer-aware routes", href: "/ecosystem/logistics" },
        { icon: ShoppingCart, title: "B2B Retail Buyers", sub: "Verified volume, full traceability", href: "/ecosystem/buyers" },
        { icon: Package, title: "Agricultural Suppliers", sub: "Reach farmers & close deals in-app", href: "/ecosystem/suppliers" },
      ],
      secondary: [
        {
          heading: "Learn",
          links: [
            { icon: BookOpen, title: "How HarvestFlow works", sub: "The seed-to-shelf flow", href: "/ecosystem/how-it-works" },
            { icon: Grid3x3, title: "Use cases", sub: "By role and region", href: "/ecosystem/use-cases" },
            { icon: Sparkles, title: "Quality grading", sub: "Algorithmic scoring", href: "/ecosystem/quality-grading" },
          ],
        },
        helpCol,
      ],
    },
  },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    mega: {
      primary: [
        { icon: ShieldCheck, title: "In-App Escrow Vault", sub: "Funds locked until verified delivery", href: "/infrastructure/escrow" },
        { icon: Star, title: "Universal Rating Protocol", sub: "Mandatory 5-star accountability", href: "/infrastructure/rating-protocol" },
        { icon: Landmark, title: "Digital Identity & Finance", sub: "A ledger that builds credit", href: "/infrastructure/digital-identity" },
      ],
      secondary: [
        {
          heading: "Learn",
          links: [
            { icon: ShieldCheck, title: "Security overview", sub: "How escrow protects both sides", href: "/infrastructure/security" },
            { icon: Scale, title: "Compliance", sub: "BIH & BAM ready", href: "/infrastructure/compliance" },
          ],
        },
        helpCol,
      ],
    },
  },
  {
    label: "B2B Pricing",
    href: "/pricing",
    mega: {
      primary: [
        { icon: ShoppingCart, title: "Basic Retailer", sub: "Free core + trade fee", href: "/pricing/basic" },
        { icon: BadgeCheck, title: "Enterprise", sub: "SaaS + completed-trade fee", href: "/pricing/enterprise", badge: "Popular" },
        { icon: Handshake, title: "Compare plans", sub: "Side by side", href: "/pricing/compare" },
      ],
      secondary: [helpCol],
    },
  },
  {
    label: "Company",
    href: "/company",
    mega: {
      primary: [
        { icon: Building2, title: "About", sub: "Our mission", href: "/company/about" },
        { icon: Users, title: "Careers", sub: "Join the team", href: "/company/careers" },
        { icon: FileText, title: "Press", sub: "Newsroom", href: "/company/press" },
        { icon: Rss, title: "Blog", sub: "Updates & stories", href: "/company/blog" },
      ],
      secondary: [helpCol],
    },
  },
];

export const segments: Segment[] = [
  { key: "farmers", label: "Farmers", icon: Sprout, preview: "Pool, grade, and list your harvest for buyers—even when you need to trade by USSD or SMS.", metric: "+22%", metricLabel: "avg. price uplift", bar: 88, ctaLabel: "Grade my produce", ctaDestination: "grade" },
  { key: "logistics", label: "Logistics", icon: Truck, preview: "See available loads, bid with the job details upfront, and capture proof of delivery offline.", metric: "98%", metricLabel: "on-time delivery", bar: 96, ctaLabel: "Find delivery loads", ctaDestination: "marketplace" },
  { key: "buyers", label: "B2B Buyers", icon: ShoppingCart, preview: "Find produce that meets your volume and quality needs, then track it through delivery.", metric: "≥90", metricLabel: "quality score", bar: 92, ctaLabel: "Source verified produce", ctaDestination: "marketplace" },
  { key: "suppliers", label: "Suppliers", icon: Package, preview: "Put seed, fertiliser, and equipment in front of active farmers and keep each deal recorded.", metric: "T+0", metricLabel: "digital receipts", bar: 80, ctaLabel: "List farm inputs", ctaDestination: "marketplace" },
];

export const audienceProfiles: AudienceProfile[] = [
  {
    slug: "farmers", navLabel: "Farmers", icon: Sprout, video: "/buyers.mp4",
    title: "Smallholder & Commercial Farmers",
    summary: "Aggregate harvests, lock in algorithmically graded prices, and trade over USSD when the network drops.",
    ctaLabel: "Learn More",
    detailIntro: "From a single plot to a thousand-tonne cooperative, HarvestFlow gives producers the tools to aggregate, grade, and sell without middlemen taking a cut.",
    detailSections: [
      { heading: "Bulk crop aggregation", body: "Pool harvests with neighbouring farms to hit buyer minimums and unlock volume pricing that solo sellers never see.", bullets: ["Shared collection points", "Cooperative-level negotiating power", "Transparent per-farmer payout splits"] },
      { heading: "Algorithmic quality grading", body: "Every lot is scored on moisture, weight, and defect rate before it is listed, so premium produce is priced like premium produce.", bullets: ["Objective A+ to C grades", "Photo + sensor evidence attached", "Premium tiers priced automatically"] },
      { heading: "Offline-first trading", body: "List, bid, and confirm over USSD and SMS when the network drops; everything reconciles the moment a signal returns.", bullets: ["USSD & SMS order flow", "Queued sync on reconnect", "No smartphone required"] },
    ],
  },
  {
    slug: "logistics", navLabel: "Logistics", icon: Truck, video: "/logistics.mp4",
    title: "Logistics & Fleet Drivers",
    summary: "Bid on live loads with temperature-weighted, Dijkstra-optimised routes and offline-first proof of delivery.",
    ctaLabel: "Learn More",
    detailIntro: "Fleet operators and independent drivers get a live, fair bidding board and routes that respect the cargo, not just the distance.",
    detailSections: [
      { heading: "Live job bidding board", body: "See loads matched to your vehicle and route in real time, and bid with full visibility on weight, distance, and payout.", bullets: ["Filter by vehicle class", "Transparent bid ladder", "Instant award notifications"] },
      { heading: "Temperature-weighted routing", body: "Routes are optimised with a Dijkstra model that penalises heat exposure, keeping cold-chain cargo within spec.", bullets: ["Reefer-aware paths", "Live temperature telemetry", "Deviation alerts"] },
      { heading: "Offline-first reliability", body: "Capture proof of pickup and delivery without coverage; records sync automatically once you are back online.", bullets: ["Offline POD capture", "Background sync queue", "Tamper-evident timestamps"] },
    ],
  },
  {
    slug: "buyers", navLabel: "B2B Buyers", icon: ShoppingCart, video: "/buyers.mp4",
    title: "B2B Retail Buyers",
    summary: "Source pre-verified volume with end-to-end tracking and exports ready for BIH and BAM compliance.",
    ctaLabel: "Learn More",
    detailIntro: "Procurement teams source verified volume with the traceability and compliance paperwork institutions demand.",
    detailSections: [
      { heading: "Algorithmic QA matching", body: "Tell us the grade and volume you need; we match you to lots that already meet the spec, with evidence attached.", bullets: ["Spec-driven search", "Pre-verified suppliers", "Substitution suggestions"] },
      { heading: "End-to-end parcel tracking", body: "Follow every shipment on Google Maps from collection point to your dock, with ETAs that update as conditions change.", bullets: ["Live map tracking", "Milestone notifications", "Delivery confirmation"] },
      { heading: "Institutional integration", body: "Plug HarvestFlow into your stack with exports and APIs ready for BIH and BAM reporting requirements.", bullets: ["CSV & API exports", "Audit-ready records", "Role-based access"] },
    ],
  },
  {
    slug: "suppliers", navLabel: "Suppliers", icon: Package, video: "/suppliers.mp4",
    title: "Agricultural Suppliers",
    summary: "Reach active farmer networks, negotiate inputs in-app, and issue tamper-evident digital receipts.",
    ctaLabel: "Learn More",
    detailIntro: "Input suppliers reach active farmer networks directly and close deals on machinery and inputs without a sales floor.",
    detailSections: [
      { heading: "Direct farmer networks", body: "List fertiliser, seed, and equipment straight to verified producers who are already trading on the platform.", bullets: ["Targeted listings", "Verified buyer base", "In-app messaging"] },
      { heading: "In-app negotiation", body: "Negotiate terms for heavy machinery and bulk inputs inside the app, with every offer recorded for both sides.", bullets: ["Structured offers", "Counter-offer flow", "Agreement history"] },
      { heading: "Instant digital receipts", body: "Generate tamper-evident receipts the moment a deal closes, feeding both parties' financial ledgers.", bullets: ["One-tap receipts", "Tax-ready formatting", "Ledger sync"] },
    ],
  },
];

export const infrastructurePillars: InfrastructurePillar[] = [
  { icon: ShieldCheck, title: "In-App Escrow Vault", description: "Funds are locked securely and released only upon verified delivery and quality confirmation." },
  { icon: Star, title: "Universal Rating Protocol", description: "Mandatory 5-star rating system holding farmers, drivers, and buyers accountable." },
  { icon: Landmark, title: "Digital Identity & Finance", description: "Every successful transaction builds a financial ledger, aiding rural farmers in securing bank loans." },
];

export const pricingTiers: PricingTier[] = [
  { title: "Basic Retailer", price: "$0", cadence: "/ month", highlighted: false, cta: "Start for free", features: ["Core marketplace access", "Manual order placement", "Standard delivery bidding", "1.0–2.0% completed-trade fee, capped"] },
  { title: "Enterprise", price: "$75–$500", cadence: "/ site / month, annual", highlighted: true, cta: "Partner With Us", features: ["Workflow SaaS for buyers, co-ops, and programs", "1.0–2.0% completed GMV, capped", "Priority bulk harvests and quality thresholds", "Partner services, data / API, and integrations"] },
];

export const pricingContent: {
  landing: { metadataDescription: string; title: string; intro: string; links: { title: string; description: string; href: string }[] };
  basic: PricingPageContent;
  enterprise: PricingPageContent;
  compare: PricingPageContent;
} = {
  landing: {
    metadataDescription: "HarvestFlow pricing for commercial buyers, co-ops, and programs — free for farmers, buyers pay for completed value.",
    title: "Farmers use it free. Buyers pay for completed value.",
    intro: "The buyer who reduces supply failure is the principal payer. We charge on a completed trade — after acceptance, fulfillment, dispute closure, and settlement — never on listings or applications.",
    links: [
      { title: "Basic Retailer", description: "Free core marketplace access for independent buying teams.", href: "/pricing/basic" },
      { title: "Enterprise", description: "Workflow SaaS plus a capped completed-trade fee for high-volume buyers and co-ops.", href: "/pricing/enterprise" },
      { title: "Compare plans", description: "Review both plans and the full revenue architecture side by side.", href: "/pricing/compare" },
    ],
  },
  basic: {
    eyebrow: "B2B Pricing",
    title: "Basic Retailer",
    intro: "$0 per month for core marketplace access. You pay only a small completed-trade fee when a purchase settles — never for browsing, listing, or placing orders.",
    blocks: [
      { heading: "Free core", body: "Everything an independent retailer needs to start sourcing verified smallholder supply, with no fixed platform cost.", bullets: ["Standard browsing and purchasing", "Verified listings and quality evidence", "Manual order placement", "Standard delivery bidding"] },
      { heading: "Pay only on completed trades", body: "Revenue is monetizable only when buyer acceptance, fulfillment, dispute closure, and settlement are all complete. A capped fee applies per settled purchase, with a published fee receipt.", bullets: ["1.0–2.0% of completed order value", "Caps on large orders", "No fee on listings or placed orders", "Transparent fee receipt every time"] },
      { heading: "Best for", body: "Teams testing the marketplace or buying at a manageable, hands-on volume.", bullets: ["Independent retailers", "Manual procurement workflows", "No subscription commitment"] },
    ],
  },
  enterprise: {
    eyebrow: "B2B Pricing",
    title: "Enterprise — SaaS + trade fee",
    intro: "Workflow SaaS for high-volume buyers, co-ops, and programs — from $75 to $500 per site each month on an annual contract, plus a capped completed-trade fee. Partner services and integrations are priced separately.",
    blocks: [
      { heading: "Workflow SaaS", body: "Anchor buyers, co-ops, and programs pay for procurement workflow, supplier operations, reporting, and traceability — not farmers carrying a fixed platform cost.", bullets: ["$75–$500 per site / month", "Enterprise annual contract", "Supplier operations and reconciliation", "Dashboards, reporting, and traceability"] },
      { heading: "Completed-trade fee", body: "A single, visible fee on completed volume, shared with the buyer only by agreement. We never stack trade, logistics, and payment margins on the same farmer transaction.", bullets: ["1.0–2.0% of completed GMV", "Caps on large orders", "Published fee receipt", "Annual commitment after pilot"] },
      { heading: "Priority supply", body: "Secure earlier access to high-yield bulk harvests and quality-matched inventory.", bullets: ["Priority bulk access", "Minimum grading thresholds", "Automated aggregation matching"] },
      { heading: "Partner services", body: "Access consented workflow data and digital servicing through licensed logistics, payment, insurance, and lending partners. Priced by usage as each capability activates.", bullets: ["Logistics workflow: $0.50–$2 / job or 2–4% of delivery value", "Payment orchestration: 0.10–0.35% net share", "Finance / insurance servicing after two seasons", "Purpose-limited, consented data only"] },
      { heading: "System integration", body: "Connect procurement and inventory systems directly to HarvestFlow via a purpose-limited enterprise API.", bullets: ["Data / API from $250–$2,000 / month + usage", "Inventory API integration", "Compliance-ready exports", "Role-based team access"] },
    ],
  },
  compare: {
    eyebrow: "B2B Pricing",
    title: "Compare plans",
    intro: "Both plans keep the core free and charge only on completed value. Choose core marketplace access or an enterprise workflow tailored to your operation.",
    blocks: [
      { heading: "Basic Retailer — Free core", body: "Core marketplace access with manual purchasing and standard delivery bidding. You pay only a capped fee when a purchase settles.", bullets: ["$0 per month", "Verified marketplace access", "Manual order placement", "1.0–2.0% completed-trade fee, capped"] },
      { heading: "Enterprise — SaaS + trade fee", body: "Workflow SaaS for buyers, co-ops, and programs, priority sourcing, and access to licensed partner services and integrations.", bullets: ["$75–$500 per site / month, annual", "1.0–2.0% completed GMV, capped", "Priority bulk harvests and quality thresholds", "Partner services, data / API, and integrations"] },
      { heading: "How we price", body: "One service is priced once, visibly, and to the beneficiary. Illustrative ranges are pilot starting points, tested locally for willingness to pay, affordability, tax, and competition.", bullets: ["Revenue only on completed trades", "No stacked margins on one farmer transaction", "Total take capped on small orders", "A published fee receipt every time"] },
    ],
  },
};

export const integrations: Integration[] = [
  { name: "M-Pesa", icon: Wallet }, { name: "Google Maps", icon: MapPin }, { name: "Stripe", icon: CreditCard },
  { name: "Twilio", icon: Phone }, { name: "SAP", icon: Building2 }, { name: "USAID", icon: Globe },
  { name: "Oracle", icon: Database }, { name: "Flutterwave", icon: Landmark },
];

export const platforms: Platform[] = [
  { label: "Web", icon: Globe }, { label: "Android", icon: Smartphone }, { label: "USSD", icon: Phone }, { label: "SMS", icon: MessageSquare },
];

export const traditionalPains: string[] = [
  "Broker markups on every single lot", "7–14 day payout delays, every time",
  "No independent quality verification", "Paper receipts and no credit history",
];

export const agriWins: string[] = [
  "Same-day escrow release on confirmation", "Verified, algorithmic quality grades", "On-chain ledger that builds credit",
];

export const ribbonEvents: string[] = [
  "Maize lot #4821 graded A+", "Escrow released to farmer", "12 tonnes dispatched to Nairobi",
  "Quality score 94 confirmed", "Reefer temp 4C stable en route", "Buyer marked delivery complete",
];
