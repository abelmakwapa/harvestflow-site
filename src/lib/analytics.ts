import type { AppPath, AudienceIntent } from "@/lib/app-links";

export type WebsiteAnalyticsEvent =
  | { name: "marketplace_cta_clicked"; properties: { destination: AppPath; intent?: AudienceIntent } }
  | { name: "lead_form_started"; properties: { source: string; intent: AudienceIntent } }
  | { name: "lead_form_submitted"; properties: { source: string; intent: AudienceIntent } }
  | { name: "lead_form_failed"; properties: { source: string; intent: AudienceIntent; reason: "validation" | "network" | "server" } }
  | { name: "support_action_clicked"; properties: { action: "help" | "sales" | "email" | "application" } };

/**
 * Privacy-safe internal hook. No transport is configured on the marketing
 * site yet; consumers can subscribe to this event without changing CTA code.
 */
export function trackWebsiteEvent(event: WebsiteAnalyticsEvent): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("harvestflow:analytics", { detail: event }));
}
