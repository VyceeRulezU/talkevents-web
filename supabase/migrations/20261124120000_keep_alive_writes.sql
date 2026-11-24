-- Keep-alive, version 2.
--
-- Supabase still flagged the project as inactive while it was answering a
-- read-only `select now()` twice a week, so each ping now WRITES a row: a real
-- insert is unambiguous database activity. The table also records who pinged
-- and when, so it shows whether each scheduled job is actually running:
--
--   select source, max(pinged_at), count(*) from public.keep_alive_pings group by 1;
--
-- Callers: the Cloudflare Worker's daily cron (source 'cloudflare') and the
-- GitHub Actions workflow (source 'github'). Rows older than 60 days are
-- removed on each ping, so the table stays tiny.

create table if not exists public.keep_alive_pings (
  id        bigint generated always as identity primary key,
  pinged_at timestamptz not null default now(),
  source    text not null check (char_length(source) between 1 and 40)
);

comment on table public.keep_alive_pings is 'One row per scheduled keep-alive ping. Written only through public.keep_alive().';

-- Nobody reads or writes this table directly; only the function below does.
alter table public.keep_alive_pings enable row level security;
revoke all on public.keep_alive_pings from anon, authenticated;

-- Replace the read-only version from 20261008160000_keep_alive.sql.
drop function if exists public.keep_alive();

create or replace function public.keep_alive(source text default 'unknown')
returns timestamptz
language plpgsql
volatile
security definer
set search_path = ''
as $$
begin
  insert into public.keep_alive_pings (source)
  values (left(coalesce(nullif(trim(source), ''), 'unknown'), 40));

  delete from public.keep_alive_pings where pinged_at < now() - interval '60 days';

  return now();
end;
$$;

comment on function public.keep_alive(text) is 'Called daily by scheduled jobs so Supabase never pauses the project for inactivity.';

revoke all on function public.keep_alive(text) from public;
grant execute on function public.keep_alive(text) to anon, authenticated;
