import { expect, test } from "@playwright/test"

test("signs in and lands on the dashboard", async ({ page, context }) => {
  await page.goto("/login")

  await page.getByLabel("Email").fill("demo@example.com")
  await page.getByLabel("Password").fill("password")
  await page.getByRole("button", { name: "Sign in" }).click()

  await expect(page).toHaveURL("/dashboard")
  await expect(page.getByRole("heading", { level: 1, name: "Dashboard" })).toBeVisible()

  const token = (await context.cookies()).find((cookie) => cookie.name === "token")
  expect(token?.httpOnly).toBe(true)
})
