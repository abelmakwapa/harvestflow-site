export interface PixelShowcase {
  num: string;
  scene: string;
  label: string;
  title: string;
  desc: string;
  tags: string[];
}

export const PIXELS: PixelShowcase[] = [
  { num: "s//01", scene: "app", label: "App · Live", title: 'Farmer Mobile <span class="serif">App</span>', desc: "A dashboard that fits in a work glove. Yield bars climb, advisories arrive, and wheat grows right inside the screen — every pixel functional at 2G and below.", tags: ["Offline-first", "Android 8+", "SQLite"] },
  { num: "s//02", scene: "market", label: "Market · Live", title: 'Marketplace <span class="serif">Matching</span>', desc: "A farmer stall, a buyer crate, and a bid tag crossing the route between them. When the match lands, both sides light up — transparent, verified, done.", tags: ["Wholesale", "Verified bids", "Fair price"] },
  { num: "s//03", scene: "forecast", label: "Forecast · Live", title: 'Predictive <span class="serif">Analytics</span>', desc: "Crop rows grow beneath a forecast dashboard while weather shifts, a chart draws forward, and the scan beam marks the best harvest window.", tags: ["Forecasting", "Price windows", "Data-driven"] },
  { num: "s//04", scene: "logistics", label: "Logistics · Live", title: 'Supply Chain <span class="serif">in Motion</span>', desc: "From the field on the left to the depot on the right, the truck keeps rolling and the produce dots keep streaming. No black holes between harvest and handshake.", tags: ["Routing", "Cold chain", "Traceability"] },
  { num: "s//05", scene: "quality", label: "Quality · Live", title: 'AI Grading <span class="serif">& Credit</span>', desc: "Produce rolls through an inspection gate, earns an A+ grade, then unlocks credit. A photo becomes a grade; a graded ledger becomes collateral.", tags: ["On-device AI", "≥85% accuracy", "Microloans"] },
  { num: "s//06", scene: "ussd", label: "USSD · Live", title: 'Low-Bandwidth <span class="serif">Channels</span>', desc: "A feature phone typing out a USSD menu, one mint line at a time, signal waves rippling from the antenna. No smartphone required — no farmer left out.", tags: ["USSD", "SMS", "2G-native"] },
  { num: "s//07", scene: "vault", label: "Vault · Live", title: 'Offline-First <span class="serif">Security</span>', desc: "Ledger blocks save into a local vault while signal towers fade, then an encrypted packet syncs out when the cloud comes back into reach.", tags: ["Tauri + Rust", "Encrypted", "Sync queue"] },
];
