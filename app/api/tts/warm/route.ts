import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { LIBRARY } from '@/lib/library';
import { PRACTICE } from '@/lib/practice';
import { SERIES } from '@/lib/series';
import { ALL_STORIES } from '@/lib/stories';
import { QUESTS_TEXT } from '@/lib/quest-list';
import { parseScript } from '@/lib/script';
import { voicesForSpeakers, type VoicePreset } from '@/lib/voices';
import { isTeacher } from '@/lib/student-data';
import { ttsCached, ttsMake, ttsPath, ttsReady } from '@/lib/tts-server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type Item = { t: string; v: VoicePreset; s: boolean };
// Усе, що озвучується на сайті: аудіювання, аудіосеріали, історії, квест
function allItems(): Item[] {
  const out: Item[] = [];
  for (const p of [...PRACTICE, ...LIBRARY]) for (const b of p.blocks) if (b.type === 'audio' && !b.audioUrl) {
    const lines = parseScript(b.script);
    const vm = voicesForSpeakers(Array.from(new Set(lines.map((l) => l.who))));
    lines.forEach((l) => out.push({ t: l.text, v: l.who ? vm[l.who] ?? 'woman' : 'narrator', s: false }));
  }
  for (const s of SERIES) { const vm = Object.fromEntries(s.cast.map((c) => [c.who, c.voice])) as Record<string, VoicePreset>; for (const e of s.episodes) e.lines.forEach((l) => out.push({ t: l.text, v: l.who ? vm[l.who] ?? 'woman' : 'narrator', s: false })); }
  for (const st of ALL_STORIES) st.paragraphs.forEach((p) => out.push({ t: p.replace(/^## /, ''), v: 'narrator', s: false }));
  for (const t of QUESTS_TEXT) out.push({ t, v: 'girl', s: true });
  for (const t of ['Yes!', 'Great!', 'Well done!', 'Super!', 'one', 'two', 'three', 'four', 'five']) out.push({ t, v: 'girl', s: false });
  const seen = new Set<string>();
  return out.filter((x) => x.t.trim() && x.t.length <= 1500 && !seen.has(`${x.v}|${x.s}|${x.t}`) && seen.add(`${x.v}|${x.s}|${x.t}`));
}

// Попередня озвучка всього контенту (лише для вчителя): GET ?from=0 → обробляє 25 фраз
export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId || !(await isTeacher(userId))) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  if (!ttsReady()) return NextResponse.json({ error: 'no_key' }, { status: 400 });
  const from = Math.max(0, Number(new URL(req.url).searchParams.get('from') || 0));
  const items = allItems();
  const batch = items.slice(from, from + 25);
  let made = 0, cached = 0, failed = 0;
  await Promise.all(batch.map(async (x) => {
    if (await ttsCached(ttsPath(x.t, x.v, x.s).pub)) { cached++; return; }
    const r = await ttsMake(x.t, x.v, x.s);
    if (r?.url) made++; else failed++;
  }));
  return NextResponse.json({ total: items.length, from, next: from + batch.length < items.length ? from + batch.length : null, made, cached, failed });
}
