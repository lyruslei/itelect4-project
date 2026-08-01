import React from "react";
import type { Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  const statusText = ClaimStatus[claim.status];

  return (
    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-5 shadow-sm transition-colors dark:border-gray-600 dark:bg-gray-800/80">
      <h4 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
        Claim #{claim.id} -{" "}
        <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
          Status: {statusText}
        </span>
      </h4>
      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">Item ID:</strong> {claim.itemId}
        </p>
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">Claimant ID:</strong> {claim.claimantId}
        </p>
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">Created:</strong> {claim.createdAt.toLocaleDateString()}
        </p>
        <p>
          <strong className="font-semibold text-gray-800 dark:text-gray-200">Notes:</strong> {claim.notes ?? "No notes provided"}
        </p>
      </div>

      {children && (
        <div className="mt-3 border-t border-gray-200 pt-3 text-xs italic text-gray-500 dark:border-gray-700 dark:text-gray-400">
          {children}
        </div>
      )}
    </div>
  );
};

export default ClaimBadge;