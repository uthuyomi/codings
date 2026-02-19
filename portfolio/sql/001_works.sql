-- Supabase schema for "works" used by:
-- - app/api/works (GET/POST)
-- - app/api/works/[id] (GET/PUT/DELETE)
-- - app/works (public list)
-- - app/admin/works (admin CRUD)

begin;

-- For gen_random_uuid()
create extension if not exists "pgcrypto";

-- Updated-at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.works (
  id uuid primary key default gen_random_uuid(),

  -- Multi-language fields: { "ja": "...", "en": "..." }
  title jsonb not null check (jsonb_typeof(title) = 'object'),
  description jsonb not null check (jsonb_typeof(description) = 'object'),

  pcimg text not null,
  spimg text not null,

  link text not null,
  github text null,

  skill text[] not null default '{}'::text[],

  is_published boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.works is 'Portfolio works/projects (ja/en in jsonb).';

drop trigger if exists works_set_updated_at on public.works;
create trigger works_set_updated_at
before update on public.works
for each row
execute function public.set_updated_at();

create index if not exists works_published_created_at_idx
  on public.works (is_published, created_at desc);

create index if not exists works_updated_at_idx
  on public.works (updated_at desc);

-- Row Level Security (RLS)
alter table public.works enable row level security;

-- Public can read only published works (anon)
drop policy if exists "public read published works" on public.works;
create policy "public read published works"
on public.works
for select
to anon
using (is_published = true);

-- Logged-in users can read drafts too (authenticated)
drop policy if exists "authenticated read all works" on public.works;
create policy "authenticated read all works"
on public.works
for select
to authenticated
using (true);

-- Logged-in users can manage works (adjust to your needs)
drop policy if exists "authenticated insert works" on public.works;
create policy "authenticated insert works"
on public.works
for insert
to authenticated
with check (true);

drop policy if exists "authenticated update works" on public.works;
create policy "authenticated update works"
on public.works
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated delete works" on public.works;
create policy "authenticated delete works"
on public.works
for delete
to authenticated
using (true);

commit;

