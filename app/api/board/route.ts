import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;
const UUID = /^[0-9a-f-]{36}$/i;

// Хто відкриває дошку: вчитель цього учня або сам учень
async function access(userId: string, studentId: string) {
  if (!UUID.test(studentId)) return null;
  const r = await db.query(`students?id=eq.${enc(studentId)}&select=id,teacher_id,user_id`);
  const s = r[0];
  if (!s) return null;
  if (s.teacher_id === userId) return { role: 'teacher' as const, teacherId: String(s.teacher_id) };
  if (s.user_id === userId) return { role: 'student' as const, teacherId: String(s.teacher_id) };
  return null;
}

// GET ?student=ID&since=N → елементи, якщо є новіша версія; &files=a,b → самі картинки
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db' }, { status: 503 });
  const url = new URL(req.url);
  const sid = url.searchParams.get('student') || '';
  const a = await access(userId, sid);
  if (!a) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const fileIds = (url.searchParams.get('files') || '').split(',').filter((x) => /^[\w-]{1,80}$/.test(x)).slice(0, 20);
  if (fileIds.length) {
    const sel = fileIds.map((id) => `f_${id.replace(/-/g, '_')}:files->${id}`).join(',');
    const r = await db.query(`boards?student_id=eq.${enc(sid)}&select=${enc(sel)}`).catch(() => []);
    const out: Record<string, unknown> = {};
    fileIds.forEach((id) => { const v = r[0]?.[`f_${id.replace(/-/g, '_')}`]; if (v) out[id] = v; });
    return NextResponse.json({ files: out });
  }
  const since = Number(url.searchParams.get('since') || -1);
  const v = await db.query(`boards?student_id=eq.${enc(sid)}&select=version`).catch(() => []);
  const version = Number(v[0]?.version ?? 0);
  if (version <= since) return NextResponse.json({ version, role: a.role });
  const r = await db.query(`boards?student_id=eq.${enc(sid)}&select=elements,version,file_ids`).catch(() => []);
  const ids = (r[0]?.file_ids as string[] | null) ?? [];
  return NextResponse.json({ version: Number(r[0]?.version ?? 0), elements: r[0]?.elements ?? [], fileIds: ids, role: a.role });
}

// POST { student, elements: змінені, files: нові } → атомарне злиття
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'auth' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db' }, { status: 503 });
  const body = await req.json().catch(() => null) as { student?: string; elements?: unknown[]; files?: Record<string, { dataURL?: string; mimeType?: string; id?: string; created?: number }> } | null;
  const sid = String(body?.student || '');
  const a = await access(userId, sid);
  if (!a) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const els = Array.isArray(body?.elements) ? body!.elements.slice(0, 2000) : [];
  const files: Record<string, unknown> = {};
  Object.entries(body?.files ?? {}).slice(0, 10).forEach(([id, f]) => {
    if (/^[\w-]{1,80}$/.test(id) && f && typeof f.dataURL === 'string' && f.dataURL.length < 4_000_000 && /^data:image\//.test(f.dataURL)) files[id] = { id, dataURL: f.dataURL, mimeType: f.mimeType, created: f.created ?? Date.now() };
  });
  if (JSON.stringify(els).length > 3_000_000) return NextResponse.json({ error: 'too_big' }, { status: 413 });
  try {
    const version = await db.rpc('board_merge', { p_student: sid, p_teacher: a.teacherId, p_elements: els, p_files: files });
    return NextResponse.json({ version: Number(version) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}
