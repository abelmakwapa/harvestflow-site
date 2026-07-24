import { useState, type FormEvent } from "react";
import { SectionHead } from "~/components/ui/SectionHead";
import { Marquee } from "~/components/ui/Marquee";
import { Button } from "~/components/ui/Button";

export function Contact() {
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("var(--mint)");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("Please complete the required fields before sending.");
      setStatusColor("var(--terra)");
      return;
    }
    setStatus("Message ready. Connect this form to an inbox or CRM to receive submissions.");
    setStatusColor("var(--mint)");
    form.reset();
  };

  return (
    <section className="section contact" id="contact">
      <SectionHead title="Say" serifWord="Hello" num="[ 008 / contact ]" />

      <Marquee className="contact-marquee" duration="22s">
        <span className="mq-word">Get in touch <span className="star">✳</span></span>
        <span className="mq-word stroke">Get in touch <span className="star">✳</span></span>
        <span className="mq-word">Get in touch <span className="star">✳</span></span>
        <span className="mq-word stroke">Get in touch <span className="star">✳</span></span>
      </Marquee>

      <div className="contact-grid">
        <div className="contact-info gs-fade">
          <div className="kicker">Pilot enquiries · <b>partnerships welcome</b></div>
          <h3>Demos, pilots, partnerships — <span className="serif">the field is open.</span></h3>
          <p>Whether you run a cooperative, source produce at wholesale, fund agricultural innovation, or want to bring HarvestFlow to your region — we&apos;d like to hear from you.</p>
          <div className="contact-channels">
            <div className="contact-channel"><span>Email</span><a href="mailto:hello@harvestflow.io">hello@harvestflow.io</a></div>
            <div className="contact-channel"><span>Partnerships</span><a href="mailto:partners@harvestflow.io">partners@harvestflow.io</a></div>
            <div className="contact-channel"><span>HQ</span><span>Botswana-Gaborone</span></div>
          </div>
        </div>

        <form className="form gs-fade" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-name">Name <i>*</i></label>
              <input id="f-name" name="name" type="text" placeholder="Your full name" required />
            </div>
            <div className="field">
              <label htmlFor="f-email">Email <i>*</i></label>
              <input id="f-email" name="email" type="email" placeholder="you@organisation.com" required />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="f-org">Organisation</label>
              <input id="f-org" name="org" type="text" placeholder="Cooperative, buyer, fund…" />
            </div>
            <div className="field">
              <label htmlFor="f-reason">Reason for request <i>*</i></label>
              <select id="f-reason" name="reason" required defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Request a demo</option>
                <option>Pilot programme</option>
                <option>Buyer partnership</option>
                <option>Investment / funding</option>
                <option>Press / other</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-msg">Message <i>*</i></label>
            <textarea id="f-msg" name="message" placeholder="Tell us about your region, your crops, your buyers…" required />
          </div>
          <Button type="submit" variant="solid"><span>Send message</span> <span className="arr">→</span></Button>
          <div className="form-status" role="status" style={{ color: statusColor }}>{status}</div>
        </form>
      </div>
    </section>
  );
}
