'use client';
import { useMemo, useState } from 'react';
import Icon from '../Icon';
import QuizGame from '../games/QuizGame';
import MatchGame from '../games/MatchGame';
import AnagramGame from '../games/AnagramGame';
import CardsGame from '../games/CardsGame';
import { GameFinishContext } from '../games/finish';
import ExerciseView from '../exercise/ExerciseView';
import { grade, type Answers, type Section } from '@/lib/exercise';
import LessonView from '../lesson/LessonView';
import { lessonSections, type Block } from '@/lib/lesson';
import type { StudentHomework, StudentWord } from '@/lib/student-data';
import { useT } from '@/components/LangProvider';
import { isQuest } from '@/lib/quest-list';
import type { Lang } from '@/lib/i18n';

const LOCALE: Record<Lang, string> = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-GB' };

const fmtDue = (iso: string, lang: Lang) => new Date(iso).toLocaleDateString(LOCALE[lang], { weekday: 'short', day: 'numeric', month: 'long' });

async function send(id: string, p: { score?: number; total?: number; answer?: string; answers?: Answers }) {
  const r = await fetch('/api/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'submitHomework', id, ...p }) });
  if (r.ok) window.dispatchEvent(new Event('murly:coins'));
  return r.ok;
}

export default function HomeworkList({ homework, words }: { homework: StudentHomework[]; words: StudentWord[] }) {
  const t = useT();
  const [list, setList] = useState(homework);
  const [openId, setOpenId] = useState<string | null>(null);
  // спочатку те, що здати найближчим часом
  const todo = list.filter((h) => h.status === 'assigned').sort((a, b) => (a.due ? +new Date(a.due) : Infinity) - (b.due ? +new Date(b.due) : Infinity));
  const done = list.filter((h) => h.status !== 'assigned');
  const patch = (id: string, p: Partial<StudentHomework>) => setList((l) => l.map((h) => (h.id === id ? { ...h, ...p } : h)));

  if (!list.length) return null;

  return (
    <section className="t-card s-hw" id="homework">
      <h2><Icon id="e-board" />{t({ uk: 'Домашка', ru: 'Домашка', en: 'Homework' })}{todo.length ? ` (${todo.length})` : ''}</h2>
      {!todo.length && <p className="t-muted">{t({ uk: 'Усе здано. Молодець!', ru: 'Всё сдано. Молодец!', en: 'All done. Well done!' })}</p>}
      {[...todo, ...done].map((h) => (
        <HomeworkRow key={h.id} h={h} words={words} open={openId === h.id}
          onToggle={() => setOpenId(openId === h.id ? null : h.id)} onPatch={(p) => patch(h.id, p)} />
      ))}
    </section>
  );
}

function HomeworkRow({ h, words, open, onToggle, onPatch }: {
  h: StudentHomework; words: StudentWord[]; open: boolean; onToggle: () => void; onPatch: (p: Partial<StudentHomework>) => void;
}) {
  const t = useT();
  const [answer, setAnswer] = useState(h.answer ?? '');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(false);
  const overdue = h.status === 'assigned' && h.due && new Date(h.due) < new Date();

  const items = useMemo(() => words.map((w) => (h.direction === 'uk' ? { q: w.uk, a: w.en } : { q: w.en, a: w.uk })), [words, h.direction]);
  const onFinish = async (score: number, total: number) => {
    onPatch({ score, total, status: h.status === 'checked' ? 'checked' : 'done' });
    if (!(await send(h.id, { score, total }))) setErr(true);
  };
  const submitText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setSaving(true); setErr(false);
    const ok = await send(h.id, { answer: answer.trim() });
    setSaving(false);
    if (ok) onPatch({ answer: answer.trim(), status: h.status === 'checked' ? 'checked' : 'done' }); else setErr(true);
  };

  const tag = h.status === 'checked' ? <span className="t-tag t-tag--done">{t({ uk: 'Перевірено', ru: 'Проверено', en: 'Checked' })}</span>
    : h.status === 'done' ? <span className="t-tag t-tag--warn">{t({ uk: 'Здано', ru: 'Сдано', en: 'Handed in' })}</span>
    : overdue ? <span className="t-tag t-tag--late">{t({ uk: 'Прострочено', ru: 'Просрочено', en: 'Late' })}</span>
    : h.due ? <span className="t-tag">{t({ uk: 'до', ru: 'до', en: 'due' })} {fmtDue(h.due, t.lang)}</span> : null;

  return (
    <div className={`s-hw__item is-${h.status} ${open ? 'is-open' : ''}`}>
      <button className="s-hw__head" onClick={onToggle} aria-expanded={open}>
        <span className="s-hw__title"><Icon id={h.kind === 'mock' ? 'e-cap' : h.kind === 'game' ? 'e-trophy' : h.kind === 'exercise' ? 'e-abc' : h.kind === 'lesson' ? 'e-book' : 'e-pencil'} />{h.title}</span>
        <span className="s-hw__right">{h.score != null && <b>{h.score}/{h.total}</b>}{tag}</span>
      </button>
      {open && (
        <div className="s-hw__body">
          {h.instructions && <p className="t-hw__text">{h.instructions}</p>}
          {h.feedback && <div className="s-hw__fb"><small>{t({ uk: 'Коментар учителя', ru: 'Комментарий учителя', en: 'Teacher’s comment' })}</small><p>{h.feedback}</p></div>}
          {h.kind === 'game' && isQuest(h.game) && (
            <p><a className="mu-btn mu-btn--lime" href={`/play/quest/${h.game}?hw=${encodeURIComponent(h.id)}`}>{h.status === 'assigned' ? t({ uk: 'Грати квест', ru: 'Играть квест', en: 'Play the quest' }) : t({ uk: 'Зіграти ще раз', ru: 'Сыграть ещё раз', en: 'Play again' })}</a></p>
          )}
          {h.kind === 'game' && !isQuest(h.game) && (
            items.length >= 4
              ? <GameFinishContext.Provider value={onFinish}>
                  <div className="g-stage">
                    {h.game === 'match' ? <MatchGame items={items} /> : h.game === 'anagram' ? <AnagramGame items={items} /> : h.game === 'cards' ? <CardsGame items={items} /> : <QuizGame items={items} />}
                  </div>
                </GameFinishContext.Provider>
              : <p className="t-muted">{t({ uk: 'У словнику поки замало слів для гри.', ru: 'В словаре пока мало слов для игры.', en: 'There are not enough words in your dictionary for a game yet.' })}</p>
          )}
          {h.kind === 'mock' && h.game && (
            <p><a className="mu-btn mu-btn--lime" href={`/nmt/mock/${h.game}?hw=${encodeURIComponent(h.id)}`}>{h.status === 'assigned' ? t({ uk: 'Пройти тест', ru: 'Пройти тест', en: 'Take the test' }) : t({ uk: 'Пройти ще раз', ru: 'Пройти ещё раз', en: 'Take it again' })}</a>
              <span className="t-muted" style={{ display: 'block', marginTop: 8 }}>{t({ uk: 'Коли завершиш тест, бал сам потрапить у домашку.', ru: 'Когда завершишь тест, балл сам попадёт в домашку.', en: 'When you finish, your score is saved here automatically.' })}</span></p>
          )}
          {h.kind === 'exercise' && h.items && <ExercisePlayer h={h} onPatch={onPatch} />}
          {h.kind === 'lesson' && h.items && (
            <div className="s-lesson">
              <LessonView plan={{ title: '', blocks: h.items as Block[] }} initialAnswers={h.answers} overrides={h.overrides}
                submitLabel={t({ uk: 'Перевірити і здати урок', ru: 'Проверить и сдать урок', en: 'Check and hand in the lesson' })}
                onSubmit={async (answers) => {
                  const ok = await send(h.id, { answers });
                  if (ok) { const g = grade(lessonSections(h.items as Block[]), answers, h.overrides); onPatch({ answers, score: g.score, total: g.total, status: h.status === 'checked' ? 'checked' : 'done' }); }
                  return ok;
                }} />
            </div>
          )}
          {h.kind === 'text' && (
            <form className="t-note-form" onSubmit={submitText}>
              <textarea rows={5} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder={t({ uk: 'Пиши відповідь тут', ru: 'Пиши ответ здесь', en: 'Write your answer here' })} />
              <button className="mu-btn mu-btn--lime" type="submit" disabled={saving}>{saving ? t({ uk: 'Надсилаю…', ru: 'Отправляю…', en: 'Sending…' }) : h.answer ? t({ uk: 'Оновити відповідь', ru: 'Обновить ответ', en: 'Update answer' }) : t({ uk: 'Здати', ru: 'Сдать', en: 'Hand in' })}</button>
            </form>
          )}
          {err && <p className="t-neg">{t({ uk: 'Не вдалося зберегти. Перевір інтернет і спробуй ще раз.', ru: 'Не удалось сохранить. Проверь интернет и попробуй ещё раз.', en: 'Could not save. Check your internet and try again.' })}</p>}
        </div>
      )}
    </div>
  );
}

