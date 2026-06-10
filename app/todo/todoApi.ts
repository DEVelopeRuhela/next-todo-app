"use client";

import type { Todo, TodoId } from "./types";
import { loadTodosFromStorage, saveTodosToStorage } from "./storage";

function createId(): TodoId {
  // Reasonably unique for local client usage.
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function listTodos(): Promise<Todo[]> {
  const todos : Todo[] = loadTodosFromStorage();
  console.log(todos);
  return todos;
}

export async function addTodo(text: string, priority: string): Promise<Todo> {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Todo text is empty");

  const todos = loadTodosFromStorage();
  const todo: Todo = {
    id: createId(),
    text: trimmed,
    completed: false,
    createdAt: Date.now(),
    priority: priority,
  };
  const next = [todo, ...todos];
  saveTodosToStorage(next);
  return todo;
}

export async function toggleTodo(id: TodoId): Promise<Todo> {
  const todos = loadTodosFromStorage();
  const idx = todos.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Todo not found");

  const isCompleted = !todos[idx].completed;
  const updated: Todo = { 
    ...todos[idx], 
    completed: isCompleted,
    completedAt: isCompleted ? Date.now() : undefined
  };
  const next = [...todos];
  next[idx] = updated;
  saveTodosToStorage(next);
  return updated;
}

export async function deleteTodo(id: TodoId): Promise<void> {
  const ans = confirm("are you sure you want to delete ?")
  if(!ans) return;
  const todos = loadTodosFromStorage();
  const next = todos.filter((t) => t.id !== id);
  saveTodosToStorage(next);
}

export async function clearCompleted(): Promise<number> {
  const todos = loadTodosFromStorage();
  const before = todos.length;
  const next = todos.filter((t) => !t.completed);
  saveTodosToStorage(next);
  return before - next.length;
}




