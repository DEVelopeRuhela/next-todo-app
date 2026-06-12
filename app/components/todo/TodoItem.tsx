"use client";

import toast from "react-hot-toast";
import type { Todo } from "../../todo/types";
import { CheckCircle2, Circle, Trash2, Calendar, Clock, AlertCircle, Plus, MoveRight } from "lucide-react";

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  showCompleted,
  showTarget,
  showTodo,
  setShowTodo
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  showCompleted: boolean;
  showTarget: boolean;
  showTodo: string;
  setShowTodo: (showTodo: string) => void;

}) {
  const subTasks = todo.timeline?.length || 0;
  const countOfSubtaskCompleted = todo.timeline?.filter((t) => t.isCompleted).length || 0;
  let percentageCompleted = (countOfSubtaskCompleted * 100) / subTasks;
  const allSubtaskCompleted = todo.timeline?.every((t) => t.isCompleted) || false;
  const isButtonDisabled = subTasks > 0
  const handleToggle = async () => {
    if (allSubtaskCompleted){
      toast.success("All Subtasks completed");
      return;
    }
    if (isButtonDisabled) {
      toast.error("Please complete the subtasks first");
      return;
    }
    onToggle();
  }
  return (
    <li className={`group flex items-start sm:items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all ${
      todo.isDelayed && !todo.completed
        ? 'bg-red-50/50 border-red-200 shadow-sm' 
        : 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
    }`}>

      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={handleToggle}
          className="mt-0.5 sm:mt-0 flex-shrink-0"
          aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
        >
          <span
            className={`inline-flex h-5 w-5 items-center justify-center rounded border transition-colors ${
              todo.completed
                ? "border-emerald-500 bg-emerald-500 text-white"
                : todo.isDelayed
                ? "border-red-300 bg-red-50/50 text-transparent hover:bg-red-100"
                : "border-zinc-300 text-transparent hover:bg-zinc-100"
            }`}
          >
            ✓
          </span>
        </button>
        
        <div className="flex flex-col gap-1 min-w-0">
          <span
            onClick={handleToggle}
            className={`text-sm sm:text-base font-medium transition-colors cursor-pointer truncate ${
              todo.completed ? "text-zinc-400 line-through" : todo.isDelayed ? "text-red-900" : "text-zinc-700"
            }`}
          >
            {todo.text}
          </span>
          
          <div className="flex flex-wrap items-center gap-3">
            {todo.completed && todo.completedAt && showCompleted && (
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed: {new Date(todo.completedAt).toLocaleDateString()}
                {todo.isDelayed && (
                  <span className="text-red-500 ml-1">(Late)</span>
                )}
              </span>
            )}

            {!todo.completed && showTarget && todo.targetDate && (
              <span className={`flex items-center gap-1 text-xs font-medium ${todo.isDelayed ? 'text-red-600' : 'text-blue-600'}`}>
                {todo.isDelayed ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                {todo.isDelayed ? "Delayed" : "Due"}: {new Date(todo.targetDate).toLocaleDateString()}
                {todo.targetTime && (
                  <>
                    <Clock className="w-3 h-3 ml-1" />
                    {todo.targetTime}
                  </>
                )}
              </span>
            )}
          </div>
          {subTasks > 0 && (
            <div className="flex items-center gap-3 mt-1">
              <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200/50">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    percentageCompleted === 100 ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${percentageCompleted}%` }}
                />
              </div>
              <span className="text-[10px] font-medium text-zinc-500 whitespace-nowrap">
                {countOfSubtaskCompleted} / {subTasks}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-100 sm:opacity-80 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0">
        {showCompleted && (
          <div className={`text-[10px] uppercase tracking-wider font-bold border rounded-md px-2 py-1 ${
            todo.priority === "High" ? "bg-red-50 text-red-700 border-red-200" :
            todo.priority === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
            "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}>
            {todo.priority}
          </div>
        )}
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full p-2 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition-colors"
          aria-label="Delete todo"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setShowTodo(todo.id)}
          className="rounded-full p-2 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 transition-colors"
          aria-label="Show todo details"
        >
          {(subTasks === 0) ? (
            <Plus className="h-4 w-4"/>
          ) : (
            <MoveRight className="h-4 w-4"/>
          )}

        </button>
      </div>
    </li>
  );
}

