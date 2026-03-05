-- Add "kind" (work category) and make spimg optional so non-web works (e.g. VSCode extensions)
-- can be represented without forcing a mobile screenshot.

begin;

alter table public.works
  add column if not exists kind text not null default 'web';

alter table public.works
  drop constraint if exists works_kind_check;

alter table public.works
  add constraint works_kind_check
  check (kind in ('web', 'vscode', 'cli', 'library', 'other'));

alter table public.works
  alter column spimg drop not null;

commit;

