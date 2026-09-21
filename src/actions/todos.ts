// src/actions/todos.ts
"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { TODO_SELECT_COLUMNS } from "@/lib/constants";
import { validateTodoSchedule } from "@/lib/todos/schedule";
import { validateTodoTitle } from "@/lib/todos/title";
import type { Todo } from "@/lib/todos/types";

type ActionError = { error: string };
type TodoResult = { todo: Todo } | ActionError;
type EmptyResult = { ok: true } | ActionError;

export type TodoScheduleInput = {
  dueAt?: string | null;
  remindAt?: string | null;
};

function revalidateTodos() {
  revalidatePath("/");
}

export async function createTodoAction(
  title: string,
  schedule: TodoScheduleInput = {},
): Promise<TodoResult> {
  const titleResult = validateTodoTitle(title);
  if (!titleResult.ok) {
    return { error: titleResult.error };
  }

  const scheduleResult = validateTodoSchedule(
    schedule.dueAt ?? null,
    schedule.remindAt ?? null,
  );
  if (!scheduleResult.ok) {
    return { error: scheduleResult.error };
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
      due_at: scheduleResult.dueAt,
      remind_at: scheduleResult.remindAt,
      reminder_fired_at: null,
    })
    .select(TODO_SELECT_COLUMNS)
    .single();

  if (insertError || !data) {
    return { error: insertError?.message ?? "할 일을 추가하지 못했습니다." };
  }

  revalidateTodos();
  return { todo: data };
}

export async function updateTodoAction(
  id: string,
  input: { title: string } & TodoScheduleInput,
): Promise<TodoResult> {
  const titleResult = validateTodoTitle(input.title);
  if (!titleResult.ok) {
    return { error: titleResult.error };
  }

  const scheduleResult = validateTodoSchedule(
    input.dueAt ?? null,
    input.remindAt ?? null,
  );
  if (!scheduleResult.ok) {
    return { error: scheduleResult.error };
  }

  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { data, error: updateError } = await supabase
    .from("todos")
    .update({
      title: titleResult.title,
      due_at: scheduleResult.dueAt,
      remind_at: scheduleResult.remindAt,
      reminder_fired_at: null,
    })
    .eq("id", id)
    .eq("user_id", user.id)
    .select(TODO_SELECT_COLUMNS)
    .single();

  if (updateError || !data) {
    return { error: updateError?.message ?? "할 일을 수정하지 못했습니다." };
  }

  revalidateTodos();
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
    .select(TODO_SELECT_COLUMNS)
    .single();

  if (updateError || !data) {
    return { error: updateError?.message ?? "완료 상태를 바꾸지 못했습니다." };
  }

  revalidateTodos();
  return { todo: data };
}

export async function markTodoReminderFiredAction(
  id: string,
): Promise<EmptyResult> {
  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { error: updateError } = await supabase
    .from("todos")
    .update({ reminder_fired_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id)
    .is("reminder_fired_at", null);

  if (updateError) {
    return { error: updateError.message };
  }

  return { ok: true };
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

  revalidateTodos();
  return { ok: true };
}
