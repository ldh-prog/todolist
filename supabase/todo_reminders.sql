-- supabase/todo_reminders.sql
-- kr.ulsan.ldh.todolist
-- 이미 todos 테이블이 있는 프로젝트는 이 파일만 SQL Editor에서 실행합니다.

alter table public.todos
  add column if not exists due_at timestamptz,
  add column if not exists remind_at timestamptz,
  add column if not exists reminder_fired_at timestamptz;

create index if not exists todos_user_id_remind_at_idx
  on public.todos (user_id, remind_at)
  where remind_at is not null;

create index if not exists todos_user_id_due_at_idx
  on public.todos (user_id, due_at)
  where due_at is not null;
