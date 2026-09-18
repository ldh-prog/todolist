// src/app/page.tsx
import { redirect } from "next/navigation";
import { SetupRequired } from "@/components/todos/setup-required";
import { TodoApp } from "@/components/todos/todo-app";
import { createClient } from "@/lib/supabase/server";
import { isMissingTodosTableError } from "@/lib/todos/schema-error";
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
    .select("id, user_id, title, is_completed, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingTodosTableError(error.message)) {
      return (
        <SetupRequired
          userEmail={user.email ?? ""}
          message={error.message}
        />
      );
    }

    throw new Error(error.message);
  }

  return (
    <TodoApp initialTodos={(data ?? []) as Todo[]} userEmail={user.email ?? ""} />
  );
}
