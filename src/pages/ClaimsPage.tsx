import React from "react";
import { useQuery } from "@tanstack/react-query";
import ClaimBadge from "../components/ClaimBadge";
import type { ApiClaim } from "../types/index";
import { fetchClaims } from "../api/client";
import { useToggle } from "../hooks/useToggle";

function ClaimsPage() {
  const [showDetails, toggleShowDetails] = useToggle(true);

  const {
    data: claims = [],
    isPending,
    isError,
    error,
  } = useQuery<ApiClaim[]>({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md animate-pulse space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="pt-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading claims data...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm dark:border-red-900 dark:bg-red-950/80">
          <h3 className="text-lg font-bold text-red-700 dark:text-red-300">Could not load claims</h3>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

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

      <section className="space-y-4 max-w-xl">
        {claims.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
            No claims found.
          </div>
        ) : (
          claims.map((claim) => (
            <ClaimBadge key={claim.id} claim={claim}>
              {showDetails && (
                <p>⚠️ Admin action required: Verify claimant identity before approval.</p>
              )}
            </ClaimBadge>
          ))
        )}
      </section>
    </div>
  );
}

export default ClaimsPage;
