import { expect, test, type Page } from "@playwright/test";

async function fillContactForm(page: Page) {
  await page.getByLabel("Work email").fill("buyer@example.com");
  await page.getByLabel("Company name").fill("Kalahari Foods");
  await page.getByLabel("First name").fill("Ada");
  await page.getByLabel("Last name").fill("Molefe");
  await page.getByLabel("Company size").selectOption("11–50");
  await page.getByLabel("Number of users").selectOption("6–20");
  await page.getByLabel("What’s your role?").selectOption("Procurement");
  await page.getByLabel("What can we help with?").selectOption("Marketplace access");
  await page.getByLabel(/I agree that HarvestFlow may store/).check();
}

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact?source=website_partnership&intent=enterprise&utm_source=campaign");
    await expect(page.locator("form")).toHaveAttribute("data-hydrated", "true");
    await fillContactForm(page);
  });

  test("shows success only after persistence is confirmed", async ({ page }) => {
    await page.route("**/api/leads", async (route) => {
      const payload = route.request().postDataJSON();
      expect(payload).toMatchObject({
        email: "buyer@example.com",
        source: "website_partnership",
        intent: "enterprise",
        utm_source: "campaign",
        consent_acknowledged: true,
      });
      await route.fulfill({ status: 201, contentType: "application/json", body: '{"submitted":true}' });
    });

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("heading", { name: "Thanks — we’ll be in touch." })).toBeVisible();
  });

  test("preserves values after failure and succeeds on retry", async ({ page }) => {
    let attempts = 0;
    await page.route("**/api/leads", async (route) => {
      attempts += 1;
      await route.fulfill({
        status: attempts === 1 ? 503 : 201,
        contentType: "application/json",
        body: attempts === 1 ? '{"error":{"code":"UNAVAILABLE"}}' : '{"submitted":true}',
      });
    });

    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText(/Your entries are still here/)).toBeVisible();
    await expect(page.getByLabel("Work email")).toHaveValue("buyer@example.com");

    await page.getByRole("button", { name: "Retry" }).click();
    await expect(page.getByRole("heading", { name: "Thanks — we’ll be in touch." })).toBeVisible();
    expect(attempts).toBe(2);
  });

  test("announces backend validation without displaying success", async ({ page }) => {
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: '{"error":{"code":"VALIDATION","field":"email"}}',
      });
    });

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Please check the form and try again.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Thanks — we’ll be in touch." })).toHaveCount(0);
    await expect(page.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");
  });

  test("coalesces rapid submit events into one request", async ({ page }) => {
    let requests = 0;
    await page.route("**/api/leads", async (route) => {
      requests += 1;
      await new Promise((resolve) => setTimeout(resolve, 150));
      await route.fulfill({ status: 201, contentType: "application/json", body: '{"submitted":true}' });
    });

    await page.locator("form").evaluate((form) => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    await expect(page.getByRole("heading", { name: "Thanks — we’ll be in touch." })).toBeVisible();
    expect(requests).toBe(1);
  });
});

test("support surface is keyboard accessible and fits a 320px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open HarvestFlow support options" });

  await expect(trigger).toHaveAttribute("data-hydrated", "true");
  await expect(trigger).toBeEnabled();
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "How can we help?" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("link", { name: "Help centre", exact: true })).toBeFocused();
  const dialogBox = await dialog.boundingBox();
  expect(dialogBox).not.toBeNull();
  expect(dialogBox!.x).toBeGreaterThanOrEqual(0);
  expect(dialogBox!.x + dialogBox!.width).toBeLessThanOrEqual(320);

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await trigger.dispatchEvent("pointerdown", { pointerType: "touch", isPrimary: true });
  await trigger.dispatchEvent("pointerup", { pointerType: "touch", isPrimary: true });
  await trigger.dispatchEvent("click", { detail: 1 });
  await expect(dialog).toBeVisible();
});
