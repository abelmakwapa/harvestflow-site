import { SectionHead } from "~/components/ui/SectionHead";
import { PixelDissolve } from "~/components/ui/PixelDissolve";

const MEMBERS = [
  {
    role: "Chief Executive Officer & Technical Architect",
    code: "s//01",
    name: "Sthando Abel",
    serifName: "Makwapa",
    bio: "Visionary founder and technical architect behind the Tauri + Rust core, the offline-first sync engine, and the infrastructure that scales from a 2G feature phone to a multi-region cloud. Sthando leads HarvestFlow with a single north star — every decision must move farmer income up.",
    focus: "offline sync · farmer records · field reliability",
  },
  {
    role: "Chief Technology Officer & Mobile App Build Lead",
    code: "s//02",
    name: "Mooketsi Vincent",
    serifName: "Magwaza",
    bio: "Mooketsi Vincent was responsible for making and building the HarvestFlow mobile app, turning the platform architecture into a field-ready farmer experience that works across low-bandwidth devices and real harvest workflows.",
    focus: "mobile app · interface · field workflows",
  },
];

export function Team() {
  return (
    <section className="section" id="team">
      <SectionHead title="The" serifWord="People" num="[ 006 / leadership ]" />
      <div className="team-grid">
        {MEMBERS.map((m) => (
          <PixelDissolve key={m.code} className="team-card gs-fade">
            <div className="role">{m.role} <em>{m.code}</em></div>
            <h3 className="team-name">{m.name} <span className="serif">{m.serifName}</span></h3>
            <p className="team-bio">{m.bio}</p>
            <div className="team-sig">Product focus: <b>{m.focus}</b></div>
          </PixelDissolve>
        ))}
      </div>
    </section>
  );
}
