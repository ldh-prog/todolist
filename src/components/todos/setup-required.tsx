// src/components/todos/setup-required.tsx
import { DatabaseZap } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";

type SetupRequiredProps = {
  userEmail: string;
  message: string;
  current: "todos" | "shopping";
  tableName: string;
  sqlFile: string;
};

export function SetupRequired({
  userEmail,
  message,
  current,
  tableName,
  sqlFile,
}: SetupRequiredProps) {
  return (
    <div className="min-h-full bg-background">
      <AppHeader userEmail={userEmail} current={current} />
      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pt-8 pb-16">
        <section className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cta/10 text-cta">
            <DatabaseZap className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-semibold tracking-tight">
            {tableName}이 아직 준비되지 않았습니다
          </h1>
          <p className="text-muted">
            Supabase SQL Editor에서{" "}
            <code className="font-medium">{sqlFile}</code> 을 실행한 뒤 이
            페이지를 새로고침하세요.
          </p>
          <p className="rounded-lg bg-background px-3 py-2 text-sm break-keep text-muted">
            {message}
          </p>
        </section>
      </main>
    </div>
  );
}
