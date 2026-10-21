import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { LIBRARY } from '@/lib/library';
import ru1 from '@/lib/content/ru/lessons1.json';
import ru2 from '@/lib/content/ru/lessons2.json';
import ru3 from '@/lib/content/ru/lessons3.json';
import ru4 from '@/lib/content/ru/lessons4.json';
import ru5 from '@/lib/content/ru/lessons5.json';
import ru6 from '@/lib/content/ru/lessons6.json';
import ru7 from '@/lib/content/ru/lessons7.json';
const ruDict: Record<string, string> = { ...ru1, ...ru2, ...ru3, ...ru4, ...ru5, ...ru6, ...ru7 };

export const dynamic = 'force-dynamic';

// Підказки для словника учня: варіанти перекладу і приклади речень.
// 1) наш словник з уроків Murly, 2) MyMemory (переклад), 3) Tatoeba (приклади, CC BY 2.0 FR).
type Ex = { en: string; tr: string };

let local: Map<string, string[]> | null = null;
function localDict() {
  if (local) return local;
  local = new Map();
  for (const p of LIBRARY) for (const b of p.blocks) if (b.type === 'vocab') for (const w of b.words) {
    const k = w.en.toLowerCase().trim();
    if (!k || !w.uk) continue;
    const arr = local.get(k) ?? [];
    if (!arr.includes(w.uk)) arr.push(w.uk);
    local.set(k, arr);
  }
  return local;
}

const clean = (s: string) => s.replace(/^[\s"«“]+|[\s"»”.!?]+$/g, '').trim();
const uniq = (arr: string[]) => { const seen = new Set<string>(); return arr.filter((x) => { const k = x.toLowerCase(); if (!x || seen.has(k)) return false; seen.add(k); return true; }); };

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const u = new URL(req.url);
  const w = (u.searchParams.get('w') || '').trim().slice(0, 60);
  const to = u.searchParams.get('to') === 'ru' ? 'ru' : 'uk';
  if (w.length < 2) return NextResponse.json({ translations: [], examples: [] });

  const fromLocal = (localDict().get(w.toLowerCase()) ?? []).map((x) => (to === 'ru' ? ruDict[x] ?? '' : x));

  const [mm, tat] = await Promise.all([
    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(w)}&langpair=en|${to}`, { next: { revalidate: 86400 } })
      .then((r) => r.json()).catch(() => null),
    fetch(`https://api.tatoeba.org/unstable/sentences?lang=eng&q=${encodeURIComponent(w)}&trans:lang=${to === 'ru' ? 'rus' : 'ukr'}&sort=relevance&limit=8`, { next: { revalidate: 86400 } })
      .then((r) => r.json()).catch(() => null),
  ]);

  const lower = w === w.toLowerCase();
  const mmList: string[] = [];
  if (mm?.responseData?.translatedText) mmList.push(mm.responseData.translatedText);
  for (const m of (mm?.matches ?? []) as { translation?: string; match?: number; segment?: string }[]) {
    if (m.translation && (m.match ?? 0) >= 0.6 && (m.segment ?? '').length <= w.length + 12) mmList.push(m.translation);
  }
  const translations = uniq([...fromLocal, ...mmList.map(clean)].map((x) => (lower && x ? x[0].toLowerCase() + x.slice(1) : x)))
    .filter((x) => x.length <= 60 && !/[a-z]{4,}/i.test(x)).slice(0, 6);

  const examples: Ex[] = [];
  for (const s of (tat?.data ?? []) as { text: string; translations?: { text: string }[] }[]) {
    if (s.text && s.text.length <= 90) examples.push({ en: s.text, tr: s.translations?.[0]?.text ?? '' });
    if (examples.length >= 5) break;
  }
  return NextResponse.json({ translations, examples });
}
