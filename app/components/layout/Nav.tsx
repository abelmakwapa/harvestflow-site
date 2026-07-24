import { useEffect, useState } from "react";

const LINKS = [
  { href: "#profile", num: "001", label: "profile" },
  { href: "#solutions", num: "002", label: "solutions" },
  { href: "#proof", num: "003", label: "proof" },
  { href: "#engineering", num: "004", label: "reliability" },
  { href: "#pixels", num: "005", label: "pixels" },
  { href: "#team", num: "006", label: "team" },
  { href: "#impact", num: "007", label: "impact" },
  { href: "#contact", num: "008", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <a className="nav-brand" href="#top" aria-label="HarvestFlow home">
        <svg width="26" height="30" viewBox="0 0 62 70" fill="none" aria-hidden="true">
          <path d="M31 58 C31 58 30 44 31 33" stroke="#6EE7B7" strokeWidth="2.8" strokeLinecap="round" />
          <ellipse cx="31" cy="23" rx="4.5" ry="9" fill="#6EE7B7" />
          <ellipse cx="23" cy="29" rx="3.5" ry="7" transform="rotate(-22 23 29)" fill="#6EE7B7" opacity=".6" />
          <ellipse cx="39" cy="29" rx="3.5" ry="7" transform="rotate(22 39 29)" fill="#6EE7B7" opacity=".6" />
          <path d="M31 58 C31 63 24 65 20 64 C13 62 11 56 15 53 C19 50 28 52 34 56 C40 60 48 64 57 62" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="57" cy="62" r="3.8" fill="#F59E0B" />
        </svg>
        <span className="nav-brand-name">Harvest<span>Flow</span></span>
      </a>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            <i>{l.num}</i>{l.label}
          </a>
        ))}
      </nav>

      <a className="nav-cta" href="#contact"><i>Get in touch</i></a>

      <button className="nav-burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </header>
  );
}
