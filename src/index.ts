// At the TOP of src/index.ts
import { createClaim } from "../types/index";  // ✅ Regular import for functions
import type { 
  User, Item, Claim, 
  StringOrNumber, 
  ApiResponse, 
  ItemUpdate, UserPreview, PublicItem, RoleCount, NewClaim
} from "../types/index";  // ✅ Type import for types only
import { ClaimStatus, UserRole } from "../types/index";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const projectName: string = "Campus Lost & Found Tracker";
const currentYear: number = 2026;
const isFullStack: boolean = true;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- AY ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}
logMessage(greet(projectName, currentYear));

// ===== SPECIAL TYPES =====
let anything: any = "hello"; // [!] Avoid in production
let userInput: unknown = "test";
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); 
}

function throwError(message: string): never {
  throw new Error(message);
}

// ===== USING INTERFACES =====
const adminUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "admin",
  isActive: true,
};

const lostItem: Item = {
  id: 101,
  title: "Black Backpack",
  description: "Left in the library, contains a laptop.",
  location: "Main Library, 2nd Floor",
  status: "lost",
  reportedById: 2,
  reportedAt: new Date(),
};

const newClaim: Claim = {
  id: 1,
  itemId: 101,
  claimantId: 2,
  status: ClaimStatus.Pending,
  createdAt: new Date(),
  notes: "I left it there yesterday.",
};

// ===== TYPE NARROWING =====
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase(); 
  }
  return input.toFixed(2); 
}

function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString(); 
  }
  return value; 
}

// ===== GENERICS =====
// Generic function: T is inferred automatically
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

// Constrained generic: T must have an "id: number" field
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const itemsList: Item[] = [lostItem];
const firstItem = getFirst<Item>(itemsList);
const foundItem = getById<Item>(itemsList, 101);

console.log("First Item:", firstItem?.title);
console.log("Found Item:", foundItem?.location);

// Generic Interface Usage
const userResponse: ApiResponse<User> = {
  success: true,
  data: adminUser,
  message: "User fetched successfully",
};

const itemsResponse: ApiResponse<Item[]> = {
  success: true,
  data: [lostItem],
};

// ===== USING UTILITY TYPES =====
// 1. Partial<T>
const patchItem: ItemUpdate = { status: "found", location: "Security Office" };

// 2. Pick<T, K>
const previewUser: UserPreview = { id: 1, name: "Juan dela Cruz", role: "admin" };

// 3. Omit<T, K>
const publicItem: PublicItem = {
  id: 101,
  title: "Black Backpack",
  description: "Left in the library.",
  location: "Main Library, 2nd Floor",
  status: "lost",
  reportedAt: new Date(),
};

// 4. Record<K, T>
const roleCount: RoleCount = { student: 45, admin: 2 };

// 5. ReturnType<T>
const generatedClaim: NewClaim = createClaim(101, 2, "Found my backpack!");
console.log("Generated Claim ID:", generatedClaim.id);

// ===== USING ENUMS =====
// Regular Enum (Reverse Mapping)
let currentStatus: ClaimStatus = ClaimStatus.Pending;
console