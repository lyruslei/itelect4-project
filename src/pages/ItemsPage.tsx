import React, { useRef } from "react";
import { Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemCard from "../components/ItemCard";
import type { ApiItem, NewItem } from "../types/index";
import { itemSchema, type ItemFormValues } from "../schemas/itemSchema";
import { useToggle } from "../hooks/useToggle";
import { usePrevious } from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchItems, createItem } from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ItemsPage() {
  const queryClient = useQueryClient();
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isCompactView, toggleCompactView] = useToggle(false);
  const previousSearchTerm = usePrevious<string>(searchTerm);

  // React Hook Form + Zod schema validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      location: "",
      description: "",
      status: "lost",
    },
  });

  // TanStack Query for items list
  const {
    data: items = [],
    isPending,
    isError,
    error,
  } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // TanStack Mutation for adding a new item
  const addItemMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      reset();
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleFocusClick = (): void => {
    searchInputRef.current?.focus();
  };

  const onSubmit = (values: ItemFormValues): void => {
    const newItem: NewItem = {
      title: values.title.trim(),
      description: values.description.trim(),
      location: values.location.trim(),
      status: values.status,
      reportedById: 1,
      reportedAt: new Date().toISOString(),
    };

    addItemMutation.mutate(newItem);
  };

  if (isPending) {
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
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const filteredItems: ApiItem[] = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Button
            onClick={toggleCompactView}
            variant="outline"
            className="cursor-pointer"
          >
            {isCompactView ? "Normal Cards" : "Compact Cards"}
          </Button>
        </div>
      </div>

      {/* Report New Item Form (React Hook Form + Zod + Shadcn UI) */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
          Report New Campus Item
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="item-title" className="mb-1 block text-foreground">
                Title
              </Label>
              <Input
                id="item-title"
                type="text"
                placeholder="e.g. Blue Umbrella"
                aria-invalid={errors.title ? true : undefined}
                {...register("title")}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="item-location" className="mb-1 block text-foreground">
                Location
              </Label>
              <Input
                id="item-location"
                type="text"
                placeholder="e.g. Student Center Cafeteria"
                aria-invalid={errors.location ? true : undefined}
                {...register("location")}
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="item-description" className="mb-1 block text-foreground">
              Description
            </Label>
            <Input
              id="item-description"
              type="text"
              placeholder="e.g. Automatic umbrella with wooden handle"
              aria-invalid={errors.description ? true : undefined}
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="item-status" className="text-foreground">
                Status:
              </Label>
              <select
                id="item-status"
                {...register("status")}
                aria-invalid={errors.status ? true : undefined}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              {errors.status && (
                <p className="text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={addItemMutation.isPending}
              className="cursor-pointer"
            >
              {addItemMutation.isPending ? "Submitting..." : "Report Item"}
            </Button>
          </div>
          {addItemMutation.isError && (
            <p className="text-xs text-red-600 dark:text-red-400">
              Error submitting item: {addItemMutation.error.message}
            </p>
          )}
        </form>
      </section>

      {/* Search Input Section */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800">
        <Label htmlFor="search-input" className="mb-2 block text-foreground font-bold">
          Search Items
        </Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="search-input"
            ref={searchInputRef}
            type="text"
            placeholder="Search by title, description, or location..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1"
          />
          <Button
            onClick={handleFocusClick}
            className="cursor-pointer"
          >
            Focus Search
          </Button>
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
