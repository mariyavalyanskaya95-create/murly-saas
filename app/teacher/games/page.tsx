'use client';
import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import GameHub from '@/components/games/GameHub';
import { useT } from '@/components/LangProvider';
import { parseWords, type TeacherGame } from '@/lib/teacher-games';

// Свої ігри вчителя: вводиш слова один раз, обираєш гру і відправляєш учням посилання.
export default function TeacherGamesPage() {
  const t = useT();
  const [list, setList] = useState<TeacherGame[] | null>(null);
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [words, setWords] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState('');
  const [open, setOpen] = useState('');
  const items = useMemo(() => parseWords(words), [words]);

  const load = () => fetch('/api/games').then((r) => r.json()).then((d) => setList(d.games ?? [])).catch(() => setList([]));
  useEffect(() => { load(); }, []);

  const link = (id: string) => `${typeof window !== 'undefined' ? window.location.origin : 'https://murly.com.ua'}/play/g/${id}`;
  const copy = async (id: string) => { try { await navigator.clipboard.writeText(link(id)); setCopied(id); setTimeout(() => setCopied(''), 2000); } catch { /* */ } };

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setErr('');
    if (!title.trim() || items.length < 4) { setErr(t({ uk: 'Потрібна назва і хоча б 4 пари слів.', ru: 'Нужно название и хотя бы 4 пары слов.', en: 'Add a title and at least 4 word pairs.' })); return; }
    setSaving(true);
    const r = await fetch('/api/games', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, prompt, words }) }).catch(() => null);
    setSaving(false);
    if (!r || !r.ok) { setErr(t({ uk: 'Не вдалося зберегти. Спробуй ще раз.', ru: 'Не удалось сохранить. Попробуй ещё раз.', en: 'Could not save. Please try again.' })); return; }
    const { id } = await r.json();
    setTitle(''); setPrompt(''); setWords(''); await load(); setOpen(id); copy(id);
  };
  const remove = async (id: string) => {
    if (!confirm(t({ uk: 'Видалити гру? Посилання перестане працювати.', ru: 'Удалить игру? Ссылка перестанет работать.', en: 'Delete this game? The link will stop working.' }))) return;
    await fetch(`/api/games?id=${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => null);
    load();
  };

  return (
    <div className="t-page">
      <div className="t-head"><div><p className="t-eyebrow">{t({ uk: 'Ігри', ru: 'Игры', en: 'Games' })}</p><h1>{t({ uk: 'Мої ігри', ru: 'Мои игры', en: 'My games' })}</h1></div></div>

      <form className="t-card" onSubmit={save}>
        <h2><Icon id="e-trophy" className="mu-ic" />{t({ uk: 'Нова гра', ru: 'Новая игра', en: 'New game' })}</h2>
        <p className="t-muted">{t({ uk: 'Вводиш слова один раз, а учні грають у квіз, пари, анаграму чи картки. Посилання відкривається без входу.', ru: 'Вводишь слова один раз, а ученики играют в квиз, пары, анаграмму или карточки. Ссылка открывается без входа.', en: 'Enter the words once and students play a quiz, pairs, anagrams or flashcards. The link works without signing in.' })}</p>
        <div className="t-form">
          <label>{t({ uk: 'Назва', ru: 'Название', en: 'Title' })}<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t({ uk: 'Напр. Їжа, Unit 5', ru: 'Напр. Еда, Unit 5', en: 'e.g. Food, Unit 5' })} required /></label>
          <label>{t({ uk: 'Підказка над грою (необов’язково)', ru: 'Подсказка над игрой (необязательно)', en: 'Prompt above the game (optional)' })}<input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t({ uk: 'Напр. Переклади слово', ru: 'Напр. Переведи слово', en: 'e.g. Translate the word' })} /></label>
          <label className="t-form__wide">{t({ uk: 'Слова: одна пара в рядку, через =', ru: 'Слова: одна пара в строке, через =', en: 'Words: one pair per line, separated by =' })}
            <textarea rows={8} value={words} onChange={(e) => setWords(e.target.value)} placeholder={'apple = яблуко\nbread = хліб\ncheese = сир\nmilk = молоко'} />
          </label>
        </div>
        <p className="t-muted">{t({ uk: `Пар: ${items.length}. Потрібно від 4 до 60.`, ru: `Пар: ${items.length}. Нужно от 4 до 60.`, en: `Pairs: ${items.length}. You need 4 to 60.` })}</p>
        {err && <p className="t-neg">{err}</p>}
        <div className="t-form__actions"><button className="mu-btn mu-btn--lime" disabled={saving}>{saving ? t({ uk: 'Зберігаю…', ru: 'Сохраняю…', en: 'Saving…' }) : t({ uk: 'Створити гру', ru: 'Создать игру', en: 'Create game' })}</button></div>
      </form>

      <div className="t-card">
        <h2>{t({ uk: 'Збережені ігри', ru: 'Сохранённые игры', en: 'Saved games' })}</h2>
        {list === null ? <p className="t-muted">…</p> : !list.length ? <p className="t-muted">{t({ uk: 'Поки немає ігор. Створи першу вище.', ru: 'Пока нет игр. Создай первую выше.', en: 'No games yet. Create your first one above.' })}</p> : (
          <div className="tg-list">
            {list.map((g) => (
              <div key={g.id} className="tg-item">
                <div className="tg-item__head">
                  <b>{g.title}</b><span className="t-muted">{g.items.length} {t({ uk: 'пар', ru: 'пар', en: 'pairs' })}</span>
                  <div className="t-head__actions">
                    <button type="button" className="mu-btn mu-btn--lime t-btn-sm" onClick={() => copy(g.id)}>{copied === g.id ? t({ uk: 'Скопійовано', ru: 'Скопировано', en: 'Copied' }) : t({ uk: 'Копіювати посилання', ru: 'Копировать ссылку', en: 'Copy link' })}</button>
                    <a className="mu-btn t-btn-sm" href={`/play/g/${g.id}`} target="_blank" rel="noreferrer">{t({ uk: 'Відкрити', ru: 'Открыть', en: 'Open' })}</a>
                    <button type="button" className="mu-btn t-btn-sm" onClick={() => setOpen(open === g.id ? '' : g.id)}>{open === g.id ? t({ uk: 'Сховати', ru: 'Скрыть', en: 'Hide' }) : t({ uk: 'Пограти тут', ru: 'Поиграть здесь', en: 'Play here' })}</button>
                    <button type="button" className="mu-btn t-btn-sm" onClick={() => remove(g.id)}>{t({ uk: 'Видалити', ru: 'Удалить', en: 'Delete' })}</button>
                  </div>
                </div>
                {open === g.id && <GameHub sets={[{ id: g.id, title: g.title, prompt: g.prompt || '', items: g.items }]} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
