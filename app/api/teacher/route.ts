import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';

export const dynamic = 'force-dynamic';

type Row = Record<string, unknown>;
const pick = (o: Row, keys: string[]) => Object.fromEntries(keys.filter((k) => k in o).map((k) => [k, o[k]]));

// camelCase у застосунку ↔ snake_case у базі
const toDb = {
  student: (s: Row, t: string) => ({ id: s.id, teacher_id: t, name: s.name, level: s.level, price: s.price, contact: s.contact ?? null, parent: s.parent ?? null, link: s.link ?? null, color: s.color, created_at: s.createdAt }),
  studentPatch: (p: Row) => {
    const o: Row = pick(p, ['name', 'level', 'price', 'contact', 'parent', 'link', 'color']);
    for (const k of ['contact', 'parent', 'link']) if (k in p && p[k] === undefined) o[k] = null;
    return o;
  },
  lesson: (l: Row, t: string) => ({ id: l.id, teacher_id: t, student_id: l.studentId, start: l.start, duration: l.duration, topic: l.topic ?? null, link: l.link ?? null, status: l.status }),
  lessonPatch: (p: Row) => pick(p, ['start', 'duration', 'topic', 'link', 'status']),
  note: (n: Row, t: string) => ({ id: n.id, teacher_id: t, student_id: n.studentId, text: n.text, at: n.at }),
  word: (w: Row, t: string) => ({ id: w.id, teacher_id: t, student_id: w.studentId, en: w.en, uk: w.uk, example: w.example ?? null, at: w.at }),
  payment: (p: Row, t: string) => ({ id: p.id, teacher_id: t, student_id: p.studentId, amount: p.amount, note: p.note ?? null, at: p.at }),
  homework: (h: Row, t: string) => ({ id: h.id, teacher_id: t, student_id: h.studentId, title: h.title, instructions: h.instructions ?? null, kind: h.kind, game: h.game ?? null, direction: h.direction ?? null, items: h.items ?? null, due: h.due ?? null, status: h.status ?? 'assigned', created_at: h.createdAt }),
  homeworkPatch: (p: Row) => pick(p, ['title', 'instructions', 'due', 'status', 'feedback', 'overrides', 'score']),
  plan: (p: Row, t: string) => ({ id: p.id, teacher_id: t, title: p.title, level: p.level, age: p.age, topic: p.topic ?? null, color: p.color ?? 'lime', blocks: p.blocks ?? [], source: p.source ?? null, created_at: p.createdAt, updated_at: p.updatedAt }),
  planPatch: (p: Row) => {
    const o = pick(p, ['title', 'level', 'age', 'topic', 'color', 'blocks']);
    if ('updatedAt' in p) o.updated_at = p.updatedAt;
    return o;
  },
  settings: (s: Row, t: string) => ({ teacher_id: t, name: s.name ?? '', link: s.link ?? '', link_kind: s.linkKind ?? 'zoom', updated_at: new Date().toISOString() }),
};
const und = (v: unknown) => (v === null ? undefined : v);
const fromDb = {
  student: (r: Row) => ({ id: r.id, name: r.name, level: r.level, price: r.price, contact: und(r.contact), parent: und(r.parent), link: und(r.link), color: r.color, createdAt: r.created_at, inviteCode: und(r.invite_code), joined: Boolean(r.user_id) }),
  lesson: (r: Row) => ({ id: r.id, studentId: r.student_id, start: r.start, duration: r.duration, topic: und(r.topic), link: und(r.link), status: r.status }),
  note: (r: Row) => ({ id: r.id, studentId: r.student_id, text: r.text, at: r.at }),
  word: (r: Row) => ({ id: r.id, studentId: r.student_id, en: r.en, uk: r.uk, example: und(r.example), at: r.at }),
  payment: (r: Row) => ({ id: r.id, studentId: r.student_id, amount: r.amount, note: und(r.note), at: r.at }),
  plan: (r: Row) => ({ id: r.id, title: r.title, level: r.level, age: r.age, topic: und(r.topic), color: r.color, blocks: r.blocks ?? [], source: und(r.source), createdAt: r.created_at, updatedAt: r.updated_at }),
  homework: (r: Row) => ({ id: r.id, studentId: r.student_id, title: r.title, instructions: und(r.instructions), kind: r.kind, game: und(r.game), direction: und(r.direction), due: und(r.due), status: r.status, score: und(r.score), total: und(r.total), answer: und(r.answer), items: und(r.items), answers: und(r.answers), overrides: und(r.overrides), feedback: und(r.feedback), createdAt: r.created_at, doneAt: und(r.done_at) }),
};

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db_not_configured' }, { status: 503 });
  try {
    const [students, lessons, notes, words, payments, settings, homework, plans] = await Promise.all([
      db.select('students', userId, '&order=created_at.asc'),
      db.select('lessons', userId, '&order=start.asc'),
      db.select('notes', userId, '&order=at.desc'),
      db.select('words', userId, '&order=at.desc'),
      db.select('payments', userId, '&order=at.desc'),
      db.select('teacher_settings', userId),
      db.select('homework', userId, '&order=created_at.desc').catch(() => []),
      db.select('lesson_plans', userId, '&order=updated_at.desc').catch(() => []),
    ]);
    const s = settings[0];
    return NextResponse.json({
      students: students.map(fromDb.student),
      lessons: lessons.map(fromDb.lesson),
      notes: notes.map(fromDb.note),
      words: words.map(fromDb.word),
      payments: payments.map(fromDb.payment),
      homework: homework.map(fromDb.homework),
      plans: plans.map(fromDb.plan),
      settings: s ? { name: s.name, link: s.link, linkKind: s.link_kind } : { name: '', link: '', linkKind: 'zoom' },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId: t } = await auth();
  if (!t) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!dbReady()) return NextResponse.json({ error: 'db_not_configured' }, { status: 503 });

  let body: { op?: string; p?: Row };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_json' }, { status: 400 }); }
  const { op, p = {} } = body;
  const id = String(p.id ?? '');

  try {
    switch (op) {
      case 'addStudent': await db.insert('students', [toDb.student(p, t)]); break;
      case 'updateStudent': await db.update('students', t, id, toDb.studentPatch(p.patch as Row)); break;
      case 'removeStudent': await db.remove('students', t, id); break;
      case 'addLessons': await db.insert('lessons', (p.rows as Row[]).map((l) => toDb.lesson(l, t))); break;
      case 'updateLesson': await db.update('lessons', t, id, toDb.lessonPatch(p.patch as Row)); break;
      case 'removeLesson': await db.remove('lessons', t, id); break;
      case 'addNote': await db.insert('notes', [toDb.note(p, t)]); break;
      case 'removeNote': await db.remove('notes', t, id); break;
      case 'addWord': await db.insert('words', [toDb.word(p, t)]); break;
      case 'removeWord': await db.remove('words', t, id); break;
      case 'addPayment': await db.insert('payments', [toDb.payment(p, t)]); break;
      case 'removePayment': await db.remove('payments', t, id); break;
      case 'invite': {
        // Код запрошення: 8 символів без схожих літер (0/O, 1/l)
        const abc = 'abcdefghjkmnpqrstuvwxyz23456789';
        const code = Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => abc[b % abc.length]).join('');
        await db.update('students', t, id, { invite_code: code });
        return NextResponse.json({ ok: true, code });
      }
      case 'addHomework': await db.insert('homework', [toDb.homework(p, t)]); break;
      case 'updateHomework': await db.update('homework', t, id, toDb.homeworkPatch(p.patch as Row)); break;
      case 'removeHomework': await db.remove('homework', t, id); break;
      case 'addPlan': await db.insert('lesson_plans', [toDb.plan(p, t)]); break;
      case 'updatePlan': await db.update('lesson_plans', t, id, toDb.planPatch(p.patch as Row)); break;
      case 'removePlan': await db.remove('lesson_plans', t, id); break;
      case 'saveSettings': await db.upsert('teacher_settings', [toDb.settings(p, t)]); break;
      case 'import': {
        // Перенесення даних, які раніше зберігались у браузері
        const d = p as { students?: Row[]; lessons?: Row[]; notes?: Row[]; words?: Row[]; payments?: Row[]; settings?: Row };
        await db.insert('students', (d.students ?? []).map((x) => toDb.student(x, t)));
        await Promise.all([
          db.insert('lessons', (d.lessons ?? []).map((x) => toDb.lesson(x, t))),
          db.insert('notes', (d.notes ?? []).map((x) => toDb.note(x, t))),
          db.insert('words', (d.words ?? []).map((x) => toDb.word(x, t))),
          db.insert('payments', (d.payments ?? []).map((x) => toDb.payment(x, t))),
        ]);
        if (d.settings) await db.upsert('teacher_settings', [toDb.settings(d.settings, t)]);
        break;
      }
      default: return NextResponse.json({ error: 'unknown_op' }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}
