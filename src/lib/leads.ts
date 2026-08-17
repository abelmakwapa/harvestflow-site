import type { AudienceIntent } from "./app-links";

export interface LeadSubmission {
  submission_id: string;
  email: string;
  company: string;
  first_name: string;
  last_name: string;
  company_size: string;
  expected_users: string;
  role: string;
  use_case: string;
  notes?: string;
  source: "website_sales" | "website_partnership" | "website_support" | "website_enterprise";
  intent: AudienceIntent;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  consent_acknowledged: true;
  website?: string;
}

type ValidationResult =
  | { ok: true; value: LeadSubmission }
  | { ok: false; field?: string };

const LIMITS: Record<string, number> = {
  submission_id: 100,
  email: 254,
  company: 160,
  first_name: 80,
  last_name: 80,
  company_size: 40,
  expected_users: 40,
  role: 100,
  use_case: 120,
  notes: 2000,
  source: 40,
  intent: 40,
  utm_source: 100,
  utm_medium: 100,
  utm_campaign: 100,
  website: 200,
};

const REQUIRED = ["submission_id", "email", "company", "first_name", "last_name", "company_size", "expected_users", "role", "use_case", "source", "intent"] as const;
const SOURCES = new Set(["website_sales", "website_partnership", "website_support", "website_enterprise"]);
const INTENTS = new Set(["farmer", "buyer", "logistics", "supplier", "enterprise"]);

export function leadContextFromSearch(search: string): Pick<LeadSubmission, "source" | "intent"> {
  const params = new URLSearchParams(search);
  const requestedSource = params.get("source") ?? "";
  const requestedIntent = params.get("intent") ?? "";
  return {
    source: (SOURCES.has(requestedSource) ? requestedSource : "website_sales") as LeadSubmission["source"],
    intent: (INTENTS.has(requestedIntent) ? requestedIntent : "enterprise") as AudienceIntent,
  };
}

export function validateLeadSubmission(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false };
  const record = input as Record<string, unknown>;

  for (const field of REQUIRED) {
    if (typeof record[field] !== "string" || !record[field].trim()) return { ok: false, field };
  }
  for (const [field, limit] of Object.entries(LIMITS)) {
    const value = record[field];
    if (value !== undefined && (typeof value !== "string" || value.length > limit)) return { ok: false, field };
  }
  const email = String(record.email).trim();
  const source = String(record.source).trim();
  const intent = String(record.intent).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !SOURCES.has(source) || !INTENTS.has(intent)) {
    return { ok: false, field: !SOURCES.has(source) ? "source" : !INTENTS.has(intent) ? "intent" : "email" };
  }
  if (record.consent_acknowledged !== true) return { ok: false, field: "consent_acknowledged" };

  const stringValue = (field: keyof LeadSubmission) => String(record[field] ?? "").trim();
  const value: LeadSubmission = {
    submission_id: stringValue("submission_id"),
    email: stringValue("email").toLowerCase(),
    company: stringValue("company"),
    first_name: stringValue("first_name"),
    last_name: stringValue("last_name"),
    company_size: stringValue("company_size"),
    expected_users: stringValue("expected_users"),
    role: stringValue("role"),
    use_case: stringValue("use_case"),
    notes: stringValue("notes") || undefined,
    source: stringValue("source") as LeadSubmission["source"],
    intent: stringValue("intent") as AudienceIntent,
    consent_acknowledged: true,
    website: stringValue("website") || undefined,
  };

  for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
    const campaignValue = stringValue(key);
    if (campaignValue) value[key] = campaignValue;
  }

  return { ok: true, value };
}
