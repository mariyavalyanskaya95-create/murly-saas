'use client';
// Пробні НМТ як картки в бібліотеці уроків і в кабінеті вчителя (фільтр «НМТ»).
import Link from 'next/link';
import { MOCKS, FREE } from '@/lib/mock';
import { useT } from '@/components/LangProvider';

const COLORS = ['tomato', 'sky', 'lime', 'mustard'];

// Чи показувати пробні НМТ під поточні фільтри (вони B1-B2, для підлітків)
export const mockFits = (f: { focus?: string; age?: string; level?: string; q?: string }) =>
  (!f.focus || f.focus === 'НМТ') && (!f.age || f.age === 'teens') && (!f.level || f.level === 'B1' || f.level === 'B2')
  && (!f.q?.trim() || /нмт|nmt|mock|пробн/i.test(f.q));

export default function MockCards() {
  const t = useT();
  return (
    <>
      {MOCKS.map((m, i) => (
        <Link key={m.id} href={`/nmt/mock/${m.id}`} className={`gr-card gr--${COLORS[i % COLORS.length]} le-card`}>
          <span className="le-card__tags">
            <span className="gr-level">B1-B2</span>
            <span className="le-tag">{t({ uk: 'Підлітки 12-17', ru: 'Подростки 12-17', en: 'Teens 12-17' })}</span>
            <span className="le-tag le-tag--murly">{t.lang === 'en' ? 'NMT' : 'НМТ'}</span>
            <span className="le-tag">{FREE.includes(m.id) ? t({ uk: 'Безкоштовно', ru: 'Бесплатно', en: 'Free' }) : t({ uk: 'Повний пакет', ru: 'Полный пакет', en: 'Full pack' })}</span>
          </span>
          <span className="gr-card__title">{t({ uk: `Пробний НМТ №${m.id}`, ru: `Пробный НМТ №${m.id}`, en: `NMT mock test #${m.id}` })}</span>
          <span className="gr-card__uk">{t({ uk: 'Як на справжньому НМТ', ru: 'Как на настоящем НМТ', en: 'Like the real NMT' })}</span>
          <span className="gr-card__lead">{t({ uk: '32 завдання · 60 хв · з поясненнями', ru: '32 задания · 60 мин · с объяснениями', en: '32 tasks · 60 min · with explanations' })}</span>
        </Link>
      ))}
    </>
  );
}
