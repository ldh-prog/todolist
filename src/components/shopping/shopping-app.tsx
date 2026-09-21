// src/components/shopping/shopping-app.tsx
"use client";

import { Eraser, Plus } from "lucide-react";
import { useId, useMemo, useState } from "react";
import {
  clearPurchasedShoppingItemsAction,
  createShoppingItemAction,
  deleteShoppingItemAction,
  updateShoppingItemAction,
} from "@/actions/shopping";
import { AppHeader } from "@/components/layout/app-header";
import { ShoppingEmpty } from "@/components/shopping/shopping-empty";
import { ShoppingFilters } from "@/components/shopping/shopping-filters";
import { ShoppingItemRow } from "@/components/shopping/shopping-item";
import { Alert } from "@/components/ui/alert";
import { StatCard } from "@/components/ui/stat-card";
import {
  SHOPPING_NAME_MAX_LENGTH,
  SHOPPING_QUANTITY_MAX,
  SHOPPING_QUANTITY_MIN,
} from "@/lib/constants";
import {
  SHOPPING_CATEGORIES,
  type ShoppingCategoryId,
} from "@/lib/shopping/categories";
import {
  countShoppingItems,
  filterShoppingItems,
  groupShoppingItems,
} from "@/lib/shopping/filter";
import { validateShoppingName } from "@/lib/shopping/name";
import { validateShoppingQuantity } from "@/lib/shopping/quantity";
import type { ShoppingFilter, ShoppingItem } from "@/lib/shopping/types";

type ShoppingAppProps = {
  initialItems: ShoppingItem[];
  userEmail: string;
};

