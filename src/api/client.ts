import type { ApiItem, NewItem, ApiClaim, NewClaimApi } from "../types/index";

export const API_URL = "http://localhost:3001";

export async function fetchItems(): Promise<ApiItem[]> {
  const res = await fetch(`${API_URL}/items`);
  if (!res.ok) {
    throw new Error(`Failed to fetch items (Status ${res.status})`);
  }
  return res.json();
}

export async function fetchItemById(id: string): Promise<ApiItem> {
  const res = await fetch(`${API_URL}/items/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch item #${id} (Status ${res.status})`);
  }
  return res.json();
}

export async function createItem(newItem: NewItem): Promise<ApiItem> {
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  if (!res.ok) {
    throw new Error(`Failed to create item (Status ${res.status})`);
  }
  return res.json();
}

export async function fetchClaims(): Promise<ApiClaim[]> {
  const res = await fetch(`${API_URL}/claims`);
  if (!res.ok) {
    throw new Error(`Failed to fetch claims (Status ${res.status})`);
  }
  return res.json();
}

export async function createClaim(newClaim: NewClaimApi): Promise<ApiClaim> {
  const res = await fetch(`${API_URL}/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClaim),
  });
  if (!res.ok) {
    throw new Error(`Failed to create claim (Status ${res.status})`);
  }
  return res.json();
}
