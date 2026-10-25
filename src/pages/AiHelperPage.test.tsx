// Test 3 of 3: form validation. The test types into the real form and
// presses the real button, the way someone reporting an item would.
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AiHelperPage from "./AiHelperPage";

// AiHelperPage calls useMutation, which throws unless the page sits
// inside the QueryClientProvider that main.tsx gives the real app.
// A new QueryClient per test, so no test sees another's state.
function renderAiHelperPage() {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <AiHelperPage />
    </QueryClientProvider>,
  );
}

// Put fetch back after every test, so a spy cannot leak into the next.
afterEach(() => {
  vi.restoreAllMocks();
});

// The exact sentence from src/schemas/aiHelperSchema.ts.
const TOO_SHORT = "Describe the item in at least 20 characters.";

describe("AiHelperPage", () => {
  it("shows the 20-character message when the description is empty", async () => {
    const user = userEvent.setup();
    renderAiHelperPage();

    await user.click(screen.getByRole("button", { name: "Check my report" }));

    expect(await screen.findByText(TOO_SHORT)).toBeInTheDocument();
  });

  it("does not call the API when the description is too short", async () => {
    // Watches fetch without stopping it. If the form got past the schema,
    // request() in client.ts would call fetch and this spy would count it.
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderAiHelperPage();

    await user.type(screen.getByLabelText("Item description"), "Lost my wallet");
    await user.click(screen.getByRole("button", { name: "Check my report" }));

    expect(await screen.findByText(TOO_SHORT)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("does not call the API when the description is only spaces", async () => {
    // The schema trims first, so 25 spaces count as 0 characters.
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();
    renderAiHelperPage();

    await user.type(screen.getByLabelText("Item description"), " ".repeat(25));
    await user.click(screen.getByRole("button", { name: "Check my report" }));

    expect(await screen.findByText(TOO_SHORT)).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
