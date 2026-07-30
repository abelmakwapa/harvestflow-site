import assert from "node:assert/strict";
import test from "node:test";
import { CANONICAL_ROUTES } from "./site.ts";

test("canonical route inventory has no duplicates", () => {
  assert.equal(new Set(CANONICAL_ROUTES).size, CANONICAL_ROUTES.length);
});

test("canonical route inventory uses normalized paths", () => {
  for (const route of CANONICAL_ROUTES) {
    assert.match(route, /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/);
    assert.equal(route.length > 1 && route.endsWith("/"), false);
  }
});
