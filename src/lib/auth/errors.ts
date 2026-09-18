// src/lib/auth/errors.ts
export function mapAuthError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }

  if (
    normalized.includes("already registered") ||
    normalized.includes("already been registered") ||
    normalized.includes("user already exists")
  ) {
    return "이미 가입된 이메일입니다.";
  }

  if (normalized.includes("email not confirmed")) {
    return "이메일 인증을 완료한 뒤 다시 로그인해 주세요.";
  }

  if (
    normalized.includes("unable to validate email") ||
    normalized.includes("invalid format") ||
    normalized.includes("invalid email")
  ) {
    return "올바른 이메일 형식이 아닙니다.";
  }

  if (normalized.includes("password should be at least")) {
    return "비밀번호는 6자 이상이어야 합니다.";
  }

  if (normalized.includes("rate limit") || normalized.includes("over_email_send_rate_limit")) {
    return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  }

  return "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.";
}
