import type { User, Item, Claim } from "../types/index";
import { ClaimStatus } from "../types/index";

export const mockUserData: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

export const mockItemsData: Item[] = [
  {
    id: 101,
    title: "Black Backpack",
    description: "Left in the library, contains a laptop and notebooks.",
    location: "Main Library, 2nd Floor",
    status: "lost",
    reportedById: 2,
    reportedAt: new Date("2026-07-28"),
  },
  {
    id: 102,
    title: "Silver Water Bottle",
    description: "Hydro Flask found near the basketball court.",
    location: "Gymnasium",
    status: "found",
    reportedById: 1,
    reportedAt: new Date("2026-07-30"),
  },
  {
    id: 103,
    title: "Wireless Earbuds",
    description: "White charging case with left earbud missing.",
    location: "Science Building Room 302",
    status: "claimed",
    reportedById: 3,
    reportedAt: new Date("2026-07-25"),
  },
];

export const mockClaimData: Claim = {
  id: 1,
  itemId: 101,
  claimantId: 1,
  status: ClaimStatus.Pending,
  createdAt: new Date("2026-07-29"),
  notes: "I left it there yesterday afternoon.",
};
