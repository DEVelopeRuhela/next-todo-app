"use client";

import { useMemo, useState, useEffect } from "react";
import type { TodoFilter } from "../../todo/types";
import { applyFilter, useIsDelayed, useToggleSubtask, useUpdateTimeline } from "../../todo/todoQueries";
import { useAddTodo, useClearCompleted, useDeleteTodo, useTodos, useToggleTodo } from "../../todo/todoQueries";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import { TodoFooter } from "./TodoFooter";
import { TodoSearch} from "./TodoSearch"
import { ListCheck, Plus } from "lucide-react";


import { TodoMatrix } from "./TodoMatrix";
import { LayoutGrid, List ,X , CheckCircle2, AlertCircle, Calendar, Clock } from "lucide-react";

export default function TodoApp() {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "matrix">("list");
  const [showTodo, setShowTodo] = useState<string>("")
  const [timeline, setTimeline] = useState<string>("")
  const { data: todos = [], isLoading } = useTodos();

  const addTodo = useAddTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();
  const clearCompleted = useClearCompleted();
  const checkDelay = useIsDelayed();
  const updateTimeline = useUpdateTimeline();
  const toggleSubtask = useToggleSubtask();
  const currTodo = todos.find((todo) => todo.id === showTodo)
  useEffect(() => {
    checkDelay.mutate();
    const interval = setInterval(() => {
      checkDelay.mutate();
    }, 15000); 
    return () => clearInterval(interval);
  }, []); 
  const filteredTodos = useMemo(() => applyFilter(todos, filter, search), [todos, filter, search]);

  return (
    <div className="flex flex-row gap-2 m-4">
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
            checkDelay={async () => { await checkDelay.mutateAsync(); }}
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
              showTodo = {showTodo}
              setShowTodo = {setShowTodo}
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
    {showTodo !== "" && currTodo && (
      <div className="w-full md:w-[450px] flex-shrink-0 transition-all duration-300">
        <div className="rounded-xl border bg-white p-6 shadow-lg sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto flex flex-col">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 flex-shrink-0">
            <h2 className="text-xl font-semibold text-zinc-800">Subtasks</h2>
            <button 
              onClick={() => setShowTodo("")} 
              className="p-2 hover:bg-zinc-100 rounded-full text-zinc-500 transition-colors"
              aria-label="Close timeline"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-6 flex-shrink-0">
            <h3 className="text-2xl font-bold text-zinc-900 leading-tight mb-4">{currTodo.text}</h3>
            <div className="flex flex-col gap-2">
              {currTodo.completed && currTodo.completedAt && (
                <span className="flex items-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 w-fit px-3 py-1.5 rounded-full border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed: {new Date(currTodo.completedAt).toLocaleDateString()}
                  {currTodo.isDelayed && <span className="text-red-600 ml-1 font-semibold">(Late)</span>}
                </span>
              )}

              {!currTodo.completed && currTodo.targetDate && (
                <span className={`flex items-center gap-2 text-sm font-medium w-fit px-3 py-1.5 rounded-full border ${
                  currTodo.isDelayed 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {currTodo.isDelayed ? <AlertCircle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                  {currTodo.isDelayed ? "Delayed" : "Due"}: {new Date(currTodo.targetDate).toLocaleDateString()}
                  {currTodo.targetTime && (
                    <>
                      <Clock className="w-4 h-4 ml-1 opacity-70" />
                      {currTodo.targetTime}
                    </>
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 min-h-0">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Subtasks & Events</h4>
            
            <div className="flex-1 overflow-y-auto pr-2 pb-4">
              {currTodo.timeline && currTodo.timeline.length > 0 ? (
                <ul className="relative border-l-2 border-zinc-200 ml-2.5 pl-6 space-y-4 py-2">
                  {currTodo.timeline.map((t) => (
                    <li key={t.time} className="relative flex items-center gap-3 group">
                      
                      <div className="absolute -left-[33px] bg-white py-2">
                        <button
                          type="button"
                          onClick={async () => await toggleSubtask.mutateAsync({id: currTodo.id, subtaskIndex: t.time})}
                          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-full"
                        >
                          <span
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                              t.isCompleted
                                ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                                : "border-zinc-300 text-transparent hover:border-emerald-400 bg-white"
                            }`}
                          >
                            ✓
                          </span>
                        </button>
                      </div>
                      
                      {/* Content Card */}
                      <div className="flex-1 bg-white border border-zinc-100 rounded-xl p-3.5 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:border-zinc-200">
                        <span className={`text-sm block transition-colors duration-300 ${
                          t.isCompleted ? 'text-zinc-400 line-through' : 'text-zinc-800 font-medium'
                        }`}>
                          {t.subtask}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-24 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
                  <p className="text-sm text-zinc-400 italic">No timeline events yet.</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-row items-center gap-3 mt-4 bg-zinc-50 p-2 rounded-xl border border-zinc-200 focus-within:ring-2 focus-within:ring-zinc-300 transition-all flex-shrink-0">
              <input  
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="Add a new subtask..."
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-zinc-800 placeholder-zinc-500"
                onKeyDown={async (e) => {
                  if (e.key === 'Enter' && timeline.trim() && !updateTimeline.isPending) {
                    await updateTimeline.mutateAsync({id: showTodo, timeline});
                    setTimeline("");
                  }
                }}
              />
              <button
                disabled={!timeline.trim() || updateTimeline.isPending}
                onClick={async () => {
                  if(timeline.trim()) {
                    await updateTimeline.mutateAsync({id: showTodo, timeline});
                    setTimeline("");
                  }
                }}
                className="flex-shrink-0 p-2.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

