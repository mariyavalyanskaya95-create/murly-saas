'use client';
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/Icon';
import { HomeworkForm, HomeworkItem } from '@/components/teacher/StudentCard';
import { type Group, fmtDate, fmtTime, useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

const toLocal = (d: Date) => { const p = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; };

// Групи: одне заняття й одна домашка на кількох учнів. Оплата, бал і прогрес у кожного свої.
export default function GroupsPage() {
  const t = useT();
  const { data, ready } = useTeacher();
  const [adding, setAdding] = useState(false);
  if (!ready) return null;
  const groups = data.groups ?? [];
  return (
    <div className="t-page">
      <div className="t-head">
        <div><h1>{t({ uk: 'Групи', ru: 'Группы', en: 'Groups' })}</h1>
          <p className="t-muted">{t({ uk: 'Заняття й домашка для кількох учнів одразу. Оплата, оцінки й словник у кожного залишаються свої.', ru: 'Занятия и домашка сразу для нескольких учеников. Оплата, оценки и словарь у каждого остаются свои.', en: 'Lessons and homework for several students at once. Payments, scores and vocabulary stay individual.' })}</p></div>
        <div className="t-head__actions"><button type="button" className="mu-btn mu-btn--lime" onClick={() => setAdding(!adding)}>{adding ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: '+ Нова група', ru: '+ Новая группа', en: '+ New group' })}</button></div>
      </div>
      {adding && <GroupForm onDone={() => setAdding(false)} />}
      {!groups.length && !adding && <div className="t-card"><p className="t-empty">{t({ uk: 'Груп поки немає. Створи групу, обери учнів, і зможеш планувати заняття та задавати домашку всім разом.', ru: 'Групп пока нет. Создай группу, выбери учеников, и сможешь планировать занятия и задавать домашку всем вместе.', en: 'No groups yet. Create one, pick students, then schedule lessons and assign homework to everyone at once.' })}</p></div>}
      {groups.map((g) => <GroupCard key={g.id} g={g} />)}
    </div>
  );
}

function Members({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const t = useT();
  const { data } = useTeacher();
  if (!data.students.length) return <p className="t-empty">{t({ uk: 'Спочатку додай учнів.', ru: 'Сначала добавь учеников.', en: 'Add students first.' })}</p>;
  return (
    <div className="g-chips t-form__wide" style={{ justifyContent: 'flex-start' }} role="group" aria-label={t({ uk: 'Учні групи', ru: 'Ученики группы', en: 'Group members' })}>
      {data.students.map((s) => { const on = value.includes(s.id); return (
        <button key={s.id} type="button" aria-pressed={on} className={`g-chip ${on ? 'is-on' : ''}`} onClick={() => onChange(on ? value.filter((x) => x !== s.id) : [...value, s.id])}>{on ? '✓ ' : ''}{s.name}</button>
      ); })}
    </div>
  );
}

function GroupForm({ g, onDone }: { g?: Group; onDone: () => void }) {
  const t = useT();
  const { addGroup, updateGroup } = useTeacher();
  const [name, setName] = useState(g?.name ?? '');
  const [ids, setIds] = useState<string[]>(g?.studentIds ?? []);
  const [link, setLink] = useState(g?.link ?? '');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || ids.length < 2) return;
    const v = { name: name.trim(), studentIds: ids, link: link.trim() || undefined };
    if (g) updateGroup(g.id, v); else addGroup(v);
    onDone();
  };
  return (
    <form className="t-card t-form" onSubmit={submit}>
      <label>{t({ uk: 'Назва групи', ru: 'Название группы', en: 'Group name' })}<input value={name} onChange={(e) => setName(e.target.value)} placeholder={t({ uk: 'Напр. B1 вівторок', ru: 'Напр. B1 вторник', en: 'e.g. B1 Tuesday' })} required autoFocus /></label>
      <label>{t({ uk: 'Посилання на дзвінок (необов’язково)', ru: 'Ссылка на звонок (необязательно)', en: 'Call link (optional)' })}<input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://" /></label>
      <p className="t-muted t-form__wide">{t({ uk: 'Хто в групі (щонайменше 2):', ru: 'Кто в группе (минимум 2):', en: 'Who is in the group (at least 2):' })}</p>
      <Members value={ids} onChange={setIds} />
      <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit" disabled={!name.trim() || ids.length < 2}>{g ? t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' }) : t({ uk: 'Створити групу', ru: 'Создать группу', en: 'Create group' })}</button></div>
    </form>
  );
}

