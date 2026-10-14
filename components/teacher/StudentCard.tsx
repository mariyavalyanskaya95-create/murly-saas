'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Icon from '../Icon';
import GameHub from '../games/GameHub';
import LessonRow from './LessonRow';
import { LessonForm } from './forms';
import ExerciseEditor from '../exercise/ExerciseEditor';
import ExerciseView from '../exercise/ExerciseView';
import { grade, type Section } from '@/lib/exercise';
import { lessonSections, type Block } from '@/lib/lesson';
import { balanceOf, fmtDate, fmtMoney, useTeacher } from '@/lib/teacher-store';

type Tab = 'lessons' | 'hw' | 'words' | 'notes' | 'pay' | 'profile';
const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'lessons', label: 'Заняття', icon: 'e-cal' },
  { id: 'hw', label: 'Домашка', icon: 'e-board' },
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
  const words = useMemo(() => data.words.filter((w) => w.studentId === id), [data.words, id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.en.trim() || !f.uk.trim()) return;
    addWord(id, { en: f.en.trim(), uk: f.uk.trim(), example: f.example.trim() || undefined });
    setF({ en: '', uk: '', example: '' });
    (document.getElementById('word-en') as HTMLInputElement | null)?.focus();
  };

  const sets = useMemo(() => [
    { id: 'en', title: 'Англ → Укр', prompt: 'Як це перекладається?', items: words.map((w) => ({ q: w.en, a: w.uk })) },
    { id: 'uk', title: 'Укр → Англ', prompt: 'Як це англійською?', items: words.map((w) => ({ q: w.uk, a: w.en })) },
  ], [words]);

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

const GAMES = [
  { id: 'quiz', label: 'Квіз' }, { id: 'match', label: 'Пари' }, { id: 'anagram', label: 'Анаграма' }, { id: 'cards', label: 'Картки' },
] as const;

