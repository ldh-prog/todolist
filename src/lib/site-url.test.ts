// src/lib/site-url.test.ts
import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "@/lib/site-url";

describe("resolveSiteUrl", () => {
  it("요청 Origin을 최우선으로 사용한다", () => {
    expect(
      resolveSiteUrl({
        origin: "https://todolist-coral-rho-45.vercel.app/",
        explicit: "http://localhost:3000",
      }),
    ).toBe("https://todolist-coral-rho-45.vercel.app");
  });

  it("Origin이 없으면 forwarded host를 사용한다", () => {
    expect(
      resolveSiteUrl({
        host: "todolist-coral-rho-45.vercel.app",
        proto: "https",
      }),
    ).toBe("https://todolist-coral-rho-45.vercel.app");
  });

  it("배포 URL이 없으면 명시적 SITE_URL을 사용한다", () => {
    expect(
      resolveSiteUrl({
        explicit: "https://todolist-coral-rho-45.vercel.app",
      }),
    ).toBe("https://todolist-coral-rho-45.vercel.app");
  });

  it("Vercel 배포 호스트로 보정한다", () => {
    expect(resolveSiteUrl({ vercelUrl: "todolist-xxx.vercel.app" })).toBe(
      "https://todolist-xxx.vercel.app",
    );
  });

  it("아무 값도 없으면 로컬 기본값을 사용한다", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });
});
