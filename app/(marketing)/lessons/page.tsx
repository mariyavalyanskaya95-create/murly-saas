import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PracticeList from '@/components/practice/PracticeList';
import { BATCH_1 } from '@/lib/lessons/batch-1';
import { BATCH_2 } from '@/lib/lessons/batch-2';
import { BATCH_3 } from '@/lib/lessons/batch-3';
import { BATCH_4 } from '@/lib/lessons/batch-4';
import { BATCH_5 } from '@/lib/lessons/batch-5';
import { BATCH_6 } from '@/lib/lessons/batch-6';
import { BATCH_7 } from '@/lib/lessons/batch-7';
import { BATCH_8 } from '@/lib/lessons/batch-8';
import { BATCH_9 } from '@/lib/lessons/batch-9';
import { localizeLesson } from '@/lib/content/lessons';
import { tr } from '@/lib/i18n-server';
import Kit from '@/components/Kit';

// Готові уроки на 60 хвилин (без розділу «Практика»)
const LESSONS = [...BATCH_1, ...BATCH_2, ...BATCH_3, ...BATCH_4, ...BATCH_5, ...BATCH_6, ...BATCH_7, ...BATCH_8, ...BATCH_9];

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Готові уроки англійської на 60 хвилин | Murly', ru: 'Готовые уроки английского на 60 минут | Murly', en: 'Ready-made 60-minute English lessons | Murly' }),
    description: t({
      uk: 'Інтерактивні уроки англійської для дітей, підлітків і дорослих: версія учня і версія вчителя з відповідями, презентація на урок і друк A4.',
      ru: 'Интерактивные уроки английского для детей, подростков и взрослых: версия ученика и версия учителя с ответами, презентация на урок и печать A4.',
      en: 'Interactive English lessons for kids, teens and adults: a student’s version and a teacher’s version with answers, an online presentation and A4 print.',
    }),
    alternates: { canonical: '/lessons' },
  };
}

export default function LessonsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="5" style={{ paddingBottom: 16 }}>
        <div className="mu-container">
          <Kit id="il-cat-laptop" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-board" />{t({ uk: 'Готові уроки', ru: 'Готовые уроки', en: 'Ready-made lessons' })}</span>
          <h1>{t({ uk: 'Урок на 60 хвилин', ru: 'Урок на 60 минут', en: 'A 60-minute lesson' })} <em>{t({ uk: 'за хвилину.', ru: 'за минуту.', en: 'in a minute.' })}</em></h1>
          <p>{t({
            uk: 'Обери урок: учень працює інтерактивно прямо на сторінці, а вчитель бачить нотатки до етапів і всі відповіді.',
            ru: 'Выбери урок: ученик работает интерактивно прямо на странице, а учитель видит заметки к этапам и все ответы.',
            en: 'Pick a lesson: the student works interactively right on the page, and the teacher sees stage notes and all the answers.',
          })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container"><PracticeList items={localizeLesson(LESSONS, t.lang)} base="/lessons" skills={['Vocabulary', 'Grammar', 'Reading', 'Listening', 'Speaking', 'Writing', 'НМТ']} mocks /></div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
