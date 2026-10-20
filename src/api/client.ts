import type { ApiItem, NewItem, ApiClaim, AuthReply, ApiUser, ApiItemAdvice } from "../types/index";
import useAuthStore from "../store/authStore";

/*
 * SESSIONS 7-8:
 * NOTE: The old implementation called json-server at http://localhost:3001 with duplicated
 * fetch handling across all functions:
 *
 * export const API_URL = "http://localhost:3001";
 * export async function fetchItems(): Promise<ApiItem[]> { ... }
 * export async function fetchItemById(id: string): Promise<ApiItem> { ... }
 * export async function createItem(newItem: NewItem): Promise<ApiItem> { ... }
 * export async function fetchClaims(): Promise<ApiClaim[]> { ... }
 * export async function createClaim(newClaim: NewClaimApi): Promise<ApiClaim> { ... }
 */

export const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error("VITE_API_URL is missing. Copy .env.example to .env, fill it in, and restart npm run dev.");
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token; // getState(), not the hook: this isn't a component
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // exactly "Bearer " + token
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`); // surface the API's own sentence
  }
  return res.json();
}

// ===== PUBLIC REFERENCE RESOURCE (CLAIMS) =====
export async function fetchClaims(): Promise<ApiClaim[]> {
  return request<ApiClaim[]>("/api/claims");
}

export async function fetchClaimById(id: string): Promise<ApiClaim> {
  return request<ApiClaim>(`/api/claims/${id}`);
}

// ===== PRIVATE USER-OWNED RESOURCE (ITEMS) =====
export async function fetchItems(): Promise<ApiItem[]> {
  return request<ApiItem[]>("/api/items");
}

export async function fetchItemById(id: string): Promise<ApiItem> {
  return request<ApiItem>(`/api/items/${id}`);
}

export async function createItem(newItem: NewItem): Promise<ApiItem> {
  return request<ApiItem>("/api/items", {
    method: "POST",
    body: JSON.stringify(newItem),
  });
}

// ===== AUTHENTICATION =====
export async function registerUser(credentials: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiUser> {
  return request<ApiUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// ===== SESSION 11: AI REPORT HELPER (PRIVATE) =====
// The token goes on automatically through request(). No Gemini key or
// address here: the browser only ever talks to our own API.
export async function askAi(prompt: string): Promise<ApiItemAdvice> {
  return request<ApiItemAdvice>("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}
