// src/lib/constants.ts
export const APP_NAMESPACE = "kr.ulsan.ldh.todolist";
export const APP_NAME = "TodoList";
export const TODO_TITLE_MAX_LENGTH = 200;
export const SHOPPING_NAME_MAX_LENGTH = 200;
export const SHOPPING_QUANTITY_MIN = 1;
export const SHOPPING_QUANTITY_MAX = 99;
export const PASSWORD_MIN_LENGTH = 6;
export const TODO_SELECT_COLUMNS =
  "id, user_id, title, is_completed, created_at, due_at, remind_at, reminder_fired_at";
export const REMINDER_POLL_MS = 30_000;
