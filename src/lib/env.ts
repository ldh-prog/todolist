// src/lib/env.ts
import { headers } from "next/headers";
import { resolveSiteUrl } from "@/lib/site-url";

function requiredPublicEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} 환경 변수가 없습니다. .env.local 과 Vercel Project Settings를 확인하세요.`,
    );
  }

  return value;
}

export function getSupabasePublicEnv() {
  return {
    url: requiredPublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: requiredPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  };
}

export async function getSiteUrl() {
  try {
    const headerList = await headers();
    return resolveSiteUrl({
      origin: headerList.get("origin"),
      host: headerList.get("x-forwarded-host") ?? headerList.get("host"),
      proto: headerList.get("x-forwarded-proto"),
      explicit: process.env.NEXT_PUBLIC_SITE_URL,
      vercelUrl: process.env.VERCEL_URL,
    });
  } catch {
    return resolveSiteUrl({
      explicit: process.env.NEXT_PUBLIC_SITE_URL,
      vercelUrl: process.env.VERCEL_URL,
    });
  }
}
