// src/components/layout/app-header.tsx
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOutAction } from "@/actions/auth";
import { AppLogo } from "@/components/brand/app-logo";
import { cn } from "@/lib/cn";

type AppHeaderProps = {
  userEmail: string;
  current: "todos" | "shopping";
};

const NAV_ITEMS = [
  { href: "/", id: "todos" as const, label: "할 일" },
  { href: "/shopping", id: "shopping" as const, label: "장보기" },
];

export function AppHeader({ userEmail, current }: AppHeaderProps) {
  return (
    <header className="sticky top-4 z-20 mx-4 rounded-2xl border border-border bg-surface/90 px-4 py-3 backdrop-blur-sm sm:mx-auto sm:max-w-2xl">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="cursor-pointer rounded-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <AppLogo />
        </Link>
        <div className="flex min-w-0 items-center gap-3">
          <p className="hidden truncate text-sm text-muted sm:block">
            {userEmail}
          </p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              로그아웃
            </button>
          </form>
        </div>
      </div>
      <nav
        aria-label="주요 메뉴"
        className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-background p-1"
      >
        {NAV_ITEMS.map((item) => {
          const selected = item.id === current;
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={selected ? "page" : undefined}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                selected
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-primary/5 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
