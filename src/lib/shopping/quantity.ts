// src/lib/shopping/quantity.ts
import {
  SHOPPING_QUANTITY_MAX,
  SHOPPING_QUANTITY_MIN,
} from "@/lib/constants";

export type ShoppingQuantityResult =
  | { ok: true; quantity: number }
  | { ok: false; error: string };

export function validateShoppingQuantity(
  value: number | string,
): ShoppingQuantityResult {
  const quantity = typeof value === "number" ? value : Number(value);

  if (!Number.isInteger(quantity)) {
    return { ok: false, error: "수량은 정수여야 합니다." };
  }

  if (quantity < SHOPPING_QUANTITY_MIN || quantity > SHOPPING_QUANTITY_MAX) {
    return {
      ok: false,
      error: `수량은 ${SHOPPING_QUANTITY_MIN}~${SHOPPING_QUANTITY_MAX}개여야 합니다.`,
    };
  }

  return { ok: true, quantity };
}
