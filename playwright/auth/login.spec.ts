import { test, expect } from "@playwright/test";

test("login page renders correctly", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("button", { name: "ورود" })).toBeVisible();
  await expect(page.getByPlaceholder("ایمیل یا نام کاربری")).toBeVisible();
  await expect(page.getByPlaceholder("رمز عبور")).toBeVisible();
});
test("show error messages", async ({ page }) => {
  await page.goto("/login");
  await page.fill("input[name=username]", "");
  await page.fill("input[name=password]", "");
  await page.click('button[type="submit"]');
  expect(page.getByAltText("نام کاربری الزامی است"));
  expect(page.getByAltText("رمز عبور الزامی است"));
});

test("can user successfully login", async ({ page }) => {
  await page.goto("/login");
  await page.fill("input[name=username]", "admin");
  await page.fill("input[name=password]", "7ujm&UJM");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
});

test("logged-in user should not see login page", async ({ page }) => {
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

  await page.goto("/login");

  await expect(page).toHaveURL("/dashboard");
});
