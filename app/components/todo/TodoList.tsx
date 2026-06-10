"use client";

import type { Todo, TodoId } from "../../todo/types";
import { TodoItem } from "./TodoItem";



export function TodoList({
  search,
  todos,
  isLoading,
  onToggle,
  onDelete,
}: {
  search : string
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: TodoId) => void;
  onDelete: (id: TodoId) => void;
}) {
  if (isLoading) {
    return <div className="text-sm text-zinc-500">Loading…</div>;
  }

  if (todos.length === 0) {
    return <div className="text-sm text-zinc-500">No todos yet.</div>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
        />
      ))}
      <div>{search}</div>
    </ul>
    
  );
}

