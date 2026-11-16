'use client';
import { useState } from 'react';
import Icon from '../Icon';
import { GameSet, GameTemplate } from './engine';
import QuizGame from './QuizGame';
import MatchGame from './MatchGame';
import AnagramGame from './AnagramGame';
import CardsGame from './CardsGame';
import HangmanGame from './HangmanGame';
import SpellGame from './SpellGame';
import MemoryGame from './MemoryGame';
import ListenGame from './ListenGame';
import { useT } from '../LangProvider';
import type { T } from '@/lib/i18n';

export const TEMPLATES: { id: GameTemplate; title: T; icon: string; text: T }[] = [
  { id: 'quiz', title: { uk: 'Квіз', ru: 'Квиз', en: 'Quiz' }, icon: 'e-trophy', text: { uk: 'Обери правильний варіант з чотирьох', ru: 'Выбери правильный вариант из четырёх', en: 'Pick the right answer out of four' } },
  { id: 'match', title: { uk: 'Пари', ru: 'Пары', en: 'Pairs' }, icon: 'c-yarn', text: { uk: 'З’єднай слово з відповіддю', ru: 'Соедини слово с ответом', en: 'Match each word with its answer' } },
  { id: 'anagram', title: { uk: 'Анаграма', ru: 'Анаграмма', en: 'Anagram' }, icon: 'e-abc', text: { uk: 'Збери слово з літер', ru: 'Собери слово из букв', en: 'Build the word from letters' } },
  { id: 'hangman', title: { uk: 'Вгадай слово', ru: 'Угадай слово', en: 'Hangman' }, icon: 'e-abc', text: { uk: 'Вгадуй літери, поки кульки не полетіли', ru: 'Угадывай буквы, пока шарики не улетели', en: 'Guess the letters before the balloons fly away' } },
  { id: 'spell', title: { uk: 'Напиши слово', ru: 'Напиши слово', en: 'Spell it' }, icon: 'e-abc', text: { uk: 'Бачиш переклад, чуєш слово, пишеш сам', ru: 'Видишь перевод, слышишь слово, пишешь сам', en: 'See the translation, hear it, type it' } },
  { id: 'listen', title: { uk: 'Слово на слух', ru: 'Слово на слух', en: 'Listen and pick' }, icon: 'e-speak', text: { uk: 'Слухай і обирай переклад', ru: 'Слушай и выбирай перевод', en: 'Listen and choose the translation' } },
  { id: 'memory', title: { uk: 'Пари на час', ru: 'Пары на время', en: 'Memory race' }, icon: 'd-cup', text: { uk: 'Знайди всі пари якнайшвидше', ru: 'Найди все пары как можно быстрее', en: 'Find all the pairs fast' } },
  { id: 'cards', title: { uk: 'Картки', ru: 'Карточки', en: 'Flashcards' }, icon: 'e-book', text: { uk: 'Перевертай і запам’ятовуй', ru: 'Переворачивай и запоминай', en: 'Flip and remember' } },
];

// Один набор даних, будь-який шаблон гри
export default function GameHub({ sets }: { sets: GameSet[] }) {
  const t = useT();
  const [setId, setSetId] = useState(sets[0].id);
  const [tpl, setTpl] = useState<GameTemplate>('quiz');
  const set = sets.find((s) => s.id === setId) ?? sets[0];

  return (
    <div className="g-hub">
      {sets.length > 1 && (
        <div className="g-chips" role="tablist" aria-label={t({ uk: 'Що тренуємо', ru: 'Что тренируем', en: 'What to practise' })}>
          {sets.map((s) => (
            <button key={s.id} role="tab" aria-selected={s.id === setId}
              className={`g-chip ${s.id === setId ? 'is-on' : ''}`} onClick={() => setSetId(s.id)}>{s.title}</button>
          ))}
        </div>
      )}
      <div className="g-templates" role="tablist" aria-label={t({ uk: 'Гра', ru: 'Игра', en: 'Game' })}>
        {TEMPLATES.map((tp) => (
          <button key={tp.id} role="tab" aria-selected={tp.id === tpl}
            className={`g-template ${tp.id === tpl ? 'is-on' : ''}`} onClick={() => setTpl(tp.id)}>
            <Icon id={tp.icon} />
            <span><b>{t(tp.title)}</b><small>{t(tp.text)}</small></span>
          </button>
        ))}
      </div>
      <div className="g-stage">
        <div className="g-stage__prompt">{set.prompt}</div>
        {tpl === 'quiz' && <QuizGame key={set.id} items={set.items} />}
        {tpl === 'match' && <MatchGame key={set.id} items={set.items} />}
        {tpl === 'anagram' && <AnagramGame key={set.id} items={set.items} />}
        {tpl === 'cards' && <CardsGame key={set.id} items={set.items} />}
        {tpl === 'hangman' && <HangmanGame key={set.id} items={set.items} />}
        {tpl === 'spell' && <SpellGame key={set.id} items={set.items} />}
        {tpl === 'listen' && <ListenGame key={set.id} items={set.items} />}
        {tpl === 'memory' && <MemoryGame key={set.id} items={set.items} />}
      </div>
    </div>
  );
}
