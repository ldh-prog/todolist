// src/actions/auth.ts
"use server";

import { redirect } from "next/navigation";
import { mapAuthError } from "@/lib/auth/errors";
import { validateEmail, validatePassword } from "@/lib/auth/validation";
import { getSiteUrl } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export type AuthFormState = {
  error?: string;
  success?: string;
  email?: string;
};

function readEmail(formData: FormData): string {
  return String(formData.get("email") ?? "").trim();
}

export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const rawEmail = readEmail(formData);
  const emailResult = validateEmail(rawEmail);
  if (!emailResult.ok) {
    return { error: emailResult.error, email: rawEmail };
  }

  const passwordResult = validatePassword(
    String(formData.get("password") ?? ""),
  );
  if (!passwordResult.ok) {
    return { error: passwordResult.error, email: emailResult.email };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: emailResult.email,
    password: passwordResult.password,
  });

  if (error) {
    return { error: mapAuthError(error.message), email: emailResult.email };
  }

  redirect("/");
}

export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const rawEmail = readEmail(formData);
  const emailResult = validateEmail(rawEmail);
  if (!emailResult.ok) {
    return { error: emailResult.error, email: rawEmail };
  }

  const passwordResult = validatePassword(
    String(formData.get("password") ?? ""),
  );
  if (!passwordResult.ok) {
    return { error: passwordResult.error, email: emailResult.email };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: emailResult.email,
    password: passwordResult.password,
    options: {
      emailRedirectTo: `${await getSiteUrl()}/auth/callback`,
    },
  });

  if (error) {
    return { error: mapAuthError(error.message), email: emailResult.email };
  }

  if (data.session) {
    redirect("/");
  }

  return {
    success:
      "가입이 완료되었습니다. 이메일의 인증 링크를 확인한 뒤 로그인해 주세요.",
    email: emailResult.email,
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
