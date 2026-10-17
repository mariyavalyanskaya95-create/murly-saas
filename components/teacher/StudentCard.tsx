'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import CoinsBox from './CoinsBox';
import MockResults from '../mock/MockResults';
import { MOCKS } from '@/lib/mock';
import Icon from '../Icon';
import GameHub from '../games/GameHub';
import LessonRow from './LessonRow';
import { LessonForm } from './forms';
import ExerciseEditor from '../exercise/ExerciseEditor';
import ExerciseView from '../exercise/ExerciseView';
import { grade, type Section } from '@/lib/exercise';
import { lessonSections, type Block } from '@/lib/lesson';
import { balanceOf, fmtDate, fmtMoney, plural, useTeacher } from '@/lib/teacher-store';
import { useT } from '../LangProvider';
import type { T } from '@/lib/i18n';

type Tab = 'lessons' | 'hw' | 'words' | 'notes' | 'pay' | 'profile';
const TABS: { id: Tab; label: T; icon: string }[] = [
  { id: 'lessons', label: { uk: 'Заняття', ru: 'Занятия', en: 'Lessons' }, icon: 'e-cal' },
  { id: 'hw', label: { uk: 'Домашка', ru: 'Домашка', en: 'Homework' }, icon: 'e-board' },
  { id: 'words', label: { uk: 'Словник', ru: 'Словарь', en: 'Vocabulary' }, icon: 'e-abc' },
  { id: 'notes', label: { uk: 'Нотатки', ru: 'Заметки', en: 'Notes' }, icon: 'e-pencil' },
  { id: 'pay', label: { uk: 'Оплати', ru: 'Оплаты', en: 'Payments' }, icon: 'd-money' },
  { id: 'profile', label: { uk: 'Профіль', ru: 'Профиль', en: 'Profile' }, icon: 'd-smile' },
];

export default function StudentCard({ id }: { id: string }) {
  const tt = useT();
  const t = useTeacher();
  const { data, ready } = t;
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('lessons');
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('tab') as Tab | null;
    if (q && TABS.some((x) => x.id === q)) setTab(q);
  }, []);

  if (!ready) return null;
  const s = data.students.find((x) => x.id === id);
  if (!s) return (
    <div className="t-page"><div className="t-card"><h2>{tt({ uk: 'Учня не знайдено', ru: 'Ученик не найден', en: 'Student not found' })}</h2>
      <Link href="/teacher/students" className="mu-btn">{tt({ uk: 'До списку учнів', ru: 'К списку учеников', en: 'Back to students' })}</Link></div></div>
  );

  const b = balanceOf(data, s.id);

  return (
    <div className="t-page">
      <Link href="/teacher/students" className="t-back">← {tt({ uk: 'Усі учні', ru: 'Все ученики', en: 'All students' })}</Link>
      <div className={`t-hero t-student--${s.color}`}>
        <span className="t-avatar t-avatar--lg">{s.name.slice(0, 1).toUpperCase()}</span>
        <div className="t-hero__info">
          <h1>{s.name}</h1>
          <span>{s.level} · {fmtMoney(s.price, tt.lang)} {tt({ uk: 'за заняття', ru: 'за занятие', en: 'per lesson' })}{s.contact ? ` · ${s.contact}` : ''}</span>
          {s.joined && <span className="t-tag t-tag--done" style={{ marginLeft: 8 }}>{tt({ uk: 'Має кабінет', ru: 'Есть кабинет', en: 'Has an account' })}</span>}
        </div>
        <div className={`t-hero__bal ${b < 0 ? 't-neg' : ''}`}>
          <small>{b < 0 ? tt({ uk: 'Борг', ru: 'Долг', en: 'Owes' }) : tt({ uk: 'Баланс', ru: 'Баланс', en: 'Balance' })}</small><b>{fmtMoney(Math.abs(b), tt.lang)}</b>
        </div>
      </div>

      <InviteBox id={s.id} />
      <CoinsBox studentId={s.id} joined={s.joined} />
      {s.joined && <MockResults student={s.id} all={MOCKS.map((m) => m.id)} />}

      <div className="t-tabs" role="tablist">
        {TABS.map((x) => (
          <button key={x.id} role="tab" aria-selected={tab === x.id} className={`t-tab ${tab === x.id ? 'is-on' : ''}`} onClick={() => setTab(x.id)}>
            <Icon id={x.icon} />{tt(x.label)}
          </button>
        ))}
      </div>

      {tab === 'lessons' && <LessonsTab id={s.id} />}
      {tab === 'hw' && <HomeworkTab id={s.id} />}
      {tab === 'words' && <WordsTab id={s.id} />}
      {tab === 'notes' && <NotesTab id={s.id} />}
      {tab === 'pay' && <PayTab id={s.id} />}
      {tab === 'profile' && (
        <ProfileTab id={s.id} onDelete={() => { t.removeStudent(s.id); router.push('/teacher/students'); }} />
      )}
    </div>
  );
}

