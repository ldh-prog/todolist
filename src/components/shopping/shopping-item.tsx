// src/components/shopping/shopping-item.tsx
"use client";

import { Check, Minus, Pencil, Plus, Trash2, X } from "lucide-react";
import { useId, useState } from "react";
import {
  SHOPPING_NAME_MAX_LENGTH,
  SHOPPING_QUANTITY_MAX,
  SHOPPING_QUANTITY_MIN,
} from "@/lib/constants";
import { cn } from "@/lib/cn";
import {
  SHOPPING_CATEGORIES,
  shoppingCategoryLabel,
} from "@/lib/shopping/categories";
import type { ShoppingCategoryId } from "@/lib/shopping/categories";
import type { ShoppingItem } from "@/lib/shopping/types";

type ShoppingItemRowProps = {
  item: ShoppingItem;
  busy: boolean;
  onToggle: (item: ShoppingItem) => void;
  onDelete: (item: ShoppingItem) => void;
  onQuantity: (item: ShoppingItem, quantity: number) => void;
  onSave: (
    item: ShoppingItem,
    next: { name: string; category: ShoppingCategoryId },
  ) => Promise<boolean>;
};

export function ShoppingItemRow({
  item,
  busy,
  onToggle,
  onDelete,
  onQuantity,
  onSave,
}: ShoppingItemRowProps) {
  const checkboxId = useId();
  const nameId = useId();
  const categoryId = useId();
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(item.name);
  const [draftCategory, setDraftCategory] = useState<ShoppingCategoryId>(
    (SHOPPING_CATEGORIES.find((category) => category.id === item.category)
      ?.id ?? "other") as ShoppingCategoryId,
  );

  async function handleSave() {
    const saved = await onSave(item, {
      name: draftName,
      category: draftCategory,
    });
    if (saved) {
      setEditing(false);
    }
  }

  return (
    <li
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors duration-200",
        "hover:bg-primary/5",
        busy && "opacity-70",
      )}
    >
      <input
        id={checkboxId}
        type="checkbox"
        checked={item.is_purchased}
        disabled={busy}
        onChange={() => onToggle(item)}
        className="mt-1 h-5 w-5 cursor-pointer rounded border-border text-primary accent-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed"
      />

      <div className="min-w-0 flex-1">
        {editing ? (
          <div className="flex flex-col gap-2">
            <label htmlFor={nameId} className="sr-only">
              상품 이름 수정
            </label>
            <input
              id={nameId}
              value={draftName}
              maxLength={SHOPPING_NAME_MAX_LENGTH}
              onChange={(event) => setDraftName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void handleSave();
                }
                if (event.key === "Escape") {
                  setDraftName(item.name);
                  setEditing(false);
                }
              }}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-base text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <label htmlFor={categoryId} className="sr-only">
              분류 수정
            </label>
            <select
              id={categoryId}
              value={draftCategory}
              onChange={(event) =>
                setDraftCategory(event.target.value as ShoppingCategoryId)
              }
              className="w-full cursor-pointer rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {SHOPPING_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={busy}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                저장
              </button>
              <button
                type="button"
                onClick={() => {
                  setDraftName(item.name);
                  setEditing(false);
                }}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={checkboxId}
              className={cn(
                "block cursor-pointer text-base break-words",
                item.is_purchased && "text-muted line-through",
              )}
            >
              {item.name}
            </label>
            <p className="text-xs text-muted">
              {shoppingCategoryLabel(item.category)}
            </p>
          </div>
        )}
      </div>

      {!editing && (
        <div className="flex shrink-0 items-center gap-1">
          <div className="mr-1 flex items-center rounded-lg border border-border">
            <button
              type="button"
              onClick={() => onQuantity(item, item.quantity - 1)}
              disabled={busy || item.quantity <= SHOPPING_QUANTITY_MIN}
              className="cursor-pointer rounded-l-lg p-2 text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`${item.name} 수량 줄이기`}
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="min-w-8 px-1 text-center text-sm font-medium tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantity(item, item.quantity + 1)}
              disabled={busy || item.quantity >= SHOPPING_QUANTITY_MAX}
              className="cursor-pointer rounded-r-lg p-2 text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`${item.name} 수량 늘리기`}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setDraftName(item.name);
              setDraftCategory(
                (SHOPPING_CATEGORIES.find(
                  (category) => category.id === item.category,
                )?.id ?? "other") as ShoppingCategoryId,
              );
              setEditing(true);
            }}
            disabled={busy}
            className="cursor-pointer rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:cursor-not-allowed"
            aria-label={`${item.name} 수정`}
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(item)}
            disabled={busy}
            className="cursor-pointer rounded-lg p-2 text-muted transition-colors duration-200 hover:bg-danger-soft hover:text-danger focus-visible:ring-2 focus-visible:ring-danger focus-visible:outline-none disabled:cursor-not-allowed"
            aria-label={`${item.name} 삭제`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </li>
  );
}
