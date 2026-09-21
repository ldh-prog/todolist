// src/components/shopping/shopping-empty.tsx
import { CheckCircle2, Circle, ShoppingCart } from "lucide-react";
import type { ShoppingFilter } from "@/lib/shopping/types";

const COPY: Record<
  ShoppingFilter,
  { title: string; description: string; icon: typeof ShoppingCart }
> = {
  all: {
    title: "장바구니가 비어 있습니다",
    description: "살 물건 이름과 수량을 위에 입력해 보세요.",
    icon: ShoppingCart,
  },
  buy: {
    title: "살 물건이 없습니다",
    description: "모두 담았거나, 아직 목록에 넣은 것이 없습니다.",
    icon: Circle,
  },
  purchased: {
    title: "담은 물건이 없습니다",
    description: "체크하면 이 목록으로 이동합니다.",
    icon: CheckCircle2,
  },
};

type ShoppingEmptyProps = {
  filter: ShoppingFilter;
};

export function ShoppingEmpty({ filter }: ShoppingEmptyProps) {
  const copy = COPY[filter];
  const Icon = copy.icon;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="text-lg font-semibold text-foreground">{copy.title}</h2>
      <p className="text-sm text-muted">{copy.description}</p>
    </div>
  );
}
