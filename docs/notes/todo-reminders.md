# 할 일 알림 노트

**Package:** `kr.ulsan.ldh.todolist`  
**Date:** 2026-09-21  
**Route:** `/`

## Purpose

할 일에 기한과 알림 시각을 붙여, 앱이 열려 있는 동안 브라우저 알림과 화면 배너로 알려 준다.

## Scope

- `todos.due_at`, `todos.remind_at`, `todos.reminder_fired_at`
- 추가/수정 폼의 `datetime-local` 입력
- 기한 지남 표시(색 + 텍스트)
- Notification API 권한은 사용자가 허용 버튼을 눌렀을 때만 요청
- 같은 알림이 반복되지 않도록 DB와 sessionStorage에 발송 기록을 남김

## Decisions

| 결정 | 이유 | 대안 |
|------|------|------|
| 브라우저 알림 + 인앱 배너 | 탭이 백그라운드여도 동작하고, 권한을 거절해도 화면에서 볼 수 있다 | 이메일만 |
| Web Push / 서버 크론 없음 | Vercel Hobby 크론은 하루 1회라 분 단위 알림에 맞지 않는다 | Edge Function + pg_cron |
| 알림은 기한보다 늦을 수 없음 | “마감 후에 알려 주기”는 의미가 흐려진다 | 제약 없음 |

## Risks

- 브라우저를 완전히 종료하면 알림이 울리지 않는다. UI에 이 한계를 적어 두었다.
- 기존 DB는 `supabase/todo_reminders.sql`을 실행해야 컬럼이 생긴다.

## Follow-ups

- 앱이 꺼져 있어도 울리려면 Web Push와 별도의 발송 워커가 필요하다.
