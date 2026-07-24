import { SectionHead } from "~/components/ui/SectionHead";
import { PixelCanvas } from "~/components/ui/PixelCanvas";

export function Profile() {
  return (
    <section className="section" id="profile">
      <SectionHead title="The" serifWord="Mission" num="[ 001 / profile ]" />
      <div className="profile-grid">
        <p className="profile-lede split-lines">
          HarvestFlow exists for the <span className="hl">33 million smallholder farmers</span> who grow most of Africa&apos;s food and capture the least of its value. We connect them to <span className="g">wholesale buyers</span>, arm them with <span className="hl">predictive harvest analytics</span>, and open doors to <span className="a">fair financing</span> — through a platform engineered to work where networks fail. When the signal drops to <span className="t">2G, SMS, or nothing at all</span>, HarvestFlow keeps working. <span className="serif">Offline-first. USSD-native.</span> Even our logo ships as animated pixel art, light enough for the slowest connection on earth.
        </p>
        <aside className="profile-side">
          <div className="profile-fact gs-fade">
            <h4>[ Offline-first ]</h4>
            <p>Every record lives on-device in SQLite first, syncing opportunistically when connectivity returns. A farmer&apos;s ledger never waits for a tower.</p>
          </div>
          <div className="profile-fact gs-fade">
            <h4>[ Low-bandwidth by design ]</h4>
            <p>Price checks over USSD. Bids over SMS. An 8-colour pixel-art identity for splash screens that render in kilobytes, not megabytes.</p>
          </div>
          <div className="profile-fact gs-fade">
            <h4>[ Built to last ]</h4>
            <p>Tauri + React + Rust core, tested on Android 8 handsets in the field — engineered as legacy-grade infrastructure, not a demo.</p>
          </div>
          <figure className="profile-pixels gs-fade" aria-label="Animated pixel art logo variants">
            <div data-pixel-hover><PixelCanvas scene="classic" scale={2} width={88} height={88} /><figcaption>Classic</figcaption></div>
            <div data-pixel-hover><PixelCanvas scene="night" scale={2} width={88} height={88} /><figcaption>Night</figcaption></div>
            <div data-pixel-hover><PixelCanvas scene="harvest" scale={2} width={88} height={88} /><figcaption>Harvest</figcaption></div>
          </figure>
        </aside>
      </div>
    </section>
  );
}