function ExercisePlayer({ h, onPatch }: { h: StudentHomework; onPatch: (p: Partial<StudentHomework>) => void }) {
  const t = useT();
  const sections = (h.items ?? []) as Section[];
  const [answers, setAnswers] = useState<Answers>(h.answers ?? {});
  // здано, лише якщо учень справді щось відповів (порожнє {} не блокує поля)
  const [checked, setChecked] = useState(Object.values(h.answers ?? {}).some((v) => String(v ?? '').trim()));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(false);
  const result = useMemo(() => (checked ? grade(sections, answers, h.overrides) : null), [checked, sections, answers, h.overrides]);

  const submit = async () => {
    setSaving(true); setErr(false);
    const ok = await send(h.id, { answers });
    setSaving(false);
    if (!ok) { setErr(true); return; }
    const g = grade(sections, answers, h.overrides);
    setChecked(true);
    onPatch({ answers, score: g.score, total: g.total, status: h.status === 'checked' ? 'checked' : 'done' });
  };

  return (
    <div className="ex-play">
      <ExerciseView sections={sections} answers={answers}
        onChange={checked ? undefined : (k, v) => setAnswers((a) => ({ ...a, [k]: v }))}
        marks={result?.marks} showCorrect={checked} overrides={h.overrides} />
      {result && (
        <div className="ex-result">
          <b>{result.score} / {result.total}</b>
          <span>{result.total && result.score === result.total ? t({ uk: 'Ідеально, усе правильно!', ru: 'Идеально, всё правильно!', en: 'Perfect, all correct!' }) : t({ uk: 'Правильні відповіді підсвічені під помилками.', ru: 'Правильные ответы показаны под ошибками.', en: 'The correct answers are shown under your mistakes.' })}</span>
        </div>
      )}
      <div className="ex-play__bar">
        {!checked
          ? <button className="mu-btn mu-btn--lime" onClick={submit} disabled={saving}>{saving ? t({ uk: 'Перевіряю…', ru: 'Проверяю…', en: 'Checking…' }) : t({ uk: 'Перевірити і здати', ru: 'Проверить и сдать', en: 'Check and hand in' })}</button>
          : <button className="mu-btn" onClick={() => setChecked(false)}>{t({ uk: 'Виправити і здати ще раз', ru: 'Исправить и сдать ещё раз', en: 'Fix and hand in again' })}</button>}
      </div>
      {err && <p className="t-neg">{t({ uk: 'Не вдалося зберегти. Перевір інтернет і спробуй ще раз.', ru: 'Не удалось сохранить. Проверь интернет и попробуй ещё раз.', en: 'Could not save. Check your internet and try again.' })}</p>}
    </div>
  );
}
