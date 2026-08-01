import React, { useState, useEffect, useRef } from "react";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, Item, Claim } from "./types/index";
import { ClaimStatus } from "./types/index";
import { useToggle } from "./hooks/useToggle";
import { usePrevious } from "./hooks/usePrevious";

// Mock data definitions based on src/types/index.ts
const mockUserData: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const mockItemsData: Item[] = [
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

const mockClaimData: Claim = {
  id: 1,
  itemId: 101,
  claimantId: 1,
  status: ClaimStatus.Pending,
  createdAt: new Date("2026-07-29"),
  notes: "I left it there yesterday afternoon.",
};

function App() {
  // 1. useState<T> - typed state variables
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 3. useRef - typed DOM reference for search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 5. Custom hooks
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const [showDetails, toggleShowDetails] = useToggle(true);
  const [isCompactView, toggleCompactView] = useToggle(false);
  const previousSearchTerm = usePrevious<string>(searchTerm);

  // 2. useEffect - simulated fetch on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockItemsData);
      setSelectedUser(mockUserData);
      setClaim(mockClaimData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Focus input automatically after loading completes
  useEffect(() => {
    if (!isLoading && !isError) {
      searchInputRef.current?.focus();
    }
  }, [isLoading, isError]);

  // 4. Typed onChange event handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
    console.log("Selected user for claim verification:", user.name);
    alert(`You selected: ${user.name} (${user.role})`);
  };

  const handleFocusClick = (): void => {
    searchInputRef.current?.focus();
  };

  // Derive filtered items dynamically based on search term
  const filteredItems: Item[] = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 6. Styled loading state (Early return)
  if (isLoading) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
          <div className="w-full max-w-md animate-pulse space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="pt-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              Loading Campus Lost & Found data...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. Styled error state (Early return)
  if (isError) {
    return (
      <div className={isDarkMode ? "dark" : ""}>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
          <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-sm dark:border-red-900 dark:bg-red-950/80">
            <h3 className="text-lg font-bold text-red-700 dark:text-red-300">Could not load items</h3>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">Please check your connection and try again.</p>
            <button
              onClick={() => setIsError(false)}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. App wrapper with isDarkMode class
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header & Controls */}
          <header className="flex flex-col gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Campus Lost & Found Tracker
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                GT2 Part 3 — Styled with Tailwind CSS v4
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="rounded-lg bg-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              {/* Compact Variant Toggle Button */}
              <button
                onClick={toggleCompactView}
                className="rounded-lg bg-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {isCompactView ? "Normal Cards" : "Compact Cards"}
              </button>

              {/* Details Toggle Button */}
              <button
                onClick={toggleShowDetails}
                className="rounded-lg bg-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {showDetails ? "Hide Claim" : "Show Claim"}
              </button>

              {/* Error Simulation Button */}
              <button
                onClick={() => setIsError(true)}
                className="rounded-lg bg-red-100 px-3.5 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-200 dark:bg-red-950/60 dark:text-red-300 dark:hover:bg-red-900/60 cursor-pointer"
              >
                Simulate Error
              </button>
            </div>
          </header>

          {/* Selected User Card */}
          {selectedUser && (
            <section>
              <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">Active User Profile</h2>
              <UserCard user={selectedUser} onSelect={handleUserSelect} />
            </section>
          )}

          {/* Search Input Section */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <label htmlFor="search-input" className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">
              Search Items
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="search-input"
                ref={searchInputRef}
                type="text"
                placeholder="Search by title, description, or location..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
              />
              <button
                onClick={handleFocusClick}
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer"
              >
                Focus Search
              </button>
            </div>
            {previousSearchTerm !== undefined && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Previous search term: <em className="font-semibold text-gray-700 dark:text-gray-300">"{previousSearchTerm}"</em>
              </p>
            )}
          </section>

          {/* 4. Responsive Grid Layout for Item Cards */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Reported Items ({filteredItems.length})
            </h2>
            {filteredItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                No items found matching "{searchTerm}".
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    variant={isCompactView ? "compact" : "default"}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Claim Badge Section */}
          {showDetails && claim && (
            <section className="pt-2">
              <h2 className="mb-3 text-lg font-bold text-gray-800 dark:text-gray-200">Current Claim Details</h2>
              <ClaimBadge claim={claim}>
                <p>⚠️ Admin action required: Verify claimant identity before approval.</p>
              </ClaimBadge>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;