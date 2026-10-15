import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { LIBRARY, getLibraryPlan } from '@/lib/library';
import { buildQuiz, fromBlocks, isRightAnswer, type Pair, type QuizQ } from '@/lib/quiz';
import { getEnrollments } from '@/lib/student-data';
import { addCoins, balanceOf, earnedToday } from '@/lib/coins';
import type { Section } from '@/lib/exercise';
import type { Block } from '@/lib/lesson';

export const dynamic = 'force-dynamic';
const enc = encodeURIComponent;
const QUIZ_CAP = 60; // монет за день з «Earn coins»

type Topic = { id: string; title: string; level?: string; mine?: boolean };

async function studentData(userId: string) {
  try { return dbReady() ? await getEnrollments(userId) : []; } catch { return []; }
}

// список тем: спершу те, що учень проходив з учителем, потім уроки бібліотеки
export async function GET() {
  const { userId } = await auth();
  const topics: Topic[] = [];
  if (userId) {
    const en = await studentData(userId);
    const words = en.flatMap((e) => e.words);
    if (words.length >= 4) topics.push({ id: 'words', title: 'My words', mine: true });
    en.flatMap((e) => e.homework).filter((h) => (h.kind === 'lesson' || h.kind === 'exercise') && h.items).slice(0, 12)
      .forEach((h) => topics.push({ id: `hw:${h.id}`, title: h.title, mine: true }));
  }
  LIBRARY.filter((p) => p.blocks.some((b) => b.type === 'vocab')).forEach((p) => topics.push({ id: `lib:${p.id}`, title: p.title, level: p.level }));
  return NextResponse.json({ topics, signedIn: !!userId });
}

async function material(userId: string | null, topic: string): Promise<{ pairs: Pair[]; sections: Section[] } | null> {
  if (topic.startsWith('lib:')) { const p = getLibraryPlan(topic.slice(4)); return p ? fromBlocks(p.blocks) : null; }
  if (!userId) return null;
  const en = await studentData(userId);
  if (topic === 'words') return { pairs: en.flatMap((e) => e.words.map((w) => ({ en: w.en, uk: w.uk }))), sections: [] };
  if (topic.startsWith('hw:')) {
    const h = en.flatMap((e) => e.homework).find((x) => x.id === topic.slice(3));
    if (!h?.items) return null;
    if (h.kind === 'lesson') return fromBlocks(h.items as Block[]);
    if (h.kind === 'exercise') return { pairs: en.flatMap((e) => e.words.map((w) => ({ en: w.en, uk: w.uk }))).slice(0, 20), sections: h.items as Section[] };
  }
  return null;
}

export async function POST(req: Request) {
  const { userId } = await auth();
  let b: { op?: string; topic?: string; quizId?: string; answers?: string[] };
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  try {
    if (b.op === 'new') {
      const m = await material(userId, String(b.topic ?? ''));
      if (!m) return NextResponse.json({ error: 'no_topic' }, { status: 404 });
      const extra = LIBRARY.flatMap((p) => p.blocks.flatMap((x) => (x.type === 'vocab' ? x.words.map((w) => w.en) : []))).slice(0, 200);
      const qs = buildQuiz(m.pairs, m.sections, extra);
      if (qs.length < 3) return NextResponse.json({ error: 'too_small' }, { status: 422 });
      const pub = qs.map(({ answers, ...q }) => q);
      if (!userId || !dbReady()) return NextResponse.json({ quizId: null, questions: pub, answers: qs.map((q) => q.answers) }); // без входу: монетки лише в браузері
      const id = crypto.randomUUID();
      await db.insert('quiz_sessions', [{ id, user_id: userId, topic: b.topic, questions: qs, done: false }]);
      return NextResponse.json({ quizId: id, questions: pub });
    }
    if (b.op === 'answer') {
      if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
      const r = await db.query(`quiz_sessions?id=eq.${enc(String(b.quizId))}&user_id=eq.${enc(userId)}&select=questions,done`);
      if (!r[0]) return NextResponse.json({ error: 'not_found' }, { status: 404 });
      const qs = r[0].questions as QuizQ[];
      const given = Array.isArray(b.answers) ? b.answers.map((x) => String(x ?? '').slice(0, 80)) : [];
      const right = qs.map((q, i) => isRightAnswer(q, given[i] ?? ''));
      const n = right.filter(Boolean).length;
      let coins = 0;
      if (!r[0].done) {
        await db.patchWhere(`quiz_sessions?id=eq.${enc(String(b.quizId))}`, { done: true, score: n });
        const want = n * 2 + (n === qs.length ? 2 : 0);
        const today = await earnedToday(userId, 'quiz');
        coins = Math.max(0, Math.min(want, QUIZ_CAP - today));
        if (coins > 0) await addCoins(userId, coins, `Earn coins: ${n}/${qs.length}`, 'quiz');
      }
      return NextResponse.json({ right, answers: qs.map((q) => q.answers[0]), coins, balance: await balanceOf(userId), capped: coins === 0 && n > 0 });
    }
    return NextResponse.json({ error: 'unknown_op' }, { status: 400 });
  } catch (e) { console.error(e); return NextResponse.json({ error: 'server_error' }, { status: 500 }); }
}
