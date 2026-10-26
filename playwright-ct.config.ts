import path from "node:path"
import { defineConfig, devices } from "@playwright/experimental-ct-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  testDir: "./src",
  testMatch: "**/*.ct.tsx",
  snapshotDir: "./__snapshots__",
  timeout: 10_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { outputFolder: "playwright-report/ct", open: "never" }]],
  outputDir: "./test-results/ct",
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
    ctViteConfig: {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "src"),
        },
      },
      build: {
        rollupOptions: {
          onwarn(warning, warn) {
            // "use client" is meaningless to Vite; React Query ships it on every module.
            if (warning.code === "MODULE_LEVEL_DIRECTIVE") return
            warn(warning)
          },
        },
      },
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
