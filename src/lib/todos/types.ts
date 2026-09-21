// src/lib/todos/types.ts
import type { TodoRow } from "@/lib/supabase/database.types";

export type Todo = TodoRow;

export type TodoFilter = "all" | "active" | "completed";

export type TodoCounts = {
  all: number;
  active: number;
  completed: number;
  overdue: number;
};
