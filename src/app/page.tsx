// src/app/page.tsx
import { redirect } from "next/navigation";
import { SetupRequired } from "@/components/todos/setup-required";
import { TodoApp } from "@/components/todos/todo-app";
import { TODO_SELECT_COLUMNS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import {
  isMissingTodoReminderColumnError,
  isMissingTodosTableError,
} from "@/lib/todos/schema-error";
import type { Todo } from "@/lib/todos/types";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("todos")
    .select(TODO_SELECT_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingTodosTableError(error.message)) {
      return (
        <SetupRequired
          userEmail={user.email ?? ""}
          message={error.message}
          current="todos"
          tableName="todos"
          sqlFile="supabase/schema.sql"
        />
      );
    }

    if (isMissingTodoReminderColumnError(error.message)) {
      return (
        <SetupRequired
          userEmail={user.email ?? ""}
          message={error.message}
          current="todos"
          tableName="todos 알림 컬럼"
          sqlFile="supabase/todo_reminders.sql"
        />
      );
    }

    throw new Error(error.message);
  }

  return (
    <TodoApp initialTodos={(data ?? []) as Todo[]} userEmail={user.email ?? ""} />
  );
}
