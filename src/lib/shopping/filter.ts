// src/lib/shopping/filter.ts
import { SHOPPING_CATEGORIES } from "@/lib/shopping/categories";
import type {
  ShoppingCounts,
  ShoppingFilter,
  ShoppingItem,
} from "@/lib/shopping/types";

export function filterShoppingItems(
  items: ShoppingItem[],
  filter: ShoppingFilter,
): ShoppingItem[] {
  switch (filter) {
    case "buy":
      return items.filter((item) => !item.is_purchased);
    case "purchased":
      return items.filter((item) => item.is_purchased);
    default:
      return items;
  }
}

export function countShoppingItems(items: ShoppingItem[]): ShoppingCounts {
  return items.reduce<ShoppingCounts>(
    (counts, item) => {
      counts.all += 1;
      if (item.is_purchased) {
        counts.purchased += 1;
      } else {
        counts.buy += 1;
      }
      return counts;
    },
    { all: 0, buy: 0, purchased: 0 },
  );
}

export function groupShoppingItems(items: ShoppingItem[]) {
  return SHOPPING_CATEGORIES.map((category) => ({
    category,
    items: items.filter((item) => item.category === category.id),
  })).filter((group) => group.items.length > 0);
}

export function isShoppingFilter(value: string): value is ShoppingFilter {
  return value === "all" || value === "buy" || value === "purchased";
}
