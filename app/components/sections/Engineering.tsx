import { SectionHead } from "~/components/ui/SectionHead";

const PHASES = [
  { num: "PH.01", week: "WK 1–8", title: "Field Base", desc: "Confirm the smallest supported phone profile, offline data model, core navigation, and the farmer cockpit that works before a network request succeeds.", gate: "opens and records locally" },
  { num: "PH.02", week: "WK 9–20", title: "Trade Flow", desc: "Publish harvest listings, browse market demand, view buyer details, and complete the first produce listing from photo to marketplace card.", gate: "first listing recorded end-to-end" },
  { num: "PH.03", week: "WK 21–32", title: "Grade & Finance", desc: "Connect crop grading, price suggestions, wallet activity, escrow status, and loan eligibility to the farmer's verified sales record.", gate: "first finance offer from sales history" },
  { num: "PH.04", week: "WK 33–44", title: "Low-Signal Access", desc: "Extend price checks, listing alerts, and buyer updates to SMS and USSD so feature-phone farmers can participate in the same market.", gate: "first USSD price check in the field" },
  { num: "PH.05", week: "WK 45–56", title: "Risk Controls", desc: "Review buyer verification, payment safety, farmer data ownership, support handoffs, and system behavior during harvest-season demand spikes.", gate: "pilot risk review passed" },
  { num: "PH.06", week: "WK 57–∞", title: "Regional Rollout", desc: "Package onboarding, partner reporting, cooperative training, and support playbooks so the platform can grow beyond one founding team.", gate: "repeatable launch playbook" },
];

const CHECKLIST = [
  "Farmer records are saved locally before network sync.",
  "Marketplace listings show grade, price, quantity, and seller trust signals.",
  "Orders connect buyer demand to logistics and escrow-aware finance.",
  "AI grading and wallet screens are already visible in the local product.",
  "Every rollout question is measured against one outcome: farmer income moving up.",
];

export function Engineering() {
  return (
    <section className="section" id="engineering" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ padding: "0 clamp(20px,4vw,56px)" }}>
        <SectionHead title="Field" serifWord="Reliability" num="[ 004 / trusted operations ]" />
        <div className="eng-intro">
          <p className="gs-fade">HarvestFlow is designed for the messy edge of agricultural trade: <span className="hl">low-cost phones, weak signal, cash-flow pressure, and buyers who need confidence before produce moves.</span> The platform is being built around field readiness, data continuity, and clear accountability at every step.</p>
          <div className="eng-stats gs-fade">
            <div className="eng-stat"><b>18</b><span>Months · rollout plan</span></div>
            <div className="eng-stat"><b>6</b><span>Readiness phases</span></div>
            <div className="eng-stat"><b>320</b><span>Pixel phone target</span></div>
            <div className="eng-stat"><b><i>2G</i></b><span>Low-signal support</span></div>
          </div>
        </div>
      </div>

      <div className="eng-h-wrap" id="eng-wrap">
        <div className="eng-track" id="eng-track">
          {PHASES.map((p) => (
            <article key={p.num} className="phase-card">
              <div className="ph-top"><span className="ph-num">{p.num}</span><span className="ph-week">{p.week}</span></div>
              <h3><span className="serif">{p.title}</span></h3>
              <p>{p.desc}</p>
              <div className="ph-gate">Readiness: <b>{p.gate}</b></div>
            </article>
          ))}
        </div>
      </div>
      <div className="eng-progress"><i id="eng-progress-fill" /></div>
      <div className="eng-hint">drag / scroll → the roadmap</div>

      <div style={{ padding: "0 clamp(20px,4vw,56px)" }}>
        <div className="eng-commit gs-fade">
          <div className="eng-commit-bar"><i /><i /><i /><span>field readiness checklist</span></div>
          <div className="eng-commit-body">
            {CHECKLIST.map((c, i) => (
              <span key={i}><span className="h">✓</span> {c}{"\n"}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
