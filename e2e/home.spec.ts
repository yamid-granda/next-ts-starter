import { expect, test } from "@playwright/test"

test("renders the starter and supports client and server state", async ({ page }) => {
  await page.goto("/")

  await expect(
    page.getByRole("heading", { level: 1, name: "Next.js + TypeScript starter" }),
  ).toBeVisible()

  await expect(page.getByTestId("count")).toHaveText("0")
  await page.getByRole("button", { name: "Increment" }).click()
  await expect(page.getByTestId("count")).toHaveText("1")

  await page.getByRole("button", { name: "Reset" }).click()
  await expect(page.getByTestId("count")).toHaveText("0")

  await expect(page.getByTestId("greeting-message")).toHaveText("Hello from the Route Handler")
})
