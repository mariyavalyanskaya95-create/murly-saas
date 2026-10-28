'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import TeamGame, { type QA } from '@/components/games/TeamGame';
import { useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';
import { parseWords, type TeacherGame } from '@/lib/teacher-games';

// Командна гра: питання зі словника учня, з моїх ігор або свої
export default function TeamGamePage() {
  const t = useT();
  const { data, ready } = useTeacher();
  const [src, setSrc] = useState('');
  const [text, setText] = useState('');
  const [games, setGames] = useState<TeacherGame[]>([]);
  const [play, setPlay] = useState<QA[] | null>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { fetch('/api/games').then((r) => r.json()).then((d) => setGames(d.games ?? [])).catch(() => {}); }, []);

  const groups = data.groups ?? [];
  const items: QA[] = useMemo(() => {
    if (src.startsWith('s:')) return data.words.filter((w) => w.studentId === src.slice(2)).map((w) => ({ q: w.en, a: w.uk }));
    if (src.startsWith('g:')) { const g = groups.find((x) => x.id === src.slice(2)); const seen = new Set<string>(); return data.words.filter((w) => g?.studentIds.includes(w.studentId)).filter((w) => !seen.has(w.en) && seen.add(w.en)).map((w) => ({ q: w.en, a: w.uk })); }
    if (src.startsWith('m:')) return games.find((x) => x.id === src.slice(2))?.items ?? [];
    return parseWords(text);
  }, [src, text, data.words, games, groups]);
  if (!ready) return null;

  const full = () => { const el = box.current as HTMLElement & { requestFullscreen?: () => Promise<void> }; if (document.fullscreenElement) document.exitFullscreen(); else el?.requestFullscreen?.().catch(() => {}); };

  if (play) return (
    <div className="t-page tg-page" ref={box}>
      <div className="t-head__actions" style={{ justifyContent: 'flex-end' }}><button type="button" className="mu-btn t-btn-sm" onClick={full}>{t({ uk: 'На весь екран', ru: 'На весь экран', en: 'Full screen' })}</button></div>
      <TeamGame items={play} onExit={() => setPlay(null)} />
    </div>
  );

  return (
    <div className="t-page">
      <div className="t-head"><div><h1>{t({ uk: 'Командна гра', ru: 'Командная игра', en: 'Team game' })}</h1>
        <p className="t-muted">{t({ uk: 'Сітка закритих карток. Команди по черзі відкривають картку й відповідають. За карткою бали або сюрприз: вкрасти бали, віддати, бомба, ×2. Покажи екран учням або виведи на велику дошку.', ru: 'Сетка закрытых карточек. Команды по очереди открывают карточку и отвечают. За карточкой баллы или сюрприз: украсть баллы, отдать, бомба, ×2. Покажи экран ученикам или выведи на большую доску.', en: 'A grid of hidden cards. Teams take turns opening a card and answering. Behind each card: points or a surprise (steal, give away, bomb, ×2). Share your screen or put it on a big display.' })}</p></div></div>
      <div className="t-card t-form">
        <label className="t-form__wide">{t({ uk: 'Звідки питання', ru: 'Откуда вопросы', en: 'Questions from' })}
          <select value={src} onChange={(e) => setSrc(e.target.value)}>
            <option value="">{t({ uk: 'Свій список (нижче)', ru: 'Свой список (ниже)', en: 'My own list (below)' })}</option>
            {data.students.length > 0 && <optgroup label={t({ uk: 'Словник учня', ru: 'Словарь ученика', en: 'Student vocabulary' })}>{data.students.map((s) => <option key={s.id} value={`s:${s.id}`}>{s.name} ({data.words.filter((w) => w.studentId === s.id).length})</option>)}</optgroup>}
            {groups.length > 0 && <optgroup label={t({ uk: 'Група', ru: 'Группа', en: 'Group' })}>{groups.map((g) => <option key={g.id} value={`g:${g.id}`}>{g.name}</option>)}</optgroup>}
            {games.length > 0 && <optgroup label={t({ uk: 'Мої ігри', ru: 'Мои игры', en: 'My games' })}>{games.map((g) => <option key={g.id} value={`m:${g.id}`}>{g.title} ({g.items.length})</option>)}</optgroup>}
          </select>
        </label>
        {!src && (
          <label className="t-form__wide">{t({ uk: 'Питання = відповідь, кожне з нового рядка', ru: 'Вопрос = ответ, каждый с новой строки', en: 'Question = answer, one per line' })}
            <textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} placeholder={'apple = яблуко\nShe ___ (go) to school every day. = goes\nPast Simple of "buy"? = bought'} />
          </label>
        )}
        <p className="t-muted t-form__wide">{t({ uk: `Готово питань: ${items.length}. Потрібно щонайменше 4.`, ru: `Готово вопросов: ${items.length}. Нужно минимум 4.`, en: `${items.length} questions ready. At least 4 needed.` })}</p>
        <div className="t-form__actions"><button type="button" className="mu-btn mu-btn--lime" disabled={items.length < 4} onClick={() => setPlay(items)}>{t({ uk: 'Далі: команди', ru: 'Дальше: команды', en: 'Next: teams' })}</button></div>
      </div>
    </div>
  );
}
