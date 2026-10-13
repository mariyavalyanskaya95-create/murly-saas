'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from '../Icon';
import GameHub from '../games/GameHub';
import LessonRow from './LessonRow';
import { LessonForm } from './forms';
import { balanceOf, fmtDate, fmtMoney, useTeacher } from '@/lib/teacher-store';

type Tab = 'lessons' | 'words' | 'notes' | 'pay' | 'profile';
const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'lessons', label: 'Заняття', icon: 'e-cal' },
  { id: 'words', label: 'Словник', icon: 'e-abc' },
  { id: 'notes', label: 'Нотатки', icon: 'e-pencil' },
  { id: 'pay', label: 'Оплати', icon: 'd-money' },
  { id: 'profile', label: 'Профіль', icon: 'd-smile' },
];

export default function StudentCard({ id }: { id: string }) {
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
    <div className="t-page"><div className="t-card"><h2>Учня не знайдено</h2>
      <Link href="/teacher/students" className="mu-btn">До списку учнів</Link></div></div>
  );

  const b = balanceOf(data, s.id);

  return (
    <div className="t-page">
      <Link href="/teacher/students" className="t-back">← Усі учні</Link>
      <div className={`t-hero t-student--${s.color}`}>
        <span className="t-avatar t-avatar--lg">{s.name.slice(0, 1).toUpperCase()}</span>
        <div className="t-hero__info">
          <h1>{s.name}</h1>
          <span>{s.level} · {fmtMoney(s.price)} за заняття{s.contact ? ` · ${s.contact}` : ''}</span>
          {s.joined && <span className="t-tag t-tag--done" style={{ marginLeft: 8 }}>Має кабінет</span>}
        </div>
        <div className={`t-hero__bal ${b < 0 ? 't-neg' : ''}`}>
          <small>{b < 0 ? 'Борг' : 'Баланс'}</small><b>{fmtMoney(Math.abs(b))}</b>
        </div>
      </div>

      <InviteBox id={s.id} />

      <div className="t-tabs" role="tablist">
        {TABS.map((x) => (
          <button key={x.id} role="tab" aria-selected={tab === x.id} className={`t-tab ${tab === x.id ? 'is-on' : ''}`} onClick={() => setTab(x.id)}>
            <Icon id={x.icon} />{x.label}
          </button>
        ))}
      </div>

      {tab === 'lessons' && <LessonsTab id={s.id} />}
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
  const { data } = useTeacher();
  const [open, setOpen] = useState(false);
  const all = data.lessons.filter((l) => l.studentId === id).sort((a, b) => a.start.localeCompare(b.start));
  const upcoming = all.filter((l) => l.status === 'planned');
  const past = all.filter((l) => l.status !== 'planned').reverse();
  return (
    <>
      <div className="t-card">
        <div className="t-card__head"><h2>Заплановані</h2>
          <button className="mu-btn mu-btn--lime t-btn-sm" onClick={() => setOpen(!open)}>{open ? 'Закрити' : '+ Заняття'}</button></div>
        {open && <LessonForm studentId={id} onDone={() => setOpen(false)} />}
        {upcoming.length ? upcoming.map((l) => <LessonRow key={l.id} l={l} showStudent={false} />) : <p className="t-empty">Немає запланованих занять.</p>}
      </div>
      {past.length > 0 && (
        <div className="t-card"><h2>Історія</h2>{past.map((l) => <LessonRow key={l.id} l={l} showStudent={false} />)}</div>
      )}
    </>
  );
}

