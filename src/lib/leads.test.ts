import test from "node:test";
import assert from "node:assert/strict";
import { leadContextFromSearch, validateLeadSubmission } from "./leads.ts";

function validLead() {
  return {
    submission_id: "123e4567-e89b-12d3-a456-426614174000",
    email: "buyer@example.com",
    company: "Kalahari Foods",
    first_name: "Ada",
    last_name: "Molefe",
    company_size: "11–50",
    expected_users: "6–20",
    role: "Procurement",
    use_case: "Marketplace access",
    source: "website_sales",
    intent: "enterprise",
    consent_acknowledged: true,
    website: "",
  };
}

test("accepts a bounded consented lead payload", () => {
  assert.equal(validateLeadSubmission(validLead()).ok, true);
});

test("normalizes user-entered values before forwarding", () => {
  const result = validateLeadSubmission({ ...validLead(), email: " Buyer@Example.com ", company: " Kalahari Foods " });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.email, "buyer@example.com");
    assert.equal(result.value.company, "Kalahari Foods");
  }
});

test("rejects missing consent and invalid email", () => {
  assert.deepEqual(validateLeadSubmission({ ...validLead(), consent_acknowledged: false }), {
    ok: false,
    field: "consent_acknowledged",
  });
  assert.deepEqual(validateLeadSubmission({ ...validLead(), email: "not-an-email" }), {
    ok: false,
    field: "email",
  });
});

test("rejects oversized fields", () => {
  assert.deepEqual(validateLeadSubmission({ ...validLead(), notes: "x".repeat(2001) }), {
    ok: false,
    field: "notes",
  });
  assert.deepEqual(validateLeadSubmission({ ...validLead(), submission_id: "x".repeat(101) }), {
    ok: false,
    field: "submission_id",
  });
});

test("accepts only known contact source and intent values", () => {
  assert.deepEqual(
    leadContextFromSearch("?source=website_partnership&intent=enterprise"),
    { source: "website_partnership", intent: "enterprise" },
  );
  assert.deepEqual(leadContextFromSearch("?source=spoofed&intent=admin"), {
    source: "website_sales",
    intent: "enterprise",
  });
});