export function ShoppingApp({ initialItems, userEmail }: ShoppingAppProps) {
  const nameId = useId();
  const quantityId = useId();
  const categoryId = useId();
  const [items, setItems] = useState(() => initialItems);
  const [filter, setFilter] = useState<ShoppingFilter>("all");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState<ShoppingCategoryId>("produce");
  const [error, setError] = useState<string | null>(null);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);
  const [clearing, setClearing] = useState(false);

  const counts = useMemo(() => countShoppingItems(items), [items]);
  const visibleItems = useMemo(
    () => filterShoppingItems(items, filter),
    [items, filter],
  );
  const groupedItems = useMemo(
    () => groupShoppingItems(visibleItems),
    [visibleItems],
  );

  function markBusy(id: string, next: boolean) {
    setBusyIds((current) => {
      const copy = new Set(current);
      if (next) {
        copy.add(id);
      } else {
        copy.delete(id);
      }
      return copy;
    });
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nameResult = validateShoppingName(name);
    if (!nameResult.ok) {
      setError(nameResult.error);
      return;
    }
    const quantityResult = validateShoppingQuantity(quantity);
    if (!quantityResult.ok) {
      setError(quantityResult.error);
      return;
    }

    setCreating(true);
    setError(null);
    const result = await createShoppingItemAction({
      name: nameResult.name,
      quantity: quantityResult.quantity,
      category,
    });
    setCreating(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    setItems((current) => [result.item, ...current]);
    setName("");
    setQuantity(1);
  }

  async function handleToggle(item: ShoppingItem) {
    const nextPurchased = !item.is_purchased;
    setItems((current) =>
      current.map((row) =>
        row.id === item.id ? { ...row, is_purchased: nextPurchased } : row,
      ),
    );
    markBusy(item.id, true);
    const result = await updateShoppingItemAction(item.id, {
      is_purchased: nextPurchased,
    });
    markBusy(item.id, false);

    if ("error" in result) {
      setItems((current) =>
        current.map((row) => (row.id === item.id ? item : row)),
      );
      setError(result.error);
      return;
    }

    setItems((current) =>
      current.map((row) => (row.id === item.id ? result.item : row)),
    );
  }

  async function handleQuantity(item: ShoppingItem, nextQuantity: number) {
    const quantityResult = validateShoppingQuantity(nextQuantity);
    if (!quantityResult.ok) {
      setError(quantityResult.error);
      return;
    }

    setItems((current) =>
      current.map((row) =>
        row.id === item.id
          ? { ...row, quantity: quantityResult.quantity }
          : row,
      ),
    );
    markBusy(item.id, true);
    const result = await updateShoppingItemAction(item.id, {
      quantity: quantityResult.quantity,
    });
    markBusy(item.id, false);

    if ("error" in result) {
      setItems((current) =>
        current.map((row) => (row.id === item.id ? item : row)),
      );
      setError(result.error);
      return;
    }

    setItems((current) =>
      current.map((row) => (row.id === item.id ? result.item : row)),
    );
  }

  async function handleDelete(item: ShoppingItem) {
    const previous = items;
    setItems((current) => current.filter((row) => row.id !== item.id));
    markBusy(item.id, true);
    const result = await deleteShoppingItemAction(item.id);
    markBusy(item.id, false);

    if ("error" in result) {
      setItems(previous);
      setError(result.error);
    }
  }

  async function handleSave(
    item: ShoppingItem,
    next: { name: string; category: ShoppingCategoryId },
  ): Promise<boolean> {
    markBusy(item.id, true);
    const result = await updateShoppingItemAction(item.id, next);
    markBusy(item.id, false);

    if ("error" in result) {
      setError(result.error);
      return false;
    }

    setItems((current) =>
      current.map((row) => (row.id === item.id ? result.item : row)),
    );
    setError(null);
    return true;
  }

  async function handleClearPurchased() {
    const previous = items;
    setItems((current) => current.filter((row) => !row.is_purchased));
    setClearing(true);
    const result = await clearPurchasedShoppingItemsAction();
    setClearing(false);

    if ("error" in result) {
      setItems(previous);
      setError(result.error);
    }
  }

  return (
    <div className="min-h-full bg-background">
      <AppHeader userEmail={userEmail} current="shopping" />

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pt-8 pb-16">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">장보기</h1>
          <p className="text-muted">
            살 물건과 수량을 적고, 담으면 체크하세요. 목록은 이 계정에만
            보입니다.
          </p>
        </section>

        <section className="grid grid-cols-3 gap-3">
          <StatCard label="전체" value={counts.all} />
          <StatCard label="살 것" value={counts.buy} />
          <StatCard label="담음" value={counts.purchased} />
        </section>

        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="min-w-0 flex-1">
              <label htmlFor={nameId} className="sr-only">
                상품 이름
              </label>
              <input
                id={nameId}
                value={name}
                maxLength={SHOPPING_NAME_MAX_LENGTH}
                onChange={(event) => setName(event.target.value)}
                placeholder="예: 양파"
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors duration-200 placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="sm:w-24">
              <label htmlFor={quantityId} className="sr-only">
                수량
              </label>
              <input
                id={quantityId}
                type="number"
                min={SHOPPING_QUANTITY_MIN}
                max={SHOPPING_QUANTITY_MAX}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="w-full rounded-lg border border-border bg-surface px-3 py-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="sm:w-36">
              <label htmlFor={categoryId} className="sr-only">
                분류
              </label>
              <select
                id={categoryId}
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as ShoppingCategoryId)
                }
                className="w-full cursor-pointer rounded-lg border border-border bg-surface px-3 py-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {SHOPPING_CATEGORIES.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={creating}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cta px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-cta-hover focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Plus className="h-5 w-5" aria-hidden="true" />
              담기
            </button>
          </div>
        </form>

        {error && <Alert tone="error">{error}</Alert>}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ShoppingFilters
            value={filter}
            counts={counts}
            onChange={setFilter}
          />
          {counts.purchased > 0 && (
            <button
              type="button"
              onClick={() => void handleClearPurchased()}
              disabled={clearing}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed"
            >
              <Eraser className="h-4 w-4" aria-hidden="true" />
              담은 항목 지우기
            </button>
          )}
        </div>

        {visibleItems.length === 0 ? (
          <ShoppingEmpty filter={filter} />
        ) : (
          <div className="flex flex-col gap-6">
            {groupedItems.map((group) => (
              <section key={group.category.id} className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold tracking-tight text-muted">
                  {group.category.label}
                </h2>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <ShoppingItemRow
                      key={item.id}
                      item={item}
                      busy={busyIds.has(item.id)}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onQuantity={handleQuantity}
                      onSave={handleSave}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
