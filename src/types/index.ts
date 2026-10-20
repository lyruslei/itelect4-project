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

// ===== WIRE / API TYPES =====
/*
 * SESSIONS 7-8: Old wire types for json-server mock API.
 * export type ApiItem = Omit<Item, "id" | "reportedAt"> & {
 *   id: string;
 *   reportedAt: string;
 * };
 * export type NewItem = Omit<ApiItem, "id">;
 * export type NewClaimApi = Omit<ApiClaim, "id">;
 */

export type ApiItem = Omit<Item, "id" | "reportedById" | "reportedAt"> & {
  id: string;           // 24 hex chars from MongoDB _id
  reportedById: string; // owner's _id
  reportedAt: string;   // ISO string, never a Date
};

// What we SEND: no id, NO reportedById, NO reportedAt. The server takes the owner from the token and defaults the date.
export type NewItem = Pick<Item, "title" | "description" | "location" | "status">;

export type ApiClaim = Omit<Claim, "id" | "createdAt"> & {
  id: string;           // 24 hex chars from MongoDB _id
  createdAt: string;    // ISO string, never a Date
};

export type ApiUser = Omit<User, "id"> & { id: string };

export interface AuthReply {
  token: string;
  user: ApiUser;
}

// ===== SESSION 11: what POST /api/ai sends back =====
// Copied by hand from itelect4-backend's itemAdviceSchema in
// src/schemas/itemAdvice.ts. Nothing checks that they agree -- we do.
export interface ApiItemAdvice {
  suggestedTitle: string;
  summary: string;
  category: "electronics" | "id-card" | "clothing" | "bag" | "keys" | "other";
  missingDetails: string[];
  quality: "complete" | "needs-detail" | "too-vague";
}
