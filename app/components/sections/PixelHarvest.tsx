import { useEffect, useRef, useState } from "react";
import { SectionHead } from "~/components/ui/SectionHead";
import { PIXELS } from "~/data/pixels";
import { scan } from "~/lib/pixel-art";

export function PixelHarvest() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (listRef.current) scan(listRef.current);
  }, []);

  useEffect(() => {
    if (!listRef.current) return;

    const rows = listRef.current.querySelectorAll(".pxshow-row");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.pxIndex));
        });
      },
      { threshold: 0.5 }
    );

    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const jumpTo = (i: number) => {
    setActive(i);
    const row = listRef.current?.querySelector(`#pixel-scene-${PIXELS[i].scene}`);
    row?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="section" id="pixels">
      <SectionHead title="Pixel" serifWord="Harvest" num="[ 005 / live identities ]" />

      <p className="pxshow-intro gs-fade">
        Seven solutions, seven living identities — <span className="hl">each one drawn on an 8-colour, 64-pixel grid</span>, light enough to ship over a 2G connection. Hover any card to wake it up.
      </p>

      <div className="pxshow-nav gs-fade" aria-label="Navigate Pixel Harvest scenes">
        {PIXELS.map((p, i) => (
          <button
            key={p.scene}
            className={`pxshow-jump ${active === i ? "is-active" : ""}`}
            onClick={() => jumpTo(i)}
            aria-controls={`pixel-scene-${p.scene}`}
          >
            <i>{p.num.replace("s//", "")}</i>
            <span>{p.title.replace(/<[^>]+>/g, "").split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <div className="pxshow-list" ref={listRef}>
        {PIXELS.map((p, i) => (
          <article
            key={p.scene}
            className={`pxshow-row gs-fade ${active === i ? "is-active" : ""}`}
            id={`pixel-scene-${p.scene}`}
            tabIndex={-1}
            data-px-index={String(i)}
            data-pixel-hover=""
          >
            <div className="pxshow-text">
              <span className="pxshow-num">{p.num}</span>
              <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
              <p>{p.desc}</p>
              <div className="work-tags">{p.tags.map((t) => <span key={t} className="work-tag">{t}</span>)}</div>
            </div>

            <div className="pxshow-art">
              <div className="pxshow-frame">
                <canvas data-pixel={p.scene} data-scale="4" />
              </div>
              <span className="px-label">{p.label}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
