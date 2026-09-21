// src/app/shopping/loading.tsx
export default function ShoppingLoading() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <div className="h-24 animate-pulse rounded-2xl bg-surface" />
      <div className="h-20 animate-pulse rounded-2xl bg-surface" />
      <div className="h-24 animate-pulse rounded-2xl bg-surface" />
      <div className="h-48 animate-pulse rounded-2xl bg-surface" />
    </div>
  );
}
