-- Enquiries sent from the website's contact and booking forms.
--
-- The website writes here with the PUBLISHABLE key, straight from the visitor's
-- browser, so the rules below matter: the public may add a row and nothing
-- else. Reading, changing and deleting are for the team only (Supabase
-- dashboard, or server code using the secret key).

create table if not exists public.enquiries (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  -- Who is asking
  name              text not null check (char_length(name) between 1 and 200),
  phone             text not null check (char_length(phone) between 3 and 40),
  email             text check (email is null or char_length(email) <= 200),

  -- What they are planning
  event_type        text check (event_type is null or char_length(event_type) <= 100),
  event_date        date,
  guests            text check (guests is null or char_length(guests) <= 50),
  area              text check (area is null or char_length(area) <= 200),
  budget            text check (budget is null or char_length(budget) <= 100),
  message           text check (message is null or char_length(message) <= 5000),

  marketing_consent boolean not null default false,
  -- Which page the form was on (/contact, /book, ...)
  page              text check (page is null or char_length(page) <= 200),

  -- For the team: new -> contacted -> booked / closed
  status            text not null default 'new' check (status in ('new', 'contacted', 'booked', 'closed')),
  notes             text
);

comment on table public.enquiries is 'Enquiries submitted through talkevents.ng. Public may insert only.';

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

alter table public.enquiries enable row level security;

-- The public (anon) role may add an enquiry, but may not set the team's fields.
drop policy if exists "Anyone can submit an enquiry" on public.enquiries;
create policy "Anyone can submit an enquiry"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (status = 'new' and notes is null);

-- No select / update / delete policy: with row level security on, that means
-- the public cannot read, change or remove enquiries.
revoke all on public.enquiries from anon, authenticated;
grant insert on public.enquiries to anon, authenticated;
