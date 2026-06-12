export type TodoId = string;

export type Todo = {
  id: TodoId;
  text: string;
  completed: boolean;
  createdAt: number; 
  completedAt?: number;
  priority: string;
  targetDate: string;
  targetTime: string;
  isDelayed: boolean;
  timeline?: {
    subtask: string;
    isCompleted: boolean;
    time: number;
  }[];
  completedSubtasksCount: number;
};

export type TodoFilter = "all" | "active" | "completed";

