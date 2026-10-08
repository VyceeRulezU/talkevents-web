-- Tell the team about each new enquiry.
--
-- When a row is added to public.enquiries, the database calls the website's
-- /api/enquiry-notify endpoint (apps/web/worker/index.js), which sends the
-- email and WhatsApp alerts. The call is made in the background by pg_net, so
-- a slow or failing alert never delays or blocks the visitor's enquiry.
--
-- The endpoint only accepts calls carrying a shared secret. That secret is NOT
-- in this file: it lives in Supabase Vault under the name
-- 'enquiry_webhook_secret' and, on the Cloudflare side, as the Worker secret
-- ENQUIRY_WEBHOOK_SECRET. To set or rotate it:
--   select vault.create_secret('<value>', 'enquiry_webhook_secret');
--   -- or: select vault.update_secret(id, '<value>') from vault.secrets where name = 'enquiry_webhook_secret';

create extension if not exists pg_net;

create or replace function public.notify_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  secret text;
begin
  select decrypted_secret into secret
    from vault.decrypted_secrets
   where name = 'enquiry_webhook_secret'
   limit 1;

  -- No secret yet: nothing to call. The enquiry is still saved.
  if secret is null then
    return new;
  end if;

  perform net.http_post(
    url := 'https://talkevents.ng/api/enquiry-notify',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-webhook-secret', secret),
    body := jsonb_build_object('record', to_jsonb(new)),
    timeout_milliseconds := 10000
  );
  return new;
exception when others then
  -- An alert must never cost us the enquiry itself.
  raise warning 'notify_new_enquiry failed: %', sqlerrm;
  return new;
end;
$$;

-- Only the trigger should ever run this.
revoke all on function public.notify_new_enquiry() from public, anon, authenticated;

drop trigger if exists enquiries_notify_team on public.enquiries;
create trigger enquiries_notify_team
  after insert on public.enquiries
  for each row execute function public.notify_new_enquiry();
