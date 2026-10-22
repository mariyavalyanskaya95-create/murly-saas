// Серверні дані для кабінету учня і запрошень
import { addCoins } from './coins';
import { db, dbReady } from './db';
import { grade, normalizeSections, type Answers, type Section } from './exercise';
import { lessonSections, type Block } from './lesson';

const enc = encodeURIComponent;
type Row = Record<string, unknown>;

export type StudentLesson = { id: string; start: string; duration: number; topic?: string; link: string; status: string };
export type StudentWord = { id: string; en: string; uk: string; example?: string };
export type StudentHomework = {
  id: string; title: string; instructions?: string; kind: 'game' | 'text' | 'exercise' | 'lesson' | 'mock'; items?: Section[] | Block[]; answers?: Answers; overrides?: Record<string, boolean>;
  game?: 'quiz' | 'match' | 'anagram' | 'cards' | (string & {}); direction?: 'en' | 'uk';
  due?: string; status: 'assigned' | 'done' | 'checked'; score?: number; total?: number; answer?: string; feedback?: string;
};
export type Enrollment = {
  studentId: string; name: string; level: string; teacherName: string;
  loginPhone?: string; loginPin?: string;
  adult: boolean; nmt: boolean;
  materials: { at: string; files: { url: string; name: string }[] }[];
  lessons: StudentLesson[]; words: StudentWord[]; homework: StudentHomework[];
};

// Прив’язати акаунт учня до картки, яку створив учитель
export async function claimInvite(code: string, userId: string): Promise<'ok' | 'not_found' | 'taken' | 'own' | 'no_db'> {
  if (!dbReady()) return 'no_db';
  const rows = await db.query(`students?invite_code=eq.${enc(code)}&select=id,teacher_id,user_id`);
  const s = rows[0];
  if (!s) return 'not_found';
  if (s.teacher_id === userId) return 'own';
  if (s.user_id && s.user_id !== userId) return 'taken';
  if (!s.user_id) await db.patchWhere(`students?id=eq.${enc(String(s.id))}`, { user_id: userId });
  return 'ok';
}

export async function inviteInfo(code: string) {
  if (!dbReady()) return null;
  const rows = await db.query(`students?invite_code=eq.${enc(code)}&select=name,teacher_id,user_id`);
  const s = rows[0];
  if (!s) return null;
  const t = await db.query(`teacher_settings?teacher_id=eq.${enc(String(s.teacher_id))}&select=name`);
  return { studentName: String(s.name), teacherName: String(t[0]?.name || ''), joined: Boolean(s.user_id) };
}

export async function isStudent(userId: string) {
  if (!dbReady()) return false;
  const rows = await db.query(`students?user_id=eq.${enc(userId)}&select=id&limit=1`);
  return rows.length > 0;
}

export async function isTeacher(userId: string) {
  if (!dbReady()) return false;
  const [s, t] = await Promise.all([
    db.query(`students?teacher_id=eq.${enc(userId)}&select=id&limit=1`),
    db.query(`teacher_settings?teacher_id=eq.${enc(userId)}&select=teacher_id&limit=1`),
  ]);
  return s.length > 0 || t.length > 0;
}

export async function getEnrollments(userId: string): Promise<Enrollment[]> {
  if (!dbReady()) return [];
  const students = await db.query(`students?user_id=eq.${enc(userId)}&select=*`);
  const since = new Date(Date.now() - 2 * 3600 * 1000).toISOString();
  return Promise.all(students.map(async (s: Row) => {
    const sid = enc(String(s.id));
    const [lessons, words, settings, homework, notes] = await Promise.all([
      db.query(`lessons?student_id=eq.${sid}&status=eq.planned&start=gte.${enc(since)}&order=start.asc&limit=20&select=*`),
      db.query(`words?student_id=eq.${sid}&order=at.desc&select=id,en,uk,example`),
      db.query(`teacher_settings?teacher_id=eq.${enc(String(s.teacher_id))}&select=name,link`),
      db.query(`homework?student_id=eq.${sid}&order=created_at.desc&limit=30&select=*`).catch(() => []),
      db.query(`notes?student_id=eq.${sid}&files=not.is.null&order=at.desc&limit=30&select=at,files`).catch(() => []),
    ]);
    const tLink = String(settings[0]?.link || '');
    return {
      studentId: String(s.id),
      name: String(s.name),
      level: String(s.level),
      teacherName: String(settings[0]?.name || ''),
      loginPhone: s.login_phone ? String(s.login_phone) : undefined,
      adult: Boolean(s.is_adult), nmt: Boolean(s.nmt),
      loginPin: s.login_pin ? String(s.login_pin) : undefined,
      // документи, з якими працювали на уроках (текст нотаток учню не показуємо)
      materials: notes.map((n) => ({ at: String(n.at), files: ((n.files as { url: string; name: string }[] | null) ?? []).filter((f) => f && f.url) })).filter((m) => m.files.length),
      lessons: lessons.map((l) => ({
        id: String(l.id), start: String(l.start), duration: Number(l.duration), status: String(l.status),
        topic: l.topic ? String(l.topic) : undefined,
        link: String(l.link || s.link || tLink || ''),
      })),
      words: words.map((w) => ({ id: String(w.id), en: String(w.en), uk: String(w.uk), example: w.example ? String(w.example) : undefined })),
      homework: homework.map((h) => ({
        id: String(h.id), title: String(h.title), kind: h.kind === 'text' ? 'text' : h.kind === 'exercise' ? 'exercise' : h.kind === 'lesson' ? 'lesson' : h.kind === 'mock' ? 'mock' : 'game',
        items: h.kind === 'exercise' ? normalizeSections(h.items as Section[] | null) : (h.items as Section[] | Block[] | null) ?? undefined, answers: (h.answers as Answers | null) ?? undefined, overrides: (h.overrides as Record<string, boolean> | null) ?? undefined,
        instructions: h.instructions ? String(h.instructions) : undefined,
        game: (h.game as StudentHomework['game']) ?? undefined, direction: (h.direction as StudentHomework['direction']) ?? undefined,
        due: h.due ? String(h.due) : undefined, status: h.status as StudentHomework['status'],
        score: h.score == null ? undefined : Number(h.score), total: h.total == null ? undefined : Number(h.total),
        answer: h.answer ? String(h.answer) : undefined, feedback: h.feedback ? String(h.feedback) : undefined,
      })),
    };
  }));
}

