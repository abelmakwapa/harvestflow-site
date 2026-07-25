import { validateLeadSubmission } from "../../../lib/leads.ts";

const DEFAULT_API_URL = "http://127.0.0.1:8080/v1";
const MAX_PAYLOAD_BYTES = 16_384;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return Response.json({ error: { code: "PAYLOAD_TOO_LARGE", message: "The message is too long." } }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: { code: "BAD_REQUEST", message: "Please check the form and try again." } }, { status: 400 });
  }

  const validated = validateLeadSubmission(body);
  if (!validated.ok) {
    return Response.json({ error: { code: "VALIDATION", message: "Please check the highlighted field.", field: validated.field } }, { status: 400 });
  }

  const baseUrl = process.env.HARVESTFLOW_API_BASE_URL?.trim() || DEFAULT_API_URL;
  let endpoint: URL;
  try {
    endpoint = new URL("public/leads", baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  } catch {
    return Response.json({ error: { code: "UNAVAILABLE", message: "We could not send your message. Please try again." } }, { status: 503 });
  }

  try {
    const headers = new Headers({ "content-type": "application/json", accept: "application/json" });
    const forwardedFor = request.headers.get("x-forwarded-for");
    if (forwardedFor) headers.set("x-forwarded-for", forwardedFor);

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(validated.value),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok) {
      return Response.json({ submitted: true }, { status: response.status === 201 ? 201 : 200 });
    }

    if (response.status === 400) {
      const payload = await response.json().catch(() => null) as { error?: { field?: string } } | null;
      return Response.json({ error: { code: "VALIDATION", message: "Please check the form and try again.", field: payload?.error?.field } }, { status: 400 });
    }
    if (response.status === 429) {
      return Response.json({ error: { code: "RATE_LIMITED", message: "Please wait a moment before trying again." } }, { status: 429 });
    }
    return Response.json({ error: { code: "UNAVAILABLE", message: "We could not send your message. Please try again." } }, { status: 503 });
  } catch {
    return Response.json({ error: { code: "UNAVAILABLE", message: "We could not send your message. Please try again." } }, { status: 503 });
  }
}
