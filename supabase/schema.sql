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

-- Кабінет учня: запрошення від вчителя
alter table students add column if not exists invite_code text unique;
alter table students add column if not exists user_id text;
create index if not exists students_user_idx on students (user_id);

-- Домашні завдання
create table if not exists homework (
  id uuid primary key default gen_random_uuid(),
  teacher_id text not null,
  student_id uuid not null references students(id) on delete cascade,
  title text not null,
  instructions text,
  kind text not null default 'game' check (kind in ('game', 'text')),
  game text,
  direction text,
  due timestamptz,
  status text not null default 'assigned' check (status in ('assigned', 'done', 'checked')),
  score integer,
  total integer,
  answer text,
  feedback text,
  created_at timestamptz not null default now(),
  done_at timestamptz
);
create index if not exists homework_teacher_idx on homework (teacher_id);
create index if not exists homework_student_idx on homework (student_id);
alter table homework enable row level security;

-- Вправи з автоперевіркою
alter table homework drop constraint if exists homework_kind_check;
alter table homework add constraint homework_kind_check check (kind in ('game', 'text', 'exercise'));
alter table homework add column if not exists items jsonb;
alter table homework add column if not exists answers jsonb;
alter table homework add column if not exists overrides jsonb;

-- Конструктор уроків
create table if not exists lesson_plans (
  id uuid primary key default gen_random_uuid(),
  teacher_id text not null,
  title text not null,
  level text not null default 'A2',
  age text not null default 'teens',
  topic text,
  color text not null default 'lime',
  blocks jsonb not null default '[]',
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists lesson_plans_teacher_idx on lesson_plans (teacher_id);
alter table lesson_plans enable row level security;
alter table homework drop constraint if exists homework_kind_check;
alter table homework add constraint homework_kind_check check (kind in ('game', 'text', 'exercise', 'lesson'));

-- Файли вчителів (картинки, PDF): публічний бакет lesson-files, до 20 МБ
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lesson-files', 'lesson-files', true, 20971520, array['image/png','image/jpeg','image/webp','image/gif','application/pdf'])
on conflict (id) do update set public = true, file_size_limit = 20971520, allowed_mime_types = excluded.allowed_mime_types;

-- Фокус уроку і короткий план
alter table lesson_plans add column if not exists focus jsonb;
alter table lesson_plans add column if not exists aims text;

-- Аудіо для аудіювань
update storage.buckets set allowed_mime_types = array['image/png','image/jpeg','image/webp','image/gif','application/pdf','audio/mpeg','audio/mp4','audio/x-m4a','audio/wav','audio/ogg'] where id = 'lesson-files';
update storage.buckets set allowed_mime_types = array_append(allowed_mime_types, 'audio/webm') where id = 'lesson-files' and not ('audio/webm' = any(allowed_mime_types));
