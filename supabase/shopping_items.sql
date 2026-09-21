-- supabase/shopping_items.sql
-- kr.ulsan.ldh.todolist
-- 이미 todos 테이블을 만든 프로젝트는 이 파일만 SQL Editor에서 실행합니다.

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
