// src/lib/todos/filter.test.ts
import { describe, expect, it } from "vitest";
import { countTodos, filterTodos, isTodoFilter } from "@/lib/todos/filter";
import type { Todo } from "@/lib/todos/types";

function todo(partial: Partial<Todo> & Pick<Todo, "id" | "title" | "is_completed">): Todo {
  return {
    user_id: "user-1",
    created_at: "2026-09-18T00:00:00.000Z",
    due_at: null,
    remind_at: null,
    reminder_fired_at: null,
    ...partial,
  };
}

const sample: Todo[] = [
  todo({ id: "1", title: "활성 할 일", is_completed: false }),
  todo({ id: "2", title: "완료된 할 일", is_completed: true }),
  todo({ id: "3", title: "또 다른 활성", is_completed: false }),
];

describe("filterTodos", () => {
  it("전체 목록을 그대로 반환한다", () => {
    expect(filterTodos(sample, "all")).toHaveLength(3);
  });

  it("진행 중 항목만 반환한다", () => {
    expect(filterTodos(sample, "active").map((item) => item.id)).toEqual(["1", "3"]);
  });

  it("완료된 항목만 반환한다", () => {
    expect(filterTodos(sample, "completed").map((item) => item.id)).toEqual(["2"]);
  });
});

describe("countTodos", () => {
  it("전체/진행/완료 개수를 계산한다", () => {
    expect(countTodos(sample)).toEqual({
      all: 3,
      active: 2,
      completed: 1,
      overdue: 0,
    });
  });

  it("빈 목록은 모두 0이다", () => {
    expect(countTodos([])).toEqual({
      all: 0,
      active: 0,
      completed: 0,
      overdue: 0,
    });
  });

  it("완료되지 않고 기한이 지난 항목만 overdue로 센다", () => {
    expect(
      countTodos([
        todo({
          id: "overdue",
          title: "지난 기한",
          is_completed: false,
          due_at: "2000-01-01T00:00:00.000Z",
        }),
        todo({
          id: "done-overdue",
          title: "완료된 지난 기한",
          is_completed: true,
          due_at: "2000-01-01T00:00:00.000Z",
        }),
      ]),
    ).toEqual({
      all: 2,
      active: 1,
      completed: 1,
      overdue: 1,
    });
  });
});

describe("isTodoFilter", () => {
  it("허용된 필터만 true이다", () => {
    expect(isTodoFilter("all")).toBe(true);
    expect(isTodoFilter("active")).toBe(true);
    expect(isTodoFilter("completed")).toBe(true);
    expect(isTodoFilter("archived")).toBe(false);
  });
});
