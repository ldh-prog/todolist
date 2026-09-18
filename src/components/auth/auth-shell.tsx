// src/components/auth/auth-shell.tsx
import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { AppLogo } from "@/components/brand/app-logo";

const BENEFITS = [
  "내 할 일만 보이는 개인 공간",
  "완료 여부를 바로 체크",
  "진행 중 / 완료 필터",
];

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <AppLogo />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-base text-muted">{description}</p>
          </div>
          <ul className="flex w-full flex-col gap-2 text-left">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          {children}
        </section>

        <p className="text-center text-sm text-muted">{footer}</p>
      </div>
    </main>
  );
}
