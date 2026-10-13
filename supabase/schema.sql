-- Murly: схема бази для кабінету вчителя
-- Вхід робить Clerk, тому teacher_id = id користувача Clerk (текст).
-- Доступ до таблиць тільки з сервера Murly (service role), з браузера напряму не можна (RLS увімкнено без політик).

create table if not exists teacher_settings (
  teacher_id text primary key,
  name text not null default '',
  link text not null default '',
  link_kind text not null default 'zoom',
  updated_at timestamptz not null default now()
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  teacher_id text not null,
  name text not null,
  level text not null default 'A2',
  price integer not null default 0,
  contact text,
  parent text,
  link text,
  color text not null default 'lime',
  created_at timestamptz not null default now()
);
create index if not exists students_teacher_idx on students (teacher_id);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  teacher_id text not null,
  student_id uuid not null references students(id) on delete cascade,
  start timestamptz not null,
  duration integer not null default 60,
  topic text,
  link text,
  status text not null default 'planned' check (status in ('planned', 'done', 'cancelled'))
);
create index if not exists lessons_teacher_idx on lessons (teacher_id, start);

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  teacher_id text not null,
  student_id uuid not null references students(id) on delete cascade,
  text text not null,
  at timestamptz not null default now()
);
create index if not exists notes_teacher_idx on notes (teacher_id);

create table if not exists words (
  id uuid primary key default gen_random_uuid(),
  teacher_id text not null,
  student_id uuid not null references students(id) on delete cascade,
  en text not null,
  uk text not null,
  example text,
  at timestamptz not null default now()
);
create index if not exists words_teacher_idx on words (teacher_id);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  teacher_id text not null,
  student_id uuid not null references students(id) on delete cascade,
  amount integer not null,
  note text,
  at timestamptz not null default now()
);
create index if not exists payments_teacher_idx on payments (teacher_id);

alter table teacher_settings enable row level security;
alter table students enable row level security;
alter table lessons enable row level security;
alter table notes enable row level security;
alter table words enable row level security;
alter table payments enable row level security;
