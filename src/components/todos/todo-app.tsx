// src/components/todos/todo-app.tsx
"use client";

import { LogOut, Plus } from "lucide-react";
import { useId, useMemo, useState } from "react";
import {
  createTodoAction,
  deleteTodoAction,
  toggleTodoAction,
  updateTodoTitleAction,
} from "@/actions/todos";
import { signOutAction } from "@/actions/auth";
import { AppLogo } from "@/components/brand/app-logo";
import { Alert } from "@/components/ui/alert";
import { TodoEmpty } from "@/components/todos/todo-empty";
import { TodoFilters } from "@/components/todos/todo-filters";
import { TodoItem } from "@/components/todos/todo-item";
import { TODO_TITLE_MAX_LENGTH } from "@/lib/constants";
import { countTodos, filterTodos } from "@/lib/todos/filter";
import { validateTodoTitle } from "@/lib/todos/title";
import type { Todo, TodoFilter } from "@/lib/todos/types";

type TodoAppProps = {
  initialTodos: Todo[];
  userEmail: string;
};

export function TodoApp({ initialTodos, userEmail }: TodoAppProps) {
  const titleId = useId();
  const [todos, setTodos] = useState(() => initialTodos);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);

  const counts = useMemo(() => countTodos(todos), [todos]);
  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  function markBusy(id: string, next: boolean) {
    setBusyIds((current) => {
      const copy = new Set(current);
      if (next) {
        copy.add(id);
      } else {
        copy.delete(id);
      }
      return copy;
    });
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const titleResult = validateTodoTitle(draft);
    if (!titleResult.ok) {
      setError(titleResult.error);
      return;
    }

    setCreating(true);
    setError(null);
    const result = await createTodoAction(titleResult.title);
    setCreating(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    setTodos((current) => [result.todo, ...current]);
    setDraft("");
  }

  async function handleToggle(todo: Todo) {
    const nextCompleted = !todo.is_completed;
    setTodos((current) =>
      current.map((item) =>
        item.id === todo.id ? { ...item, is_completed: nextCompleted } : item,
      ),
    );
    markBusy(todo.id, true);

    const result = await toggleTodoAction(todo.id, nextCompleted);
    markBusy(todo.id, false);

    if ("error" in result) {
      setTodos((current) =>
        current.map((item) => (item.id === todo.id ? todo : item)),
      );
      setError(result.error);
      return;
    }

    setTodos((current) =>
      current.map((item) => (item.id === todo.id ? result.todo : item)),
    );
  }

  async function handleDelete(todo: Todo) {
    const previous = todos;
    setTodos((current) => current.filter((item) => item.id !== todo.id));
    markBusy(todo.id, true);

    const result = await deleteTodoAction(todo.id);
    markBusy(todo.id, false);

    if ("error" in result) {
      setTodos(previous);
      setError(result.error);
    }
  }

  async function handleSaveTitle(todo: Todo, title: string): Promise<boolean> {
    const titleResult = validateTodoTitle(title);
    if (!titleResult.ok) {
      setError(titleResult.error);
      return false;
    }

    markBusy(todo.id, true);
    const result = await updateTodoTitleAction(todo.id, titleResult.title);
    markBusy(todo.id, false);

    if ("error" in result) {
      setError(result.error);
      return false;
    }

    setTodos((current) =>
      current.map((item) => (item.id === todo.id ? result.todo : item)),
    );
    setError(null);
    return true;
  }

  return (
    <div className="min-h-full bg-background">
      <header className="sticky top-4 z-20 mx-4 rounded-2xl border border-border bg-surface/90 px-4 py-3 backdrop-blur-sm sm:mx-auto sm:max-w-2xl">
        <div className="flex items-center justify-between gap-3">
          <AppLogo />
          <div className="flex min-w-0 items-center gap-3">
            <p className="hidden truncate text-sm text-muted sm:block">
              {userEmail}
            </p>
            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pt-8 pb-16">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">오늘의 할 일</h1>
          <p className="text-muted">
            추가하고, 고치고, 체크하면 됩니다. 목록은 로그인한 계정에만 보입니다.
          </p>
        </section>

        <section className="grid grid-cols-3 gap-3">
          <StatCard label="전체" value={counts.all} />
          <StatCard label="진행 중" value={counts.active} />
          <StatCard label="완료" value={counts.completed} />
        </section>

        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row"
        >
          <div className="min-w-0 flex-1">
            <label htmlFor={titleId} className="sr-only">
              새 할 일
            </label>
            <input
              id={titleId}
              value={draft}
              maxLength={TODO_TITLE_MAX_LENGTH}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="예: 주간 회고 작성하기"
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors duration-200 placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cta px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-cta-hover focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Plus className="h-5 w-5" aria-hidden="true" />
            추가
          </button>
        </form>

        {error && <Alert tone="error">{error}</Alert>}

        <TodoFilters value={filter} counts={counts} onChange={setFilter} />

        {visibleTodos.length === 0 ? (
          <TodoEmpty filter={filter} />
        ) : (
          <ul className="flex flex-col gap-2">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                busy={busyIds.has(todo.id)}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onSaveTitle={handleSaveTitle}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
