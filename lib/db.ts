// Серверний доступ до Supabase (PostgREST) без зайвих бібліотек.
// Ключ service role живе тільки на сервері (змінні середовища Vercel).
const URL_ = process.env.SUPABASE_URL || '';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const dbReady = () => Boolean(URL_ && KEY);

function headers(extra: Record<string, string> = {}) {
  const h: Record<string, string> = { apikey: KEY, 'Content-Type': 'application/json', ...extra };
  if (KEY.startsWith('eyJ')) h.Authorization = `Bearer ${KEY}`; // старий формат ключа (JWT)
  return h;
}

async function call(path: string, init: RequestInit & { prefer?: string } = {}) {
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    headers: headers(init.prefer ? { Prefer: init.prefer } : {}),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`DB ${res.status}: ${await res.text().catch(() => '')}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const enc = encodeURIComponent;

export const db = {
  // довільний запит з фільтрами PostgREST, напр. "students?user_id=eq.X&select=*"
  query: (path: string) => call(path) as Promise<Record<string, unknown>[]>,
  patchWhere: (path: string, patch: Record<string, unknown>) =>
    call(path, { method: 'PATCH', body: JSON.stringify(patch), prefer: 'return=minimal' }),
  select: (table: string, teacherId: string, extra = '') =>
    call(`${table}?teacher_id=eq.${enc(teacherId)}&select=*${extra}`) as Promise<Record<string, unknown>[]>,
  insert: (table: string, rows: Record<string, unknown>[]) =>
    rows.length ? call(table, { method: 'POST', body: JSON.stringify(rows), prefer: 'return=minimal' }) : Promise.resolve(null),
  upsert: (table: string, rows: Record<string, unknown>[]) =>
    call(table, { method: 'POST', body: JSON.stringify(rows), prefer: 'resolution=merge-duplicates,return=minimal' }),
  update: (table: string, teacherId: string, id: string, patch: Record<string, unknown>) =>
    call(`${table}?id=eq.${enc(id)}&teacher_id=eq.${enc(teacherId)}`, { method: 'PATCH', body: JSON.stringify(patch), prefer: 'return=minimal' }),
  remove: (table: string, teacherId: string, id: string) =>
    call(`${table}?id=eq.${enc(id)}&teacher_id=eq.${enc(teacherId)}`, { method: 'DELETE', prefer: 'return=minimal' }),
};
