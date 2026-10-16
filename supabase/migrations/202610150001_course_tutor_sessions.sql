create table if not exists public.course_tutor_sessions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  stripe_checkout_session_id text not null unique,
  scheduled_at text not null,
  created_at timestamptz not null default now()
);

create index if not exists course_tutor_sessions_user_id_idx
  on public.course_tutor_sessions (user_id);

alter table public.course_tutor_sessions enable row level security;
