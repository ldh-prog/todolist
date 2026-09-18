# TodoList 구현 노트

**Package:** `kr.ulsan.ldh.todolist`  
**Date:** 2026-09-18

## Purpose

Vercel + Supabase 생태계에서 동작하는 개인 할 일 목록을 처음부터 구성한다. 인증, CRUD, RLS, 필터, 배포 가이드를 한 저장소에 모은다.

## Scope

- 이메일/비밀번호 인증
- 본인 데이터만 보이는 `todos` CRUD
- All / Active / Completed 탭
- SSR 세션 처리 (Next.js 16 `proxy.ts`)
- ui-ux-pro-max 기반 라이트 테마 UI

## Key changes

- Server Component(`src/app/page.tsx`)가 초기 목록을 가져오고, Client Component(`TodoApp`)가 필터와 낙관적 업데이트를 담당한다.
- Mutation은 Server Action으로 처리해 API Route 남발을 피한다.
- `user_id`는 폼이 아니라 `supabase.auth.getUser()` 결과로만 저장한다.

## Decisions

| 결정 | 이유 | 대안 |
|------|------|------|
| Next.js 16 `proxy.ts` | `middleware.ts`는 16에서 deprecated | Edge middleware 유지 (비권장) |
| `@supabase/ssr` | 쿠키 세션을 App Router와 맞추기 위함 | 브라우저 전용 supabase-js만 사용 (SSR 깨짐) |
| 클라이언트 필터 | 탭 전환이 즉시 반응해야 함 | 매번 서버 쿼리 (느리고 단순) |
| Flat Design + teal/orange | ui-ux-pro-max 생산성 SaaS 추천 | 다크 대시보드 (할 일 앱에는 과함) |

## Dependencies

- `next`, `react`, `react-dom`
- `@supabase/supabase-js`, `@supabase/ssr`
- `lucide-react`
- `vitest` (단위 테스트)

## Risks

- Supabase Email Confirm이 켜져 있으면 가입 직후 세션이 없을 수 있다. UI는 인증 메일 안내를 보여 준다.
- `todos` 테이블을 만들기 전에 로그인하면 `SetupRequired` 화면이 나온다. `supabase/schema.sql`을 실행해야 한다.
- `NEXT_PUBLIC_SITE_URL`이 배포 도메인과 다르면 이메일 매직 링크가 실패한다.

## Follow-ups

- 필요하면 Google OAuth, 마감일, 드래그 정렬을 추가한다.
- Supabase CLI 연동 후 CI에서 타입 생성(`database.types.ts`)을 자동화할 수 있다.
