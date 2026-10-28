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
import { speakEn } from '@/lib/speak';

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
    if (e.adult) return;
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

      <nav className="s-jump" aria-label={t({ uk: 'Швидкий перехід', ru: 'Быстрый переход', en: 'Quick links' })}>
        <a href="#homework" className="mu-btn mu-btn--lime"><Icon id="e-board" />{t({ uk: 'Домашка', ru: 'Домашка', en: 'Homework' })}{e.homework.filter((h) => h.status === 'assigned').length ? ` (${e.homework.filter((h) => h.status === 'assigned').length})` : ''}</a>
        <a href="#words" className="mu-btn"><Icon id="e-abc" />{t({ uk: 'Мій словник', ru: 'Мой словарь', en: 'My dictionary' })}</a>
        {e.materials.length > 0 && <a href="#materials" className="mu-btn"><Icon id="e-book" />{t({ uk: 'Матеріали з уроків', ru: 'Материалы с уроков', en: 'Lesson materials' })}</a>}
      </nav>

      <Progress e={e} />

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

      {!e.adult && <CoinsCard />}

      <HomeworkList key={e.studentId} homework={e.homework} words={e.words} />

      <section className="t-card" id="words">
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
              <div key={w.id} className="t-word">
                <b>{w.en}</b><span>{w.uk}</span>{w.example && <i>{w.example}</i>}
                <button type="button" className="t-icon-btn" onClick={() => speakEn(w.en, 0.9)} aria-label={`${t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}: ${w.en}`} title={t({ uk: 'Послухати', ru: 'Послушать', en: 'Listen' })}><Icon id="e-head" /></button>
              </div>
            ))}
          </div>
        ) : <p className="t-empty">{t({ uk: 'Тут з’являться слова, які додасть учитель.', ru: 'Здесь появятся слова, которые добавит учитель.', en: 'Words from your teacher will appear here.' })}</p>}
      </section>

      <section className="t-card">
        <h2><Icon id="d-spark" />{t({ uk: 'Тренуйся сам', ru: 'Тренируйся сам', en: 'Practise on your own' })}</h2>
        <div className="t-head__actions">
          <a href="/learn" className="mu-btn mu-btn--lime">{t({ uk: 'Усі матеріали за рівнем', ru: 'Все материалы по уровню', en: 'All materials by level' })}</a>
          <a href="/grammar" className="mu-btn">{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</a>
          <a href="/stories" className="mu-btn">{t({ uk: 'Читання і слухання', ru: 'Чтение и аудирование', en: 'Reading and listening' })}</a>
          <a href="/quiz/teen-life" className="mu-btn">{t({ uk: 'Квізи', ru: 'Квизы', en: 'Quizzes' })}</a>
        </div>
      </section>

      {e.materials.length > 0 && (
        <section className="t-card" id="materials">
          <h2><Icon id="e-book" />{t({ uk: 'Матеріали з уроків', ru: 'Материалы с уроков', en: 'Lesson materials' })}</h2>
          {e.materials.map((m, i) => (
            <div key={i} className="s-mat">
              <small className="t-muted">{fmtDay(m.at, lang)}</small>
              <div className="t-docs">{m.files.map((f) => <a key={f.url} href={f.url} target="_blank" rel="noreferrer" className="t-doc"><Icon id="e-book" />{f.name}</a>)}</div>
            </div>
          ))}
        </section>
      )}

      {e.tgLink && (
        <section className="t-card s-tg">
          <h2><Icon id="d-send" />{t({ uk: 'Сповіщення в Telegram', ru: 'Уведомления в Telegram', en: 'Telegram notifications' })}</h2>
          {e.tgLinked
            ? <p>{t({ uk: 'Підключено. Нові домашки, нагадування про заняття й коментарі вчителя приходять у Telegram.', ru: 'Подключено. Новые домашки, напоминания о занятиях и комментарии учителя приходят в Telegram.', en: 'Connected. New homework, lesson reminders and teacher comments arrive in Telegram.' })} <a href={e.tgLink} target="_blank" rel="noreferrer" className="t-link-btn">{t({ uk: 'Підключити інший Telegram', ru: 'Подключить другой Telegram', en: 'Use another Telegram' })}</a></p>
            : <>
                <p className="t-muted">{t({ uk: 'Щоб не пропустити домашку і заняття: натисни кнопку, у Telegram натисни «Start». Готово.', ru: 'Чтобы не пропустить домашку и занятия: нажми кнопку, в Telegram нажми «Start». Готово.', en: 'Never miss homework or a lesson: tap the button, then tap “Start” in Telegram. Done.' })}</p>
                <a href={e.tgLink} target="_blank" rel="noreferrer" className="mu-btn mu-btn--lime">{t({ uk: 'Підключити Telegram', ru: 'Подключить Telegram', en: 'Connect Telegram' })}</a>
              </>}
        </section>
      )}

      <MyLogin key={e.studentId} phone={e.loginPhone} pin={e.loginPin} />
    </div>
  );
}

