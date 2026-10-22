'use client';
import { useMemo, useState } from 'react';
import Icon from '../Icon';
import GameHub from '../games/GameHub';
import HomeworkList from './HomeworkList';
import CoinsCard from './CoinsCard';
import { GameFinishContext } from '../games/finish';
import type { Enrollment } from '@/lib/student-data';
import { useT } from '@/components/LangProvider';
import type { Lang } from '@/lib/i18n';

const LOCALE: Record<Lang, string> = { uk: 'uk-UA', ru: 'ru-RU', en: 'en-GB' };

const fmtDay = (iso: string, lang: Lang) => new Date(iso).toLocaleDateString(LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long' });
const fmtTime = (iso: string, lang: Lang) => new Date(iso).toLocaleTimeString(LOCALE[lang], { hour: '2-digit', minute: '2-digit' });

export default function StudentHome({ enrollments, name }: { enrollments: Enrollment[]; name: string }) {
  const t = useT();
  const lang = t.lang;
  const [idx, setIdx] = useState(0);
  const e = enrollments[idx];
  const next = e.lessons[0];
  const soon = next && new Date(next.start).getTime() - Date.now() < 15 * 60000; // за 15 хв до початку
  const [play, setPlay] = useState(false);
  // гра зі словами: 1 монетка за кожну правильну відповідь (до 10 за гру, до 40 на день)
  const earnWords = (score: number) => {
    const n = Math.min(10, Math.max(0, Math.round(score)));
    if (!n) return;
    fetch('/api/coins', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'earn', amount: n, source: 'words', reason: 'word game' }) })
      .then(() => window.dispatchEvent(new Event('murly:coins'))).catch(() => {});
  };

  const sets = useMemo(() => [
    { id: 'en', title: t({ uk: 'Англ → Укр', ru: 'Англ → Перевод', en: 'English → Translation' }), prompt: t({ uk: 'Як це перекладається?', ru: 'Как это переводится?', en: 'What does it mean?' }), items: e.words.map((w) => ({ q: w.en, a: w.uk })) },
    { id: 'uk', title: t({ uk: 'Укр → Англ', ru: 'Перевод → Англ', en: 'Translation → English' }), prompt: t({ uk: 'Як це англійською?', ru: 'Как это по-английски?', en: 'How do you say it in English?' }), items: e.words.map((w) => ({ q: w.uk, a: w.en })) },
  ], [e.words, lang]);

  return (
    <div className="t-page">
      <div className="t-head">
        <div>
          {e.teacherName && <p className="t-eyebrow">{t({ uk: 'Вчитель', ru: 'Учитель', en: 'Teacher' })}: {e.teacherName}</p>}
          <h1>{t({ uk: 'Привіт', ru: 'Привет', en: 'Hi' })}{name ? `, ${name}` : ''}!</h1>
        </div>
        {enrollments.length > 1 && (
          <div className="g-chips">
            {enrollments.map((x, i) => (
              <button key={x.studentId} className={`g-chip ${i === idx ? 'is-on' : ''}`} onClick={() => { setIdx(i); setPlay(false); }}>{x.teacherName || `${t({ uk: 'Учитель', ru: 'Учитель', en: 'Teacher' })} ${i + 1}`}</button>
            ))}
          </div>
        )}
      </div>

      <section className={`t-card s-next ${next ? '' : 's-next--empty'}`}>
        <h2><Icon id="e-cal" />{t({ uk: 'Наступне заняття', ru: 'Следующее занятие', en: 'Next lesson' })}</h2>
        {next ? (
          <div className="s-next__row">
            <div>
              <div className="s-next__day">{fmtDay(next.start, lang)}</div>
              <div className="s-next__time">{fmtTime(next.start, lang)}<span> · {next.duration} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span></div>
              {next.topic && <div className="t-muted">{t({ uk: 'Тема', ru: 'Тема', en: 'Topic' })}: {next.topic}</div>}
            </div>
            {next.link && (
              <a href={next.link} target="_blank" rel="noopener noreferrer" className={`mu-btn mu-btn--lg ${soon ? 'mu-btn--lime' : ''}`}>
                <Icon id="d-phone" />{t({ uk: 'Приєднатися до дзвінка', ru: 'Присоединиться к звонку', en: 'Join the call' })}
              </a>
            )}
          </div>
        ) : <p className="t-empty">{t({ uk: 'Поки немає запланованих занять.', ru: 'Пока нет запланированных занятий.', en: 'No lessons planned yet.' })}</p>}
        {e.lessons.length > 1 && (
          <div className="s-later">
            {e.lessons.slice(1, 6).map((l) => (
              <div key={l.id} className="t-row"><span>{fmtDay(l.start, lang)}</span><b>{fmtTime(l.start, lang)}</b></div>
            ))}
          </div>
        )}
      </section>

      <CoinsCard />

      <HomeworkList key={e.studentId} homework={e.homework} words={e.words} />

      <section className="t-card">
        <div className="t-card__head">
          <h2><Icon id="e-abc" />{t({ uk: 'Мій словник', ru: 'Мой словарь', en: 'My dictionary' })} ({e.words.length})</h2>
          {e.words.length >= 4 && (
            <button className="mu-btn mu-btn--lime t-btn-sm" onClick={() => setPlay(!play)}><Icon id="e-trophy" />{play ? t({ uk: 'Сховати гру', ru: 'Скрыть игру', en: 'Hide game' }) : t({ uk: 'Грати моїми словами', ru: 'Играть моими словами', en: 'Play with my words' })}</button>
          )}
        </div>
        {play && <div className="t-game"><GameFinishContext.Provider value={earnWords}><GameHub sets={sets} /></GameFinishContext.Provider></div>}
        {e.words.length ? (
          <div className="t-words">
            {e.words.map((w) => (
              <div key={w.id} className="t-word" style={{ paddingRight: 14 }}>
                <b>{w.en}</b><span>{w.uk}</span>{w.example && <i>{w.example}</i>}
              </div>
            ))}
          </div>
        ) : <p className="t-empty">{t({ uk: 'Тут з’являться слова, які додасть учитель.', ru: 'Здесь появятся слова, которые добавит учитель.', en: 'Words from your teacher will appear here.' })}</p>}
      </section>

      <section className="t-card">
        <h2><Icon id="d-spark" />{t({ uk: 'Тренуйся сам', ru: 'Тренируйся сам', en: 'Practise on your own' })}</h2>
        <div className="t-head__actions">
          <a href="/grammar" className="mu-btn">{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</a>
          <a href="/stories" className="mu-btn">{t({ uk: 'Читання і слухання', ru: 'Чтение и аудирование', en: 'Reading and listening' })}</a>
          <a href="/quiz/teen-life" className="mu-btn">{t({ uk: 'Квізи', ru: 'Квизы', en: 'Quizzes' })}</a>
        </div>
      </section>

      {e.loginPin && (
        <section className="t-card s-login">
          <h2><Icon id="d-lock" />{t({ uk: 'Мій вхід', ru: 'Мой вход', en: 'My login' })}</h2>
          <p>{t({ uk: 'Номер', ru: 'Номер', en: 'Number' })}: <b>{e.loginPhone ? `+${e.loginPhone}` : ''}</b> · PIN: <b className="t-login__pin">{e.loginPin}</b></p>
          <p className="t-muted">{t({ uk: 'Запам’ятай або запиши. Входити тут: murly.com.ua/login', ru: 'Запомни или запиши. Входить здесь: murly.com.ua/login', en: 'Remember or write it down. Log in at murly.com.ua/login' })}</p>
        </section>
      )}
    </div>
  );
}
