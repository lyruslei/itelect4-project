import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import ItemCard from "../components/ItemCard";
import type { Item } from "../types/index";
import { useToggle } from "../hooks/useToggle";
import { usePrevious } from "../hooks/usePrevious";
import { mockItemsData } from "../data/mockData";

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isCompactView, toggleCompactView] = useToggle(false);
  const previousSearchTerm = usePrevious<string>(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(mockItemsData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !isError) {
      searchInputRef.current?.focus();
    }
  }, [isLoading, isError]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleFocusClick = (): void => {
    searchInputRef.current?.focus();
  };

  const filteredItems: Item[] = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md animate-pulse space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
          <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="pt-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading Campus Lost & Found data...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reported Items
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Browse and search all lost and found items reported on campus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleCompactView}
            className="rounded-lg bg-gray-200 px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          >
            {isCompactView ? "Normal Cards" : "Compact Cards"}
          </button>

          <button
            onClick={() => setIsError(true)}
            className="rounded-lg bg-red-100 px-3.5 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-200 dark:bg-red-950/60 dark:text-red-300 dark:hover:bg-red-900/60 cursor-pointer"
          >
            Simulate Error
          </button>
        </div>
      </div>

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

      {/* Responsive Grid Layout for Item Cards */}
      <section>
        <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Items List ({filteredItems.length})
        </h3>
        {filteredItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
            No items found matching "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
                <ItemCard item={item} variant={isCompactView ? "compact" : "default"} />
                <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-700/50 flex justify-end">
                  <Link
                    to={`/items/${item.id}`}
                    className="inline-flex items-center gap-1 rounded bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/60"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ItemsPage;
