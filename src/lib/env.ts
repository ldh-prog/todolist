// src/lib/env.ts
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

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
