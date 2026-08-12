import React, { useState } from "react";
import UserCard from "../components/UserCard";
import type { User } from "../types/index";
import { mockUserData } from "../data/mockData";

function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(mockUserData);

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
    alert(`You selected: ${user.name} (${user.role})`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Active User Profile
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage and view campus user profiles for Lost & Found verification.
        </p>
      </div>

      {selectedUser && (
        <section className="max-w-md">
          <UserCard user={selectedUser} onSelect={handleUserSelect} />
        </section>
      )}
    </div>
  );
}

export default UsersPage;
