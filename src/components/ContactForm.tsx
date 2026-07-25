"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { campaignParamsFromSearch } from "@/lib/app-links";
import { trackWebsiteEvent } from "@/lib/analytics";
import { leadContextFromSearch, type LeadSubmission } from "@/lib/leads";

const fieldCls =
  "w-full rounded-xl border border-ink/70 bg-transparent px-4 py-3 text-ink placeholder:text-clay focus:border-ink focus:outline-none focus:ring-2 focus:ring-lav";
const labelCls = "mb-2 block text-sm font-semibold text-ink";

function Select({ id, name, placeholder, options }: { id: string; name: string; placeholder: string; options: string[] }) {
  return (
    <select id={id} name={name} defaultValue="" required className={`${fieldCls} appearance-none bg-[length:1rem] pr-10`}>
      <option value="" disabled>{placeholder}</option>
      {options.map((option) => (<option key={option} value={option}>{option}</option>))}
    </select>
  );
}

function newSubmissionId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const submissionId = useRef(newSubmissionId());
  const started = useRef(false);
  const submitting = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "validation" | "error">("idle");
  const [fieldError, setFieldError] = useState<string | undefined>();

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    const { source, intent } = leadContextFromSearch(window.location.search);
    trackWebsiteEvent({ name: "lead_form_started", properties: { source, intent } });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("submitting");
    setFieldError(undefined);

    const data = new FormData(event.currentTarget);
    const campaign = campaignParamsFromSearch(window.location.search);
    const { source, intent } = leadContextFromSearch(window.location.search);
    const payload: LeadSubmission = {
      submission_id: submissionId.current,
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      first_name: String(data.get("first_name") ?? ""),
      last_name: String(data.get("last_name") ?? ""),
      company_size: String(data.get("company_size") ?? ""),
      expected_users: String(data.get("expected_users") ?? ""),
      role: String(data.get("role") ?? ""),
      use_case: String(data.get("use_case") ?? ""),
      notes: String(data.get("notes") ?? ""),
      source,
      intent,
      ...campaign,
      consent_acknowledged: data.get("consent_acknowledged") === "on",
      website: String(data.get("website") ?? ""),
    } as LeadSubmission;

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => null) as { error?: { field?: string } } | null;
        if (response.status === 400) {
          setFieldError(error?.error?.field);
          setStatus("validation");
          trackWebsiteEvent({ name: "lead_form_failed", properties: { source, intent, reason: "validation" } });
        } else {
          setStatus("error");
          trackWebsiteEvent({ name: "lead_form_failed", properties: { source, intent, reason: "server" } });
        }
        return;
      }
      setStatus("success");
      trackWebsiteEvent({ name: "lead_form_submitted", properties: { source, intent } });
    } catch {
      setStatus("error");
      trackWebsiteEvent({ name: "lead_form_failed", properties: { source, intent, reason: "network" } });
    } finally {
      submitting.current = false;
    }
  };

  const sendAnother = () => {
    submissionId.current = newSubmissionId();
    started.current = false;
    setFieldError(undefined);
    setStatus("idle");
    requestAnimationFrame(() => formRef.current?.reset());
  };

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-leaf">Contact</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">Talk to Sales</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-clay">
            Tell us how you move goods today. We will map HarvestFlow onto your operation and respond as soon as possible.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {status === "success" ? (
            <div className="rounded-[1.75rem] border-2 border-ink bg-paper p-10 text-center" role="status" aria-live="polite">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lav text-ink">
                <Check className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight">Thanks — we&rsquo;ll be in touch.</h2>
              <p className="mt-3 text-clay">Your enquiry has been saved. A member of the HarvestFlow team will reach out.</p>
              <button type="button" onClick={sendAnother} className="mt-7 inline-flex items-center gap-2 rounded-2xl border-2 border-ink px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream">
                Send another
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} onFocus={onStart} className="grid grid-cols-1 gap-6 sm:grid-cols-2" aria-describedby="form-status">
              <div>
                <label className={labelCls} htmlFor="email">Work email</label>
                <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" className={fieldCls} aria-invalid={fieldError === "email"} />
              </div>
              <div>
                <label className={labelCls} htmlFor="company">Company name</label>
                <input id="company" name="company" type="text" required maxLength={160} autoComplete="organization" placeholder="Acme Agri Ltd" className={fieldCls} aria-invalid={fieldError === "company"} />
              </div>
              <div>
                <label className={labelCls} htmlFor="first_name">First name</label>
                <input id="first_name" name="first_name" type="text" required maxLength={80} autoComplete="given-name" className={fieldCls} aria-invalid={fieldError === "first_name"} />
              </div>
              <div>
                <label className={labelCls} htmlFor="last_name">Last name</label>
                <input id="last_name" name="last_name" type="text" required maxLength={80} autoComplete="family-name" className={fieldCls} aria-invalid={fieldError === "last_name"} />
              </div>
              <div>
                <label className={labelCls} htmlFor="company_size">Company size</label>
                <Select id="company_size" name="company_size" placeholder="Employee count" options={["1–10", "11–50", "51–200", "201–1000", "1000+"]} />
              </div>
              <div>
                <label className={labelCls} htmlFor="expected_users">Number of users</label>
                <Select id="expected_users" name="expected_users" placeholder="Users" options={["1–5", "6–20", "21–100", "101–500", "500+"]} />
              </div>
              <div>
                <label className={labelCls} htmlFor="role">What&rsquo;s your role?</label>
                <Select id="role" name="role" placeholder="Select your role" options={["Founder / CEO", "Operations", "Procurement", "Logistics", "Engineering", "Other"]} />
              </div>
              <div>
                <label className={labelCls} htmlFor="use_case">What can we help with?</label>
                <Select id="use_case" name="use_case" placeholder="Select your use case" options={["Marketplace access", "Enterprise subscription", "Logistics integration", "API / partnerships", "Support", "Other"]} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="notes">Anything else you&rsquo;d like to share?</label>
                <textarea id="notes" name="notes" rows={4} maxLength={2000} className={`${fieldCls} resize-y`} />
              </div>
              <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm leading-relaxed text-clay" htmlFor="consent_acknowledged">
                  <input id="consent_acknowledged" name="consent_acknowledged" type="checkbox" required className="mt-1 size-4 accent-[var(--color-ink)]" />
                  <span>I agree that HarvestFlow may store these details and contact me about this enquiry.</span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <p id="form-status" className={`mb-4 text-sm ${status === "validation" || status === "error" ? "text-red-700" : "text-clay"}`} role="status" aria-live="polite">
                  {status === "validation" && "Please check the form and try again."}
                  {status === "error" && "We could not send your message. Your entries are still here; please retry."}
                  {status === "submitting" && "Sending your enquiry…"}
                </p>
                <button type="submit" disabled={status === "submitting"} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-lav px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 active:translate-y-0">
                  {status === "submitting" ? "Sending…" : status === "error" ? "Retry" : "Send message"}
                  {status === "submitting" ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="size-4" aria-hidden="true" />}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
