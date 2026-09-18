// src/lib/auth/validation.test.ts
import { describe, expect, it } from "vitest";
import { validateEmail, validatePassword } from "@/lib/auth/validation";

describe("validateEmail", () => {
  it("이메일을 소문자로 정규화한다", () => {
    expect(validateEmail("  User@Example.COM ")).toEqual({
      ok: true,
      email: "user@example.com",
    });
  });

  it("빈 값은 거절한다", () => {
    expect(validateEmail(" ")).toEqual({
      ok: false,
      error: "이메일을 입력해 주세요.",
    });
  });

  it("형식이 틀린 값은 거절한다", () => {
    expect(validateEmail("not-an-email")).toEqual({
      ok: false,
      error: "올바른 이메일 형식이 아닙니다.",
    });
  });
});

describe("validatePassword", () => {
  it("6자 이상이면 통과한다", () => {
    expect(validatePassword("secret1")).toEqual({
      ok: true,
      password: "secret1",
    });
  });

  it("짧은 비밀번호는 거절한다", () => {
    expect(validatePassword("123")).toEqual({
      ok: false,
      error: "비밀번호는 6자 이상이어야 합니다.",
    });
  });
});
