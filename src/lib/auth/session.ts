// src/lib/auth/session.ts
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, user: null, error: "로그인이 필요합니다." as const };
  }

  return { supabase, user, error: null };
}
