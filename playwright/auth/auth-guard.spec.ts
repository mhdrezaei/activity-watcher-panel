import { test, expect } from "@playwright/test";
test("unauthenticated user redirected to login", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page).toHaveURL("/login");
});
