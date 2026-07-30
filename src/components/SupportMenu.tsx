"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ExternalLink, Fingerprint, HelpCircle, Mail, MessageSquareText, X } from "lucide-react";
import AppLink from "@/components/AppLink";
import { trackWebsiteEvent } from "@/lib/analytics";

const actionClass =
  "flex min-h-11 items-center gap-3 rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-semibold hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
const subscribeToHydration = () => () => {};

export default function SupportMenu() {
  const [open, setOpen] = useState(false);
  const ready = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstActionRef = useRef<HTMLAnchorElement>(null);
  const configuredSupportEmail = process.env.NEXT_PUBLIC_HARVESTFLOW_SUPPORT_EMAIL?.trim();
  const supportEmail = configuredSupportEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredSupportEmail)
    ? configuredSupportEmail
    : undefined;

  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!open) return;
    const focusFrame = requestAnimationFrame(() => firstActionRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a, button:not([disabled])"));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 sm:right-6">
      {open && (
        <>
          <button
            type="button"
            aria-label="Close support options"
            className="fixed inset-0 cursor-default bg-ink/20 backdrop-blur-[1px]"
            onClick={() => close()}
          />
          <div
            ref={panelRef}
            id="support-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-title"
            aria-describedby="support-description"
            className="absolute bottom-20 right-0 w-[min(20rem,calc(100vw-2rem))] rounded-[1.5rem] border-2 border-ink bg-cream p-4 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p id="support-title" className="font-display text-xl font-semibold">How can we help?</p>
                <p id="support-description" className="mt-1 text-sm text-clay">Choose a HarvestFlow support channel.</p>
              </div>
              <button type="button" onClick={() => close()} aria-label="Close support options" className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink/20 hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 grid gap-2">
              <Link ref={firstActionRef} href="/ecosystem/how-it-works" onClick={() => { trackWebsiteEvent({ name: "support_action_clicked", properties: { action: "help" } }); close(false); }} className={actionClass}>
                <HelpCircle className="size-4" aria-hidden="true" /> Help centre
              </Link>
              <Link href="/contact?source=website_sales&intent=enterprise" onClick={() => { trackWebsiteEvent({ name: "support_action_clicked", properties: { action: "sales" } }); close(false); }} className={actionClass}>
                <MessageSquareText className="size-4" aria-hidden="true" /> Talk to sales
              </Link>
              {supportEmail && (
                <a href={`mailto:${supportEmail}`} onClick={() => trackWebsiteEvent({ name: "support_action_clicked", properties: { action: "email" } })} className={actionClass}>
                  <Mail className="size-4" aria-hidden="true" /> Email support
                </a>
              )}
              <AppLink destination="login" onClick={() => trackWebsiteEvent({ name: "support_action_clicked", properties: { action: "application" } })} className={actionClass}>
                <ExternalLink className="size-4" aria-hidden="true" /> Open HarvestFlow application
              </AppLink>
            </div>
          </div>
        </>
      )}
      <span className="relative grid h-14 w-14 place-items-center">
        <span className="pulse-ring pointer-events-none absolute inline-flex h-14 w-14 rounded-full bg-lav" />
        <button
          ref={triggerRef}
          type="button"
          aria-label={open ? "Close HarvestFlow support options" : "Open HarvestFlow support options"}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="support-dialog"
          data-hydrated={ready ? "true" : "false"}
          disabled={!ready}
          onClick={() => setOpen((current) => !current)}
          className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-lav text-ink shadow-[0_14px_34px_-10px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
        >
          <Fingerprint className="h-6 w-6" aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}