function LessonsTab({ id }: { id: string }) {
  const t = useT();
  const { data } = useTeacher();
  const [open, setOpen] = useState(false);
  const all = data.lessons.filter((l) => l.studentId === id).sort((a, b) => a.start.localeCompare(b.start));
  const upcoming = all.filter((l) => l.status === 'planned');
  const past = all.filter((l) => l.status !== 'planned').reverse();
  return (
    <>
      <div className="t-card">
        <div className="t-card__head"><h2>{t({ uk: 'Заплановані', ru: 'Запланированные', en: 'Upcoming' })}</h2>
          <button className="mu-btn mu-btn--lime t-btn-sm" onClick={() => setOpen(!open)}>{open ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: '+ Заняття', ru: '+ Занятие', en: '+ Lesson' })}</button></div>
        {open && <LessonForm studentId={id} onDone={() => setOpen(false)} />}
        {upcoming.length ? upcoming.map((l) => <LessonRow key={l.id} l={l} showStudent={false} />) : <p className="t-empty">{t({ uk: 'Немає запланованих занять.', ru: 'Нет запланированных занятий.', en: 'No upcoming lessons.' })}</p>}
      </div>
      {past.length > 0 && (
        <div className="t-card"><h2>{t({ uk: 'Історія', ru: 'История', en: 'History' })}</h2>{past.map((l) => <LessonRow key={l.id} l={l} showStudent={false} />)}</div>
      )}
    </>
  );
}

