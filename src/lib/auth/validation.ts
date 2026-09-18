// src/lib/auth/validation.ts
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailValidationResult =
  | { ok: true; email: string }
  | { ok: false; error: string };

export type PasswordValidationResult =
  | { ok: true; password: string }
  | { ok: false; error: string };

export function validateEmail(email: string): EmailValidationResult {
  const normalized = email.trim().toLowerCase();

  if (!normalized) {
    return { ok: false, error: "이메일을 입력해 주세요." };
  }

  if (!EMAIL_PATTERN.test(normalized)) {
    return { ok: false, error: "올바른 이메일 형식이 아닙니다." };
  }

  return { ok: true, email: normalized };
}

export function validatePassword(password: string): PasswordValidationResult {
  if (!password) {
    return { ok: false, error: "비밀번호를 입력해 주세요." };
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      ok: false,
      error: `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
    };
  }

  return { ok: true, password };
}