function WordsTab({ id }: { id: string }) {
  const { data, addWord, removeWord } = useTeacher();
  const [f, setF] = useState({ en: '', uk: '', example: '' });
  const [play, setPlay] = useState(false);
  const words = data.words.filter((w) => w.studentId === id);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.en.trim() || !f.uk.trim()) return;
    addWord(id, { en: f.en.trim(), uk: f.uk.trim(), example: f.example.trim() || undefined });
    setF({ en: '', uk: '', example: '' });
    (document.getElementById('word-en') as HTMLInputElement | null)?.focus();
  };

  const sets = [
    { id: 'en', title: 'Англ → Укр', prompt: 'Як це перекладається?', items: words.map((w) => ({ q: w.en, a: w.uk })) },
    { id: 'uk', title: 'Укр → Англ', prompt: 'Як це англійською?', items: words.map((w) => ({ q: w.uk, a: w.en })) },
  ];

  return (
    <>
      <div className="t-card">
        <h2>Додати слово</h2>
        <form className="t-form t-form--words" onSubmit={submit}>
          <label>English<input id="word-en" value={f.en} onChange={(e) => setF({ ...f, en: e.target.value })} placeholder="to look forward to" /></label>
          <label>Переклад<input value={f.uk} onChange={(e) => setF({ ...f, uk: e.target.value })} placeholder="з нетерпінням чекати" /></label>
          <label>Приклад<input value={f.example} onChange={(e) => setF({ ...f, example: e.target.value })} placeholder="I look forward to the trip." /></label>
          <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit">Додати</button></div>
        </form>
      </div>

      <div className="t-card">
        <div className="t-card__head">
          <h2>Словник ({words.length})</h2>
          {words.length >= 4 && (
            <button className="mu-btn t-btn-sm" onClick={() => setPlay(!play)}><Icon id="e-trophy" />{play ? 'Сховати гру' : 'Грати цими словами'}</button>
          )}
        </div>
        {words.length > 0 && words.length < 4 && <p className="t-muted">Додай ще {4 - words.length}, і з цих слів можна буде грати.</p>}
        {play && <div className="t-game"><GameHub sets={sets} /></div>}
        {words.length ? (
          <div className="t-words">
            {words.map((w) => (
              <div key={w.id} className="t-word">
                <b>{w.en}</b><span>{w.uk}</span>
                {w.example && <i>{w.example}</i>}
                <button className="t-icon-btn" onClick={() => removeWord(w.id)} aria-label={`Видалити ${w.en}`}>✕</button>
              </div>
            ))}
          </div>
        ) : <p className="t-empty">Слова, які ти додаси, з’являться тут. Скоро учень бачитиме їх у своєму кабінеті і гратиме ними.</p>}
      </div>
    </>
  );
}

