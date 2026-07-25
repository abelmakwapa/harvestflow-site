import {
  Sprout, Truck, ShoppingCart, Package, ShieldCheck, Star, Landmark, MapPin, Wallet,
  CreditCard, Phone, Building2, Globe, Database, Smartphone, MessageSquare, Handshake,
  BookOpen, Grid3x3, Sparkles, LifeBuoy, Headphones, Scale, Users, FileText, Rss, BadgeCheck,
  type LucideIcon,
} from "lucide-react";

export interface NavLink { label: string; href: string; }
export interface Segment { key: string; label: string; icon: LucideIcon; preview: string; metric: string; metricLabel: string; bar: number; }
export interface DetailSection { heading: string; body: string; bullets: string[]; }
export interface AudienceProfile {
  slug: string; navLabel: string; icon: LucideIcon; title: string; video: string;
  summary: string; ctaLabel: string; detailIntro: string; detailSections: DetailSection[];
}
export interface InfrastructurePillar { icon: LucideIcon; title: string; description: string; }
export interface PricingTier { title: string; price: string; cadence: string; features: string[]; highlighted: boolean; cta: string; }
export interface Integration { name: string; icon: LucideIcon; }
export interface Platform { label: string; icon: LucideIcon; }
export interface MegaLink { icon: LucideIcon; title: string; sub?: string; href: string; badge?: string; }
export interface MegaColumn { heading: string; links: MegaLink[]; }
export interface NavEntry { label: string; href: string; mega?: { primary: MegaLink[]; secondary: MegaColumn[] }; }

export const navLinks: NavLink[] = [
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "Infrastructure", href: "/#infrastructure" },
  { label: "B2B Pricing", href: "/#pricing" },
  { label: "Company", href: "/about" },
];

const helpCol: MegaColumn = {
  heading: "Get help",
  links: [
    { icon: LifeBuoy, title: "Help Center", sub: "Guides & FAQs", href: "/help" },
    { icon: Headphones, title: "Talk to support", sub: "We reply fast", href: "/contact" },
    { icon: Handshake, title: "Talk to sales", sub: "Enterprise plans", href: "/contact" },
  ],
};

export const navEntries: NavEntry[] = [
  {
    label: "Ecosystem",
    href: "/#ecosystem",
    mega: {
      primary: [
        { icon: Sprout, title: "Smallholder & Commercial Farmers", sub: "Aggregate, grade, and sell direct", href: "/learn/farmers", badge: "New" },
        { icon: Truck, title: "Logistics & Fleet Drivers", sub: "Live bidding & reefer-aware routes", href: "/learn/logistics" },
        { icon: ShoppingCart, title: "B2B Retail Buyers", sub: "Verified volume, full traceability", href: "/learn/buyers" },
        { icon: Package, title: "Agricultural Suppliers", sub: "Reach farmers & close deals in-app", href: "/learn/suppliers" },
      ],
      secondary: [
        {
          heading: "Learn",
          links: [
            { icon: BookOpen, title: "How HarvestFlow works", sub: "The seed-to-shelf flow", href: "/help" },
            { icon: Grid3x3, title: "Use cases", sub: "By role and region", href: "/use-cases" },
            { icon: Sparkles, title: "Quality grading", sub: "Algorithmic scoring", href: "/quality-grading" },
          ],
        },
        helpCol,
      ],
    },
  },
  {
    label: "Infrastructure",
    href: "/#infrastructure",
    mega: {
      primary: [
        { icon: ShieldCheck, title: "In-App Escrow Vault", sub: "Funds locked until verified delivery", href: "/#infrastructure" },
        { icon: Star, title: "Universal Rating Protocol", sub: "Mandatory 5-star accountability", href: "/#infrastructure" },
        { icon: Landmark, title: "Digital Identity & Finance", sub: "A ledger that builds credit", href: "/#infrastructure" },
      ],
      secondary: [
        {
          heading: "Learn",
          links: [
            { icon: ShieldCheck, title: "Security overview", sub: "How escrow protects both sides", href: "/security" },
            { icon: Scale, title: "Compliance", sub: "BIH & BAM ready", href: "/compliance" },
          ],
        },
        helpCol,
      ],
    },
  },
  {
    label: "B2B Pricing",
    href: "/#pricing",
    mega: {
      primary: [
        { icon: ShoppingCart, title: "Basic Retailer", sub: "Free forever", href: "/#pricing" },
        { icon: BadgeCheck, title: "Enterprise Subscription", sub: "Custom, tailored pricing", href: "/#pricing", badge: "Popular" },
        { icon: Handshake, title: "Compare plans", sub: "Side by side", href: "/#pricing" },
      ],
      secondary: [helpCol],
    },
  },
  {
    label: "Company",
    href: "/about",
    mega: {
      primary: [
        { icon: Building2, title: "About", sub: "Our mission", href: "/about" },
        { icon: Users, title: "Careers", sub: "Join the team", href: "/careers" },
        { icon: FileText, title: "Press", sub: "Newsroom", href: "/press" },
        { icon: Rss, title: "Blog", sub: "Updates & stories", href: "/blog" },
      ],
      secondary: [helpCol],
    },
  },
];

export const segments: Segment[] = [
  { key: "farmers", label: "Farmers", icon: Sprout, preview: "Aggregate your harvest and lock in premium, algorithmically graded prices.", metric: "+22%", metricLabel: "avg. price uplift", bar: 88 },
  { key: "logistics", label: "Logistics", icon: Truck, preview: "Bid on live loads with temperature-weighted, Dijkstra-optimized routes.", metric: "98%", metricLabel: "on-time delivery", bar: 96 },
  { key: "buyers", label: "B2B Buyers", icon: ShoppingCart, preview: "Source verified lots with end-to-end parcel tracking and QA matching.", metric: "≥90", metricLabel: "quality score", bar: 92 },
  { key: "suppliers", label: "Suppliers", icon: Package, preview: "Reach farmer networks directly and close machinery deals in-app.", metric: "T+0", metricLabel: "digital receipts", bar: 80 },
];

export const audienceProfiles: AudienceProfile[] = [
  {
    slug: "farmers", navLabel: "Farmers", icon: Sprout, video: "/farmers.mp4",
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
  { title: "Basic Retailer (Free)", price: "$0", cadence: "/ month", highlighted: false, cta: "Start for free", features: ["Standard browsing and purchasing", "Standard listings", "Manual order placement", "Standard delivery bidding"] },
  { title: "Enterprise Subscription (Premium)", price: "Custom", cadence: "/ tailored", highlighted: true, cta: "Partner With Us", features: ["Priority access to high-yield bulk harvests", "Guaranteed minimum Quality Grading Scores", "Automated aggregation matching", "Priority fleet allocation", "Direct API integration for inventory software"] },
];

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
