-- supabase/schema.sql
-- kr.ulsan.ldh.todolist
-- Supabase Dashboard > SQL Editor 에서 전체 실행합니다.

create extension if not exists "pgcrypto";

create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  is_completed boolean not null default false,
  due_at timestamptz,
  remind_at timestamptz,
  reminder_fired_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  constraint todos_title_not_empty check (char_length(btrim(title)) > 0),
  constraint todos_title_max_length check (char_length(title) <= 200)
);

alter table public.todos
  add column if not exists due_at timestamptz,
  add column if not exists remind_at timestamptz,
  add column if not exists reminder_fired_at timestamptz;

create index if not exists todos_user_id_created_at_idx
  on public.todos (user_id, created_at desc);

create index if not exists todos_user_id_remind_at_idx
  on public.todos (user_id, remind_at)
  where remind_at is not null;

create index if not exists todos_user_id_due_at_idx
  on public.todos (user_id, due_at)
  where due_at is not null;

alter table public.todos enable row level security;

drop policy if exists "todos_select_own" on public.todos;
drop policy if exists "todos_insert_own" on public.todos;
drop policy if exists "todos_update_own" on public.todos;
drop policy if exists "todos_delete_own" on public.todos;

create policy "todos_select_own"
  on public.todos
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "todos_insert_own"
  on public.todos
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "todos_update_own"
  on public.todos
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "todos_delete_own"
  on public.todos
  for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.todos to authenticated;

-- 장보기 목록. 이미 todos만 만들어 둔 프로젝트는 shopping_items.sql 만 실행해도 됩니다.
create table if not exists public.shopping_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  quantity integer not null default 1,
  category text not null default 'other',
  is_purchased boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  constraint shopping_items_name_not_empty check (char_length(btrim(name)) > 0),
  constraint shopping_items_name_max_length check (char_length(name) <= 200),
  constraint shopping_items_quantity_range check (quantity >= 1 and quantity <= 99),
  constraint shopping_items_category_allowed check (
    category in ('produce', 'fruit', 'protein', 'dairy', 'household', 'other')
  )
);

create index if not exists shopping_items_user_id_created_at_idx
  on public.shopping_items (user_id, created_at desc);

create index if not exists shopping_items_user_id_category_idx
  on public.shopping_items (user_id, category);

alter table public.shopping_items enable row level security;

drop policy if exists "shopping_items_select_own" on public.shopping_items;
drop policy if exists "shopping_items_insert_own" on public.shopping_items;
drop policy if exists "shopping_items_update_own" on public.shopping_items;
drop policy if exists "shopping_items_delete_own" on public.shopping_items;

create policy "shopping_items_select_own"
  on public.shopping_items
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "shopping_items_insert_own"
  on public.shopping_items
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "shopping_items_update_own"
  on public.shopping_items
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "shopping_items_delete_own"
  on public.shopping_items
  for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.shopping_items to authenticated;
