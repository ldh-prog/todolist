// src/lib/todos/schema-error.test.ts
import { describe, expect, it } from "vitest";
import {
  isMissingShoppingTableError,
  isMissingTodosTableError,
} from "@/lib/todos/schema-error";

describe("isMissingTodosTableError", () => {
  it("todos 테이블 없음 메시지를 감지한다", () => {
    expect(
      isMissingTodosTableError("Could not find the table 'public.todos'"),
    ).toBe(true);
  });

  it("다른 테이블 오류는 무시한다", () => {
    expect(
      isMissingTodosTableError(
        "Could not find the table 'public.shopping_items' in the schema cache",
      ),
    ).toBe(false);
  });

  it("일반 오류는 무시한다", () => {
    expect(isMissingTodosTableError("JWT expired")).toBe(false);
  });
});

describe("isMissingShoppingTableError", () => {
  it("shopping_items 테이블 없음 메시지를 감지한다", () => {
    expect(
      isMissingShoppingTableError(
        "Could not find the table 'public.shopping_items' in the schema cache",
      ),
    ).toBe(true);
  });
});
