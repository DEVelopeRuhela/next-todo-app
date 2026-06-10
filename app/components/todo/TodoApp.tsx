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


export default function TodoApp() {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [search, setSearch] = useState<string>("");
  const { data: todos = [], isLoading } = useTodos();

  const addTodo = useAddTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();
  const clearCompleted = useClearCompleted();

  const filteredTodos = useMemo(() => applyFilter(todos, filter, search), [todos, filter, search]);

  return (
    <div className="w-full max-w-xl">
      <div className="rounded-xl border bg-white/80 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-6 pb-4">
            <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-800">
              Todo
            </h1>
            <ListCheck className="w-6 h-6 text-gray-800" />
          </div>
          <TodoSearch 
            search={search} 
            setSearch={setSearch} 
          />
          
        </div>
        

        <TodoInput
          onAdd={(text: string) => addTodo.mutate(text)}
          disabled={addTodo.isPending}
        />



        <div className="mt-4">
          <TodoList
            search = {search}
            todos={filteredTodos}
            isLoading={isLoading}
            onToggle={(id: string) => toggleTodo.mutate(id)}
            onDelete={(id: string) => deleteTodo.mutate(id)}
          />
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

