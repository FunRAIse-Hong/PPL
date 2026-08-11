-- ============================================================
--  PPL 訓練紀錄 — Supabase 建置腳本
--  用法：Supabase 後台 → SQL Editor → 貼上全部 → Run
-- ============================================================

-- 1. 資料表：一列 = 某人、某天、某動作、某一組
create table if not exists public.workout_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid()
              references auth.users(id) on delete cascade,
  log_date    date        not null,
  day_key     text        not null check (day_key in ('A','B','C')),
  exercise    text        not null,
  set_no      smallint    not null check (set_no between 1 and 6),
  weight      numeric(6,2),
  reps        smallint,
  rir         smallint,
  note        text,
  created_at  timestamptz not null default now(),
  -- 同一人同一天同一動作的同一組只會有一列，重存不會產生重複資料
  unique (user_id, log_date, day_key, exercise, set_no)
);

-- 2. 索引：查「這個人這個分項最近的紀錄」會用到
create index if not exists workout_logs_lookup
  on public.workout_logs (user_id, day_key, log_date desc);

-- 3. 開啟 RLS（Row Level Security，資料列層級權限）
--    這一行是整份腳本最重要的一行。沒有它，任何人都能讀到所有人的資料。
alter table public.workout_logs enable row level security;

-- 4. 權限規則：只能碰 user_id 等於自己的資料列
--    auth.uid() 是 Supabase 從登入憑證解出來的使用者 ID，前端偽造不了
drop policy if exists "read own rows"   on public.workout_logs;
drop policy if exists "insert own rows" on public.workout_logs;
drop policy if exists "update own rows" on public.workout_logs;
drop policy if exists "delete own rows" on public.workout_logs;

create policy "read own rows" on public.workout_logs
  for select using (auth.uid() = user_id);

create policy "insert own rows" on public.workout_logs
  for insert with check (auth.uid() = user_id);

create policy "update own rows" on public.workout_logs
  for update using (auth.uid() = user_id)
              with check (auth.uid() = user_id);

create policy "delete own rows" on public.workout_logs
  for delete using (auth.uid() = user_id);

-- 5. 明確授權給已登入角色
--    2026/5/30 之後建立的新專案必須加這段，否則 API 讀不到資料表
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.workout_logs to authenticated;

-- ============================================================
--  驗證：跑完後在 SQL Editor 執行下面這行，應該看到 rowsecurity = true
--  select relname, relrowsecurity from pg_class where relname = 'workout_logs';
-- ============================================================
