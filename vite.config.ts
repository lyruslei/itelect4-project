import path from "path"
// vitest/config, not vite: same defineConfig, plus the type for the test block.
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  // Only npm test reads this block; npm run dev and npm run build skip it.
  test: {
    // A pretend browser page inside Node, so render() has a document.
    environment: "jsdom",
    // Runs before every test file: jest-dom checks, and cleanup between tests.
    setupFiles: ["./src/test/setup.ts"],
    // client.ts throws at import without VITE_API_URL. The tests never call
    // it, so a fixed value means no .env is needed here or on GitHub.
    env: { VITE_API_URL: "http://localhost:4000" },
  },
})
