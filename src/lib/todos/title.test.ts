// src/lib/todos/title.test.ts
import { describe, expect, it } from "vitest";
import { TODO_TITLE_MAX_LENGTH } from "@/lib/constants";
import { validateTodoTitle } from "@/lib/todos/title";

describe("validateTodoTitle", () => {
  it("앞뒤 공백을 제거하고 통과시킨다", () => {
    expect(validateTodoTitle("  장보기  ")).toEqual({
      ok: true,
      title: "장보기",
    });
  });

  it("빈 문자열은 거절한다", () => {
    expect(validateTodoTitle("   ")).toEqual({
      ok: false,
      error: "할 일 내용을 입력해 주세요.",
    });
  });

  it("최대 길이를 초과하면 거절한다", () => {
    const tooLong = "가".repeat(TODO_TITLE_MAX_LENGTH + 1);
    expect(validateTodoTitle(tooLong)).toEqual({
      ok: false,
      error: `할 일은 ${TODO_TITLE_MAX_LENGTH}자 이하여야 합니다.`,
    });
  });
});
