import { describe, expect, it } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center")
  })

  it("ignores falsy values", () => {
    expect(cn("flex", false, undefined, null, "gap-2")).toBe("flex gap-2")
  })

  it("resolves conflicting Tailwind classes in favour of the last one", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
    expect(cn("text-sm", "text-lg")).toBe("text-lg")
  })
})
