// Named in vite.config.ts test.setupFiles, so Vitest runs it before every
// test file. The app never imports it.
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Adds toBeInTheDocument() and friends to expect(), with their types.
import "@testing-library/jest-dom/vitest";

// Empties the pretend page after each test, so one test's render can't
// leak into the next.
afterEach(() => {
  cleanup();
});
