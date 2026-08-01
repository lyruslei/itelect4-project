import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
  variant?: "default" | "compact";
}

function ItemCard({ item, variant = "default" }: ItemCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <h3 className={`font-bold text-gray-900 dark:text-white ${isCompact ? "text-sm" : "text-lg mb-2"}`}>
        {item.title}{" "}
        <span
          className={`text-xs font-semibold uppercase ${
            item.status === "lost"
              ? "text-red-600 dark:text-red-400"
              : item.status === "found"
              ? "text-green-600 dark:text-green-400"
              : "text-blue-600 dark:text-blue-400"
          }`}
        >
          ({item.status})
        </span>
      </h3>
      {!isCompact && (
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
          {item.description}
        </p>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        <strong className="font-semibold text-gray-700 dark:text-gray-300">Location:</strong> {item.location}
      </p>
      {!isCompact && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <strong className="font-semibold text-gray-700 dark:text-gray-300">Reported:</strong>{" "}
          {item.reportedAt.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export default ItemCard;