function GroupCard({ g }: { g: Group }) {
  const t = useT();
  const { data, addGroupLessons, removeGroup } = useTeacher();
  const [mode, setMode] = useState<null | 'lesson' | 'hw' | 'edit'>(null);
  const next = new Date(); next.setDate(next.getDate() + 1); next.setHours(17, 0, 0, 0);
  const [f, setF] = useState({ start: toLocal(next), duration: '60', repeat: '1', topic: '' });
  const members = g.studentIds.map((id) => data.students.find((s) => s.id === id)).filter(Boolean) as typeof data.students;
  const now = Date.now();
  // найближчі заняття групи: один рядок на час
  const upcoming = Array.from(new Set(data.lessons.filter((l) => l.groupId === g.id && l.status === 'planned' && +new Date(l.start) + l.duration * 60000 > now).map((l) => l.start))).sort().slice(0, 5);
  // домашки групи: показуємо по одній назві, а результати кожного учня окремо
  const hw = data.homework.filter((h) => h.groupId === g.id);
  const hwTitles = Array.from(new Map(hw.map((h) => [`${h.title}|${h.createdAt.slice(0, 16)}`, h])).values()).slice(0, 5);

  return (
    <div className={`t-card t-group t-student--${g.color}`}>
      <div className="t-card__head">
        <h2><span className={`t-dot t-dot--${g.color}`} />{g.name} <small className="t-muted">· {members.length} {t({ uk: 'учн.', ru: 'учен.', en: 'students' })}</small></h2>
        <div className="t-head__actions">
          <button type="button" className={`mu-btn t-btn-sm ${mode === 'lesson' ? 'mu-btn--lime' : ''}`} onClick={() => setMode(mode === 'lesson' ? null : 'lesson')}><Icon id="e-cal" />{t({ uk: 'Заняття', ru: 'Занятие', en: 'Lesson' })}</button>
          <button type="button" className={`mu-btn t-btn-sm ${mode === 'hw' ? 'mu-btn--lime' : ''}`} onClick={() => setMode(mode === 'hw' ? null : 'hw')}><Icon id="e-board" />{t({ uk: 'Домашка всім', ru: 'Домашка всем', en: 'Homework for all' })}</button>
          <button type="button" className="t-icon-btn" onClick={() => setMode(mode === 'edit' ? null : 'edit')} aria-label={t({ uk: 'Змінити групу', ru: 'Изменить группу', en: 'Edit group' })} title={t({ uk: 'Змінити групу', ru: 'Изменить группу', en: 'Edit group' })}><Icon id="e-pencil" /></button>
        </div>
      </div>
      <div className="t-group__members">{members.map((s) => <Link key={s.id} href={`/teacher/students/${s.id}`} className="g-chip"><span className={`t-dot t-dot--${s.color}`} />{s.name}</Link>)}</div>

      {mode === 'edit' && <>
        <GroupForm g={g} onDone={() => setMode(null)} />
        <button type="button" className="t-link-btn" onClick={() => { if (confirm(t({ uk: 'Видалити групу? Заняття й домашки учнів залишаться.', ru: 'Удалить группу? Занятия и домашки учеников останутся.', en: 'Delete the group? Students’ lessons and homework stay.' }))) removeGroup(g.id); }}>{t({ uk: 'Видалити групу', ru: 'Удалить группу', en: 'Delete group' })}</button>
      </>}

      {mode === 'lesson' && (
        <form className="t-form" onSubmit={(e) => { e.preventDefault(); addGroupLessons(g.id, { start: new Date(f.start).toISOString(), duration: Number(f.duration) || 60, topic: f.topic.trim() || undefined }, Number(f.repeat)); setMode(null); }}>
          <label>{t({ uk: 'Дата і час', ru: 'Дата и время', en: 'Date and time' })}<input type="datetime-local" value={f.start} onChange={(e) => setF({ ...f, start: e.target.value })} required /></label>
          <label>{t({ uk: 'Тривалість', ru: 'Длительность', en: 'Duration' })}<select value={f.duration} onChange={(e) => setF({ ...f, duration: e.target.value })}>{['45', '60', '90'].map((m) => <option key={m} value={m}>{m} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</option>)}</select></label>
          <label>{t({ uk: 'Повторювати', ru: 'Повторять', en: 'Repeat' })}<select value={f.repeat} onChange={(e) => setF({ ...f, repeat: e.target.value })}>
            <option value="1">{t({ uk: 'Один раз', ru: 'Один раз', en: 'Once' })}</option>
            <option value="4">{t({ uk: 'Щотижня, 4 тижні', ru: 'Еженедельно, 4 недели', en: 'Weekly, 4 weeks' })}</option>
            <option value="8">{t({ uk: 'Щотижня, 8 тижнів', ru: 'Еженедельно, 8 недель', en: 'Weekly, 8 weeks' })}</option>
            <option value="12">{t({ uk: 'Щотижня, 12 тижнів', ru: 'Еженедельно, 12 недель', en: 'Weekly, 12 weeks' })}</option>
          </select></label>
          <label className="t-form__wide">{t({ uk: 'Тема (необов’язково)', ru: 'Тема (необязательно)', en: 'Topic (optional)' })}<input value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })} /></label>
          <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit" disabled={!members.length}>{t({ uk: 'Запланувати для групи', ru: 'Запланировать для группы', en: 'Schedule for the group' })}</button></div>
        </form>
      )}

      {mode === 'hw' && <HomeworkForm studentIds={members.map((s) => s.id)} groupId={g.id} onDone={() => setMode(null)} />}

      <div className="t-group__cols">
        <div>
          <h3>{t({ uk: 'Найближчі заняття', ru: 'Ближайшие занятия', en: 'Upcoming lessons' })}</h3>
          {upcoming.length ? upcoming.map((st) => <div key={st} className="t-row"><span>{fmtDate(st, t.lang)}</span><b>{fmtTime(st, t.lang)}</b></div>)
            : <p className="t-muted">{t({ uk: 'Немає. Натисни «Заняття».', ru: 'Нет. Нажми «Занятие».', en: 'None. Click “Lesson”.' })}</p>}
        </div>
        <div>
          <h3>{t({ uk: 'Домашки групи', ru: 'Домашки группы', en: 'Group homework' })}</h3>
          {hwTitles.length ? hwTitles.map((h0) => {
            const same = hw.filter((h) => h.title === h0.title && h.createdAt.slice(0, 16) === h0.createdAt.slice(0, 16));
            const done = same.filter((h) => h.status !== 'assigned').length;
            return <div key={h0.id} className="t-row"><span>{h0.title}</span><b>{done}/{same.length}</b></div>;
          }) : <p className="t-muted">{t({ uk: 'Ще не задавали.', ru: 'Ещё не задавали.', en: 'None yet.' })}</p>}
          {hw.some((h) => h.status === 'done') && <Link href="/teacher/review" className="t-link-btn">{t({ uk: 'Перевірити здані', ru: 'Проверить сданные', en: 'Review handed in' })} →</Link>}
        </div>
      </div>
    </div>
  );
}
