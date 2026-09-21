// src/lib/shopping/name.ts
import { SHOPPING_NAME_MAX_LENGTH } from "@/lib/constants";

export type ShoppingNameResult =
  | { ok: true; name: string }
  | { ok: false; error: string };

export function validateShoppingName(name: string): ShoppingNameResult {
  const normalized = name.trim();

  if (!normalized) {
    return { ok: false, error: "상품 이름을 입력해 주세요." };
  }

  if (normalized.length > SHOPPING_NAME_MAX_LENGTH) {
    return {
      ok: false,
      error: `상품 이름은 ${SHOPPING_NAME_MAX_LENGTH}자 이하여야 합니다.`,
    };
  }

  return { ok: true, name: normalized };
}
