import { SectionHead } from "~/components/ui/SectionHead";

const CELLS = [
  { value: "−30%", label: "Post-harvest waste", desc: "Predictive analytics time the harvest; matched buyers mean produce moves before it spoils in the field or the depot." },
  { value: "+40%", label: "Farmer income", desc: "Transparent wholesale pricing and direct buyer matching cut out layers of intermediaries — value returns to the grower." },
  { value: "100%", label: "Offline coverage", desc: "From flagship Android to a 2G feature phone over USSD — every farmer participates, regardless of signal or device." },
];

export function Impact() {
  return (
    <section className="section impact" id="impact">
      <SectionHead title="The" serifWord="Outcome" num="[ 007 / impact ]" />
      <p className="impact-lede split-lines">
        Post-harvest losses claim up to a third of what smallholders grow. Middlemen claim much of the rest. HarvestFlow returns both — turning <span className="g serif">yield</span> into <span className="t serif">reliable income.</span>
      </p>
      <div className="impact-grid gs-fade">
        {CELLS.map((c) => (
          <div key={c.label} className="impact-cell">
            <b>{c.value}</b>
            <h4>{c.label}</h4>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
