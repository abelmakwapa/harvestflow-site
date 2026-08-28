import { validateLeadSubmission } from "../../../lib/leads.ts";

const DEFAULT_API_URL = "http://127.0.0.1:8080/v1";
const MAX_PAYLOAD_BYTES = 16_384;
const JSON_HEADERS = { "cache-control": "no-store", "content-type": "application/json" };

function json(data: unknown, status: number, headers?: HeadersInit) {
  const responseHeaders = new Headers(JSON_HEADERS);
  if (headers) new Headers(headers).forEach((value, key) => responseHeaders.set(key, value));
  return Response.json(data, { status, headers: responseHeaders });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return json({ error: { code: "PAYLOAD_TOO_LARGE", message: "The message is too long." } }, 413);
  }

  let body: unknown;
  try {
    const bodyText = await request.text();
    if (new TextEncoder().encode(bodyText).byteLength > MAX_PAYLOAD_BYTES) {
      return json({ error: { code: "PAYLOAD_TOO_LARGE", message: "The message is too long." } }, 413);
    }
    body = JSON.parse(bodyText);
  } catch {
    return json({ error: { code: "BAD_REQUEST", message: "Please check the form and try again." } }, 400);
  }

  const validated = validateLeadSubmission(body);
  if (!validated.ok) {
    return json({ error: { code: "VALIDATION", message: "Please check the highlighted field.", field: validated.field } }, 400);
  }

  // Quietly accept honeypot submissions without relaying them to the lead service.
  if (validated.value.website) return json({ submitted: true }, 201);

  const configuredBaseUrl = process.env.HARVESTFLOW_API_BASE_URL?.trim();
  if (!configuredBaseUrl && process.env.NODE_ENV === "production") {
    return json({ error: { code: "UNAVAILABLE", message: "We could not send your message. Please try again." } }, 503);
  }
  const baseUrl = configuredBaseUrl || DEFAULT_API_URL;
  let endpoint: URL;
  try {
    endpoint = new URL("public/leads", baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  } catch {
    return json({ error: { code: "UNAVAILABLE", message: "We could not send your message. Please try again." } }, 503);
  }

  try {
    const headers = new Headers({ "content-type": "application/json", accept: "application/json" });
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(validated.value),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok) {
      return json({ submitted: true }, response.status === 201 ? 201 : 200);
    }

    if (response.status === 400) {
      const payload = await response.json().catch(() => null) as { error?: { field?: string } } | null;
      return json({ error: { code: "VALIDATION", message: "Please check the form and try again.", field: payload?.error?.field } }, 400);
    }
    if (response.status === 429) {
      const retryAfter = response.headers.get("retry-after");
      return json(
        { error: { code: "RATE_LIMITED", message: "Please wait a moment before trying again." } },
        429,
        retryAfter ? { "retry-after": retryAfter } : undefined,
      );
    }
    return json({ error: { code: "UNAVAILABLE", message: "We could not send your message. Please try again." } }, 503);
  } catch {
    return json({ error: { code: "UNAVAILABLE", message: "We could not send your message. Please try again." } }, 503);
  }
}
