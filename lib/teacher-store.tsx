'use client';
// Дані кабінету вчителя.
// ЗАРАЗ: зберігаються в браузері (localStorage) для кожного акаунта окремо.
// ДАЛІ: ця ж модель переїде в базу (Supabase), інтерфейс useTeacher() не зміниться.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Student = {
  id: string; name: string; level: string; price: number;
  contact?: string; parent?: string; link?: string; color: string; createdAt: string;
};
export type LessonStatus = 'planned' | 'done' | 'cancelled';
export type Lesson = {
  id: string; studentId: string; start: string; duration: number;
  topic?: string; link?: string; status: LessonStatus;
};
export type Note = { id: string; studentId: string; text: string; at: string };
export type Word = { id: string; studentId: string; en: string; uk: string; example?: string; at: string };
export type Payment = { id: string; studentId: string; amount: number; note?: string; at: string };
export type Settings = { name: string; link: string; linkKind: 'zoom' | 'meet' | 'other' };

type Data = {
  students: Student[]; lessons: Lesson[]; notes: Note[]; words: Word[]; payments: Payment[]; settings: Settings;
};

const EMPTY: Data = {
  students: [], lessons: [], notes: [], words: [], payments: [],
  settings: { name: '', link: '', linkKind: 'zoom' },
};

const COLORS = ['lime', 'mustard', 'sky', 'tomato', 'lilac', 'mint'];
const uid = () => (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2));
const now = () => new Date().toISOString();

function useStore(userId: string) {
  const key = `murly:teacher:${userId}`;
  const [data, setData] = useState<Data>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setData({ ...EMPTY, ...JSON.parse(raw) });
    } catch { /* порожньо або недоступно */ }
    setReady(true);
  }, [key]);

  const update = useCallback((fn: (d: Data) => Data) => {
    setData((d) => {
      const next = fn(d);
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* немає місця */ }
      return next;
    });
  }, [key]);

  const actions = useMemo(() => ({
    addStudent: (s: Omit<Student, 'id' | 'createdAt' | 'color'>) => {
      const id = uid();
      update((d) => ({ ...d, students: [...d.students, { ...s, id, createdAt: now(), color: COLORS[d.students.length % COLORS.length] }] }));
      return id;
    },
    updateStudent: (id: string, patch: Partial<Student>) =>
      update((d) => ({ ...d, students: d.students.map((s) => (s.id === id ? { ...s, ...patch } : s)) })),
    removeStudent: (id: string) =>
      update((d) => ({
        ...d,
        students: d.students.filter((s) => s.id !== id),
        lessons: d.lessons.filter((x) => x.studentId !== id),
        notes: d.notes.filter((x) => x.studentId !== id),
        words: d.words.filter((x) => x.studentId !== id),
        payments: d.payments.filter((x) => x.studentId !== id),
      })),

    // Заняття; repeatWeeks > 1 створює щотижневу серію
    addLessons: (l: Omit<Lesson, 'id' | 'status'>, repeatWeeks = 1) =>
      update((d) => {
        const base = new Date(l.start);
        const created = Array.from({ length: Math.max(1, repeatWeeks) }, (_, k) => {
          const dt = new Date(base); dt.setDate(dt.getDate() + 7 * k);
          return { ...l, id: uid(), start: dt.toISOString(), status: 'planned' as LessonStatus };
        });
        return { ...d, lessons: [...d.lessons, ...created] };
      }),
    setLessonStatus: (id: string, status: LessonStatus) =>
      update((d) => ({ ...d, lessons: d.lessons.map((x) => (x.id === id ? { ...x, status } : x)) })),
    updateLesson: (id: string, patch: Partial<Lesson>) =>
      update((d) => ({ ...d, lessons: d.lessons.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
    removeLesson: (id: string) => update((d) => ({ ...d, lessons: d.lessons.filter((x) => x.id !== id) })),

    addNote: (studentId: string, text: string) =>
      update((d) => ({ ...d, notes: [{ id: uid(), studentId, text, at: now() }, ...d.notes] })),
    removeNote: (id: string) => update((d) => ({ ...d, notes: d.notes.filter((x) => x.id !== id) })),

    addWord: (studentId: string, w: { en: string; uk: string; example?: string }) =>
      update((d) => ({ ...d, words: [{ id: uid(), studentId, ...w, at: now() }, ...d.words] })),
    removeWord: (id: string) => update((d) => ({ ...d, words: d.words.filter((x) => x.id !== id) })),

    addPayment: (studentId: string, amount: number, note?: string) =>
      update((d) => ({ ...d, payments: [{ id: uid(), studentId, amount, note, at: now() }, ...d.payments] })),
    removePayment: (id: string) => update((d) => ({ ...d, payments: d.payments.filter((x) => x.id !== id) })),

    saveSettings: (s: Settings) => update((d) => ({ ...d, settings: s })),
  }), [update]);

  return { data, ready, ...actions };
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
export function balanceOf(d: Data, studentId: string) {
  const st = d.students.find((s) => s.id === studentId);
  const paid = d.payments.filter((p) => p.studentId === studentId).reduce((n, p) => n + p.amount, 0);
  const spent = d.lessons.filter((l) => l.studentId === studentId && l.status === 'done').length * (st?.price ?? 0);
  return paid - spent; // < 0 означає борг
}

export function lessonLink(d: Data, l: Lesson) {
  return l.link || d.students.find((s) => s.id === l.studentId)?.link || d.settings.link || '';
}

export const fmtMoney = (n: number) => `${n.toLocaleString('uk-UA')} ₴`;
export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'short' });
export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
export const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
