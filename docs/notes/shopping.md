# 장보기 기능 노트

**Package:** `kr.ulsan.ldh.todolist`  
**Date:** 2026-09-21  
**Route:** `/shopping`

## Purpose

할 일과 장보기를 같은 체크리스트로 섞지 않는다. 장보기는 수량과 분류가 필요하므로 별도 테이블과 화면으로 둔다.

## Scope

- 상품 추가, 이름/분류 수정, 수량 증감, 담음 토글, 삭제
- 전체 / 살 것 / 담음 필터
- 담은 항목 일괄 삭제
- 분류: 채소, 과일, 육류/수산, 유제품, 생필품, 기타
- RLS: 로그인한 본인 행만 조회·변경

## Key changes

- `public.shopping_items` DDL과 정책은 `supabase/shopping_items.sql`
- 서버 컴포넌트 `src/app/shopping/page.tsx`가 초기 목록을 가져오고, `ShoppingApp`이 필터와 낙관적 업데이트를 담당한다.
- 공통 헤더 `AppHeader`로 할 일/장보기 이동을 제공한다.

## Decisions

| 결정 | 이유 | 대안 |
|------|------|------|
| 별도 테이블 | 할 일에 수량/분류를 억지로 넣으면 스키마가 애매해진다 | todos에 type 컬럼 추가 |
| DB 분류 키는 영어 | 제약 조건과 코드 식별자가 안정적이다 | 한글 카테고리 문자열 |
| 수량 1~99 | 장보기 한 줄에 현실적인 범위 | 무제한 integer |

## Risks

- 기존 프로젝트는 `todos`만 있을 수 있다. 장보기 화면은 테이블이 없으면 `supabase/shopping_items.sql` 실행 안내를 보여 준다.
- Confirm email이 켜져 있으면 로그인 전에 장보기를 확인할 수 없다.

## Follow-ups

- 필요하면 자주 사는 상품 템플릿, 예산 합계를 추가한다.
