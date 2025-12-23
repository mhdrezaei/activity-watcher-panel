import { test, expect } from "@playwright/test";
test("user can logout", async ({ page }) => {
  // شبیه‌سازی لاگین
  await page.addInitScript(() => {
    localStorage.setItem(
      "auth-storage",
      JSON.stringify({
        state: {
          accessToken: "fake-token",
          refreshToken: "fake-refresh",
          user: { id: 1, username: "admin" },
        },
        version: 0,
      })
    );
  });

  await page.goto("/dashboard");

  await page.locator('[aria-label="خروج"]').click();
  await page
    .getByText("آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟")
    .click();
  await page.getByRole("button", { name: "تائید" }).click();

  await expect(page).toHaveURL("/login");
});
