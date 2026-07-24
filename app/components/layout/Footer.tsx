const LINKS = ["profile", "solutions", "proof", "reliability", "pixel harvest", "team", "contact"];
const HREFS = ["#profile", "#solutions", "#proof", "#engineering", "#pixels", "#team", "#contact"];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="nav-brand" href="#top">
          <svg width="24" height="28" viewBox="0 0 62 70" fill="none" aria-hidden="true">
            <path d="M31 58 C31 58 30 44 31 33" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="31" cy="23" rx="4.5" ry="9" fill="#059669" />
            <ellipse cx="23" cy="29" rx="3.5" ry="7" transform="rotate(-22 23 29)" fill="#059669" opacity=".6" />
            <ellipse cx="39" cy="29" rx="3.5" ry="7" transform="rotate(22 39 29)" fill="#059669" opacity=".6" />
            <path d="M31 58 C31 63 24 65 20 64 C13 62 11 56 15 53 C19 50 28 52 34 56 C40 60 48 64 57 62" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="57" cy="62" r="3.8" fill="#F59E0B" />
          </svg>
          <span className="nav-brand-name">Harvest<span>Flow</span></span>
        </a>
        <div className="footer-links">
          {LINKS.map((l, i) => <a key={l} href={HREFS[i]}>{l}</a>)}
        </div>
        <a className="to-top" href="#top">back to top ↑</a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 HarvestFlow · harvestflow.io · <span className="g">YC S25</span></span>
        <span>From yield to income — <span className="g">seamlessly</span></span>
      </div>
    </footer>
  );
}
