import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { ApiItem } from "../types/index";
import { fetchItemById } from "../api/client";

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: item,
    isPending,
    isError,
    error,
  } = useQuery<ApiItem>({
    queryKey: ["items", id],
    queryFn: () => fetchItemById(id!),
    enabled: id !== undefined,
  });

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    navigate("/");
  };

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md animate-pulse space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="pt-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading item details...
          </div>
        </div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-6 text-center shadow-sm dark:border-amber-900/60 dark:bg-amber-950/40">
        <h2 className="text-xl font-bold text-amber-800 dark:text-amber-300">
          Item Not Found
        </h2>
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-400">
          {error?.message ?? `No campus item exists with ID ${id}.`}
        </p>
        <button
          onClick={handleBackClick}
          className="mt-5 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700 cursor-pointer dark:bg-amber-700 dark:hover:bg-amber-600"
        >
          &larr; Back to Items
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
          &larr; Back to Items
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Item ID: <strong className="font-mono text-gray-700 dark:text-gray-300">{item.id}</strong>
        </span>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {item.title}
          </h2>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
              item.status === "lost"
                ? "bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300"
                : item.status === "found"
                ? "bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300"
            }`}
          >
            {item.status}
          </span>
        </div>

        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong className="font-bold text-gray-900 dark:text-white">Description:</strong>{" "}
            {item.description}
          </p>
          <p>
            <strong className="font-bold text-gray-900 dark:text-white">Location:</strong>{" "}
            {item.location}
          </p>
          <p>
            <strong className="font-bold text-gray-900 dark:text-white">Reported By User ID:</strong>{" "}
            {item.reportedById}
          </p>
          <p>
            <strong className="font-bold text-gray-900 dark:text-white">Reported Date:</strong>{" "}
            {new Date(item.reportedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
