// src/lib/shopping/categories.test.ts
import { describe, expect, it } from "vitest";
import {
  isShoppingCategoryId,
  shoppingCategoryLabel,
} from "@/lib/shopping/categories";

describe("shopping categories", () => {
  it("허용된 분류만 true이다", () => {
    expect(isShoppingCategoryId("produce")).toBe(true);
    expect(isShoppingCategoryId("snack")).toBe(false);
  });

  it("한글 라벨을 반환한다", () => {
    expect(shoppingCategoryLabel("dairy")).toBe("유제품");
    expect(shoppingCategoryLabel("unknown")).toBe("기타");
  });
});
