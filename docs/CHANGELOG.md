# Changelog

## 0.1.1 - 2026-09-18

### Changed

- Vercel 프로덕션 도메인 `todolist-coral-rho-45.vercel.app` 기준으로 배포 가이드를 구체화
- 인증 메일 리다이렉트가 요청 Origin / Vercel URL을 따라가도록 사이트 URL 해석을 보강

## 0.1.0 - 2026-09-18

### Added

- Next.js App Router 기반 할 일 목록 앱 (`kr.ulsan.ldh.todolist`)
- Supabase 이메일/비밀번호 회원가입 및 로그인
- 할 일 추가, 텍스트 수정, 삭제, 완료 토글
- 전체 / 진행 중 / 완료됨 필터
- `todos` 테이블 DDL과 작성자 본인만 접근하는 RLS 정책
- ui-ux-pro-max 디자인 시스템 (Flat Design, teal + orange, Plus Jakarta Sans)
- 필터/유효성 검사 단위 테스트 (Vitest)

### Notes

- Next.js 16에서는 인증 세션 갱신을 `src/proxy.ts`에서 처리합니다.
