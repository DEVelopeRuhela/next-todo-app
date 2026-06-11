"use client";

import type { Todo, TodoId } from "../../todo/types";
import { TodoItem } from "./TodoItem";

export function TodoMatrix({
  todos,
  isLoading,
  onToggle,
  onDelete,
}: {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: TodoId) => void;
  onDelete: (id: TodoId) => void;
}) {
  if (isLoading) {
    return <div className="text-sm text-zinc-500 text-center py-8">Loading…</div>;
  }

  if (todos.length === 0) {
    return <div className="text-sm text-zinc-500 text-center py-8">No todos yet.</div>;
  }

  const highPriority = todos.filter((t) => t.priority === "High");
  const mediumPriority = todos.filter((t) => t.priority === "Medium");
  const lowPriority = todos.filter((t) => t.priority === "Low" || !t.priority);

  const Column = ({ title, items, colorClass }: { title: string, items: Todo[], colorClass: string }) => (
    <div className="flex flex-col gap-3 bg-zinc-50/50 p-4 rounded-xl border border-zinc-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-semibold ${colorClass}`}>{title}</h3>
        <span className="text-xs font-medium px-2 py-1 bg-white border rounded-full text-zinc-500">
          {items.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="text-sm text-zinc-400 italic text-center py-4">Empty</div>
        ) : (
          items.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={() => onToggle(t.id)}
              onDelete={() => onDelete(t.id)}
              showCompleted = {false}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
      <Column title="High Priority" items={highPriority} colorClass="text-red-600" />
      <Column title="Medium Priority" items={mediumPriority} colorClass="text-yellow-600" />
      <Column title="Low Priority" items={lowPriority} colorClass="text-green-600" />
    </div>
  );
}