// Мій прогрес: скільки здано домашок, середній бал, слова
function Progress({ e }: { e: Enrollment }) {
  const t = useT();
  const done = e.homework.filter((h) => h.status !== 'assigned');
  const scored = done.filter((h) => h.total);
  const avg = scored.length ? Math.round((scored.reduce((s, h) => s + (h.score ?? 0) / (h.total || 1), 0) / scored.length) * 100) : null;
  if (!e.homework.length && !e.words.length) return null;
  return (
    <section className="s-prog" aria-label={t({ uk: 'Мій прогрес', ru: 'Мой прогресс', en: 'My progress' })}>
      <div className="s-prog__item"><b>{done.length}/{e.homework.length}</b><span>{t({ uk: 'домашок здано', ru: 'домашек сдано', en: 'homework done' })}</span>
        <i className="s-prog__bar"><i style={{ width: `${e.homework.length ? Math.round((done.length / e.homework.length) * 100) : 0}%` }} /></i></div>
      <div className="s-prog__item"><b>{avg != null ? `${avg}%` : '–'}</b><span>{t({ uk: 'середній результат', ru: 'средний результат', en: 'average score' })}</span></div>
      <div className="s-prog__item"><b>{e.words.length}</b><span>{t({ uk: 'слів у словнику', ru: 'слов в словаре', en: 'words in my dictionary' })}</span></div>
    </section>
  );
}

// «Мій вхід»: номер і PIN, щоб заходити з будь-якого пристрою без пароля
function MyLogin({ phone: phone0, pin: pin0 }: { phone?: string; pin?: string }) {
  const t = useT();
  const [cur, setCur] = useState({ phone: phone0, pin: pin0 });
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(phone0 ? `+${phone0}` : '');
  const [pin, setPin] = useState(pin0 ?? '');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const save = async (ev: React.FormEvent) => {
    ev.preventDefault(); setBusy(true); setErr('');
    const r = await fetch('/api/student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'setPin', phone, pin }) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    setBusy(false);
    if (r && r.ok) { setCur({ phone: j.phone, pin: j.pin }); setOpen(false); return; }
    setErr(j.error === 'bad_phone' ? t({ uk: 'Перевір номер телефону.', ru: 'Проверь номер телефона.', en: 'Check the phone number.' })
      : j.error === 'bad_pin' ? t({ uk: 'PIN: від 4 до 8 цифр або латинських літер.', ru: 'PIN: от 4 до 8 цифр или латинских букв.', en: 'PIN: 4 to 8 digits or Latin letters.' })
      : j.error === 'pin_taken' ? t({ uk: 'Такий PIN на цьому номері вже зайнятий, обери інший.', ru: 'Такой PIN на этом номере уже занят, выбери другой.', en: 'This PIN is taken for this number, pick another.' })
      : t({ uk: 'Не вдалося зберегти. Спробуй ще раз.', ru: 'Не удалось сохранить. Попробуй ещё раз.', en: 'Could not save. Please try again.' }));
  };
  return (
    <section className="t-card s-login">
      <h2><Icon id="d-lock" />{t({ uk: 'Мій вхід', ru: 'Мой вход', en: 'My login' })}</h2>
      {cur.pin && !open ? (
        <>
          <p>{t({ uk: 'Номер', ru: 'Номер', en: 'Number' })}: <b>{cur.phone ? `+${cur.phone}` : ''}</b> · PIN: <b className="t-login__pin">{cur.pin}</b></p>
          <p className="t-muted">{t({ uk: 'З будь-якого телефону чи компʼютера: murly.com.ua/login, номер і PIN.', ru: 'С любого телефона или компьютера: murly.com.ua/login, номер и PIN.', en: 'From any phone or computer: murly.com.ua/login, number and PIN.' })}</p>
          <button type="button" className="t-link-btn" onClick={() => setOpen(true)}>{t({ uk: 'Змінити', ru: 'Изменить', en: 'Change' })}</button>
        </>
      ) : (
        <>
          <p className="t-muted">{t({ uk: 'Щоб заходити з будь-якого пристрою без пароля, придумай простий PIN (наприклад 4 цифри). Його бачиш ти і твій учитель.', ru: 'Чтобы входить с любого устройства без пароля, придумай простой PIN (например 4 цифры). Его видишь ты и твой учитель.', en: 'To log in from any device without a password, make up a simple PIN (for example 4 digits). You and your teacher can see it.' })}</p>
          <form className="t-login__form" onSubmit={save}>
            <label>{t({ uk: 'Номер телефону', ru: 'Номер телефона', en: 'Phone number' })}<input type="tel" value={phone} onChange={(ev) => setPhone(ev.target.value)} placeholder="+380 67 123 45 67" required /></label>
            <label>PIN<input value={pin} onChange={(ev) => setPin(ev.target.value.trim())} maxLength={8} required className="t-login__pin" /></label>
            <button type="submit" className="mu-btn mu-btn--lime t-btn-sm" disabled={busy}>{busy ? '…' : t({ uk: 'Зберегти', ru: 'Сохранить', en: 'Save' })}</button>
          </form>
          {err && <p className="t-neg">{err}</p>}
        </>
      )}
    </section>
  );
}
