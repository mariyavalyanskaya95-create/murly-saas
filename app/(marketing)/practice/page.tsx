import type { Metadata } from 'next';
import SectionTabs from '@/components/SectionTabs';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PracticeList from '@/components/practice/PracticeList';
import { PRACTICE } from '@/lib/practice';
import { localizeLesson } from '@/lib/content/lessons';
import { tr } from '@/lib/i18n-server';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Listening і Reading англійською онлайн: вправи з озвучкою | Murly', ru: 'Listening и Reading на английском онлайн: упражнения с озвучкой | Murly', en: 'English Listening and Reading online: exercises with audio | Murly' }),
    description: t({
      uk: 'Аудіювання і читання англійською для дітей, підлітків і дорослих: діалоги з озвучкою, тексти, вправи з автоперевіркою, формат НМТ.',
      ru: 'Аудирование и чтение на английском для детей, подростков и взрослых: диалоги с озвучкой, тексты, упражнения с автопроверкой, формат НМТ.',
      en: 'English listening and reading for kids, teens and adults: dialogues with audio, texts, auto-checked exercises, NMT exam format.',
    }),
    alternates: { canonical: '/practice' },
  };
}

export default function PracticePage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <SectionTabs group="read" active="/practice" />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="4">
        <div className="mu-container">
          <Kit id="il-cat-headphones" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-head" />{t({ uk: 'Практика', ru: 'Практика', en: 'Practice' })}</span>
          <h1>Listening {t({ uk: 'і', ru: 'и', en: 'and' })} <em>Reading.</em></h1>
          <p>{t({ uk: 'Діалоги з озвучкою і тексти за рівнями. Слухай, читай, відповідай, і Murly одразу перевірить.', ru: 'Диалоги с озвучкой и тексты по уровням. Слушай, читай, отвечай, и Murly сразу проверит.', en: 'Dialogues with audio and texts by level. Listen, read, answer, and Murly checks it right away.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><PracticeList items={localizeLesson(PRACTICE, t.lang)} /></div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
