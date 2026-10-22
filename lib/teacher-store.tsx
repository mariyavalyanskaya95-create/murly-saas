'use client';
// Дані кабінету вчителя.
// ЗАРАЗ: зберігаються в браузері (localStorage) для кожного акаунта окремо.
// ДАЛІ: ця ж модель переїде в базу (Supabase), інтерфейс useTeacher() не зміниться.
import type { Plan } from './lesson';
import type { Lang } from './i18n';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type Student = {
  id: string; name: string; level: string; price: number;
  contact?: string; parent?: string; link?: string; color: string; createdAt: string;
  inviteCode?: string; joined?: boolean;
  loginPhone?: string; loginPin?: string; // вхід учня за номером і PIN
  song?: string; songUrl?: string; about?: string; // заповнює вчитель
  payMode?: 'pre' | 'post'; // pre: платить наперед пакетом, post: платить після занять
  nick?: string; avatar?: string; image?: string; selfSong?: string; selfSongUrl?: string; selfAbout?: string; // з профілю учня (лише для показу)
};
export type LessonStatus = 'planned' | 'done' | 'missed' | 'cancelled'; // missed: учень не прийшов
export type Lesson = {
  id: string; studentId: string; start: string; duration: number;
  topic?: string; link?: string; status: LessonStatus;
};
export type Note = { id: string; studentId: string; text: string; at: string; images?: string[] };
export type Word = { id: string; studentId: string; en: string; uk: string; example?: string; at: string };
export type Payment = { id: string; studentId: string; amount: number; note?: string; at: string };
export type HomeworkStatus = 'assigned' | 'done' | 'checked';
export type Homework = {
  id: string; studentId: string; title: string; instructions?: string;
  kind: 'game' | 'text' | 'exercise' | 'lesson' | 'mock'; items?: import('./exercise').Section[] | import('./lesson').Block[]; answers?: import('./exercise').Answers; overrides?: import('./exercise').Overrides; game?: 'quiz' | 'match' | 'anagram' | 'cards' | (string & {}); direction?: 'en' | 'uk';
  due?: string; status: HomeworkStatus; score?: number; total?: number; answer?: string; feedback?: string;
  createdAt: string; doneAt?: string;
};
export type Settings = { name: string; link: string; linkKind: 'zoom' | 'meet' | 'other' };

type Data = {
  students: Student[]; lessons: Lesson[]; notes: Note[]; words: Word[]; payments: Payment[]; homework: Homework[]; plans: Plan[]; settings: Settings;
};

const EMPTY: Data = {
  students: [], lessons: [], notes: [], words: [], payments: [], homework: [], plans: [],
  settings: { name: '', link: '', linkKind: 'zoom' },
};

const COLORS = ['lime', 'mustard', 'sky', 'tomato', 'lilac', 'mint'];
const uid = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));
const now = () => new Date().toISOString();

export type SyncMode = 'loading' | 'cloud' | 'local';

