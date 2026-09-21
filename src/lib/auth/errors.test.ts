// src/lib/auth/errors.test.ts
import { describe, expect, it } from "vitest";
import { mapAuthError } from "@/lib/auth/errors";

describe("mapAuthError", () => {
  it("잘못된 로그인 정보를 한국어로 변환한다", () => {
    expect(mapAuthError("Invalid login credentials")).toBe(
      "이메일 또는 비밀번호가 올바르지 않습니다.",
    );
  });

  it("중복 가입을 한국어로 변환한다", () => {
    expect(mapAuthError("User already registered")).toBe(
      "이미 가입된 이메일입니다.",
    );
  });

  it("이메일 형식 오류를 한국어로 변환한다", () => {
    expect(
      mapAuthError("Unable to validate email address: invalid format"),
    ).toBe("올바른 이메일 형식이 아닙니다.");
  });

  it("이메일 발송 한도를 한국어로 변환한다", () => {
    expect(mapAuthError("email rate limit exceeded")).toBe(
      "인증 메일 발송 한도에 걸렸습니다. 약 1시간 뒤 다시 시도하거나, Supabase Authentication에서 Confirm email을 끄고 테스트하세요.",
    );
  });

  it("알 수 없는 오류는 일반 메시지로 변환한다", () => {
    expect(mapAuthError("something unexpected")).toBe(
      "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    );
  });
});
