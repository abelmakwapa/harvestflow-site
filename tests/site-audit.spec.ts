import { expect, test } from "@playwright/test";
import { CANONICAL_ROUTES } from "../src/lib/site";

test.describe("canonical route audit", () => {
  test.use({ viewport: { width: 320, height: 700 } });

  for (const route of CANONICAL_ROUTES) {
    test(`${route} has content, metadata, and no mobile overflow`, async ({ page }) => {
      await page.route("**/*", async (requestRoute) => {
        const type = requestRoute.request().resourceType();
        if (type === "image" || type === "media" || type === "font") {
          await requestRoute.abort();
          return;
        }
        await requestRoute.continue();
      });

      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), `${route} returned an unsuccessful response`).toBeLessThan(400);
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page).toHaveTitle(/HarvestFlow/);

      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const canonicalHref = await canonical.getAttribute("href");
      expect(canonicalHref).not.toBeNull();
      expect(new URL(canonicalHref!).pathname).toBe(route);

      const overflow = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
      }));
      expect(overflow.page, `${route} horizontally overflows at 320px`).toBeLessThanOrEqual(overflow.viewport + 1);
    });
  }
});

test("legacy content paths redirect to canonical routes", async ({ page }) => {
  const redirects = {
    "/about": "/company/about",
    "/careers": "/company/careers",
    "/blog": "/company/blog",
    "/help": "/ecosystem/how-it-works",
    "/use-cases": "/ecosystem/use-cases",
    "/quality-grading": "/ecosystem/quality-grading",
    "/security": "/infrastructure/security",
    "/compliance": "/infrastructure/compliance",
  };

  for (const [legacy, destination] of Object.entries(redirects)) {
    await page.goto(legacy, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(new RegExp(`${destination.replaceAll("/", "\\/")}$`));
  }
});

test("unknown routes render a useful no-index 404", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Off the map" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("discovery endpoints and baseline security headers are present", async ({ request }) => {
  const home = await request.get("/");
  expect(home.ok()).toBe(true);
  const headers = home.headers();
  expect(headers["x-powered-by"]).toBeUndefined();
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("/ecosystem/farmers");
  expect(sitemapText).not.toContain("/company/press");

  const manifest = await request.get("/manifest.webmanifest");
  expect(manifest.ok()).toBe(true);
  expect((await manifest.json()).name).toBe("HarvestFlow");

  const openGraphImage = await request.get("/opengraph-image");
  expect(openGraphImage.ok()).toBe(true);
  expect(openGraphImage.headers()["content-type"]).toContain("image/png");
});
