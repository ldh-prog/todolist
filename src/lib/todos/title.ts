// src/lib/todos/title.ts
import { TODO_TITLE_MAX_LENGTH } from "@/lib/constants";

export type TitleValidationResult =
  | { ok: true; title: string }
  | { ok: false; error: string };

export function normalizeTodoTitle(title: string): string {
  return title.trim();
}

export function validateTodoTitle(title: string): TitleValidationResult {
  const normalized = normalizeTodoTitle(title);

  if (!normalized) {
    return { ok: false, error: "할 일 내용을 입력해 주세요." };
  }

  if (normalized.length > TODO_TITLE_MAX_LENGTH) {
    return {
      ok: false,
      error: `할 일은 ${TODO_TITLE_MAX_LENGTH}자 이하여야 합니다.`,
    };
  }

  return { ok: true, title: normalized };
}
