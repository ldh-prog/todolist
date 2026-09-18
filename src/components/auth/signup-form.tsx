// src/components/auth/signup-form.tsx
"use client";

import { useActionState, useId } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { signUpAction, type AuthFormState } from "@/actions/auth";
import { AuthShell } from "@/components/auth/auth-shell";
import { PasswordField } from "@/components/auth/password-field";
import { Alert } from "@/components/ui/alert";

const initialState: AuthFormState = {};

export function SignupForm() {
  const emailId = useId();
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState,
  );

  return (
    <AuthShell
      title="할 일을 더 가볍게"
      description="2분 안에 가입하고, 나만 볼 수 있는 목록을 만드세요."
      footer={
        <>
          이미 계정이 있나요?{" "}
          <Link
            href="/login"
            className="cursor-pointer font-semibold text-primary transition-colors duration-200 hover:text-primary-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            로그인
          </Link>
        </>
      }
    >
      <form action={formAction} className="flex flex-col gap-5">
        {state.error && <Alert tone="error">{state.error}</Alert>}
        {state.success && <Alert tone="success">{state.success}</Alert>}

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

        <PasswordField autoComplete="new-password" />

        <button
          type="submit"
          disabled={pending}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cta px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-cta-hover focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending && (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          회원가입
        </button>
      </form>
    </AuthShell>
  );
}
