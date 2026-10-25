// Test 1 of 3: a component render. ClaimBadge shows a claim's status,
// and falls back to "No notes provided" when the claimant left no notes.
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClaimBadge from "./ClaimBadge";
import type { ApiClaim } from "../types/index";
import { ClaimStatus } from "../types/index";

// One claim shaped like a row from GET /api/claims. Typed, so a field
// that does not exist in ApiClaim is a compile error here too.
const pending: ApiClaim = {
  id: "6712a0c4e1f2a3b4c5d6e7f8",
  itemId: 1,
  claimantId: 2,
  status: ClaimStatus.Pending,
  createdAt: "2026-10-20T03:00:00.000Z",
  notes: "Black wallet, has my school ID inside.",
};

// The Created date is left out on purpose: toLocaleDateString() prints
// it differently on a Windows laptop and on GitHub's Ubuntu machine.
describe("ClaimBadge", () => {
  it("shows the claim's status and notes", () => {
    render(<ClaimBadge claim={pending} />);

    expect(screen.getByText("Status: Pending")).toBeInTheDocument();
    expect(
      screen.getByText("Black wallet, has my school ID inside."),
    ).toBeInTheDocument();
  });

  it("says No notes provided when the claim has no notes", () => {
    const noNotes: ApiClaim = { ...pending, notes: undefined };

    render(<ClaimBadge claim={noNotes} />);

    expect(screen.getByText("No notes provided")).toBeInTheDocument();
  });
});
