"use client";

import { useMemo, useState } from "react";
import type { TodoFilter } from "../../todo/types";
import { applyFilter } from "../../todo/todoQueries";
import { useAddTodo, useClearCompleted, useDeleteTodo, useTodos, useToggleTodo } from "../../todo/todoQueries";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { TodoFooter } from "./TodoFooter";
import { TodoSearch} from "./TodoSearch"
import { ListCheck } from "lucide-react";


import { TodoMatrix } from "./TodoMatrix";
import { LayoutGrid, List } from "lucide-react";

export default function TodoApp() {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "matrix">("list");
  const { data: todos = [], isLoading } = useTodos();

  const addTodo = useAddTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();
  const clearCompleted = useClearCompleted();

  const filteredTodos = useMemo(() => applyFilter(todos, filter, search), [todos, filter, search]);

  return (
    <div className={`w-full transition-all duration-300 ${viewMode === "matrix" ? "max-w-4xl" : "max-w-xl"}`}>
      <div className="rounded-xl border bg-white/80 p-4 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-zinc-100 gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              Todo
            </h1>
            <ListCheck className="w-6 h-6 text-gray-800" />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <TodoSearch 
              search={search} 
              setSearch={setSearch} 
            />
            <div className="flex items-center bg-zinc-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "list" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("matrix")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "matrix" ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                }`}
                aria-label="Matrix View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className={viewMode === "matrix" ? "max-w-xl mx-auto" : ""}>
          <TodoInput
            onAdd={async (text: string, priority: string, targetDate:string, targetTime:string) => {
              await addTodo.mutateAsync({text, priority, targetDate, targetTime});
            }}
            disabled={addTodo.isPending}
          />
        </div>

        <div className="mt-4">
          {viewMode === "list" ? (
            <TodoList
              search={search}
              todos={filteredTodos}
              isLoading={isLoading}
              onToggle={(id: string) => toggleTodo.mutate(id)}
              onDelete={(id: string) => deleteTodo.mutate(id)}
            />
          ) : (
            <TodoMatrix
              todos={filteredTodos}
              isLoading={isLoading}
              onToggle={(id: string) => toggleTodo.mutate(id)}
              onDelete={(id: string) => deleteTodo.mutate(id)}
            />
          )}
        </div>

        <TodoFooter
          filter={filter}
          setFilter={setFilter}
          totalCount={todos.length}
          completedCount={todos.filter((t) => t.completed).length}
          onClearCompleted={() => clearCompleted.mutate()}
          clearCompletedDisabled={clearCompleted.isPending || todos.every((t) => !t.completed)}
        />
      </div>
    </div>
  );
}

