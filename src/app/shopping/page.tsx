// src/app/shopping/page.tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SetupRequired } from "@/components/todos/setup-required";
import { ShoppingApp } from "@/components/shopping/shopping-app";
import { createClient } from "@/lib/supabase/server";
import { isMissingShoppingTableError } from "@/lib/todos/schema-error";
import type { ShoppingItem } from "@/lib/shopping/types";

export const metadata: Metadata = {
  title: "장보기",
};

export default async function ShoppingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("shopping_items")
    .select("id, user_id, name, quantity, category, is_purchased, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    if (isMissingShoppingTableError(error.message)) {
      return (
        <SetupRequired
          userEmail={user.email ?? ""}
          message={error.message}
          current="shopping"
          tableName="shopping_items"
          sqlFile="supabase/shopping_items.sql"
        />
      );
    }

    throw new Error(error.message);
  }

  return (
    <ShoppingApp
      initialItems={(data ?? []) as ShoppingItem[]}
      userEmail={user.email ?? ""}
    />
  );
}
