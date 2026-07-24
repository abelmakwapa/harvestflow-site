import { SectionHead } from "~/components/ui/SectionHead";

const DEVICES = [
  { title: "Farmer cockpit", route: "/", img: "/assets/proof-dashboard.png", alt: "HarvestFlow mobile dashboard showing income, listings, orders, market prices, and operations" },
  { title: "Marketplace", route: "/market", img: "/assets/proof-marketplace.png", alt: "HarvestFlow marketplace screen with goods and freight toggle, search, filters, and a seeded listing" },
  { title: "AI grading", route: "/grade", img: "/assets/proof-grade.png", alt: "HarvestFlow AI grade screen with crop scanner, maize selector, and recent crop scan results" },
  { title: "Finance ledger", route: "/finance", img: "/assets/proof-finance.png", alt: "HarvestFlow finance screen showing wallet balance, pre-approved harvest loan, and crop insurance" },
];

const FLOW = [
  { step: "01", title: "List harvest", desc: "500kg Grade A maize from a verified Gaborone farmer." },
  { step: "02", title: "Match buyer", desc: "Marketplace filters by goods, freight, grade, price, and crop." },
  { step: "03", title: "Move order", desc: "TRK-2026-001 tracks maize from Gaborone to Francistown." },
  { step: "04", title: "Unlock finance", desc: "Wallet, escrow, loans, and crop insurance connect to sales history." },
];

export function ProductProof() {
  return (
    <section className="section proof" id="proof">
      <SectionHead title="Product" serifWord="Proof" num="[ 003 / real app screens ]" />
      <div className="proof-layout">
        <div className="proof-copy">
          <div className="proof-kicker">Captured from the local HarvestFlow app</div>
          <p className="proof-lede gs-fade">This is no longer only a pitch. The local HarvestFlow app already carries the core flow: <span className="serif">dashboard, market, grading, finance, and logistics.</span></p>
          <p className="proof-note gs-fade">Captured from the running React + Tauri mobile app, these screens show the current farmer demo experience and seeded Botswana marketplace data.</p>

          <div className="proof-stack gs-fade" aria-label="HarvestFlow app implementation facts">
            <div className="proof-row"><span>Target device</span><b>Tecno Spark 8 · 320px · 2G</b></div>
            <div className="proof-row"><span>App shell</span><b>Tauri 2 · React 19 · TypeScript</b></div>
            <div className="proof-row"><span>Live routes</span><b>18 implemented screens</b></div>
            <div className="proof-row"><span>Demo seed</span><b>8 listings · 1 order · 1 route</b></div>
          </div>

          <div className="proof-flow gs-fade" aria-label="Seeded product flow">
            {FLOW.map((f) => (
              <div key={f.step} className="proof-flow-step"><i>{f.step}</i><strong>{f.title}</strong><span>{f.desc}</span></div>
            ))}
          </div>
        </div>

        <div className="proof-devices gs-fade" aria-label="HarvestFlow app screenshots">
          {DEVICES.map((d) => (
            <article key={d.route} className="proof-device">
              <div className="proof-device-head"><h3>{d.title}</h3><span>{d.route}</span></div>
              <figure className="proof-phone"><img src={d.img} alt={d.alt} /></figure>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
