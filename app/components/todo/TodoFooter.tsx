"use client";

import type { TodoFilter } from "../../todo/types";

export function TodoFooter({
  filter,
  setFilter,
  totalCount,
  completedCount,
  onClearCompleted,
  clearCompletedDisabled,
}: {
  filter: TodoFilter;
  setFilter: (f: TodoFilter) => void;
  totalCount: number;
  completedCount: number;
  onClearCompleted: () => void;
  clearCompletedDisabled: boolean;
}) {
  const activeCount = totalCount - completedCount;

  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-zinc-700 border pl-1 pr-1 rounded-lg">
          {totalCount === 0
            ? ""
            : `${activeCount} active · ${completedCount} completed`}
        </div>

        <div className="flex gap-1">
          {([
            ["all", "All"],
            ["active", "Active"],
            ["completed", "Completed"],
          ] as const).map(([key, label]) => {
            const selected = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={
                  "rounded-md px-2 py-1 text-xs " +
                  (selected
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200")
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClearCompleted}
          disabled={clearCompletedDisabled}
          className="text-xs font-medium text-zinc-700 hover:underline disabled:opacity-50"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

