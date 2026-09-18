// src/components/todos/todo-item.tsx
"use client";

import { Check, Pencil, Trash2, X } from "lucide-react";
import { useId, useState } from "react";
import { TODO_TITLE_MAX_LENGTH } from "@/lib/constants";
import { cn } from "@/lib/cn";
import type { Todo } from "@/lib/todos/types";

type TodoItemProps = {
  todo: Todo;
  busy: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onSaveTitle: (todo: Todo, title: string) => Promise<boolean>;
};

export function TodoItem({
  todo,
  busy,
  onToggle,
  onDelete,
  onSaveTitle,
}: TodoItemProps) {
  const inputId = useId();
  const checkboxId = useId();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);

  async function handleSave() {
    const saved = await onSaveTitle(todo, draft);
    if (saved) {
      setEditing(false);
    }
  }

  return (
    <li
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors duration-200",
        "hover:bg-primary/5",
        busy && "opacity-70",
      )}
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={todo.is_completed}
        disabled={busy}
        onChange={() => onToggle(todo)}
        className="mt-1 h-5 w-5 cursor-pointer rounded border-border text-primary accent-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed"
      />

      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="flex flex-col gap-2">
            <label htmlFor={inputId} className="sr-only">
              할 일 수정
            </label>
            <input
              id={inputId}
              value={draft}
              maxLength={TODO_TITLE_MAX_LENGTH}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void handleSave();
                }
                if (event.key === "Escape") {
                  setDraft(todo.title);
                  setEditing(false);
                }
              }}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={busy}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                저장
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraft(todo.title);
                  setEditing(false);
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                취소
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor={checkboxId}
            className={cn(
              "block cursor-pointer text-base break-words",
              todo.is_completed && "text-muted line-through",
            )}
          >
            {todo.title}
          </label>
        )}
      </div>

      {!editing && (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setDraft(todo.title);
              setEditing(true);
            }}
            disabled={busy}
            className="cursor-pointer rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed"
            aria-label={`${todo.title} 수정`}
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo)}
            disabled={busy}
            className="cursor-pointer rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-danger-soft hover:text-danger focus-visible:ring-2 focus-visible:ring-danger focus-visible:outline-none disabled:cursor-not-allowed"
            aria-label={`${todo.title} 삭제`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </li>
  );
}
