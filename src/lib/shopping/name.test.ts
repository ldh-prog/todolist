// src/lib/shopping/name.test.ts
import { describe, expect, it } from "vitest";
import { SHOPPING_NAME_MAX_LENGTH } from "@/lib/constants";
import { validateShoppingName } from "@/lib/shopping/name";

describe("validateShoppingName", () => {
  it("앞뒤 공백을 제거한다", () => {
    expect(validateShoppingName("  우유  ")).toEqual({
      ok: true,
      name: "우유",
    });
  });

  it("빈 값은 거절한다", () => {
    expect(validateShoppingName("   ")).toEqual({
      ok: false,
      error: "상품 이름을 입력해 주세요.",
    });
  });

  it("최대 길이를 초과하면 거절한다", () => {
    expect(validateShoppingName("가".repeat(SHOPPING_NAME_MAX_LENGTH + 1))).toEqual({
      ok: false,
      error: `상품 이름은 ${SHOPPING_NAME_MAX_LENGTH}자 이하여야 합니다.`,
    });
  });
});
