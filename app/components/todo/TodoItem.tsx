"use client";

import type { Todo } from "../../todo/types";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
export function TodoItem({
  todo,
  onToggle,
  onDelete,
  showCompleted
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  showCompleted: boolean;
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
            "inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border  " +
            (todo.completed
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-zinc-300 hover:bg-gray-100 text-transparent")
          }
        >
          ✓
        </span>
        <div className="flex flex-col">
          <span
            className={
              "text-md " +
              (todo.completed ? "text-zinc-500 line-through" : "text-zinc-900")
            }
          >
            {todo.text}
          </span>
          {todo.completed && todo.completedAt && showCompleted && (
            <span className="text-xs text-green-900 mt-0.5 italic font-light">
              Completed at: {new Date(todo.completedAt).toLocaleString()}
            </span>
          )}
        </div>
      </button>
      <div className="flex flex-row align-center justify-center ">
        {showCompleted && (
        <div className={`text-xs font-light border rounded-lg px-2 py-0.5 mr-2 self-center ${
          todo.priority === "High" ? "bg-red-100 text-red-600 border-red-200" :
          todo.priority === "Medium" ? "bg-yellow-100 text-yellow-600 border-yellow-200" :
          "bg-green-100 text-green-600 border-green-200"
        }`}>
          {todo.priority}
        </div>
        )}
        <button
        type="button"
        onClick={onDelete}
        className="rounded-full p-2 text-sm text-zinc-600 hover:bg-red-100 hover:text-red-900"

        aria-label="Delete todo"
      >
       <Trash2 className="h-4 w-4" />
      </button>
      </div>
      
    </li>
  );
}

