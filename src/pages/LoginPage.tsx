import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
    navigate("/claims");
  };

  return (
    <div className="mx-auto max-w-md space-y-6 pt-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign In
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Enter your name to authenticate and access protected claims data.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username-input"
              className="mb-1 block text-sm font-bold text-gray-700 dark:text-gray-300"
            >
              Your Name
            </label>
            <input
              id="username-input"
              type="text"
              required
              placeholder="e.g. Juan dela Cruz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