// Учень здає домашку: перевіряємо, що завдання належить саме йому
export async function submitHomework(userId: string, id: string, p: { score?: number; total?: number; answer?: string; answers?: Answers }) {
  if (!dbReady()) return false;
  const hw = await db.query(`homework?id=eq.${enc(id)}&select=id,student_id,status,kind,items,answers,overrides,done_at`);
  if (!hw[0]) return false;
  const st = await db.query(`students?id=eq.${enc(String(hw[0].student_id))}&user_id=eq.${enc(userId)}&select=id`);
  if (!st[0]) return false;
  const patch: Record<string, unknown> = { done_at: new Date().toISOString() };
  if (hw[0].status !== 'checked') patch.status = 'done';
  // Вправу перевіряємо на сервері, бал від клієнта не приймаємо
  if ((hw[0].kind === 'exercise' || hw[0].kind === 'lesson') && p.answers && typeof p.answers === 'object') {
    const clean: Answers = {};
    Object.entries(p.answers).slice(0, 500).forEach(([k, v]) => { if (/^\d+\.\d+\.\d+$/.test(k)) clean[k] = String(v).slice(0, 500); });
    // ручні зарахування вчителя зберігаємо лише для відповідей, які не змінились
    const prevA = (hw[0].answers as Answers | null) ?? {};
    const ov: Record<string, boolean> = {};
    Object.entries((hw[0].overrides as Record<string, boolean> | null) ?? {}).forEach(([k, v]) => { if (v && prevA[k] === clean[k]) ov[k] = true; });
    const secs = hw[0].kind === 'lesson' ? lessonSections((hw[0].items as Block[]) ?? []) : (normalizeSections(hw[0].items as Section[] | null) ?? []);
    const g = grade(secs, clean, ov);
    patch.overrides = ov;
    patch.answers = clean; patch.score = g.score; patch.total = g.total;
    await db.patchWhere(`homework?id=eq.${enc(id)}`, patch);
    const coins = await homeworkCoins(userId, hw[0].done_at, g.score, g.total);
    return { score: g.score, total: g.total, marks: g.marks, coins };
  }
  if (typeof p.score === 'number' && typeof p.total === 'number') { patch.score = Math.max(0, Math.round(p.score)); patch.total = Math.max(0, Math.round(p.total)); }
  if (typeof p.answer === 'string') patch.answer = p.answer.slice(0, 5000);
  await db.patchWhere(`homework?id=eq.${enc(id)}`, patch);
  const coins = await homeworkCoins(userId, hw[0].done_at, Number(patch.score ?? 1), Number(patch.total ?? 1));
  return { coins };
}

// монетки за першу здачу домашки: 5 за здачу + до 5 за результат
async function homeworkCoins(userId: string, doneBefore: unknown, score: number, total: number) {
  if (doneBefore) return 0;
  const n = 5 + (total > 0 ? Math.round((Math.max(0, score) / total) * 5) : 5);
  try { await addCoins(userId, n, 'homework', 'homework'); return n; } catch { return 0; }
}

// Учень сам задає номер і PIN для входу з будь-якого пристрою
export async function setOwnPin(userId: string, phone: string, pin: string): Promise<'ok' | 'not_found' | 'pin_taken'> {
  const rows = await db.query(`students?user_id=eq.${enc(userId)}&select=id`);
  if (!rows.length) return 'not_found';
  const same = await db.query(`students?login_phone=eq.${enc(phone)}&login_pin=eq.${enc(pin)}&user_id=neq.${enc(userId)}&select=id`);
  if (same.length) return 'pin_taken';
  await db.patchWhere(`students?user_id=eq.${enc(userId)}`, { login_phone: phone, login_pin: pin, pin_fails: 0, pin_locked_until: null });
  return 'ok';
}

// Що показувати учню: монетки (не дорослим) і НМТ (якщо вчитель позначив)
export async function studentFlags(userId: string): Promise<{ adult: boolean; nmt: boolean; any: boolean }> {
  if (!dbReady()) return { adult: false, nmt: true, any: false };
  const rows = await db.query(`students?user_id=eq.${enc(userId)}&select=is_adult,nmt`).catch(() => []);
  if (!rows.length) return { adult: false, nmt: true, any: false };
  return { adult: rows.every((r) => r.is_adult), nmt: rows.some((r) => r.nmt), any: true };
}
