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

export async function addTodo(text: string, priority: string, targetDate:string, targetTime: string): Promise<Todo> {
  const trimmed = text.trim();
  console.log(targetDate,targetTime)
  if (!trimmed) throw new Error("Todo text is empty");
  
  if((!targetDate) && (!targetTime)) throw new Error("Please mention target date and time");
  if((targetDate) && (!targetTime)) throw new Error("Target Time is required");
  if((!targetDate) && (targetTime)) throw new Error("Target Date is required");
  const todos = loadTodosFromStorage();
  const todo: Todo = {
    id: createId(),
    text: trimmed,
    completed: false,
    createdAt: Date.now(),
    priority: priority,
    targetDate: targetDate,
    targetTime: targetTime,
    isDelayed: false,
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


export async function updateIsDelayed(): Promise<boolean> {
  const todos = loadTodosFromStorage();
  const now = new Date();
  let count = 0;
  for(const t of todos) {
    if(!t.completed && t.targetDate && t.targetTime && !t.isDelayed) {
      const targetDateTime = new Date(t.targetDate + " " + t.targetTime);
      if(targetDateTime < now) {
        t.isDelayed = true;
        count++;
      }
    }
  }
  if (count > 0) {
    saveTodosToStorage(todos);
  }
  console.log(todos)
  return count > 0;
}



