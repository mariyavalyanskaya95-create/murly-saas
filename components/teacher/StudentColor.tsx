'use client';
// Колір учня в розкладі й списках: пастельна палітра з кількома відтінками рожевого, блакитного, зеленого
import { useTeacher } from '@/lib/teacher-store';
import { useT } from '@/components/LangProvider';

type L = { uk: string; ru: string; en: string };
export const STUDENT_COLORS: { id: string; name: L }[] = [
  { id: 'blush', name: { uk: 'Ніжно-рожевий', ru: 'Нежно-розовый', en: 'Blush' } },
  { id: 'mustard', name: { uk: 'Рожевий зефір', ru: 'Розовый зефир', en: 'Marshmallow pink' } },
  { id: 'rose', name: { uk: 'Трояндовий', ru: 'Розовый', en: 'Rose' } },
  { id: 'pink', name: { uk: 'Яскраво-рожевий', ru: 'Ярко-розовый', en: 'Bright pink' } },
  { id: 'mauve', name: { uk: 'Ліловий', ru: 'Лиловый', en: 'Mauve' } },
  { id: 'tomato', name: { uk: 'Кораловий', ru: 'Коралловый', en: 'Coral' } },
  { id: 'peach', name: { uk: 'Персиковий', ru: 'Персиковый', en: 'Peach' } },
  { id: 'sand', name: { uk: 'Пісочний', ru: 'Песочный', en: 'Sand' } },
  { id: 'butter', name: { uk: 'Вершковий', ru: 'Сливочный', en: 'Butter' } },
  { id: 'lemon', name: { uk: 'Лимонний', ru: 'Лимонный', en: 'Lemon' } },
  { id: 'pistachio', name: { uk: 'Фісташковий', ru: 'Фисташковый', en: 'Pistachio' } },
  { id: 'sage', name: { uk: 'Шавлія', ru: 'Шалфей', en: 'Sage' } },
  { id: 'mint', name: { uk: "М'ятний", ru: 'Мятный', en: 'Mint' } },
  { id: 'aqua', name: { uk: 'Морська хвиля', ru: 'Морская волна', en: 'Aqua' } },
  { id: 'sky', name: { uk: 'Небесний', ru: 'Небесный', en: 'Sky' } },
  { id: 'baby', name: { uk: 'Блакитний', ru: 'Голубой', en: 'Baby blue' } },
  { id: 'lime', name: { uk: 'Барвінковий', ru: 'Барвинковый', en: 'Periwinkle' } },
  { id: 'lavender', name: { uk: 'Лавандовий', ru: 'Лавандовый', en: 'Lavender' } },
  { id: 'lilac', name: { uk: 'Бузковий', ru: 'Сиреневый', en: 'Lilac' } },
  { id: 'grey', name: { uk: 'Перлинно-сірий', ru: 'Жемчужно-серый', en: 'Pearl grey' } },
];

export default function StudentColor({ id, compact = false }: { id: string; compact?: boolean }) {
  const t = useT();
  const { data, updateStudent } = useTeacher();
  const s = data.students.find((x) => x.id === id);
  if (!s) return null;
  return (
    <div className={`sc-colors ${compact ? 'is-compact' : ''}`} role="radiogroup" aria-label={t({ uk: 'Колір учня', ru: 'Цвет ученика', en: 'Student colour' })}>
      {STUDENT_COLORS.map((c) => (
        <button key={c.id} type="button" role="radio" aria-checked={s.color === c.id} title={t(c.name)} aria-label={t(c.name)}
          className={`sc-color t-dot--${c.id} ${s.color === c.id ? 'is-on' : ''}`} onClick={() => updateStudent(id, { color: c.id })} />
      ))}
    </div>
  );
}
