import { useTypewriter } from "~/lib/use-typewriter";
import { Marquee } from "~/components/ui/Marquee";
import { Button } from "~/components/ui/Button";

export function Hero() {
  const typed = useTypewriter();

  return (
    <section className="hero">
      <div className="hero-glow" id="hero-glow" />
      <svg className="hero-field" id="hero-field" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <g stroke="rgba(253,251,247,.05)" strokeWidth="1" fill="none">
          <path d="M0 140 Q360 100 720 140 T1440 140" />
          <path d="M0 190 Q360 150 720 190 T1440 190" />
          <path d="M0 240 Q360 200 720 240 T1440 240" />
        </g>
        <g stroke="rgba(5,150,105,.14)" strokeWidth="1.4" fill="none">
          <path d="M0 165 Q360 125 720 165 T1440 165" />
          <path d="M0 215 Q360 175 720 215 T1440 215" />
        </g>
      </svg>

      <div className="hero-top gs-fade">
        <div className="hero-trust" aria-label="HarvestFlow trust signals">
          <div className="hero-trust-item"><b>Offline-first</b><span>Works through weak signal</span></div>
          <div className="hero-trust-item"><b>Verified trade</b><span>Buyer matching + escrow</span></div>
          <div className="hero-trust-item"><b>Built in Botswana</b><span>Piloting for 2026 season</span></div>
        </div>
        <div className="hero-meta">
          <div className="avail">Onboarding pilot cooperatives</div>
          <div>Botswana · Gaborone · 2026</div>
          <div>For cooperatives, buyers &amp; funders</div>
        </div>
      </div>

      <div className="hero-title-wrap">
        <h1 className="hero-title" aria-label="Harvest Flow">
          <span className="row"><span className="word">Harvest</span></span>
          <span className="row"><span className="word flow">Flow</span><span className="word reg">®</span></span>
        </h1>
      </div>

      <p className="hero-value gs-fade">
        An offline-first marketplace that helps smallholder farmers{" "}
        <span className="serif">sell harvests, move orders, and unlock finance.</span>
      </p>

      <p className="hero-poetic gs-fade">
        Farmers can list produce, reach verified buyers, coordinate logistics, and build a sales record for fair loans and insurance — even on low-cost phones and unreliable networks.{" "}
        <span className="type">{typed}</span>
      </p>

      <div className="hero-sub-row gs-fade">
        <div className="hero-context"><b>Best fit:</b> cooperatives sourcing from smallholders, wholesale buyers, logistics partners, and agri-finance pilots.</div>
        <div className="hero-ctas">
          <Button href="#contact" variant="solid"><span>Start a pilot</span> <span className="arr">→</span></Button>
          <Button href="#proof" variant="ghost"><span>View product proof</span></Button>
          <Button href="#contact" variant="ghost"><span>Partner as buyer</span></Button>
        </div>
      </div>

      <div className="hero-scroll"><span>scroll to begin ↓</span></div>

      <Marquee>
        <span className="marquee-item"><span className="dot" />Offline-first</span>
        <span className="marquee-item"><span className="dot" /><em>Farmer owned data</em></span>
        <span className="marquee-item"><span className="dot" />USSD · SMS · App</span>
        <span className="marquee-item"><span className="dot" /><em>From yield to income</em></span>
        <span className="marquee-item"><span className="dot" />Built for low bandwidth</span>
      </Marquee>
    </section>
  );
}
