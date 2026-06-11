"use client";

import type { Todo, TodoId } from "../../todo/types";
import { TodoItem } from "./TodoItem";
import {useState} from 'react'


export function TodoList({
  search,
  todos,
  isLoading,
  onToggle,
  onDelete,
  showTodo,
  setShowTodo
}: {
  search : string
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: TodoId) => void;
  onDelete: (id: TodoId) => void;
  showTodo : string
  setShowTodo : (value: string) => void;
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
          showCompleted = {true}
          showTarget = {true}
          showTodo = {showTodo}
          setShowTodo = {setShowTodo}
        />
      ))}
    
    </ul>
    
  );
}

