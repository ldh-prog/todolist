# Vercel 배포 노트

**Package:** `kr.ulsan.ldh.todolist`  
**Date:** 2026-09-18  
**Production:** https://todolist-coral-rho-45.vercel.app  
**GitHub:** https://github.com/ldh-prog/todolist

## Purpose

GitHub 저장소를 Vercel에 연결하고, Supabase 공개 환경 변수와 인증 리다이렉트 URL을 프로덕션에 맞춘다.

## Scope

- Vercel Environment Variables 3개
- `NEXT_PUBLIC_SITE_URL` 및 요청 Origin 기반 사이트 URL 해석
- Supabase Site URL / Redirect URLs

## Decisions

| 결정 | 이유 |
|------|------|
| `resolveSiteUrl()`이 Origin → Host → SITE_URL → VERCEL_URL 순 | Preview 배포와 프로덕션 도메인이 달라도 인증 메일이 깨지지 않게 한다 |
| SITE_URL은 Production에 명시 | 이메일의 기본 링크를 안정적인 프로덕션 도메인으로 둔다 |
| localhost callback도 Redirect URLs에 유지 | 로컬 개발과 배포를 동시에 쓴다 |

## Risks

- `NEXT_PUBLIC_*`를 배포 후에 넣으면 이전 빌드에는 값이 없다. 반드시 Redeploy.
- Confirm email이 켜져 있으면 프로덕션 가입도 메일 인증이 필요하다.
- `todos` 테이블이 없으면 로그인은 되고 목록은 SetupRequired 화면이 나온다.

## Follow-ups

- 커스텀 도메인을 붙이면 `NEXT_PUBLIC_SITE_URL`과 Supabase Redirect URLs를 함께 바꾼다.
