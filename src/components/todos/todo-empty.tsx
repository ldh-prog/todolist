// src/components/todos/todo-empty.tsx
import { CheckCircle2, ClipboardList, Circle } from "lucide-react";
import type { TodoFilter } from "@/lib/todos/types";

const COPY: Record<
  TodoFilter,
  { title: string; description: string; icon: typeof ClipboardList }
> = {
  all: {
    title: "아직 할 일이 없습니다",
    description: "위에서 첫 번째 할 일을 추가해 보세요.",
    icon: ClipboardList,
  },
  active: {
    title: "진행 중인 일이 없습니다",
    description: "모든 할 일을 끝냈거나, 아직 추가하지 않았습니다.",
    icon: Circle,
  },
  completed: {
    title: "완료된 일이 없습니다",
    description: "체크박스를 누르면 이 목록으로 이동합니다.",
    icon: CheckCircle2,
  },
};

type TodoEmptyProps = {
  filter: TodoFilter;
};

export function TodoEmpty({ filter }: TodoEmptyProps) {
  const copy = COPY[filter];
  const Icon = copy.icon;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="text-lg font-semibold text-foreground">{copy.title}</h2>
      <p className="text-sm text-muted">{copy.description}</p>
    </div>
  );
}
