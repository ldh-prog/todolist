// src/lib/todos/schema-error.test.ts
import { describe, expect, it } from "vitest";
import { isMissingTodosTableError } from "@/lib/todos/schema-error";

describe("isMissingTodosTableError", () => {
  it("테이블 없음 메시지를 감지한다", () => {
    expect(
      isMissingTodosTableError("Could not find the table 'public.todos'"),
    ).toBe(true);
  });

  it("일반 오류는 무시한다", () => {
    expect(isMissingTodosTableError("JWT expired")).toBe(false);
  });
});
