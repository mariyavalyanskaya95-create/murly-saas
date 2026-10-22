import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { db, dbReady } from '@/lib/db';
import { normPhone, validPhone, validPin } from '@/lib/pin-login';
import { normalizeSections, type Section } from '@/lib/exercise';

export const dynamic = 'force-dynamic';

type Row = Record<string, unknown>;
const pick = (o: Row, keys: string[]) => Object.fromEntries(keys.filter((k) => k in o).map((k) => [k, o[k]]));

// camelCase у застосунку ↔ snake_case у базі
const toDb = {
  student: (s: Row, t: string) => ({ id: s.id, teacher_id: t, name: s.name, level: s.level, price: s.price, contact: s.contact ?? null, parent: s.parent ?? null, link: s.link ?? null, color: s.color, song: s.song ?? null, song_url: s.songUrl ?? null, about: s.about ?? null, pay_mode: s.payMode ?? 'pre', is_adult: Boolean(s.adult), nmt: Boolean(s.nmt), created_at: s.createdAt }),
  studentPatch: (p: Row) => {
    const o: Row = pick(p, ['name', 'level', 'price', 'contact', 'parent', 'link', 'color', 'song', 'about']);
    if ('songUrl' in p) o.song_url = p.songUrl ?? null;
    if ('payMode' in p) o.pay_mode = p.payMode === 'post' ? 'post' : 'pre';
    if ('adult' in p) o.is_adult = Boolean(p.adult);
    if ('nmt' in p) o.nmt = Boolean(p.nmt);
    for (const k of ['contact', 'parent', 'link', 'song', 'about']) if (k in p && p[k] === undefined) o[k] = null;
    return o;
  },
  lesson: (l: Row, t: string) => ({ id: l.id, teacher_id: t, student_id: l.studentId, start: l.start, duration: l.duration, topic: l.topic ?? null, link: l.link ?? null, status: l.status }),
  lessonPatch: (p: Row) => pick(p, ['start', 'duration', 'topic', 'link', 'status']),
  note: (n: Row, t: string) => ({ id: n.id, teacher_id: t, student_id: n.studentId, text: n.text, at: n.at, images: n.images ?? null, files: n.files ?? null }),
  word: (w: Row, t: string) => ({ id: w.id, teacher_id: t, student_id: w.studentId, en: w.en, uk: w.uk, example: w.example ?? null, at: w.at }),
  payment: (p: Row, t: string) => ({ id: p.id, teacher_id: t, student_id: p.studentId, amount: p.amount, note: p.note ?? null, at: p.at }),
  homework: (h: Row, t: string) => ({ id: h.id, teacher_id: t, student_id: h.studentId, title: h.title, instructions: h.instructions ?? null, kind: h.kind, game: h.game ?? null, direction: h.direction ?? null, items: h.items ?? null, due: h.due ?? null, status: h.status ?? 'assigned', created_at: h.createdAt }),
  homeworkPatch: (p: Row) => pick(p, ['title', 'instructions', 'due', 'status', 'feedback', 'overrides', 'score']),
  plan: (p: Row, t: string) => ({ id: p.id, teacher_id: t, title: p.title, level: p.level, age: p.age, topic: p.topic ?? null, color: p.color ?? 'lime', blocks: p.blocks ?? [], source: p.source ?? null, focus: p.focus ?? null, aims: p.aims ?? null, created_at: p.createdAt, updated_at: p.updatedAt }),
  planPatch: (p: Row) => {
    const o = pick(p, ['title', 'level', 'age', 'topic', 'color', 'blocks', 'focus', 'aims']);
    if ('updatedAt' in p) o.updated_at = p.updatedAt;
    return o;
  },
  settings: (s: Row, t: string) => ({ teacher_id: t, name: s.name ?? '', link: s.link ?? '', link_kind: s.linkKind ?? 'zoom', updated_at: new Date().toISOString() }),
};
const und = (v: unknown) => (v === null ? undefined : v);
const fromDb = {
  student: (r: Row) => ({ id: r.id, name: r.name, level: r.level, price: r.price, contact: und(r.contact), parent: und(r.parent), link: und(r.link), color: r.color, createdAt: r.created_at, inviteCode: und(r.invite_code), joined: Boolean(r.user_id), song: und(r.song), songUrl: und(r.song_url), about: und(r.about), payMode: r.pay_mode === 'post' ? 'post' : 'pre', loginPhone: und(r.login_phone), loginPin: und(r.login_pin), adult: Boolean(r.is_adult), nmt: Boolean(r.nmt) }),
  lesson: (r: Row) => ({ id: r.id, studentId: r.student_id, start: r.start, duration: r.duration, topic: und(r.topic), link: und(r.link), status: r.status }),
  note: (r: Row) => ({ id: r.id, studentId: r.student_id, text: r.text, at: r.at, images: und(r.images), files: und(r.files) }),
  word: (r: Row) => ({ id: r.id, studentId: r.student_id, en: r.en, uk: r.uk, example: und(r.example), at: r.at }),
  payment: (r: Row) => ({ id: r.id, studentId: r.student_id, amount: r.amount, note: und(r.note), at: r.at }),
  plan: (r: Row) => ({ id: r.id, title: r.title, level: r.level, age: r.age, topic: und(r.topic), color: r.color, blocks: r.blocks ?? [], source: und(r.source), focus: und(r.focus), aims: und(r.aims), createdAt: r.created_at, updatedAt: r.updated_at }),
  homework: (r: Row) => ({ id: r.id, studentId: r.student_id, title: r.title, instructions: und(r.instructions), kind: r.kind, game: und(r.game), direction: und(r.direction), due: und(r.due), status: r.status, score: und(r.score), total: und(r.total), answer: und(r.answer), items: r.kind === 'exercise' ? normalizeSections(r.items as Section[] | null) : und(r.items), answers: und(r.answers), overrides: und(r.overrides), feedback: und(r.feedback), createdAt: r.created_at, doneAt: und(r.done_at) }),
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
    // нік і аватар учнів, які вже приєдналися (з їхнього профілю Clerk)
    const prof: Record<string, { nick?: string; avatar?: string; image?: string; selfSong?: string; selfSongUrl?: string; selfAbout?: string }> = {};
    const uids = students.map((x) => x.user_id).filter(Boolean).map(String);
    if (uids.length) {
      try {
        const list = await (await clerkClient()).users.getUserList({ userId: uids, limit: 100 });
        for (const u of list.data) { const m = (u.unsafeMetadata ?? {}) as { nick?: string; avatar?: string; song?: string; songUrl?: string; bio?: string }; prof[u.id] = { nick: m.nick || undefined, avatar: m.avatar || undefined, image: u.hasImage ? u.imageUrl : undefined, selfSong: m.song || undefined, selfSongUrl: m.songUrl || undefined, selfAbout: m.bio || undefined }; }
      } catch (e) { console.error(e); }
    }
    return NextResponse.json({
      students: students.map((r) => ({ ...fromDb.student(r), ...(r.user_id ? prof[String(r.user_id)] ?? {} : {}) })),
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
      case 'updateNote': await db.update('notes', t, id, pick(p.patch as Row, ['text', 'images', 'files', 'at'])); break;
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
      case 'setLogin': {
        // Вхід за телефоном і PIN: зберігаємо, а якщо учень ще не має акаунта, створюємо його в Clerk
        const phone = normPhone(String(p.phone ?? ''));
        const pin = String(p.pin ?? '').trim();
        if (!phone && !pin) { await db.update('students', t, id, { login_phone: null, login_pin: null }); return NextResponse.json({ ok: true }); }
        if (!validPhone(phone)) return NextResponse.json({ error: 'bad_phone' }, { status: 400 });
        if (!validPin(pin)) return NextResponse.json({ error: 'bad_pin' }, { status: 400 });
        const [row] = await db.query(`students?id=eq.${encodeURIComponent(id)}&teacher_id=eq.${encodeURIComponent(t)}&select=id,name,user_id`);
        if (!row) return NextResponse.json({ error: 'not_found' }, { status: 404 });
        // на одному номері можуть бути брат і сестра, але з різними PIN
        const same = await db.query(`students?login_phone=eq.${phone}&login_pin=eq.${encodeURIComponent(pin)}&id=neq.${encodeURIComponent(id)}&select=id,user_id`);
        if (same.some((x) => x.user_id !== row.user_id || !row.user_id)) return NextResponse.json({ error: 'pin_taken' }, { status: 409 });
        let userId = row.user_id ? String(row.user_id) : '';
        if (!userId) {
          const tag = crypto.randomUUID().slice(0, 12);
          const u = await (await clerkClient()).users.createUser({
            emailAddress: [`s-${tag}@pupil.murly.com.ua`], firstName: String(row.name || 'Student').slice(0, 40),
            skipPasswordRequirement: true, unsafeMetadata: { role: 'student' },
          });
          userId = u.id;
        }
        await db.update('students', t, id, { login_phone: phone, login_pin: pin, user_id: userId, pin_fails: 0, pin_locked_until: null });
        return NextResponse.json({ ok: true, phone, pin, joined: true });
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
