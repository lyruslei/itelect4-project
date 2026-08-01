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
    description: "Left in the library, contains a laptop.",
    location: "Main Library, 2nd Floor",
    status: "lost",
    reportedById: 2,
    reportedAt: new Date(),
  },
  {
    id: 102,
    title: "Silver Water Bottle",
    description: "Hydro Flask found near the basketball court.",
    location: "Gymnasium",
    status: "found",
    reportedById: 1,
    reportedAt: new Date(),
  },
  {
    id: 103,
    title: "Wireless Earbuds",
    description: "White charging case with left earbud missing.",
    location: "Science Building Room 302",
    status: "claimed",
    reportedById: 3,
    reportedAt: new Date(),
  },
];

const mockClaimData: Claim = {
  id: 1,
  itemId: 101,
  claimantId: 1,
  status: ClaimStatus.Pending,
  createdAt: new Date(),
  notes: "I left it there yesterday afternoon.",
};

function App() {
  // 1. useState<T> - typed state variables
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 3. useRef - typed DOM reference for search input
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 5. Custom hooks
  const [showDetails, toggleShowDetails] = useToggle(true);
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
    if (!isLoading) {
      searchInputRef.current?.focus();
    }
  }, [isLoading]);

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

  // 2. Render loading message while isLoading is true
  if (isLoading) {
    return (
      <div style={{ maxWidth: "600px", margin: "4rem auto", fontFamily: "sans-serif", textAlign: "center" }}>
        <h2>Loading Campus Lost & Found Data...</h2>
        <p>Please wait while we simulate fetching mock data.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Campus Lost & Found Tracker</h1>

      {/* Toggle Extra Details Button */}
      <div style={{ marginBottom: "1rem", textAlign: "right" }}>
        <button
          onClick={toggleShowDetails}
          style={{ padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "4px" }}
        >
          {showDetails ? "Hide Claim Details" : "Show Claim Details"}
        </button>
      </div>

      {/* Selected User Section */}
      {selectedUser && (
        <UserCard user={selectedUser} onSelect={handleUserSelect} />
      )}

      {/* Search Input Section with useRef and typed onChange */}
      <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "#f1f3f5", borderRadius: "8px" }}>
        <label htmlFor="search-input" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
          Search Items:
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            id="search-input"
            ref={searchInputRef}
            type="text"
            placeholder="Search items by title, description, or location..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button
            onClick={handleFocusClick}
            style={{ padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "4px" }}
          >
            Focus Search
          </button>
        </div>
        {previousSearchTerm !== undefined && (
          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#666" }}>
            Previous search term: <em>"{previousSearchTerm}"</em>
          </p>
        )}
      </div>

      {/* Filtered Items Section */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2>Reported Items ({filteredItems.length})</h2>
        {filteredItems.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#888" }}>No items found matching "{searchTerm}".</p>
        ) : (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))
        )}
      </div>

      {/* Claim Section toggled via custom useToggle hook */}
      {showDetails && claim && (
        <ClaimBadge claim={claim}>
          <p>⚠️ Admin action required: Verify ownership before approving.</p>
        </ClaimBadge>
      )}
    </div>
  );
}

export default App;