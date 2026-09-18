// src/components/todos/setup-required.tsx
import { DatabaseZap } from "lucide-react";
import { signOutAction } from "@/actions/auth";
import { AppLogo } from "@/components/brand/app-logo";

type SetupRequiredProps = {
  userEmail: string;
  message: string;
};

export function SetupRequired({ userEmail, message }: SetupRequiredProps) {
  return (
    <div className="min-h-full bg-background">
      <header className="sticky top-4 z-20 mx-4 rounded-2xl border border-border bg-surface px-4 py-3 sm:mx-auto sm:max-w-2xl">
        <div className="flex items-center justify-between gap-3">
          <AppLogo />
          <p className="truncate text-sm text-muted">{userEmail}</p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pt-10 pb-16">
        <section className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cta/10 text-cta">
            <DatabaseZap className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">
            todos 테이블이 아직 없습니다
          </h1>
          <p className="text-muted">
            Supabase SQL Editor에서 <code className="font-medium">supabase/schema.sql</code>{" "}
            을 실행한 뒤 이 페이지를 새로고침하세요.
          </p>
          <p className="rounded-lg bg-background px-3 py-2 text-sm text-muted">
            {message}
          </p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              로그아웃
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
