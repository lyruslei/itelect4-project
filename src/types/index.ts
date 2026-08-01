// ===== ENUMS =====
export enum ClaimStatus {
  Pending,
  Approved,
  Rejected,
}

export const enum UserRole {
  Student = "student",
  Admin = "admin",
}

// ===== INTERFACES =====
export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin";
  isActive: boolean;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  location: string;
  status: "lost" | "found" | "claimed";
  reportedById: number;
  reportedAt: Date;
}

export interface Claim {
  id: number;
  itemId: number;
  claimantId: number;
  status: ClaimStatus;
  createdAt: Date;
  notes?: string;
}

// ===== TYPE ALIASES & GENERICS =====
export type StringOrNumber = string | number;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
export type ItemUpdate = Partial<Item>;
export type UserPreview = Pick<User, "id" | "name" | "role">;
export type PublicItem = Omit<Item, "reportedById">;
export type RoleCount = Record<"student" | "admin", number>;

// Helper function for ReturnType demonstration
export function createClaim(itemId: number, claimantId: number, notes?: string) {
  return {
    id: Date.now(),
    itemId,
    claimantId,
    status: ClaimStatus.Pending,
    createdAt: new Date(),
    notes,
  };
}

export type NewClaim = ReturnType<typeof createClaim>;