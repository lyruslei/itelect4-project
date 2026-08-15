import React from "react";
import { NavLink, Outlet } from "react-router";
import { useToggle } from "../hooks/useToggle";
import useAuthStore from "../store/authStore";

function Layout() {
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const token = useAuthStore((state) => state.token);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header & Navigation */}
          <header className="flex flex-col gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Campus Lost & Found Tracker
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ITELECT4 — Client-Side Routing & Navigation
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <nav className="flex items-center gap-2">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                        : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  Items
                </NavLink>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                        : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  Users
                </NavLink>
                <NavLink
                  to="/claims"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                        : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  Claims
                </NavLink>

                {token ? (
                  <button
                    onClick={logout}
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer"
                  >
                    Logout ({userName})
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                          : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                )}
              </nav>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleDarkMode}
                className="ml-2 rounded-lg bg-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
          </header>

          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
