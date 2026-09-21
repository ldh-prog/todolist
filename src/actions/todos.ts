// src/actions/todos.ts
"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { validateTodoTitle } from "@/lib/todos/title";
import type { Todo } from "@/lib/todos/types";

type ActionError = { error: string };
type TodoResult = { todo: Todo } | ActionError;
type EmptyResult = { ok: true } | ActionError;

export async function createTodoAction(title: string): Promise<TodoResult> {
  const titleResult = validateTodoTitle(title);
  if (!titleResult.ok) {
    return { error: titleResult.error };
  }

  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { data, error: insertError } = await supabase
    .from("todos")
    .insert({
      title: titleResult.title,
      user_id: user.id,
    })
    .select("id, user_id, title, is_completed, created_at")
    .single();

  if (insertError || !data) {
    return { error: insertError?.message ?? "할 일을 추가하지 못했습니다." };
  }

  revalidatePath("/");
  return { todo: data };
}

export async function updateTodoTitleAction(
  id: string,
  title: string,
): Promise<TodoResult> {
  const titleResult = validateTodoTitle(title);
  if (!titleResult.ok) {
    return { error: titleResult.error };
  }

  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { data, error: updateError } = await supabase
    .from("todos")
    .update({ title: titleResult.title })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, user_id, title, is_completed, created_at")
    .single();

  if (updateError || !data) {
    return { error: updateError?.message ?? "할 일을 수정하지 못했습니다." };
  }

  revalidatePath("/");
  return { todo: data };
}

export async function toggleTodoAction(
  id: string,
  isCompleted: boolean,
): Promise<TodoResult> {
  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { data, error: updateError } = await supabase
    .from("todos")
    .update({ is_completed: isCompleted })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id, user_id, title, is_completed, created_at")
    .single();

  if (updateError || !data) {
    return { error: updateError?.message ?? "완료 상태를 바꾸지 못했습니다." };
  }

  revalidatePath("/");
  return { todo: data };
}

export async function deleteTodoAction(id: string): Promise<EmptyResult> {
  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { error: deleteError } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (deleteError) {
    return { error: deleteError.message };
  }

  revalidatePath("/");
  return { ok: true };
}
