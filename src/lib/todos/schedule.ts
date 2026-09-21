// src/lib/todos/schedule.ts
export type ScheduleParseResult =
  | { ok: true; value: string | null }
  | { ok: false; error: string };

export type ScheduleValidationResult =
  | { ok: true; dueAt: string | null; remindAt: string | null }
  | { ok: false; error: string };

export function parseOptionalDateTime(value: string): ScheduleParseResult {
  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: true, value: null };
  }

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) {
    return { ok: false, error: "날짜와 시각을 확인해 주세요." };
  }

  return { ok: true, value: date.toISOString() };
}

export function validateTodoSchedule(
  dueAt: string | null,
  remindAt: string | null,
): ScheduleValidationResult {
  if (dueAt && remindAt && new Date(remindAt).getTime() > new Date(dueAt).getTime()) {
    return { ok: false, error: "알림 시각은 기한보다 늦을 수 없습니다." };
  }

  return { ok: true, dueAt, remindAt };
}

export function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) {
    return "";
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - timezoneOffsetMs).toISOString().slice(0, 16);
}

export function isTodoOverdue(todo: {
  is_completed: boolean;
  due_at: string | null;
}, now = new Date()): boolean {
  if (todo.is_completed || !todo.due_at) {
    return false;
  }

  return new Date(todo.due_at).getTime() < now.getTime();
}

export function formatTodoDateTime(iso: string, now = new Date()): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const time = new Intl.DateTimeFormat("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTarget = new Date(date);
  startOfTarget.setHours(0, 0, 0, 0);
  const dayDiff = Math.round(
    (startOfTarget.getTime() - startOfToday.getTime()) / 86_400_000,
  );

  if (dayDiff === 0) {
    return `오늘 ${time}`;
  }
  if (dayDiff === 1) {
    return `내일 ${time}`;
  }
  if (dayDiff === -1) {
    return `어제 ${time}`;
  }

  const dateLabel = new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
  }).format(date);

  return `${dateLabel} ${time}`;
}

export function hoursFromNowIso(hours: number, now = new Date()): string {
  return new Date(now.getTime() + hours * 3_600_000).toISOString();
}
