import type { Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

interface ClaimBadgeProps {
  claim: Claim;
  children?: React.ReactNode;
}

const ClaimBadge: React.FC<ClaimBadgeProps> = ({ claim, children }) => {
  // Reverse mapping the regular enum to get the string name
  const statusText = ClaimStatus[claim.status];

  return (
    <div style={{ border: "1px dashed #6c757d", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
      <h4>Claim #{claim.id} - Status: {statusText}</h4>
      <p><strong>Item ID:</strong> {claim.itemId}</p>
      <p><strong>Claimant ID:</strong> {claim.claimantId}</p>
      <p><strong>Created:</strong> {claim.createdAt.toLocaleDateString()}</p>
      <p><strong>Notes:</strong> {claim.notes ?? "No notes provided"}</p>
      
      {children && (
        <div style={{ marginTop: "0.5rem", fontStyle: "italic", color: "#555" }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default ClaimBadge;