function useStore(userId: string) {
  const key = `murly:teacher:${userId}`;
  const [data, setData] = useState<Data>(EMPTY);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<SyncMode>('loading');
  const [syncError, setSyncError] = useState(false);
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const modeRef = useRef<SyncMode>('loading');
  const dataRef = useRef<Data>(EMPTY);
  useEffect(() => { dataRef.current = data; }, [data]);

  const readLocal = useCallback((): Data | null => {
    try { const raw = localStorage.getItem(key); return raw ? { ...EMPTY, ...JSON.parse(raw) } : null; } catch { return null; }
  }, [key]);

  // Завантаження: спершу пробуємо базу, якщо її ще немає, працюємо з браузером
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const local = readLocal();
      try {
        const res = await fetch('/api/teacher', { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        let remote: Data = { ...EMPTY, ...(await res.json()) };
        // Перший вхід після підключення бази: переносимо дані з браузера
        if (!remote.students.length && local?.students.length) {
          const r = await fetch('/api/teacher', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'import', p: local }) });
          if (r.ok) { remote = local; try { localStorage.setItem(`${key}:migrated`, new Date().toISOString()); localStorage.removeItem(key); } catch { /* */ } }
        }
        if (cancelled) return;
        modeRef.current = 'cloud'; setMode('cloud'); setData(remote);
      } catch {
        if (cancelled) return;
        modeRef.current = 'local'; setMode('local'); if (local) setData(local);
      }
      setReady(true);
    })();
    return () => { cancelled = true; };
  }, [key, readLocal]);

  const update = useCallback((fn: (d: Data) => Data) => {
    setData((d) => {
      const next = fn(d);
      if (modeRef.current === 'local') { try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* немає місця */ } }
      return next;
    });
  }, [key]);

  // Відправка змін у базу по черзі (щоб учень зберігся раніше за його заняття)
  const sync = useCallback((op: string, p: unknown) => {
    if (modeRef.current !== 'cloud') return;
    const body = JSON.stringify({ op, p }, (_k, v) => (v === undefined ? null : v));
    queue.current = queue.current.then(async () => {
      try {
        const r = await fetch('/api/teacher', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
        if (!r.ok) throw new Error(String(r.status));
      } catch { setSyncError(true); }
    });
  }, []);

  const actions = useMemo(() => ({
    addStudent: (s: Omit<Student, 'id' | 'createdAt' | 'color'>) => {
      const row: Student = { ...s, id: uid(), createdAt: now(), color: COLORS[dataRef.current.students.length % COLORS.length] };
      dataRef.current = { ...dataRef.current, students: [...dataRef.current.students, row] };
      update((d) => ({ ...d, students: [...d.students, row] }));
      sync('addStudent', row);
      return row.id;
    },
    updateStudent: (id: string, patch: Partial<Student>) => {
      update((d) => ({ ...d, students: d.students.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
      sync('updateStudent', { id, patch });
    },
    removeStudent: (id: string) => {
      update((d) => ({
        ...d,
        students: d.students.filter((s) => s.id !== id),
        lessons: d.lessons.filter((x) => x.studentId !== id),
        notes: d.notes.filter((x) => x.studentId !== id),
        words: d.words.filter((x) => x.studentId !== id),
        payments: d.payments.filter((x) => x.studentId !== id),
        homework: d.homework.filter((x) => x.studentId !== id),
      }));
      sync('removeStudent', { id });
    },

    // Заняття; repeatWeeks > 1 створює щотижневу серію
    addLessons: (l: Omit<Lesson, 'id' | 'status'>, repeatWeeks = 1) => {
      const base = new Date(l.start);
      const rows: Lesson[] = Array.from({ length: Math.max(1, repeatWeeks) }, (_, k) => {
        const dt = new Date(base); dt.setDate(dt.getDate() + 7 * k);
        return { ...l, id: uid(), start: dt.toISOString(), status: 'planned' as LessonStatus };
      });
      update((d) => ({ ...d, lessons: [...d.lessons, ...rows] }));
      sync('addLessons', { rows });
    },
    setLessonStatus: (id: string, status: LessonStatus) => {
      update((d) => ({ ...d, lessons: d.lessons.map((x) => (x.id === id ? { ...x, status } : x)) }));
      sync('updateLesson', { id, patch: { status } });
    },
    updateLesson: (id: string, patch: Partial<Lesson>) => {
      update((d) => ({ ...d, lessons: d.lessons.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
      sync('updateLesson', { id, patch });
    },
    removeLesson: (id: string) => {
      update((d) => ({ ...d, lessons: d.lessons.filter((x) => x.id !== id) }));
      sync('removeLesson', { id });
    },

    addNote: (studentId: string, text: string, extra?: { images?: string[]; at?: string }) => {
      const row: Note = { id: uid(), studentId, text, at: extra?.at || now(), images: extra?.images?.length ? extra.images : undefined };
      update((d) => ({ ...d, notes: [row, ...d.notes] }));
      sync('addNote', row);
    },
    updateNote: (id: string, patch: { text?: string; images?: string[]; at?: string }) => {
      update((d) => ({ ...d, notes: d.notes.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
      sync('updateNote', { id, patch });
    },
    removeNote: (id: string) => { update((d) => ({ ...d, notes: d.notes.filter((x) => x.id !== id) })); sync('removeNote', { id }); },

    addWord: (studentId: string, w: { en: string; uk: string; example?: string; at?: string }) => {
      const row: Word = { id: uid(), studentId, en: w.en, uk: w.uk, example: w.example, at: w.at || now() };
      update((d) => ({ ...d, words: [row, ...d.words] }));
      sync('addWord', row);
    },
    removeWord: (id: string) => { update((d) => ({ ...d, words: d.words.filter((x) => x.id !== id) })); sync('removeWord', { id }); },

    addPayment: (studentId: string, amount: number, note?: string) => {
      const row: Payment = { id: uid(), studentId, amount, note, at: now() };
      update((d) => ({ ...d, payments: [row, ...d.payments] }));
      sync('addPayment', row);
    },
    removePayment: (id: string) => { update((d) => ({ ...d, payments: d.payments.filter((x) => x.id !== id) })); sync('removePayment', { id }); },

    addHomework: (h: Omit<Homework, 'id' | 'status' | 'createdAt'>) => {
      const row: Homework = { ...h, id: uid(), status: 'assigned', createdAt: now() };
      update((d) => ({ ...d, homework: [row, ...d.homework] }));
      sync('addHomework', row);
    },
    updateHomework: (id: string, patch: Partial<Homework>) => {
      update((d) => ({ ...d, homework: d.homework.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
      sync('updateHomework', { id, patch });
    },
    removeHomework: (id: string) => { update((d) => ({ ...d, homework: d.homework.filter((x) => x.id !== id) })); sync('removeHomework', { id }); },

    // Уроки (конструктор)
    addPlan: (p: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) => {
      const row: Plan = { ...p, id: uid(), createdAt: now(), updatedAt: now() };
      update((d) => ({ ...d, plans: [row, ...d.plans] }));
      sync('addPlan', row);
      return row.id;
    },
    updatePlan: (id: string, patch: Partial<Plan>) => {
      const p2 = { ...patch, updatedAt: now() };
      update((d) => ({ ...d, plans: d.plans.map((x) => (x.id === id ? { ...x, ...p2 } : x)) }));
      sync('updatePlan', { id, patch: p2 });
    },
    removePlan: (id: string) => { update((d) => ({ ...d, plans: d.plans.filter((x) => x.id !== id) })); sync('removePlan', { id }); },

    // Запрошення учня: код генерує сервер
    createInvite: async (id: string): Promise<string | null> => {
      if (modeRef.current !== 'cloud') return null;
      try {
        const r = await fetch('/api/teacher', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'invite', p: { id } }) });
        const j = await r.json();
        if (!r.ok || !j.code) return null;
        update((d) => ({ ...d, students: d.students.map((s) => (s.id === id ? { ...s, inviteCode: j.code } : s)) }));
        return j.code as string;
      } catch { return null; }
    },
    // Вхід за номером і PIN: сервер створює учню акаунт, якщо його ще нема
    setLogin: async (id: string, phone: string, pin: string): Promise<{ ok: boolean; error?: string }> => {
      if (modeRef.current !== 'cloud') return { ok: false, error: 'offline' };
      try {
        const r = await fetch('/api/teacher', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'setLogin', p: { id, phone, pin } }) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) return { ok: false, error: j.error || 'error' };
        update((d) => ({ ...d, students: d.students.map((s) => (s.id === id ? { ...s, loginPhone: j.phone || undefined, loginPin: j.pin || undefined, joined: j.joined ? true : s.joined } : s)) }));
        return { ok: true };
      } catch { return { ok: false, error: 'error' }; }
    },
    saveSettings: (s: Settings) => { update((d) => ({ ...d, settings: s })); sync('saveSettings', s); },
  }), [update, sync]);

  return { data, ready, mode, syncError, ...actions };
}

type Store = ReturnType<typeof useStore>;
const Ctx = createContext<Store | null>(null);

export function TeacherProvider({ userId, children }: { userId: string; children: React.ReactNode }) {
  const store = useStore(userId);
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useTeacher() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useTeacher поза TeacherProvider');
  return s;
}

// ---- Похідні величини ----
// Підпис балансу з урахуванням того, як учень платить (наперед чи після занять)
export function balanceText(s: Student | undefined, b: number, lang: Lang): { text: string; cls: string } {
  const T = (o: { uk: string; ru: string; en: string }) => (lang === 'ru' ? o.ru : lang === 'en' ? o.en : o.uk);
  const post = s?.payMode === 'post';
  if (b < 0) {
    const n = s?.price ? Math.round(-b / s.price) : 0;
    return post
      ? { text: `${T({ uk: 'до оплати', ru: 'к оплате', en: 'to pay' })} ${fmtMoney(-b, lang)}${n > 0 ? ` (${n} ${T({ uk: 'зан.', ru: 'зан.', en: n === 1 ? 'lesson' : 'lessons' })})` : ''}`, cls: 't-warn' }
      : { text: `${T({ uk: 'борг', ru: 'долг', en: 'owes' })} ${fmtMoney(-b, lang)}`, cls: 't-neg' };
  }
  if (b > 0) return { text: `${T({ uk: 'аванс', ru: 'аванс', en: 'prepaid' })} ${fmtMoney(b, lang)}`, cls: 't-pos' };
  return { text: post ? T({ uk: 'усе оплачено', ru: 'всё оплачено', en: 'all paid' }) : T({ uk: 'розраховані', ru: 'рассчитались', en: 'settled' }), cls: '' };
}

export function balanceOf(d: Data, studentId: string) {
  const st = d.students.find((s) => s.id === studentId);
  const paid = d.payments.filter((p) => p.studentId === studentId).reduce((n, p) => n + p.amount, 0);
  const spent = d.lessons.filter((l) => l.studentId === studentId && l.status === 'done').length * (st?.price ?? 0);
  return paid - spent; // < 0 означає борг
}

export function lessonLink(d: Data, l: Lesson) {
  return l.link || d.students.find((s) => s.id === l.studentId)?.link || d.settings.link || '';
}

// Локаль дат і чисел для мови інтерфейсу
export const localeOf = (lang: Lang = 'uk') => (lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-GB' : 'uk-UA');
export const fmtMoney = (n: number, lang: Lang = 'uk') => `${n.toLocaleString(localeOf(lang))} ₴`;
export const fmtDate = (iso: string, lang: Lang = 'uk') =>
  new Date(iso).toLocaleDateString(localeOf(lang), { weekday: 'short', day: 'numeric', month: 'short' });
export const fmtTime = (iso: string, lang: Lang = 'uk') =>
  new Date(iso).toLocaleTimeString(localeOf(lang), { hour: '2-digit', minute: '2-digit' });
// Множина: 1 урок, 2 уроки, 5 уроків (uk/ru мають три форми, en дві)
export function plural(n: number, lang: Lang, f: { uk: [string, string, string]; ru: [string, string, string]; en: [string, string] }) {
  if (lang === 'en') return n === 1 ? f.en[0] : f.en[1];
  const forms = f[lang];
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b === 1) return forms[0];
  if (b >= 2 && b <= 4) return forms[1];
  return forms[2];
}
export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
