"use client";

import type { Todo } from "../../todo/types";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
export function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2">

      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-3 text-left"
        aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
      >
        <span
          className={
            "inline-flex h-5 w-5 items-center justify-center rounded border  " +
            (todo.completed
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-zinc-300 hover:bg-gray-100 text-transparent")
          }
        >
          ✓
        </span>
        <span
          className={
            "text-sm " +
            (todo.completed ? "text-zinc-500 line-through" : "text-zinc-900")

          }
        >
          {todo.text}
        </span>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="rounded-md px-2 py-1 text-sm text-zinc-600 hover:bg-red-100 hover:text-red-900"

        aria-label="Delete todo"
      >
       <Trash2 className="h-4 w-4" />
      </button>
    </li>
  );
}

