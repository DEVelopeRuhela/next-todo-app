"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo, TodoFilter, TodoId } from "./types";
import { addTodo, clearCompleted, deleteTodo, listTodos, toggleTodo } from "./todoApi";

export const todoQueryKeys = {
  all: () => ["todos"] as const,
  filtered: (filter: TodoFilter) => ["todos", "filter", filter] as const,
};

export function useTodos() {
  return useQuery({
    queryKey: todoQueryKeys.all(),
    queryFn: listTodos,
    staleTime: 0,
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (text: string) => addTodo(text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all() });
    },
  });
}

export function useToggleTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TodoId) => toggleTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all() });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: TodoId) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all() });
    },
  });
}

export function useClearCompleted() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => clearCompleted(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoQueryKeys.all() });
    },
  });
}

export function applyFilter( todos: Todo[], filter: TodoFilter, search:String): Todo[] {
    const trimmedSearch = search.trim();
    const newTodo : Todo[] =  (trimmedSearch === '') ? todos : todos.filter((t) => (t.text.includes(trimmedSearch)))
  switch (filter) {
    case "active":
      return newTodo.filter((t) => !t.completed);
    case "completed":
      return newTodo.filter((t) => t.completed);
    case "all":
    default:
      return newTodo;
  }
}

