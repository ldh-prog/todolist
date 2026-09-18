// src/components/auth/login-form.tsx
"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { signInAction, type AuthFormState } from "@/actions/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordField } from "@/components/auth/password-field";
import { Alert } from "@/components/ui/alert";

const initialState: AuthFormState = {};

type LoginFormProps = {
  authError?: string;
};

export function LoginForm({ authError }: LoginFormProps) {
  const emailId = useId();
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <AuthShell
      title="다시 오신 것을 환영합니다"
      description="이메일로 로그인하고 오늘 할 일을 이어서 정리하세요."
      footer={
        <>
          아직 계정이 없나요?{" "}
          <Link
            href="/signup"
            className="cursor-pointer font-semibold text-primary transition-colors duration-200 hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            회원가입
          </Link>
        </>
      }
    >
      <form action={formAction} className="flex flex-col gap-5">
        {(state.error || authError) && (
          <Alert tone="error">
            {state.error ?? "인증에 실패했습니다. 다시 로그인해 주세요."}
          </Alert>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className="text-sm font-medium text-foreground">
            이메일
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground transition-colors duration-200 placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="you@example.com"
            defaultValue={state.email}
          />
        </div>

        <PasswordField autoComplete="current-password" />

        <button
          type="submit"
          disabled={pending}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cta px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-cta-hover focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending && (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          로그인
        </button>
      </form>
    </AuthShell>
  );
}
