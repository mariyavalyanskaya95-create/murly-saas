'use client';
import { useMemo, useState } from 'react';
import Icon from '../Icon';
import GameHub from '../games/GameHub';
import HomeworkList from './HomeworkList';
import type { Enrollment } from '@/lib/student-data';

const fmtDay = (iso: string) => new Date(iso).toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtTime = (iso: string) => new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

export default function StudentHome({ enrollments, name }: { enrollments: Enrollment[]; name: string }) {
  const [idx, setIdx] = useState(0);
  const e = enrollments[idx];
  const next = e.lessons[0];
  const soon = next && new Date(next.start).getTime() - Date.now() < 15 * 60000; // за 15 хв до початку
  const [play, setPlay] = useState(false);

  const sets = useMemo(() => [
    { id: 'en', title: 'Англ → Укр', prompt: 'Як це перекладається?', items: e.words.map((w) => ({ q: w.en, a: w.uk })) },
    { id: 'uk', title: 'Укр → Англ', prompt: 'Як це англійською?', items: e.words.map((w) => ({ q: w.uk, a: w.en })) },
  ], [e.words]);

  return (
    <div className="t-page">
      <div className="t-head">
        <div>
          {e.teacherName && <p className="t-eyebrow">Вчитель: {e.teacherName}</p>}
          <h1>Привіт{name ? `, ${name}` : ''}!</h1>
        </div>
        {enrollments.length > 1 && (
          <div className="g-chips">
            {enrollments.map((x, i) => (
              <button key={x.studentId} className={`g-chip ${i === idx ? 'is-on' : ''}`} onClick={() => { setIdx(i); setPlay(false); }}>{x.teacherName || `Учитель ${i + 1}`}</button>
            ))}
          </div>
        )}
      </div>

      <section className={`t-card s-next ${next ? '' : 's-next--empty'}`}>
        <h2><Icon id="e-cal" />Наступне заняття</h2>
        {next ? (
          <div className="s-next__row">
            <div>
              <div className="s-next__day">{fmtDay(next.start)}</div>
              <div className="s-next__time">{fmtTime(next.start)}<span> · {next.duration} хв</span></div>
              {next.topic && <div className="t-muted">Тема: {next.topic}</div>}
            </div>
            {next.link && (
              <a href={next.link} target="_blank" rel="noopener noreferrer" className={`mu-btn mu-btn--lg ${soon ? 'mu-btn--lime' : ''}`}>
                <Icon id="d-phone" />Приєднатися до дзвінка
              </a>
            )}
          </div>
        ) : <p className="t-empty">Поки немає запланованих занять.</p>}
        {e.lessons.length > 1 && (
          <div className="s-later">
            {e.lessons.slice(1, 6).map((l) => (
              <div key={l.id} className="t-row"><span>{fmtDay(l.start)}</span><b>{fmtTime(l.start)}</b></div>
            ))}
          </div>
        )}
      </section>

      <HomeworkList key={e.studentId} homework={e.homework} words={e.words} />

      <section className="t-card">
        <div className="t-card__head">
          <h2><Icon id="e-abc" />Мій словник ({e.words.length})</h2>
          {e.words.length >= 4 && (
            <button className="mu-btn mu-btn--lime t-btn-sm" onClick={() => setPlay(!play)}><Icon id="e-trophy" />{play ? 'Сховати гру' : 'Грати моїми словами'}</button>
          )}
        </div>
        {play && <div className="t-game"><GameHub sets={sets} /></div>}
        {e.words.length ? (
          <div className="t-words">
            {e.words.map((w) => (
              <div key={w.id} className="t-word" style={{ paddingRight: 14 }}>
                <b>{w.en}</b><span>{w.uk}</span>{w.example && <i>{w.example}</i>}
              </div>
            ))}
          </div>
        ) : <p className="t-empty">Тут з’являться слова, які додасть учитель.</p>}
      </section>

      <section className="t-card">
        <h2><Icon id="d-spark" />Тренуйся сам</h2>
        <div className="t-head__actions">
          <a href="/irregular-verbs/games" className="mu-btn">Неправильні дієслова</a>
          <a href="/grammar" className="mu-btn">Граматика</a>
          <a href="/quiz/teen-life" className="mu-btn">Квізи</a>
        </div>
      </section>
    </div>
  );
}
