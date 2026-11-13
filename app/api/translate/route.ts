import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { isTeacher } from '@/lib/student-data';
import { aiTranslate } from '@/lib/ai-check';

export const dynamic = 'force-dynamic';

// Перекладач для пульта вчителя (учень його не бачить).
// GET /api/translate?q=текст&to=uk|ru → { text, alt[], via }
// 1) DeepL, якщо в Vercel є DEEPL_API_KEY; 2) інакше ІІ для слів і MyMemory для фраз.
// Якщо текст кирилицею, перекладаємо на англійську.
const CYR = /[А-Яа-яЁёІіЇїЄєҐґ]/;

async function deepl(q: string, target: string) {
  const key = process.env.DEEPL_API_KEY;
  if (!key) return null;
  const host = key.endsWith(':fx') ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
  try {
    const r = await fetch(`${host}/v2/translate`, {
      method: 'POST',
      headers: { Authorization: `DeepL-Auth-Key ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ text: [q], target_lang: target }),
      signal: AbortSignal.timeout(7000),
    });
    if (!r.ok) return null;
    const j = await r.json() as { translations?: { text: string }[] };
    return j.translations?.[0]?.text?.trim() || null;
  } catch { return null; }
}

async function mymemory(q: string, from: string, to: string) {
  try {
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${from}|${to}`, { next: { revalidate: 86400 } });
    const j = await r.json() as { responseData?: { translatedText?: string } };
    const t = (j.responseData?.translatedText ?? '').trim();
    return !t || /MYMEMORY|QUERY LENGTH|INVALID/i.test(t) ? null : t;
  } catch { return null; }
}

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId || !(await isTeacher(userId))) return NextResponse.json({ error: 'teachers only' }, { status: 403 });
  const u = new URL(req.url);
  const q = (u.searchParams.get('q') || '').trim().slice(0, 500);
  const to = u.searchParams.get('to') === 'ru' ? 'ru' : 'uk';
  if (!q) return NextResponse.json({ text: '' });
  const toEn = CYR.test(q);

  const d = await deepl(q, toEn ? 'EN-GB' : to.toUpperCase());
  if (d) return NextResponse.json({ text: d, alt: [], via: 'DeepL' });

  const oneWord = !toEn && q.split(/\s+/).length <= 3;
  const [ai, mm] = await Promise.all([
    oneWord ? aiTranslate(q, to) : Promise.resolve(null),
    mymemory(q, toEn ? (to === 'ru' ? 'ru' : 'uk') : 'en', toEn ? 'en' : to),
  ]);
  const list = [...(ai ?? []), ...(mm ? [mm] : [])].filter((x, i, a) => a.findIndex((y) => y.toLowerCase() === x.toLowerCase()) === i);
  return NextResponse.json({ text: list[0] ?? '', alt: list.slice(1, 4), via: ai?.length ? 'AI' : 'MyMemory' });
}
