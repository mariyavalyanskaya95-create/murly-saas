import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { isTeacher } from '@/lib/student-data';

// «Додати слово в словник»: учитель додає слово будь-якому своєму учню, учень собі.
// GET: хто я і кому можна додати. GET ?tr=слово&to=uk|ru: підказка перекладу. POST: додати слово.
export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;
const EN = /^[A-Za-z][A-Za-z'’ -]{0,48}$/;

async function translate(word: string, to: string) {
  try {
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${enc(word)}&langpair=en|${to === 'ru' ? 'ru' : 'uk'}`, { next: { revalidate: 86400 } });
    const j = await r.json() as { responseData?: { translatedText?: string }; responseStatus?: number };
    const t = (j.responseData?.translatedText ?? '').trim().replace(/[.!?;:]+$/, '').trim();
    // сервіс іноді повертає те саме слово або повідомлення про ліміт
    if (!t || t.toLowerCase() === word.toLowerCase() || /MYMEMORY|QUERY LENGTH|INVALID/i.test(t)) return '';
    return t.toLowerCase() === t ? t : t.charAt(0).toLowerCase() + t.slice(1);
  } catch { return ''; }
}

export async function GET(req: Request) {
  const { userId } = await auth();
  const url = new URL(req.url);
  const tr = url.searchParams.get('tr');
  if (tr) {
    if (!userId || !EN.test(tr)) return NextResponse.json({ text: '' });
    return NextResponse.json({ text: await translate(tr, url.searchParams.get('to') ?? 'uk') });
  }
  if (!userId || !dbReady()) return NextResponse.json({ role: 'guest' });
  if (await isTeacher(userId)) {
    const rows = await db.query(`students?teacher_id=eq.${enc(userId)}&select=id,name&order=name.asc`).catch(() => []);
    return NextResponse.json({ role: 'teacher', students: rows.map((r) => ({ id: String(r.id), name: String(r.name ?? '') })) });
  }
  const mine = await db.query(`students?user_id=eq.${enc(userId)}&select=id,name,teacher_id`).catch(() => []);
  if (!mine.length) return NextResponse.json({ role: 'guest' });
  return NextResponse.json({ role: 'student', students: mine.map((r) => ({ id: String(r.id), name: String(r.name ?? '') })) });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId || !dbReady()) return NextResponse.json({ error: 'auth' }, { status: 401 });
  const b = await req.json().catch(() => ({})) as { studentId?: string; en?: string; uk?: string; example?: string };
  const en = String(b.en ?? '').trim().replace(/\s+/g, ' ');
  const uk = String(b.uk ?? '').trim().slice(0, 120);
  if (!b.studentId || !EN.test(en)) return NextResponse.json({ error: 'bad' }, { status: 400 });
  // учень належить цьому вчителю, або це сам учень
  const own = await db.query(`students?id=eq.${enc(b.studentId)}&select=id,teacher_id,user_id`).catch(() => []);
  const st = own[0];
  if (!st || (st.teacher_id !== userId && st.user_id !== userId)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const dup = await db.query(`words?student_id=eq.${enc(b.studentId)}&en=ilike.${enc(en)}&select=id&limit=1`).catch(() => []);
  if (dup.length) return NextResponse.json({ ok: true, dup: true });
  await db.insert('words', [{ id: randomUUID(), teacher_id: st.teacher_id, student_id: b.studentId, en, uk: uk || '…', example: b.example ? String(b.example).slice(0, 240) : null, at: new Date().toISOString() }]);
  return NextResponse.json({ ok: true });
}