function NotesTab({ id }: { id: string }) {
  const { data, addNote, removeNote } = useTeacher();
  const [text, setText] = useState('');
  const notes = data.notes.filter((n) => n.studentId === id);
  return (
    <div className="t-card">
      <h2>Нотатки</h2>
      <p className="t-muted">Бачиш тільки ти. Що пройшли, на чому спотикається, що задати наступного разу.</p>
      <form className="t-note-form" onSubmit={(e) => { e.preventDefault(); if (text.trim()) { addNote(id, text.trim()); setText(''); } }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Напр.: плутає Past Simple і Present Perfect, наступного разу повторити since / for" />
        <button className="mu-btn mu-btn--lime" type="submit">Зберегти</button>
      </form>
      {notes.map((n) => (
        <div key={n.id} className="t-note">
          <small>{fmtDate(n.at)}</small>
          <p>{n.text}</p>
          <button className="t-icon-btn" onClick={() => removeNote(n.id)} aria-label="Видалити нотатку">✕</button>
        </div>
      ))}
    </div>
  );
}

function PayTab({ id }: { id: string }) {
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
        <div className="t-stat t-stat--lime"><b>{fmtMoney(paid)}</b><span>оплачено</span></div>
        <div className="t-stat t-stat--sky"><b>{done}</b><span>проведено занять</span></div>
        <div className={`t-stat ${b < 0 ? 't-stat--tomato' : 't-stat--mustard'}`}>
          <b>{fmtMoney(Math.abs(b))}</b><span>{b < 0 ? 'борг' : lessonsLeft > 0 ? `аванс, ще ${lessonsLeft} зан.` : 'баланс'}</span>
        </div>
      </div>
      <div className="t-card">
        <h2>Записати оплату</h2>
        <form className="t-form" onSubmit={(e) => { e.preventDefault(); const n = Number(amount); if (n > 0) { addPayment(id, n, note.trim() || undefined); setNote(''); } }}>
          <label>Сума, ₴<input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
          <label>Коментар<input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Напр. пакет 4 заняття, карткою" /></label>
          <div className="t-form__actions">
            {s.price > 0 && [4, 8].map((k) => (
              <button key={k} type="button" className="mu-btn t-btn-sm" onClick={() => { setAmount(String(s.price * k)); setNote(`Пакет ${k} занять`); }}>Пакет {k}</button>
            ))}
            <button className="mu-btn mu-btn--lime" type="submit">Записати</button>
          </div>
        </form>
        <p className="t-muted">Баланс рахується так: усі оплати мінус проведені заняття за ціною учня. Прийом оплат онлайн додамо пізніше.</p>
      </div>
      {pays.length > 0 && (
        <div className="t-card"><h2>Історія оплат</h2>
          {pays.map((p) => (
            <div key={p.id} className="t-row">
              <span>{fmtDate(p.at)}{p.note ? ` · ${p.note}` : ''}</span>
              <b className="t-pos">+{fmtMoney(p.amount)}</b>
              <button className="t-icon-btn" onClick={() => removePayment(p.id)} aria-label="Видалити оплату">✕</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function ProfileTab({ id, onDelete }: { id: string; onDelete: () => void }) {
  const { data, updateStudent } = useTeacher();
  const s = data.students.find((x) => x.id === id)!;
  const [f, setF] = useState({ name: s.name, level: s.level, price: String(s.price), contact: s.contact ?? '', parent: s.parent ?? '', link: s.link ?? '' });
  const [saved, setSaved] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => { setF({ ...f, [k]: e.target.value }); setSaved(false); };

  return (
    <div className="t-card">
      <h2>Профіль учня</h2>
      <form className="t-form" onSubmit={(e) => {
        e.preventDefault();
        updateStudent(id, { name: f.name.trim() || s.name, level: f.level, price: Number(f.price) || 0, contact: f.contact.trim() || undefined, parent: f.parent.trim() || undefined, link: f.link.trim() || undefined });
        setSaved(true);
      }}>
        <label>Ім’я<input value={f.name} onChange={set('name')} /></label>
        <label>Рівень<input value={f.level} onChange={set('level')} /></label>
        <label>Ціна заняття, ₴<input type="number" min="0" value={f.price} onChange={set('price')} /></label>
        <label>Контакт учня<input value={f.contact} onChange={set('contact')} /></label>
        <label>Контакт батьків<input value={f.parent} onChange={set('parent')} /></label>
        <label className="t-form__wide">Посилання на дзвінок<input value={f.link} onChange={set('link')} placeholder="Порожньо: твоє посилання з налаштувань" /></label>
        <div className="t-form__actions">
          {saved && <span className="t-pos">Збережено</span>}
          <button className="mu-btn mu-btn--lime" type="submit">Зберегти</button>
        </div>
      </form>
      <div className="t-danger">
        {!confirm
          ? <button className="t-link-btn" onClick={() => setConfirm(true)}>Видалити учня</button>
          : <><span>Видалити {s.name} разом із заняттями, словником, нотатками й оплатами?</span>
              <button className="mu-btn t-btn-sm" onClick={() => setConfirm(false)}>Ні</button>
              <button className="mu-btn mu-btn--tomato t-btn-sm" onClick={onDelete}>Так, видалити</button></>}
      </div>
    </div>
  );
}

function InviteBox({ id }: { id: string }) {
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
        <h2><Icon id="d-send" />Запроси {s.name} в Murly</h2>
        <p className="t-muted">Учень побачить свій розклад з кнопкою дзвінка, словник від тебе та ігри з цими словами.</p>
      </div>
      {link ? (
        <div className="t-invite__link">
          <input readOnly value={link} onFocus={(e) => e.currentTarget.select()} aria-label="Посилання-запрошення" />
          <button className="mu-btn mu-btn--lime t-btn-sm" onClick={copy}>{copied ? 'Скопійовано' : 'Копіювати'}</button>
        </div>
      ) : (
        <button className="mu-btn mu-btn--lime" onClick={make} disabled={busy}>{busy ? 'Створюю…' : 'Створити посилання'}</button>
      )}
      {err && <p className="t-neg">Не вийшло створити посилання. Спробуй ще раз.</p>}
    </div>
  );
}