function defaultDue() {
  const d = new Date(); d.setDate(d.getDate() + 3); d.setHours(20, 0, 0, 0);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

function HomeworkTab({ id }: { id: string }) {
  const { data, addHomework } = useTeacher();
  const words = data.words.filter((w) => w.studentId === id).length;
  const list = data.homework.filter((h) => h.studentId === id);
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
    const gameLabel = GAMES.find((g) => g.id === game)!.label;
    addHomework({
      studentId: id, kind,
      title: title.trim() || (kind === 'game' ? `Слова: ${gameLabel.toLowerCase()}` : kind === 'exercise' ? 'Вправа' : 'Письмове завдання'),
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
        <div className="t-card__head"><h2>Домашні завдання</h2>
          <button className="mu-btn mu-btn--lime t-btn-sm" onClick={() => setOpen(!open)}>{open ? 'Закрити' : '+ Задати'}</button></div>
        {open && (
          <form className="t-hw-form" onSubmit={submit}>
            <div className="g-chips" style={{ justifyContent: 'flex-start' }}>
              <button type="button" className={`g-chip ${kind === 'exercise' ? 'is-on' : ''}`} onClick={() => setKind('exercise')}>Вправа з автоперевіркою</button>
              <button type="button" className={`g-chip ${kind === 'game' ? 'is-on' : ''}`} onClick={() => setKind('game')}>Гра зі словника</button>
              <button type="button" className={`g-chip ${kind === 'text' ? 'is-on' : ''}`} onClick={() => setKind('text')}>Письмове завдання</button>
            </div>
            {kind === 'game' && words < 4 && <p className="t-neg">У словнику учня {words} слів. Додай хоча б 4, щоб задати гру.</p>}
            {kind === 'game' && (
              <div className="t-form">
                <label>Гра<select value={game} onChange={(e) => setGame(e.target.value as typeof game)}>{GAMES.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}</select></label>
                <label>Напрямок<select value={direction} onChange={(e) => setDirection(e.target.value as 'en' | 'uk')}>
                  <option value="en">Англ → Укр</option><option value="uk">Укр → Англ</option></select></label>
              </div>
            )}
            {kind === 'exercise' && <ExerciseEditor key={String(open)} onChange={setSections} />}
            <div className="t-form">
              <label>Назва<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={kind === 'game' ? 'Напр. Слова з Unit 5' : kind === 'exercise' ? 'Напр. Past Simple, Unit 3' : 'Напр. Твір про літо'} /></label>
              <label>Здати до<input type="datetime-local" value={due} onChange={(e) => setDue(e.target.value)} /></label>
              <label className="t-form__wide">{kind === 'text' ? 'Завдання' : 'Коментар для учня (необов’язково)'}
                <textarea rows={3} value={instructions} onChange={(e) => setInstructions(e.target.value)}
                  placeholder={kind === 'text' ? 'Напр. Напиши 5 речень у Present Perfect про свій тиждень' : 'Напр. Пройди двічі, поки не буде без помилок'} required={kind === 'text'} />
              </label>
              <div className="t-form__actions"><button className="mu-btn mu-btn--lime" type="submit" disabled={(kind === 'game' && words < 4) || (kind === 'exercise' && !sections.length)}>Задати</button></div>
            </div>
          </form>
        )}
        {!list.length && !open && <p className="t-empty">Ще немає завдань. Задай гру зі словника або письмове завдання, і учень побачить його у своєму кабінеті.</p>}
      </div>
      {list.map((h) => <HomeworkItem key={h.id} hwId={h.id} />)}
    </>
  );
}

function HomeworkItem({ hwId }: { hwId: string }) {
  const { data, updateHomework, removeHomework } = useTeacher();
  const h = data.homework.find((x) => x.id === hwId)!;
  const [fb, setFb] = useState(h.feedback ?? '');
  const overdue = h.status === 'assigned' && h.due && new Date(h.due) < new Date();
  const statusTag = h.status === 'checked' ? <span className="t-tag t-tag--done">Перевірено</span>
    : h.status === 'done' ? <span className="t-tag t-tag--warn">Чекає перевірки</span>
    : overdue ? <span className="t-tag t-tag--late">Прострочено</span> : <span className="t-tag">Задано</span>;

  return (
    <div className={`t-card t-hw is-${h.status}`}>
      <div className="t-card__head">
        <h2 style={{ fontSize: 19 }}>{h.title}</h2>
        <div className="t-hw__meta">{statusTag}{h.due && <span className="t-muted">до {fmtDate(h.due)}</span>}</div>
      </div>
      {h.instructions && <p className="t-hw__text">{h.instructions}</p>}
      {h.kind !== 'text' && h.score != null && <p><b>Результат: {h.score} / {h.total}</b></p>}
      {(h.kind === 'exercise' || h.kind === 'lesson') && h.items && (() => {
        const secs = h.kind === 'lesson' ? lessonSections(h.items as Block[]) : (h.items as Section[]);
        return (
          <details className="t-hw__details" open={h.status === 'done'}>
            <summary>{h.answers ? 'Відповіді учня' : 'Завдання'}</summary>
            <ExerciseView sections={secs} answers={h.answers ?? {}} marks={h.answers ? grade(secs, h.answers, h.overrides).marks : undefined}
              showCorrect={!!h.answers} overrides={h.overrides} onOverride={(k) => {
                const ov = { ...(h.overrides ?? {}) };
                if (ov[k]) delete ov[k]; else ov[k] = true;
                updateHomework(h.id, { overrides: ov, score: grade(secs, h.answers ?? {}, ov).score });
              }} />
            {h.answers && <p className="t-muted" style={{ fontSize: 14 }}>Перевірка не прийняла відповідь, але вона правильна? Натисни «Зарахувати», і бал додасться.</p>}
          </details>
        );
      })()}
      {h.kind === 'text' && h.answer && <div className="t-hw__answer"><small>Відповідь учня</small><p>{h.answer}</p></div>}
      {h.status !== 'assigned' && (
        <form className="t-note-form" onSubmit={(e) => { e.preventDefault(); updateHomework(h.id, { feedback: fb.trim() || undefined, status: 'checked' }); }}>
          <textarea rows={2} value={fb} onChange={(e) => setFb(e.target.value)} placeholder="Коментар для учня: що вийшло, над чим попрацювати" />
          <button className="mu-btn mu-btn--lime t-btn-sm" type="submit">{h.status === 'checked' ? 'Оновити коментар' : 'Перевірено'}</button>
        </form>
      )}
      <div className="t-danger" style={{ marginTop: 0, paddingTop: 8 }}>
        <button className="t-link-btn" onClick={() => removeHomework(h.id)}>Видалити завдання</button>
      </div>
    </div>
  );
}
