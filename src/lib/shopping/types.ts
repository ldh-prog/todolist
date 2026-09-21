// src/lib/shopping/types.ts
import type { ShoppingItemRow } from "@/lib/supabase/database.types";
import type { ShoppingCategoryId } from "@/lib/shopping/categories";

export type ShoppingItem = ShoppingItemRow;

export type ShoppingFilter = "all" | "buy" | "purchased";

export type ShoppingCounts = {
  all: number;
  buy: number;
  purchased: number;
};

export type ShoppingItemPatch = {
  name?: string;
  quantity?: number;
  category?: ShoppingCategoryId;
  is_purchased?: boolean;
};
