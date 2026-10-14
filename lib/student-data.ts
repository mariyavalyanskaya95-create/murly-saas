// Серверні дані для кабінету учня і запрошень
import { db, dbReady } from './db';

const enc = encodeURIComponent;
type Row = Record<string, unknown>;

export type StudentLesson = { id: string; start: string; duration: number; topic?: string; link: string; status: string };
export type StudentWord = { id: string; en: string; uk: string; example?: string };
export type StudentHomework = {
  id: string; title: string; instructions?: string; kind: 'game' | 'text';
  game?: 'quiz' | 'match' | 'anagram' | 'cards'; direction?: 'en' | 'uk';
  due?: string; status: 'assigned' | 'done' | 'checked'; score?: number; total?: number; answer?: string; feedback?: string;
};
export type Enrollment = {
  studentId: string; name: string; level: string; teacherName: string;
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
    const [lessons, words, settings, homework] = await Promise.all([
      db.query(`lessons?student_id=eq.${sid}&status=eq.planned&start=gte.${enc(since)}&order=start.asc&limit=20&select=*`),
      db.query(`words?student_id=eq.${sid}&order=at.desc&select=id,en,uk,example`),
      db.query(`teacher_settings?teacher_id=eq.${enc(String(s.teacher_id))}&select=name,link`),
      db.query(`homework?student_id=eq.${sid}&order=created_at.desc&limit=30&select=*`).catch(() => []),
    ]);
    const tLink = String(settings[0]?.link || '');
    return {
      studentId: String(s.id),
      name: String(s.name),
      level: String(s.level),
      teacherName: String(settings[0]?.name || ''),
      lessons: lessons.map((l) => ({
        id: String(l.id), start: String(l.start), duration: Number(l.duration), status: String(l.status),
        topic: l.topic ? String(l.topic) : undefined,
        link: String(l.link || s.link || tLink || ''),
      })),
      words: words.map((w) => ({ id: String(w.id), en: String(w.en), uk: String(w.uk), example: w.example ? String(w.example) : undefined })),
      homework: homework.map((h) => ({
        id: String(h.id), title: String(h.title), kind: h.kind === 'text' ? 'text' : 'game',
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
export async function submitHomework(userId: string, id: string, p: { score?: number; total?: number; answer?: string }) {
  if (!dbReady()) return false;
  const hw = await db.query(`homework?id=eq.${enc(id)}&select=id,student_id,status`);
  if (!hw[0]) return false;
  const st = await db.query(`students?id=eq.${enc(String(hw[0].student_id))}&user_id=eq.${enc(userId)}&select=id`);
  if (!st[0]) return false;
  const patch: Record<string, unknown> = { done_at: new Date().toISOString() };
  if (hw[0].status !== 'checked') patch.status = 'done';
  if (typeof p.score === 'number' && typeof p.total === 'number') { patch.score = Math.max(0, Math.round(p.score)); patch.total = Math.max(0, Math.round(p.total)); }
  if (typeof p.answer === 'string') patch.answer = p.answer.slice(0, 5000);
  await db.patchWhere(`homework?id=eq.${enc(id)}`, patch);
  return true;
}
