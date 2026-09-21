// src/lib/shopping/quantity.test.ts
import { describe, expect, it } from "vitest";
import { validateShoppingQuantity } from "@/lib/shopping/quantity";

describe("validateShoppingQuantity", () => {
  it("1~99 정수를 통과시킨다", () => {
    expect(validateShoppingQuantity(3)).toEqual({ ok: true, quantity: 3 });
    expect(validateShoppingQuantity("12")).toEqual({ ok: true, quantity: 12 });
  });

  it("소수와 범위를 거절한다", () => {
    expect(validateShoppingQuantity(1.5)).toEqual({
      ok: false,
      error: "수량은 정수여야 합니다.",
    });
    expect(validateShoppingQuantity(0)).toEqual({
      ok: false,
      error: "수량은 1~99개여야 합니다.",
    });
    expect(validateShoppingQuantity(100)).toEqual({
      ok: false,
      error: "수량은 1~99개여야 합니다.",
    });
  });
});
