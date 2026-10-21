import process from "node:process";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5174",
    viewport: { width: 1600, height: 1000 },
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: process.env.TEST_PREVIEW
      ? "npm run preview -- --host 127.0.0.1 --port 5174 --strictPort"
      : "npm run dev -- --host 127.0.0.1 --port 5174 --strictPort",
    url: "http://127.0.0.1:5174",
    reuseExistingServer: false,
  },
});
