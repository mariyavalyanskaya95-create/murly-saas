'use client';
import { useState } from 'react';
import Icon from '../Icon';
import { GameSet, GameTemplate } from './engine';
import QuizGame from './QuizGame';
import MatchGame from './MatchGame';
import AnagramGame from './AnagramGame';
import CardsGame from './CardsGame';

export const TEMPLATES: { id: GameTemplate; title: string; icon: string; text: string }[] = [
  { id: 'quiz', title: 'Квіз', icon: 'e-trophy', text: 'Обери правильний варіант з чотирьох' },
  { id: 'match', title: 'Пари', icon: 'c-yarn', text: 'З’єднай слово з відповіддю' },
  { id: 'anagram', title: 'Анаграма', icon: 'e-abc', text: 'Збери слово з літер' },
  { id: 'cards', title: 'Картки', icon: 'e-book', text: 'Перевертай і запам’ятовуй' },
];

// Один набор даних, будь-який шаблон гри
export default function GameHub({ sets }: { sets: GameSet[] }) {
  const [setId, setSetId] = useState(sets[0].id);
  const [tpl, setTpl] = useState<GameTemplate>('quiz');
  const set = sets.find((s) => s.id === setId) ?? sets[0];

  return (
    <div className="g-hub">
      {sets.length > 1 && (
        <div className="g-chips" role="tablist" aria-label="Що тренуємо">
          {sets.map((s) => (
            <button key={s.id} role="tab" aria-selected={s.id === setId}
              className={`g-chip ${s.id === setId ? 'is-on' : ''}`} onClick={() => setSetId(s.id)}>{s.title}</button>
          ))}
        </div>
      )}
      <div className="g-templates" role="tablist" aria-label="Гра">
        {TEMPLATES.map((t) => (
          <button key={t.id} role="tab" aria-selected={t.id === tpl}
            className={`g-template ${t.id === tpl ? 'is-on' : ''}`} onClick={() => setTpl(t.id)}>
            <Icon id={t.icon} />
            <span><b>{t.title}</b><small>{t.text}</small></span>
          </button>
        ))}
      </div>
      <div className="g-stage">
        <div className="g-stage__prompt">{set.prompt}</div>
        {tpl === 'quiz' && <QuizGame key={set.id} items={set.items} />}
        {tpl === 'match' && <MatchGame key={set.id} items={set.items} />}
        {tpl === 'anagram' && <AnagramGame key={set.id} items={set.items} />}
        {tpl === 'cards' && <CardsGame key={set.id} items={set.items} />}
      </div>
    </div>
  );
}
