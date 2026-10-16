create table if not exists public.course_entitlements (
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  stripe_checkout_session_id text not null unique,
  granted_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

alter table public.course_entitlements enable row level security;

grant select on public.course_entitlements to authenticated;

create policy "Users can view their own course entitlements"
  on public.course_entitlements
  for select
  to authenticated
  using (auth.uid() = user_id);
