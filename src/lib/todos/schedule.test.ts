// src/lib/todos/schedule.test.ts
import { describe, expect, it } from "vitest";
import {
  formatTodoDateTime,
  isTodoOverdue,
  parseOptionalDateTime,
  validateTodoSchedule,
} from "@/lib/todos/schedule";

describe("parseOptionalDateTime", () => {
  it("빈 값은 null이다", () => {
    expect(parseOptionalDateTime("  ")).toEqual({ ok: true, value: null });
  });

  it("잘못된 값은 거절한다", () => {
    expect(parseOptionalDateTime("not-a-date")).toEqual({
      ok: false,
      error: "날짜와 시각을 확인해 주세요.",
    });
  });
});

describe("validateTodoSchedule", () => {
  it("알림이 기한보다 늦으면 거절한다", () => {
    expect(
      validateTodoSchedule(
        "2026-09-21T01:00:00.000Z",
        "2026-09-21T02:00:00.000Z",
      ),
    ).toEqual({
      ok: false,
      error: "알림 시각은 기한보다 늦을 수 없습니다.",
    });
  });

  it("알림만 있어도 통과한다", () => {
    expect(
      validateTodoSchedule(null, "2026-09-21T01:00:00.000Z"),
    ).toEqual({
      ok: true,
      dueAt: null,
      remindAt: "2026-09-21T01:00:00.000Z",
    });
  });
});

describe("isTodoOverdue", () => {
  const now = new Date("2026-09-21T12:00:00.000Z");

  it("기한이 지난 미완료 항목만 true이다", () => {
    expect(
      isTodoOverdue(
        { is_completed: false, due_at: "2026-09-21T11:00:00.000Z" },
        now,
      ),
    ).toBe(true);
    expect(
      isTodoOverdue(
        { is_completed: true, due_at: "2026-09-21T11:00:00.000Z" },
        now,
      ),
    ).toBe(false);
  });
});

describe("formatTodoDateTime", () => {
  it("같은 로컬 날짜는 오늘로 표시한다", () => {
    const now = new Date();
    const laterToday = new Date(now);
    laterToday.setHours(23, 50, 0, 0);
    expect(formatTodoDateTime(laterToday.toISOString(), now)).toContain("오늘");
  });
});