function WordsTab({ id }: { id: string }) {
  const t = useT();
  const { data, addWord, removeWord } = useTeacher();
  const [f, setF] = useState({ en: '', uk: '', example: '' });
  const [play, setPlay] = useState(false);
  const words = useMemo(() => data.words.filter((w) => w.studentId === id), [data.words, id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.en.trim() || !f.uk.trim()) return;
    addWord(id, { en: f.en.trim(), uk: f.uk.trim(), example: f.example.trim() || undefined });
    setF({ en: '', uk: '', example: '' });
    (document.getElementById('word-en') as HTMLInputElement | null)?.focus();
  };

  const sets = useMemo(() => [
    { id: 'en', title: t({ uk: 'Англ → Укр', ru: 'Англ → Укр', en: 'Eng → Ukr' }), prompt: t({ uk: 'Як це перекладається?', ru: 'Как это переводится?', en: 'How do you translate this?' }), items: words.map((w) => ({ q: w.en, a: w.uk })) },
    { id: 'uk', title: t({ uk: 'Укр → Англ', ru: 'Укр → Англ', en: 'Ukr → Eng' }), prompt: t({ uk: 'Як це англійською?', ru: 'Как это по-английски?', en: 'How do you say it in English?' }), items: words.map((w) => ({ q: w.uk, a: w.en })) },
  ], [words, t]);

  return (
    <>
      <div className="t-card">
        <h2>{t({ uk: 'Додати слово', ru: 'Добавить слово', en: 'Add a word' })}</h2>
        <form className="t-form t-form--words" onSubmit={submit}>
          <label>English<input id="word-en" value={f.en} onChange={(e) => setF({ ...f, en: e.target.value })} placeholder="to look forward to" /></label>
          <label>{t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' })}<input value={f.uk} onChange={(e) => setF({ ...f, uk: e.target.value })} placeholder={t({ uk: 'з нетерпінням чекати', ru: 'с нетерпением ждать', en: 'з нетерпінням чекати' })} /></label>
          <label>{t({ uk: 'Приклад', ru: 'Пример', en: 'Example' })}<input value={f.example} onChange={(e) => setF({ ...f, example: e.target.value })} placeholder="I look forward to the trip." /></label>
          <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Додати', ru: 'Добавить', en: 'Add' })}</button></div>
        </form>
      </div>

      <div className="t-card">
        <div className="t-card__head">
          <h2>{t({ uk: 'Словник', ru: 'Словарь', en: 'Vocabulary' })} ({words.length})</h2>
          {words.length >= 4 && (
            <button className="mu-btn t-btn-sm" onClick={() => setPlay(!play)}><Icon id="e-trophy" />{play ? t({ uk: 'Сховати гру', ru: 'Скрыть игру', en: 'Hide game' }) : t({ uk: 'Грати цими словами', ru: 'Играть этими словами', en: 'Play with these words' })}</button>
          )}
        </div>
        {words.length > 0 && words.length < 4 && <p className="t-muted">{t({ uk: `Додай ще ${4 - words.length}, і з цих слів можна буде грати.`, ru: `Добавь ещё ${4 - words.length}, и этими словами можно будет играть.`, en: `Add ${4 - words.length} more and you can play with these words.` })}</p>}
        {play && <div className="t-game"><GameHub sets={sets} /></div>}
        {words.length ? (
          <div className="t-words">
            {words.map((w) => (
              <div key={w.id} className="t-word">
                <b>{w.en}</b><span>{w.uk}</span>
                {w.example && <i>{w.example}</i>}
                <button className="t-icon-btn" onClick={() => removeWord(w.id)} aria-label={`${t({ uk: 'Видалити', ru: 'Удалить', en: 'Delete' })} ${w.en}`}>✕</button>
              </div>
            ))}
          </div>
        ) : <p className="t-empty">{t({ uk: 'Слова, які ти додаси, з’являться тут. Скоро учень бачитиме їх у своєму кабінеті і гратиме ними.', ru: 'Слова, которые ты добавишь, появятся здесь. Скоро ученик будет видеть их в своём кабинете и играть ими.', en: 'Words you add will show up here. Soon your student will see them in their account and play with them.' })}</p>}
      </div>
    </>
  );
}

function NotesTab({ id }: { id: string }) {
  const t = useT();
  const { data, addNote, removeNote } = useTeacher();
  const [text, setText] = useState('');
  const notes = data.notes.filter((n) => n.studentId === id);
  return (
    <div className="t-card">
      <h2>{t({ uk: 'Нотатки', ru: 'Заметки', en: 'Notes' })}</h2>
      <p className="t-muted">{t({ uk: 'Бачиш тільки ти. Що пройшли, на чому спотикається, що задати наступного разу.', ru: 'Видишь только ты. Что прошли, на чём спотыкается, что задать в следующий раз.', en: 'Only you can see these. What you covered, where they struggle, what to set next time.' })}</p>
      <form className="t-note-form" onSubmit={(e) => { e.preventDefault(); if (text.trim()) { addNote(id, text.trim()); setText(''); } }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder={t({ uk: 'Напр.: плутає Past Simple і Present Perfect, наступного разу повторити since / for', ru: 'Напр.: путает Past Simple и Present Perfect, в следующий раз повторить since / for', en: 'e.g. mixes up Past Simple and Present Perfect, review since / for next time' })} />
        <button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button>
      </form>
      {notes.map((n) => (
        <div key={n.id} className="t-note">
          <small>{fmtDate(n.at, t.lang)}</small>
          <p>{n.text}</p>
          <button className="t-icon-btn" onClick={() => removeNote(n.id)} aria-label={t({ uk: 'Видалити нотатку', ru: 'Удалить заметку', en: 'Delete note' })}>✕</button>
        </div>
      ))}
    </div>
  );
}

function PayTab({ id }: { id: string }) {
  const t = useT();
  const { data, addPayment, removePayment } = useTeacher();
  const s = data.students.find((x) => x.id === id)!;
  const [amount, setAmount] = useState(String(s.price * 4 || ''));
  const [note, setNote] = useState('');
  const pays = data.payments.filter((p) => p.studentId === id);
  const done = data.lessons.filter((l) => l.studentId === id && l.status === 'done').length;
  const paid = pays.reduce((n, p) => n + p.amount, 0);
  const b = balanceOf(data, id);
  const lessonsLeft = s.price ? Math.floor(b / s.price) : 0;

  return (
    <>
      <div className="t-stats">
        <div className="t-stat t-stat--lime"><b>{fmtMoney(paid, t.lang)}</b><span>{t({ uk: 'оплачено', ru: 'оплачено', en: 'paid' })}</span></div>
        <div className="t-stat t-stat--sky"><b>{done}</b><span>{t({ uk: 'проведено занять', ru: 'проведено занятий', en: 'lessons taught' })}</span></div>
        <div className={`t-stat ${b < 0 ? 't-stat--tomato' : 't-stat--mustard'}`}>
          <b>{fmtMoney(Math.abs(b), t.lang)}</b><span>{b < 0 ? t({ uk: 'борг', ru: 'долг', en: 'owes' }) : lessonsLeft > 0 ? t({ uk: `аванс, ще ${lessonsLeft} зан.`, ru: `аванс, ещё ${lessonsLeft} зан.`, en: `prepaid, ${lessonsLeft} more ${lessonsLeft === 1 ? 'lesson' : 'lessons'}` }) : t({ uk: 'баланс', ru: 'баланс', en: 'balance' })}</span>
        </div>
      </div>
      <div className="t-card">
        <h2>{t({ uk: 'Записати оплату', ru: 'Записать оплату', en: 'Record a payment' })}</h2>
        <form className="t-form" onSubmit={(e) => { e.preventDefault(); const n = Number(amount); if (n > 0) { addPayment(id, n, note.trim() || undefined); setNote(''); } }}>
          <label>{t({ uk: 'Сума, ₴', ru: 'Сумма, ₴', en: 'Amount, ₴' })}<input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
          <label>{t({ uk: 'Коментар', ru: 'Комментарий', en: 'Comment' })}<input value={note} onChange={(e) => setNote(e.target.value)} placeholder={t({ uk: 'Напр. пакет 4 заняття, карткою', ru: 'Напр. пакет 4 занятия, картой', en: 'e.g. 4-lesson pack, by card' })} /></label>
          <div className="t-form__actions">
            {s.price > 0 && [4, 8].map((k) => (
              <button key={k} type="button" className="mu-btn t-btn-sm" onClick={() => { setAmount(String(s.price * k)); setNote(t({ uk: `Пакет ${k} занять`, ru: `Пакет ${k} занятий`, en: `${k}-lesson pack` })); }}>{t({ uk: `Пакет ${k}`, ru: `Пакет ${k}`, en: `Pack of ${k}` })}</button>
            ))}
            <button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Записати', ru: 'Записать', en: 'Record' })}</button>
          </div>
        </form>
        <p className="t-muted">{t({ uk: 'Баланс рахується так: усі оплати мінус проведені заняття за ціною учня. Прийом оплат онлайн додамо пізніше.', ru: 'Баланс считается так: все оплаты минус проведённые занятия по цене ученика. Приём оплат онлайн добавим позже.', en: 'How the balance works: all payments minus lessons taught at the student’s price. Online payments are coming later.' })}</p>
      </div>
      {pays.length > 0 && (
        <div className="t-card"><h2>{t({ uk: 'Історія оплат', ru: 'История оплат', en: 'Payment history' })}</h2>
          {pays.map((p) => (
            <div key={p.id} className="t-row">
              <span>{fmtDate(p.at, t.lang)}{p.note ? ` · ${p.note}` : ''}</span>
              <b className="t-pos">+{fmtMoney(p.amount, t.lang)}</b>
              <button className="t-icon-btn" onClick={() => removePayment(p.id)} aria-label={t({ uk: 'Видалити оплату', ru: 'Удалить оплату', en: 'Delete payment' })}>✕</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function ProfileTab({ id, onDelete }: { id: string; onDelete: () => void }) {
  const t = useT();
  const { data, updateStudent } = useTeacher();
  const s = data.students.find((x) => x.id === id)!;
  const [f, setF] = useState({ name: s.name, level: s.level, price: String(s.price), contact: s.contact ?? '', parent: s.parent ?? '', link: s.link ?? '' });
  const [saved, setSaved] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => { setF({ ...f, [k]: e.target.value }); setSaved(false); };

  return (
    <div className="t-card">
      <h2>{t({ uk: 'Профіль учня', ru: 'Профиль ученика', en: 'Student profile' })}</h2>
      <form className="t-form" onSubmit={(e) => {
        e.preventDefault();
        updateStudent(id, { name: f.name.trim() || s.name, level: f.level, price: Number(f.price) || 0, contact: f.contact.trim() || undefined, parent: f.parent.trim() || undefined, link: f.link.trim() || undefined });
        setSaved(true);
      }}>
        <label>{t({ uk: 'Ім’я', ru: 'Имя', en: 'Name' })}<input value={f.name} onChange={set('name')} /></label>
        <label>{t({ uk: 'Рівень', ru: 'Уровень', en: 'Level' })}<input value={f.level} onChange={set('level')} /></label>
        <label>{t({ uk: 'Ціна заняття, ₴', ru: 'Цена занятия, ₴', en: 'Price per lesson, ₴' })}<input type="number" min="0" value={f.price} onChange={set('price')} /></label>
        <label>{t({ uk: 'Контакт учня', ru: 'Контакт ученика', en: 'Student contact' })}<input value={f.contact} onChange={set('contact')} /></label>
        <label>{t({ uk: 'Контакт батьків', ru: 'Контакт родителей', en: 'Parent contact' })}<input value={f.parent} onChange={set('parent')} /></label>
        <label className="t-form__wide">{t({ uk: 'Посилання на дзвінок', ru: 'Ссылка на звонок', en: 'Call link' })}<input value={f.link} onChange={set('link')} placeholder={t({ uk: 'Порожньо: твоє посилання з налаштувань', ru: 'Пусто: твоя ссылка из настроек', en: 'Empty: your link from Settings' })} /></label>
        <div className="t-form__actions">
          {saved && <span className="t-pos">{t({ uk: 'Збережено', ru: 'Сохранено', en: 'Saved' })}</span>}
          <button className="mu-btn mu-btn--lime" type="submit">{t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button>
        </div>
      </form>
      <div className="t-danger">
        {!confirm
          ? <button className="t-link-btn" onClick={() => setConfirm(true)}>{t({ uk: 'Видалити учня', ru: 'Удалить ученика', en: 'Delete student' })}</button>
          : <><span>{t({ uk: `Видалити ${s.name} разом із заняттями, словником, нотатками й оплатами?`, ru: `Удалить ${s.name} вместе с занятиями, словарём, заметками и оплатами?`, en: `Delete ${s.name} together with lessons, vocabulary, notes and payments?` })}</span>
              <button className="mu-btn t-btn-sm" onClick={() => setConfirm(false)}>{t({ uk: 'Ні', ru: 'Нет', en: 'No' })}</button>
              <button className="mu-btn mu-btn--tomato t-btn-sm" onClick={onDelete}>{t({ uk: 'Так, видалити', ru: 'Да, удалить', en: 'Yes, delete' })}</button></>}
      </div>
    </div>
  );
}

function InviteBox({ id }: { id: string }) {
  const t = useT();
  const { data, mode, createInvite } = useTeacher();
  const s = data.students.find((x) => x.id === id)!;
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState(false);
  if (s.joined || mode !== 'cloud') return null;

  const link = s.inviteCode ? `${window.location.origin}/join/${s.inviteCode}` : '';
  const make = async () => { setBusy(true); setErr(false); const c = await createInvite(id); setBusy(false); if (!c) setErr(true); };
  const copy = async () => { try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* */ } };

  return (
    <div className="t-card t-invite">
      <div>
        <h2><Icon id="d-send" />{t({ uk: `Запроси ${s.name} в Murly`, ru: `Пригласи ${s.name} в Murly`, en: `Invite ${s.name} to Murly` })}</h2>
        <p className="t-muted">{t({ uk: 'Учень побачить свій розклад з кнопкою дзвінка, словник від тебе та ігри з цими словами.', ru: 'Ученик увидит своё расписание с кнопкой звонка, словарь от тебя и игры с этими словами.', en: 'Your student will see their schedule with a call button, the vocabulary from you and games with those words.' })}</p>
      </div>
      {link ? (
        <div className="t-invite__link">
          <input readOnly value={link} onFocus={(e) => e.currentTarget.select()} aria-label={t({ uk: 'Посилання-запрошення', ru: 'Ссылка-приглашение', en: 'Invite link' })} />
          <button className="mu-btn mu-btn--lime t-btn-sm" onClick={copy}>{copied ? t({ uk: 'Скопійовано', ru: 'Скопировано', en: 'Copied' }) : t({ uk: 'Копіювати', ru: 'Копировать', en: 'Copy' })}</button>
        </div>
      ) : (
        <button className="mu-btn mu-btn--lime" onClick={make} disabled={busy}>{busy ? t({ uk: 'Створюю…', ru: 'Создаю…', en: 'Creating…' }) : t({ uk: 'Створити посилання', ru: 'Создать ссылку', en: 'Create link' })}</button>
      )}
      {err && <p className="t-neg">{t({ uk: 'Не вийшло створити посилання. Спробуй ще раз.', ru: 'Не получилось создать ссылку. Попробуй ещё раз.', en: 'Could not create the link. Please try again.' })}</p>}
    </div>
  );
}

const GAMES = [
  { id: 'quiz', label: { uk: 'Квіз', ru: 'Квиз', en: 'Quiz' } as T }, { id: 'match', label: { uk: 'Пари', ru: 'Пары', en: 'Pairs' } as T },
  { id: 'anagram', label: { uk: 'Анаграма', ru: 'Анаграмма', en: 'Anagram' } as T }, { id: 'cards', label: { uk: 'Картки', ru: 'Карточки', en: 'Cards' } as T },
] as const;

function defaultDue() {
  const d = new Date(); d.setDate(d.getDate() + 3); d.setHours(20, 0, 0, 0);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

function HomeworkTab({ id }: { id: string }) {
  const t = useT();
  const { data, addHomework } = useTeacher();
  const words = data.words.filter((w) => w.studentId === id).length;
  const list = data.homework.filter((h) => h.studentId === id);
  const wordsRu = plural(words, 'ru', { uk: ['слово', 'слова', 'слів'], ru: ['слово', 'слова', 'слов'], en: ['word', 'words'] });
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<'game' | 'text' | 'exercise'>('exercise');
  const [sections, setSections] = useState<Section[]>([]);
  const [game, setGame] = useState<'quiz' | 'match' | 'anagram' | 'cards'>('quiz');
  const [direction, setDirection] = useState<'en' | 'uk'>('en');
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [due, setDue] = useState(defaultDue());

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (kind === 'text' && !instructions.trim()) return;
    if (kind === 'exercise' && !sections.length) return;
    const gameLabel = t(GAMES.find((g) => g.id === game)!.label);
    addHomework({
      studentId: id, kind,
      title: title.trim() || (kind === 'game' ? `${t({ uk: 'Слова', ru: 'Слова', en: 'Words' })}: ${gameLabel.toLowerCase()}` : kind === 'exercise' ? t({ uk: 'Вправа', ru: 'Упражнение', en: 'Exercise' }) : t({ uk: 'Письмове завдання', ru: 'Письменное задание', en: 'Written task' })),
      items: kind === 'exercise' ? sections : undefined,
      instructions: instructions.trim() || undefined,
      game: kind === 'game' ? game : undefined,
      direction: kind === 'game' ? direction : undefined,
      due: due ? new Date(due).toISOString() : undefined,
    });
    setTitle(''); setInstructions(''); setDue(defaultDue()); setSections([]); setOpen(false);
  };

  return (
    <>
      <div className="t-card">
        <div className="t-card__head"><h2>{t({ uk: 'Домашні завдання', ru: 'Домашние задания', en: 'Homework' })}</h2>
          <button className="mu-btn mu-btn--lime t-btn-sm" onClick={() => setOpen(!open)}>{open ? t({ uk: 'Закрити', ru: 'Закрыть', en: 'Close' }) : t({ uk: '+ Задати', ru: '+ Задать', en: '+ Assign' })}</button></div>
        {open && (
          <form className="t-hw-form" onSubmit={submit}>
            <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
              <button type="button" className={`g-chip ${kind === 'exercise' ? 'is-on' : ''}`} onClick={() => setKind('exercise')}>{t({ uk: 'Вправа з автоперевіркою', ru: 'Упражнение с автопроверкой', en: 'Auto-checked exercise' })}</button>
              <button type="button" className={`g-chip ${kind === 'game' ? 'is-on' : ''}`} onClick={() => setKind('game')}>{t({ uk: 'Гра зі словника', ru: 'Игра со словами из словаря', en: 'Vocabulary game' })}</button>
              <button type="button" className={`g-chip ${kind === 'text' ? 'is-on' : ''}`} onClick={() => setKind('text')}>{t({ uk: 'Письмове завдання', ru: 'Письменное задание', en: 'Written task' })}</button>
            </div>
            {kind === 'game' && words < 4 && <p className="t-neg">{t({ uk: `У словнику учня ${words} слів. Додай хоча б 4, щоб задати гру.`, ru: `В словаре ученика ${words} ${wordsRu}. Добавь хотя бы 4, чтобы задать игру.`, en: `The student has ${words} ${words === 1 ? 'word' : 'words'} in their vocabulary. Add at least 4 to assign a game.` })}</p>}
            {kind === 'game' && (
              <div className="t-form">
                <label>{t({ uk: 'Гра', ru: 'Игра', en: 'Game' })}<select value={game} onChange={(e) => setGame(e.target.value as typeof game)}>{GAMES.map((g) => <option key={g.id} value={g.id}>{t(g.label)}</option>)}</select></label>
                <label>{t({ uk: 'Напрямок', ru: 'Направление', en: 'Direction' })}<select value={direction} onChange={(e) => setDirection(e.target.value as 'en' | 'uk')}>
                  <option value="en">{t({ uk: 'Англ → Укр', ru: 'Англ → Укр', en: 'Eng → Ukr' })}</option><option value="uk">{t({ uk: 'Укр → Англ', ru: 'Укр → Англ', en: 'Ukr → Eng' })}</option></select></label>
              </div>
            )}
            {kind === 'exercise' && <ExerciseEditor key={String(open)} onChange={setSections} />}
            <div className="t-form">
              <label>{t({ uk: 'Назва', ru: 'Название', en: 'Title' })}<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={kind === 'game' ? t({ uk: 'Напр. Слова з Unit 5', ru: 'Напр. Слова из Unit 5', en: 'e.g. Words from Unit 5' }) : kind === 'exercise' ? t({ uk: 'Напр. Past Simple, Unit 3', ru: 'Напр. Past Simple, Unit 3', en: 'e.g. Past Simple, Unit 3' }) : t({ uk: 'Напр. Твір про літо', ru: 'Напр. Сочинение о лете', en: 'e.g. Essay about summer' })} /></label>
              <label>{t({ uk: 'Здати до', ru: 'Сдать до', en: 'Due' })}<input type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} /></label>
              <label className="t-form__wide">{kind === 'text' ? t({ uk: 'Завдання', ru: 'Задание', en: 'Task' }) : t({ uk: 'Коментар для учня (необов’язково)', ru: 'Комментарий для ученика (необязательно)', en: 'Comment for the student (optional)' })}
                <textarea rows={3} value={instructions} onChange={(e) => setInstructions(e.target.value)}
                  placeholder={kind === 'text' ? t({ uk: 'Напр. Напиши 5 речень у Present Perfect про свій тиждень', ru: 'Напр. Напиши 5 предложений в Present Perfect о своей неделе', en: 'e.g. Write 5 sentences in Present Perfect about your week' }) : t({ uk: 'Напр. Пройди двічі, поки не буде без помилок', ru: 'Напр. Пройди дважды, пока не будет без ошибок', en: 'e.g. Do it twice until there are no mistakes' })} required={kind === 'text'} />
              </label>
              <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit" disabled={(kind === 'game' && words < 4) || (kind === 'exercise' && !sections.length)}>{t({ uk: 'Задати', ru: 'Задать', en: 'Assign' })}</button></div>
            </div>
          </form>
        )}
        {!list.length && !open && <p className="t-empty">{t({ uk: 'Ще немає завдань. Задай гру зі словника або письмове завдання, і учень побачить його у своєму кабінеті.', ru: 'Заданий пока нет. Задай игру со словами из словаря или письменное задание, и ученик увидит его в своём кабинете.', en: 'No homework yet. Assign a vocabulary game or a written task and your student will see it in their account.' })}</p>}
      </div>
      {list.map((h) => <HomeworkItem key={h.id} hwId={h.id} />)}
    </>
  );
}

function HomeworkItem({ hwId }: { hwId: string }) {
  const t = useT();
  const { data, updateHomework, removeHomework } = useTeacher();
  const h = data.homework.find((x) => x.id === hwId)!;
  const [fb, setFb] = useState(h.feedback ?? '');
  const overdue = h.status === 'assigned' && h.due && new Date(h.due) < new Date();
  const statusTag = h.status === 'checked' ? <span className="t-tag t-tag--done">{t({ uk: 'Перевірено', ru: 'Проверено', en: 'Checked' })}</span>
    : h.status === 'done' ? <span className="t-tag t-tag--warn">{t({ uk: 'Чекає перевірки', ru: 'Ждёт проверки', en: 'Waiting for review' })}</span>
    : overdue ? <span className="t-tag t-tag--late">{t({ uk: 'Прострочено', ru: 'Просрочено', en: 'Overdue' })}</span> : <span className="t-tag">{t({ uk: 'Задано', ru: 'Задано', en: 'Assigned' })}</span>;

  return (
    <div className={`t-card t-hw is-${h.status}`}>
      <div className="t-card__head">
        <h2 style={{ fontSize: 19 }}>{h.title}</h2>
        <div className="t-hw__meta">{statusTag}{h.due && <span className="t-muted">{t({ uk: 'до', ru: 'до', en: 'due' })} {fmtDate(h.due, t.lang)}</span>}</div>
      </div>
      {h.instructions && <p className="t-hw__text">{h.instructions}</p>}
      {h.kind !== 'text' && h.score != null && <p><b>{t({ uk: 'Результат', ru: 'Результат', en: 'Score' })}: {h.score} / {h.total}</b></p>}
      {(h.kind === 'exercise' || h.kind === 'lesson') && h.items && (() => {
        const secs = h.kind === 'lesson' ? lessonSections(h.items as Block[]) : (h.items as Section[]);
        return (
          <details className="t-hw__details" open={h.status === 'done'}>
            <summary>{h.answers ? t({ uk: 'Відповіді учня', ru: 'Ответы ученика', en: 'Student answers' }) : t({ uk: 'Завдання', ru: 'Задание', en: 'Task' })}</summary>
            <ExerciseView sections={secs} answers={h.answers ?? {}} marks={h.answers ? grade(secs, h.answers, h.overrides).marks : undefined}
              showCorrect={!!h.answers} overrides={h.overrides} onOverride={(k) => {
                const ov = { ...(h.overrides ?? {}) };
                if (ov[k]) delete ov[k]; else ov[k] = true;
                updateHomework(h.id, { overrides: ov, score: grade(secs, h.answers ?? {}, ov).score });
              }} />
            {h.answers && <p className="t-muted" style={{ fontSize: 14 }}>{t({ uk: 'Перевірка не прийняла відповідь, але вона правильна? Натисни «Зарахувати», і бал додасться.', ru: 'Проверка не приняла ответ, но он правильный? Нажми «Засчитать», и балл добавится.', en: 'The check rejected an answer but it is correct? Click “Accept” and the point will be added.' })}</p>}
          </details>
        );
      })()}
      {h.kind === 'text' && h.answer && <div className="t-hw__answer"><small>{t({ uk: 'Відповідь учня', ru: 'Ответ ученика', en: 'Student answer' })}</small><p>{h.answer}</p></div>}
      {h.status !== 'assigned' && (
        <form className="t-note-form" onSubmit={(e) => { e.preventDefault(); updateHomework(h.id, { feedback: fb.trim() || undefined, status: 'checked' }); }}>
          <textarea rows={2} value={fb} onChange={(e) => setFb(e.target.value)} placeholder={t({ uk: 'Коментар для учня: що вийшло, над чим попрацювати', ru: 'Комментарий для ученика: что получилось, над чем поработать', en: 'Comment for the student: what went well, what to work on' })} />
          <button className="mu-btn mu-btn--lime t-btn-sm" type="submit">{h.status === 'checked' ? t({ uk: 'Оновити коментар', ru: 'Обновить комментарий', en: 'Update comment' }) : t({ uk: 'Перевірено', ru: 'Проверено', en: 'Mark as checked' })}</button>
        </form>
      )}
      <div className="t-danger" style={{ marginTop: 0, paddingTop: 8 }}>
        <button className="t-link-btn" onClick={() => removeHomework(h.id)}>{t({ uk: 'Видалити завдання', ru: 'Удалить задание', en: 'Delete task' })}</button>
      </div>
    </div>
  );
}
