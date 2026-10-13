// Серверні дані для кабінету учня і запрошень
import { db, dbReady } from './db';

const enc = encodeURIComponent;
type Row = Record<string, unknown>;

export type StudentLesson = { id: string; start: string; duration: number; topic?: string; link: string; status: string };
export type StudentWord = { id: string; en: string; uk: string; example?: string };
export type Enrollment = {
  studentId: string; name: string; level: string; teacherName: string;
  lessons: StudentLesson[]; words: StudentWord[];
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
    const [lessons, words, settings] = await Promise.all([
      db.query(`lessons?student_id=eq.${sid}&status=eq.planned&start=gte.${enc(since)}&order=start.asc&limit=20&select=*`),
      db.query(`words?student_id=eq.${sid}&order=at.desc&select=id,en,uk,example`),
      db.query(`teacher_settings?teacher_id=eq.${enc(String(s.teacher_id))}&select=name,link`),
    ]);
    const tLink = String(settings[0]?.link || '');
    return {
      studentId: String(s.id),
      name: String(s.name),
      level: String(s.level),
      teacherName: String(settings[0]?.name || 'твій учитель'),
      lessons: lessons.map((l) => ({
        id: String(l.id), start: String(l.start), duration: Number(l.duration), status: String(l.status),
        topic: l.topic ? String(l.topic) : undefined,
        link: String(l.link || s.link || tLink || ''),
      })),
      words: words.map((w) => ({ id: String(w.id), en: String(w.en), uk: String(w.uk), example: w.example ? String(w.example) : undefined })),
    };
  }));
}
