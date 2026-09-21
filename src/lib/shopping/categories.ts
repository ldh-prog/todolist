// src/lib/shopping/categories.ts
export const SHOPPING_CATEGORY_IDS = [
  "produce",
  "fruit",
  "protein",
  "dairy",
  "household",
  "other",
] as const;

export type ShoppingCategoryId = (typeof SHOPPING_CATEGORY_IDS)[number];

export const SHOPPING_CATEGORIES: Array<{
  id: ShoppingCategoryId;
  label: string;
}> = [
  { id: "produce", label: "채소" },
  { id: "fruit", label: "과일" },
  { id: "protein", label: "육류/수산" },
  { id: "dairy", label: "유제품" },
  { id: "household", label: "생필품" },
  { id: "other", label: "기타" },
];

export function isShoppingCategoryId(
  value: string,
): value is ShoppingCategoryId {
  return SHOPPING_CATEGORY_IDS.includes(value as ShoppingCategoryId);
}

export function shoppingCategoryLabel(id: string): string {
  return SHOPPING_CATEGORIES.find((category) => category.id === id)?.label ?? "기타";
}
