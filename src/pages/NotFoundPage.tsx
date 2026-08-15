import React from "react";
import { useNavigate } from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <h2 className="text-6xl font-extrabold text-blue-600 dark:text-blue-500">404</h2>
        <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">Page Not Found</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The requested page does not exist or has been moved.
        </p>
        <button
          onClick={handleHomeClick}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
