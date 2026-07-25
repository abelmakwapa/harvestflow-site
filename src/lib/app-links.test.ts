import test from "node:test";
import assert from "node:assert/strict";
import { APP_PATHS, buildAppUrl, campaignParamsFromSearch } from "./app-links.ts";

test("builds every application destination from the configured base", () => {
  for (const [destination, path] of Object.entries(APP_PATHS)) {
    const url = new URL(buildAppUrl(destination as keyof typeof APP_PATHS));
    assert.equal(url.origin, "http://localhost:5173");
    assert.equal(url.pathname, path);
  }
});

test("encodes login returnTo and only supported query parameters", () => {
  const url = new URL(buildAppUrl("login", {
    returnTo: APP_PATHS.marketplace,
    intent: "buyer",
    utm_source: "website",
  }));
  assert.equal(url.searchParams.get("returnTo"), "/marketplace");
  assert.equal(url.searchParams.get("intent"), "buyer");
  assert.equal(url.searchParams.get("utm_source"), "website");
});

test("preserves only bounded campaign attribution", () => {
  assert.deepEqual(
    campaignParamsFromSearch("?utm_source=field&utm_medium=press&email=private%40example.com"),
    { utm_source: "field", utm_medium: "press" },
  );
  assert.deepEqual(campaignParamsFromSearch(`?utm_campaign=${"x".repeat(101)}`), {});
});
