import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, Item, Claim } from "./types/index";
import { ClaimStatus } from "./types/index";

// Mock data based on your GT1 interfaces
const mockUser: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const mockItem: Item = {
  id: 101,
  title: "Black Backpack",
  description: "Left in the library, contains a laptop.",
  location: "Main Library, 2nd Floor",
  status: "lost",
  reportedById: 2,
  reportedAt: new Date(),
};

const mockClaim: Claim = {
  id: 1,
  itemId: 101,
  claimantId: 1,
  status: ClaimStatus.Pending,
  createdAt: new Date(),
  notes: "I left it there yesterday afternoon.",
};

function App() {
  // Typed callback function
  const handleUserSelect = (selectedUser: User): void => {
    console.log("Selected user for claim verification:", selectedUser.name);
    alert(`You selected: ${selectedUser.name} (${selectedUser.role})`);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Campus Lost & Found Tracker</h1>
      
      <UserCard user={mockUser} onSelect={handleUserSelect} />
      <ItemCard item={mockItem} />
      
      <ClaimBadge claim={mockClaim}>
        <p>⚠️ Admin action required: Verify ownership before approving.</p>
      </ClaimBadge>
    </div>
  );
}

export default App;