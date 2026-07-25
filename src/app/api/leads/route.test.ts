import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "./route.ts";

function payload() {
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

function request(body = payload()) {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("reports success only after the backend accepts persistence", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ submitted: true }, { status: 201 });
  try {
    const response = await POST(request());
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { submitted: true });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("never reports success when the backend fails", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ error: { code: "INTERNAL" } }, { status: 500 });
  try {
    const response = await POST(request());
    assert.equal(response.status, 503);
    const body = await response.json() as { submitted?: boolean };
    assert.notEqual(body.submitted, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects invalid form payloads without contacting the backend", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return Response.json({ submitted: true });
  };
  try {
    const response = await POST(request({ ...payload(), email: "invalid" }));
    assert.equal(response.status, 400);
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
