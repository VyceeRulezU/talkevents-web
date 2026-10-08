-- Keep-alive.
--
-- Supabase pauses a free project after a week with no activity, which would
-- silently stop the website's enquiry forms. A scheduled job calls this
-- function every day (Cloudflare cron in apps/web/worker/index.js, with a
-- GitHub Actions job as a second line: .github/workflows/keep-alive.yml).
--
-- It runs a real query and returns the database's clock, so a reply proves
-- the database itself is awake, not just the API in front of it.

create or replace function public.keep_alive()
returns timestamptz
language sql
stable
set search_path = ''
as $$
  select now();
$$;

comment on function public.keep_alive() is 'Called daily by scheduled jobs so the project is never paused for inactivity.';

-- Callable with the public (publishable) key. It exposes nothing but the time.
revoke all on function public.keep_alive() from public;
grant execute on function public.keep_alive() to anon, authenticated;
