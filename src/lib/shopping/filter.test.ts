// src/lib/shopping/filter.test.ts
import { describe, expect, it } from "vitest";
import {
  countShoppingItems,
  filterShoppingItems,
  groupShoppingItems,
  isShoppingFilter,
} from "@/lib/shopping/filter";
import type { ShoppingItem } from "@/lib/shopping/types";

function item(
  partial: Pick<ShoppingItem, "id" | "name" | "category" | "is_purchased">,
): ShoppingItem {
  return {
    user_id: "user-1",
    quantity: 1,
    created_at: "2026-09-21T00:00:00.000Z",
    ...partial,
  };
}

const sample: ShoppingItem[] = [
  item({ id: "1", name: "양파", category: "produce", is_purchased: false }),
  item({ id: "2", name: "사과", category: "fruit", is_purchased: true }),
  item({ id: "3", name: "당근", category: "produce", is_purchased: false }),
];

describe("filterShoppingItems", () => {
  it("살 것만 반환한다", () => {
    expect(filterShoppingItems(sample, "buy").map((row) => row.id)).toEqual([
      "1",
      "3",
    ]);
  });

  it("담은 것만 반환한다", () => {
    expect(filterShoppingItems(sample, "purchased").map((row) => row.id)).toEqual([
      "2",
    ]);
  });
});

describe("countShoppingItems", () => {
  it("전체/살 것/담음 개수를 계산한다", () => {
    expect(countShoppingItems(sample)).toEqual({
      all: 3,
      buy: 2,
      purchased: 1,
    });
  });
});

describe("groupShoppingItems", () => {
  it("빈 분류는 빼고 분류 순서대로 묶는다", () => {
    expect(groupShoppingItems(sample).map((group) => group.category.id)).toEqual([
      "produce",
      "fruit",
    ]);
    expect(groupShoppingItems(sample)[0].items).toHaveLength(2);
  });
});

describe("isShoppingFilter", () => {
  it("허용된 필터만 true이다", () => {
    expect(isShoppingFilter("buy")).toBe(true);
    expect(isShoppingFilter("active")).toBe(false);
  });
});
