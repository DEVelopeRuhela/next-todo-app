import type {  Todo } from "./types";


const STORAGE_KEY = "todoapp.todos.v1";

export function loadTodosFromStorage(): Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Todo[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t.id === "string" && typeof t.text === "string")
      .map((t) => ({
        id: t.id,
        text: t.text,
        completed: Boolean(t.completed),
        createdAt: typeof t.createdAt === "number" ? t.createdAt : Date.now(),
        completedAt: typeof t.completedAt === "number" ? t.completedAt : undefined,
        priority: t.priority,
      }));
  } catch {
    return [];
  }
}


export function saveTodosToStorage(todos: Todo[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

