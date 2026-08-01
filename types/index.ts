// ===== ENUMS =====
// Regular enum: exists at runtime, supports reverse mapping (multi-step lifecycle)
export enum ClaimStatus {
  Pending,
  Approved,
  Rejected,
}

// Const enum: inlined at compile time, zero runtime overhead
export const enum UserRole {
  Student = "student",
  Admin = "admin", // Represents security admin
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
  status: ClaimStatus; // Multi-step status lifecycle powered by enum
  createdAt: Date;
  notes?: string;
}

// ===== TYPE ALIASES =====
export type ID = number | string;
export type StringOrNumber = string | number;

// ===== GENERIC INTERFACE =====
// ApiResponse<T> can wrap ANY data shape
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====
// 1. Partial<T> - ideal for update payloads (only changed fields needed)
export type ItemUpdate = Partial<Item>;

// 2. Pick<T, K> - lightweight preview object
export type UserPreview = Pick<User, "id" | "name" | "role">;

// 3. Omit<T, K> - safe to expose publicly (hides internal reporter ID)
export type PublicItem = Omit<Item, "reportedById">;

// 4. Record<K, T> - dashboard-style counts
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

// 5. ReturnType<T> - infer shape directly from function, no need to redeclare
export type NewClaim = ReturnType<typeof createClaim>;