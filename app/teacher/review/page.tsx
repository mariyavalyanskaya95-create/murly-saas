'use client';
import { useState } from 'react';
import { HomeworkItem } from '@/components/teacher/StudentCard';
import { useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

type View = 'done' | 'late' | 'checked';

// Перевірка: усі здані домашки всіх учнів в одному місці
export default function ReviewPage() {
  const t = useT();
  const { data, ready } = useTeacher();
  const [view, setView] = useState<View>('done');
  if (!ready) return null;

  const now = Date.now();
  const byTime = (a: { doneAt?: string; createdAt: string }, b: { doneAt?: string; createdAt: string }) => (b.doneAt || b.createdAt).localeCompare(a.doneAt || a.createdAt);
  const done = data.homework.filter((h) => h.status === 'done').sort(byTime);
  const late = data.homework.filter((h) => h.status === 'assigned' && h.due && +new Date(h.due) < now).sort((a, b) => (a.due ?? '').localeCompare(b.due ?? ''));
  const checked = data.homework.filter((h) => h.status === 'checked').sort(byTime).slice(0, 30);
  const list = view === 'done' ? done : view === 'late' ? late : checked;

  const tabs: { id: View; label: string; n: number }[] = [
    { id: 'done', label: t({ uk: 'Чекають перевірки', ru: 'Ждут проверки', en: 'To review' }), n: done.length },
    { id: 'late', label: t({ uk: 'Прострочені', ru: 'Просроченные', en: 'Overdue' }), n: late.length },
    { id: 'checked', label: t({ uk: 'Перевірені', ru: 'Проверенные', en: 'Checked' }), n: checked.length },
  ];

  return (
    <div className="t-page">
      <div className="t-head"><div><h1>{t({ uk: 'Перевірка домашок', ru: 'Проверка домашек', en: 'Homework review' })}</h1>
        <p className="t-muted">{t({ uk: 'Усі здані роботи всіх учнів. Подивись відповіді, зарахуй правильні й залиш коментар.', ru: 'Все сданные работы всех учеников. Посмотри ответы, засчитай правильные и оставь комментарий.', en: 'Everything your students handed in. Check the answers, accept correct ones and leave a comment.' })}</p></div></div>
      <div className="g-chips" style={{ justifyContent: 'flex-start', marginBottom: 16 }}>
        {tabs.map((x) => <button key={x.id} type="button" className={`g-chip ${view === x.id ? 'is-on' : ''}`} onClick={() => setView(x.id)}>{x.label} ({x.n})</button>)}
      </div>
      {!list.length && <div className="t-card"><p className="t-empty">{view === 'done' ? t({ uk: 'Усе перевірено. Нові здані домашки з’являться тут.', ru: 'Всё проверено. Новые сданные домашки появятся здесь.', en: 'All caught up. New homework will appear here.' }) : view === 'late' ? t({ uk: 'Прострочених немає.', ru: 'Просроченных нет.', en: 'Nothing overdue.' }) : t({ uk: 'Ще нічого не перевірено.', ru: 'Пока ничего не проверено.', en: 'Nothing checked yet.' })}</p></div>}
      {list.map((h) => <HomeworkItem key={h.id} hwId={h.id} showStudent />)}
    </div>
  );
}
