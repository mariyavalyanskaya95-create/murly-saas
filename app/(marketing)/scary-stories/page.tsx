import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import { STORIES } from '@/lib/scary-stories';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Страшні історії англійською: читання з озвучкою | Murly', ru: 'Страшные истории на английском: чтение с озвучкой | Murly', en: 'Scary stories in English: reading with audio | Murly' }),
    description: t({ uk: 'Короткі страшилки англійською за рівнями A2, B1, B2: озвучка, словничок з перекладом і питання на розуміння.', ru: 'Короткие страшилки на английском по уровням A2, B1, B2: озвучка, словарик с переводом и вопросы на понимание.', en: 'Short spooky stories in English at A2, B1 and B2: audio, a glossary with translations and comprehension questions.' }),
    alternates: { canonical: '/scary-stories' },
  };
}

export default function ScaryStoriesPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="4">
        <div className="mu-container">
          <Kit id="st-cat-shock" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-book" />Reading</span>
          <h1>{t({ uk: 'Страшні історії', ru: 'Страшные истории', en: 'Scary stories' })} <em>{t({ uk: 'англійською.', ru: 'на английском.', en: 'in English.' })}</em></h1>
          <p>{t({ uk: 'Короткі страшилки з несподіваним кінцем. Читай або слухай, підглядай у словничок і перевір, чи все зрозумів.', ru: 'Короткие страшилки с неожиданным концом. Читай или слушай, подглядывай в словарик и проверь, всё ли понял.', en: 'Short spooky stories with a twist. Read or listen, peek at the glossary and check you understood everything.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container">
          <div className="gr-grid">
            {STORIES.map((s) => (
              <Link key={s.id} href={`/scary-stories/${s.id}`} className={`gr-card gr--${s.color} le-card`}>
                <span className="le-card__tags"><span className="gr-level">{s.level}</span><span className="le-tag">{s.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span><span className="le-tag">Reading</span></span>
                <span className="gr-card__title">{s.title}</span>
                <span className="gr-card__lead">{t(s.teaser)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
