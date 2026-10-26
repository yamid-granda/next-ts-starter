import { expect, test } from "@playwright/experimental-ct-react"
import { Counter } from "./counter"

test("increments, decrements and resets the counter", async ({ mount }) => {
  const component = await mount(<Counter />)

  await expect(component.getByTestId("count")).toHaveText("0")

  await component.getByRole("button", { name: "Increment" }).click()
  await expect(component.getByTestId("count")).toHaveText("1")

  await component.getByRole("button", { name: "Decrement" }).click()
  await expect(component.getByTestId("count")).toHaveText("0")

  await component.getByRole("button", { name: "Increment" }).click()
  await component.getByRole("button", { name: "Reset" }).click()
  await expect(component.getByTestId("count")).toHaveText("0")
})

test("renders with Tailwind styles applied", async ({ mount }) => {
  const component = await mount(<Counter />)

  await expect(component.getByTestId("count")).toHaveCSS("font-variant-numeric", "tabular-nums")
})
