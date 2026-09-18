// src/lib/todos/filter.ts
import type { Todo, TodoCounts, TodoFilter } from "@/lib/todos/types";

export function filterTodos(todos: Todo[], filter: TodoFilter): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.is_completed);
    case "completed":
      return todos.filter((todo) => todo.is_completed);
    default:
      return todos;
  }
}

export function countTodos(todos: Todo[]): TodoCounts {
  return todos.reduce<TodoCounts>(
    (counts, todo) => {
      counts.all += 1;

      if (todo.is_completed) {
        counts.completed += 1;
      } else {
        counts.active += 1;
      }

      return counts;
    },
    { all: 0, active: 0, completed: 0 },
  );
}

export function isTodoFilter(value: string): value is TodoFilter {
  return value === "all" || value === "active" || value === "completed";
}
