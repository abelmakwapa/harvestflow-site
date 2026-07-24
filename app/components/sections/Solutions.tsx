import { useState } from "react";
import { SectionHead } from "~/components/ui/SectionHead";
import { PixelDissolve } from "~/components/ui/PixelDissolve";
import { SOLUTIONS } from "~/data/solutions";

const HM = Array(14).fill("View details // ").join("");

export function Solutions() {
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered = SOLUTIONS.filter((s) => filter === "all" || s.cat === filter);

  return (
    <section className={`section solutions ${view === "grid" ? "grid-mode" : ""}`} id="solutions">
      <SectionHead title="Selected" serifWord="Solutions" num="[ 002 / the platform ]">
        <div className="work-controls">
          <div className="filter-row" role="group" aria-label="Filter solutions">
            {["all", "markets", "intelligence", "infrastructure"].map((f) => (
              <button key={f} className={`filter-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="view-toggle" role="group" aria-label="View mode">
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-pressed={view === "list"}>list</button>
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-pressed={view === "grid"}>grid</button>
          </div>
        </div>
      </SectionHead>

      {/* LIST VIEW */}
      <div className="work-list">
        {filtered.map((s) => (
          <a key={s.n} className="work-item gs-fade" href="#contact" data-cat={s.cat}>
            <span className="work-num">/ {s.n}</span>
            <div>
              <h3 className="work-title">{s.title}</h3>
              <div className="work-tags">{s.tags.map((t) => <span key={t} className="work-tag">{t}</span>)}</div>
            </div>
            <p className="work-desc">{s.desc}</p>
            <span className="work-view">View details <span className="arr">↗</span></span>
            <div className="hover-marquee" aria-hidden="true"><div className="hm-track"><span>{HM}</span></div></div>
          </a>
        ))}
      </div>

      {/* GRID VIEW */}
      <div className="work-grid">
        {filtered.map((s) => (
          <PixelDissolve key={s.n} className="work-card">
            <div className="work-card-top">
              <span className="work-card-index">{s.n.slice(-2)}</span>
              <span className="work-cat">{s.cat}</span>
            </div>
            <h3 className="work-title">{s.title}</h3>
            <p className="work-desc">{s.desc}</p>
            <div className="work-tags">{s.tags.map((t) => <span key={t} className="work-tag">{t}</span>)}</div>
          </PixelDissolve>
        ))}
      </div>
    </section>
  );
}
