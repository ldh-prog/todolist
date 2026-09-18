// src/components/todos/todo-filters.tsx
"use client";

import { CheckCircle2, Circle, List } from "lucide-react";
import { cn } from "@/lib/cn";
import type { TodoCounts, TodoFilter } from "@/lib/todos/types";

const FILTERS: Array<{
  id: TodoFilter;
  label: string;
  icon: typeof List;
}> = [
  { id: "all", label: "전체", icon: List },
  { id: "active", label: "진행 중", icon: Circle },
  { id: "completed", label: "완료됨", icon: CheckCircle2 },
];

type TodoFiltersProps = {
  value: TodoFilter;
  counts: TodoCounts;
  onChange: (filter: TodoFilter) => void;
};

export function TodoFilters({ value, counts, onChange }: TodoFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="할 일 필터"
      className="grid grid-cols-3 gap-2 rounded-xl border border-border bg-surface p-1"
    >
      {FILTERS.map((filter) => {
        const Icon = filter.icon;
        const selected = value === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(filter.id)}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
              selected
                ? "bg-primary text-white"
                : "text-muted hover:bg-primary/5 hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{filter.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 text-xs",
                selected ? "bg-white/20" : "bg-background text-muted",
              )}
            >
              {counts[filter.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
