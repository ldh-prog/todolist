// src/actions/shopping.ts
"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { isShoppingCategoryId } from "@/lib/shopping/categories";
import { validateShoppingName } from "@/lib/shopping/name";
import { validateShoppingQuantity } from "@/lib/shopping/quantity";
import type { ShoppingItem, ShoppingItemPatch } from "@/lib/shopping/types";

const SHOPPING_COLUMNS =
  "id, user_id, name, quantity, category, is_purchased, created_at";

type ActionError = { error: string };
type ItemResult = { item: ShoppingItem } | ActionError;
type EmptyResult = { ok: true } | ActionError;

function revalidateShopping() {
  revalidatePath("/shopping");
}

export async function createShoppingItemAction(input: {
  name: string;
  quantity: number;
  category: string;
}): Promise<ItemResult> {
  const nameResult = validateShoppingName(input.name);
  if (!nameResult.ok) {
    return { error: nameResult.error };
  }

  const quantityResult = validateShoppingQuantity(input.quantity);
  if (!quantityResult.ok) {
    return { error: quantityResult.error };
  }

  if (!isShoppingCategoryId(input.category)) {
    return { error: "올바른 분류를 선택해 주세요." };
  }

  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { data, error: insertError } = await supabase
    .from("shopping_items")
    .insert({
      user_id: user.id,
      name: nameResult.name,
      quantity: quantityResult.quantity,
      category: input.category,
    })
    .select(SHOPPING_COLUMNS)
    .single();

  if (insertError || !data) {
    return { error: insertError?.message ?? "장바구니에 담지 못했습니다." };
  }

  revalidateShopping();
  return { item: data };
}

export async function updateShoppingItemAction(
  id: string,
  patch: ShoppingItemPatch,
): Promise<ItemResult> {
  const updates: {
    name?: string;
    quantity?: number;
    category?: string;
    is_purchased?: boolean;
  } = {};

  if (patch.name !== undefined) {
    const nameResult = validateShoppingName(patch.name);
    if (!nameResult.ok) {
      return { error: nameResult.error };
    }
    updates.name = nameResult.name;
  }

  if (patch.quantity !== undefined) {
    const quantityResult = validateShoppingQuantity(patch.quantity);
    if (!quantityResult.ok) {
      return { error: quantityResult.error };
    }
    updates.quantity = quantityResult.quantity;
  }

  if (patch.category !== undefined) {
    if (!isShoppingCategoryId(patch.category)) {
      return { error: "올바른 분류를 선택해 주세요." };
    }
    updates.category = patch.category;
  }

  if (patch.is_purchased !== undefined) {
    updates.is_purchased = patch.is_purchased;
  }

  if (Object.keys(updates).length === 0) {
    return { error: "변경할 내용이 없습니다." };
  }

  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { data, error: updateError } = await supabase
    .from("shopping_items")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select(SHOPPING_COLUMNS)
    .single();

  if (updateError || !data) {
    return { error: updateError?.message ?? "장보기 항목을 수정하지 못했습니다." };
  }

  revalidateShopping();
  return { item: data };
}

export async function deleteShoppingItemAction(id: string): Promise<EmptyResult> {
  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { error: deleteError } = await supabase
    .from("shopping_items")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (deleteError) {
    return { error: deleteError.message };
  }

  revalidateShopping();
  return { ok: true };
}

export async function clearPurchasedShoppingItemsAction(): Promise<EmptyResult> {
  const { supabase, user, error } = await requireUser();
  if (!user) {
    return { error };
  }

  const { error: deleteError } = await supabase
    .from("shopping_items")
    .delete()
    .eq("user_id", user.id)
    .eq("is_purchased", true);

  if (deleteError) {
    return { error: deleteError.message };
  }

  revalidateShopping();
  return { ok: true };
}
