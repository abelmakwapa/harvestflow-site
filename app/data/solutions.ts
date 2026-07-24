export interface Solution {
  n: string;
  cat: "markets" | "intelligence" | "infrastructure";
  title: string;
  desc: string;
  tags: string[];
}

export const SOLUTIONS: Solution[] = [
  { n: "001", cat: "markets", title: "Farmer Mobile App & Insights", desc: "A pocket agronomist. Record harvests, track yield history, and receive advisories tuned to crop, soil and season — all fully functional offline.", tags: ["Offline-first", "Android 8+", "SQLite"] },
  { n: "002", cat: "markets", title: "Marketplace & Buyer Matching", desc: "Direct lines to wholesale buyers. Transparent pricing, verified bids, and matches made on quality and proximity — not on who you know.", tags: ["Wholesale", "Verified bids", "Transparent pricing"] },
  { n: "003", cat: "intelligence", title: "Predictive Harvest Analytics", desc: "Know the harvest before it happens. Yield forecasting and price-window prediction tell farmers what to sell, when, and to whom.", tags: ["Forecasting", "Price windows", "Data-driven"] },
  { n: "004", cat: "markets", title: "Supply Chain & Logistics Tools", desc: "From field to depot to buyer without the black hole in between. Consolidated loads, route coordination, and status every step of the way.", tags: ["Logistics", "Cold chain", "Traceability"] },
  { n: "005", cat: "intelligence", title: "AI Quality Assessment & Financing", desc: "A photo becomes a grade; a grade becomes collateral. On-device quality scoring unlocks fair pricing and microloan eligibility from a verified ledger.", tags: ["On-device AI", "≥85% accuracy", "Microloans"] },
  { n: "006", cat: "infrastructure", title: "USSD / SMS Low-Bandwidth Channels", desc: "No smartphone, no problem. Price checks, listings and alerts over USSD and SMS — with a pixel-art identity that renders in kilobytes.", tags: ["USSD", "SMS", "2G-native"] },
  { n: "007", cat: "infrastructure", title: "Secure Offline-First Backend", desc: "A Rust core with SQLite at the edge and conflict-free sync in the cloud. Farmer data is encrypted, owned by the farmer, and never lost to a dead zone.", tags: ["Tauri + Rust", "Encrypted", "Sync queue"] },
];
