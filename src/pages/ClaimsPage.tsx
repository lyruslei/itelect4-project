import React, { useState } from "react";
import ClaimBadge from "../components/ClaimBadge";
import type { Claim } from "../types/index";
import { mockClaimData } from "../data/mockData";
import { useToggle } from "../hooks/useToggle";

function ClaimsPage() {
  const [claim] = useState<Claim | null>(mockClaimData);
  const [showDetails, toggleShowDetails] = useToggle(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Claims Management (Protected)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View active item ownership claims and perform identity verification.
          </p>
        </div>

        <button
          onClick={toggleShowDetails}
          className="rounded-lg bg-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          {showDetails ? "Hide Admin Notes" : "Show Admin Notes"}
        </button>
      </div>

      {claim && (
        <section className="max-w-xl">
          <ClaimBadge claim={claim}>
            {showDetails && (
              <p>⚠️ Admin action required: Verify claimant identity before approval.</p>
            )}
          </ClaimBadge>
        </section>
      )}
    </div>
  );
}

export default ClaimsPage;
