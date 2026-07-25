"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";

const fieldCls =
  "w-full rounded-xl border border-ink/70 bg-transparent px-4 py-3 text-ink placeholder:text-clay focus:border-ink focus:outline-none focus:ring-2 focus:ring-lav";
const labelCls = "mb-2 block text-sm font-semibold text-ink";

function Select({ name, placeholder, options }: { name: string; placeholder: string; options: string[] }) {
  return (
    <select name={name} defaultValue="" required className={`${fieldCls} appearance-none bg-[length:1rem] pr-10`}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => (<option key={o} value={o}>{o}</option>))}
    </select>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-leaf">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Talk to Sales</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-clay">
            Tell us how you move goods today. We will map HarvestFlow onto your operation and get back to you within one business day.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {submitted ? (
            <div className="rounded-[1.75rem] border-2 border-ink bg-paper p-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lav text-ink">
                <Check className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight">Thanks — we&rsquo;ll be in touch.</h2>
              <p className="mt-3 text-clay">Your details are in. A member of the HarvestFlow team will reach out shortly.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-7 inline-flex items-center gap-2 rounded-2xl border-2 border-ink px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="email">Work email</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" className={fieldCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="company">Company name</label>
                <input id="company" name="company" type="text" required placeholder="Acme Agri Ltd" className={fieldCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="first">First name</label>
                <input id="first" name="first" type="text" required className={fieldCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="last">Last name</label>
                <input id="last" name="last" type="text" required className={fieldCls} />
              </div>
              <div>
                <label className={labelCls} htmlFor="size">Company size</label>
                <Select name="size" placeholder="Employee Count" options={["1–10", "11–50", "51–200", "201–1000", "1000+"]} />
              </div>
              <div>
                <label className={labelCls} htmlFor="users">Number of Users</label>
                <Select name="users" placeholder="Users" options={["1–5", "6–20", "21–100", "101–500", "500+"]} />
              </div>
              <div>
                <label className={labelCls} htmlFor="role">What&rsquo;s your role?</label>
                <Select name="role" placeholder="Enter your role" options={["Founder / CEO", "Operations", "Procurement", "Logistics", "Engineering", "Other"]} />
              </div>
              <div>
                <label className={labelCls} htmlFor="usecase">What can we help with?</label>
                <Select name="usecase" placeholder="Select your use case" options={["Marketplace access", "Enterprise subscription", "Logistics integration", "API / partnerships", "Other"]} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="notes">Anything else you&rsquo;d like to share?</label>
                <textarea id="notes" name="notes" rows={4} className={`${fieldCls} resize-y`} />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Send message
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
