import React from "react";
import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  // Typed event handler
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onSelect(user);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{user.name}</h3>
      <p className="mb-1 text-gray-600 dark:text-gray-300">
        <strong className="font-semibold text-gray-800 dark:text-gray-200">Email:</strong> {user.email}
      </p>
      <p className="mb-1 text-gray-600 dark:text-gray-300">
        <strong className="font-semibold text-gray-800 dark:text-gray-200">Role:</strong> {user.role}
      </p>
      <p className="mb-1 text-gray-600 dark:text-gray-300">
        <strong className="font-semibold text-gray-800 dark:text-gray-200">Status:</strong>{" "}
        <span className={user.isActive ? "text-green-600 dark:text-green-400 font-medium" : "text-red-600 dark:text-red-400 font-medium"}>
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </p>
      <button
        onClick={handleClick}
        className="mt-3 rounded bg-blue-600 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer"
      >
        Select User
      </button>
    </div>
  );
}

export default UserCard;