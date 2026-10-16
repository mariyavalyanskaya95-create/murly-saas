'use client';

import { useState } from 'react';
import { useT } from './LangProvider';

interface VocabWord {
  id: number;
  word: string;
  translation: string;
  example?: string;
  notes?: string;
  is_learned: boolean;
  added_by_name?: string;
}

const demoVocab: VocabWord[] = [
  {
    id: 1,
    word: 'apple',
    translation: 'яблуко',
    example: 'I eat an apple every day',
    is_learned: false,
    added_by_name: 'Masha',
  },
  {
    id: 2,
    word: 'ocean',
    translation: 'океан',
    example: 'The ocean is deep and blue',
    is_learned: true,
    added_by_name: 'Masha',
  },
  {
    id: 3,
    word: 'brave',
    translation: 'сміливий',
    example: 'A brave cat climbs the tallest tree',
    is_learned: false,
    added_by_name: 'Masha',
  },
];

export default function VocabularyManager({
  studentId,
  studentName,
}: {
  studentId: string;
  studentName: string;
}) {
  const t = useT();
  const [words, setWords] = useState<VocabWord[]>(demoVocab);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    word: '',
    translation: '',
    example: '',
    notes: '',
  });
  const [filter, setFilter] = useState<'all' | 'learning' | 'learned'>('all');

  const filtered = words.filter((w) => {
    if (filter === 'learned') return w.is_learned;
    if (filter === 'learning') return !w.is_learned;
    return true;
  });

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.word.trim()) return;
    const newWord: VocabWord = {
      id: Date.now(),
      word: form.word.trim(),
      translation: form.translation.trim(),
      example: form.example.trim(),
      notes: form.notes.trim(),
      is_learned: false,
      added_by_name: 'You',
    };
    setWords([newWord, ...words]);
    setForm({ word: '', translation: '', example: '', notes: '' });
    setShowForm(false);
  }

  function toggleLearned(id: number) {
    setWords(words.map((w) => (w.id === id ? { ...w, is_learned: !w.is_learned } : w)));
  }

  const learnedCount = words.filter((w) => w.is_learned).length;

  return (
    <div>
      {/* Stats + filter + add */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full font-bold ${
              filter === 'all'
                ? 'gradient-purple text-white'
                : 'bg-white text-lavender-700 border border-lavender-200'
            }`}
          >
            {t({ uk: 'Усі', ru: 'Все', en: 'All' })} ({words.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('learning')}
            className={`px-4 py-2 rounded-full font-bold ${
              filter === 'learning'
                ? 'gradient-warm text-white'
                : 'bg-white text-lavender-700 border border-lavender-200'
            }`}
          >
            {t({ uk: 'Вчу', ru: 'Учу', en: 'Learning' })} ({words.length - learnedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('learned')}
            className={`px-4 py-2 rounded-full font-bold ${
              filter === 'learned'
                ? 'gradient-mint text-white'
                : 'bg-white text-lavender-700 border border-lavender-200'
            }`}
          >
            {t({ uk: 'Вивчені', ru: 'Выученные', en: 'Learned' })} ({learnedCount})
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="btn-primary text-sm"
        >
          {showForm ? t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' }) : t({ uk: '+ Додати слово', ru: '+ Добавить слово', en: '+ Add word' })}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleAdd} className="card mb-6 bg-lavender-50/60">
          <h3 className="font-display font-bold text-lg text-lavender-700 mb-4">
            {t({ uk: `Нове слово для ${studentName}`, ru: `Новое слово для ${studentName}`, en: `New word for ${studentName}` })}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lavender-500 mb-1">
                {t({ uk: 'Слово', ru: 'Слово', en: 'Word' })} *
              </label>
              <input
                autoFocus
                required
                value={form.word}
                onChange={(e) => setForm({ ...form, word: e.target.value })}
                placeholder={t({ uk: 'Напр. accomplish', ru: 'Напр. accomplish', en: 'e.g. accomplish' })}
                className="w-full rounded-xl border border-lavender-200 px-4 py-2.5 text-lavender-700 bg-white focus:outline-none focus:border-lavender-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lavender-500 mb-1">
                {t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' })}
              </label>
              <input
                value={form.translation}
                onChange={(e) => setForm({ ...form, translation: e.target.value })}
                placeholder={t({ uk: 'Напр. досягати', ru: 'Напр. достигать', en: 'e.g. досягати' })}
                className="w-full rounded-xl border border-lavender-200 px-4 py-2.5 text-lavender-700 bg-white focus:outline-none focus:border-lavender-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lavender-500 mb-1">
                {t({ uk: 'Приклад', ru: 'Пример', en: 'Example' })}
              </label>
              <input
                value={form.example}
                onChange={(e) => setForm({ ...form, example: e.target.value })}
                placeholder={t({ uk: 'Напр. She accomplished her goal', ru: 'Напр. She accomplished her goal', en: 'e.g. She accomplished her goal' })}
                className="w-full rounded-xl border border-lavender-200 px-4 py-2.5 text-lavender-700 bg-white focus:outline-none focus:border-lavender-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-lavender-500 mb-1">
                {t({ uk: 'Нотатки', ru: 'Заметки', en: 'Notes' })}
              </label>
              <input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder={t({ uk: 'Напр. тема уроку 5', ru: 'Напр. тема урока 5', en: 'e.g. Lesson 5 topic' })}
                className="w-full rounded-xl border border-lavender-200 px-4 py-2.5 text-lavender-700 bg-white focus:outline-none focus:border-lavender-400"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button type="submit" className="btn-primary">
              {t({ uk: '+ Додати слово', ru: '+ Добавить слово', en: '+ Add word' })}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-outline"
            >
              {t({ uk: 'Скасувати', ru: 'Отмена', en: 'Cancel' })}
            </button>
          </div>
        </form>
      )}

      {/* Word list */}
      {filtered.length === 0 ? (
        <div className="card text-center py-16 text-lavender-500">
          <div className="text-6xl mb-3">📖</div>
          <p className="font-semibold text-lavender-700">
            {words.length === 0
              ? t({ uk: 'Слів поки немає. Додай перше!', ru: 'Слов пока нет. Добавь первое!', en: 'No words yet. Add the first one!' })
              : filter === 'learned' ? t({ uk: 'Вивчених слів немає.', ru: 'Выученных слов нет.', en: 'No learned words.' }) : t({ uk: 'Слів, які вчиш, немає.', ru: 'Слов в изучении нет.', en: 'No words in progress.' })}
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full">
            <thead>
              <tr className="bg-lavender-50 text-left text-xs uppercase tracking-wider text-lavender-700">
                <th className="px-5 py-3 font-bold">{t({ uk: 'Слово', ru: 'Слово', en: 'Word' })}</th>
                <th className="px-5 py-3 font-bold">{t({ uk: 'Переклад', ru: 'Перевод', en: 'Translation' })}</th>
                <th className="px-5 py-3 font-bold hidden md:table-cell">{t({ uk: 'Приклад', ru: 'Пример', en: 'Example' })}</th>
                <th className="px-5 py-3 font-bold">{t({ uk: 'Статус', ru: 'Статус', en: 'Status' })}</th>
                <th className="px-5 py-3 font-bold hidden sm:table-cell">{t({ uk: 'Хто додав', ru: 'Кто добавил', en: 'Added by' })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lavender-100">
              {filtered.map((w) => (
                <tr key={w.id} className="hover:bg-cream/40 transition">
                  <td className="px-5 py-3 font-bold text-lavender-700">
                    {w.word}
                  </td>
                  <td className="px-5 py-3 text-lavender-600">{w.translation}</td>
                  <td className="px-5 py-3 text-lavender-600 text-sm italic hidden md:table-cell">
                    {w.example || '-'}
                  </td>
                  <td className="px-5 py-3">
                    <button
                      type="button"
                      onClick={() => toggleLearned(w.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-full transition ${
                        w.is_learned
                          ? 'bg-mint/30 text-lavender-700 hover:bg-mint/50'
                          : 'bg-peach/30 text-lavender-700 hover:bg-peach/50'
                      }`}
                    >
                      {w.is_learned ? `✓ ${t({ uk: 'Вивчено', ru: 'Выучено', en: 'Learned' })}` : `📘 ${t({ uk: 'Вчу', ru: 'Учу', en: 'Learning' })}`}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-lavender-500 text-sm hidden sm:table-cell">
                    {w.added_by_name || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
