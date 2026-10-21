import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import StoriesList from '@/components/reading/StoriesList';
import { ALL_STORIES, type Genre } from '@/lib/stories';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Історії англійською: страшні, романтичні, смішні | Murly', ru: 'Истории на английском: страшные, романтические, смешные | Murly', en: 'Stories in English: scary, romantic, funny | Murly' }),
    description: t({ uk: 'Короткі історії англійською за рівнями A2, B1, B2: озвучка, словничок з перекладом і питання на розуміння.', ru: 'Короткие истории на английском по уровням A2, B1, B2: озвучка, словарик с переводом и вопросы на понимание.', en: 'Short English stories at A2, B1 and B2: audio, a glossary with translations and comprehension questions.' }),
    alternates: { canonical: '/stories' },
  };
}

export default function StoriesPage({ searchParams }: { searchParams: { g?: string } }) {
  const t = tr();
  const g = (['scary', 'romance', 'comedy'].includes(searchParams.g ?? '') ? searchParams.g : '') as Genre | '';
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="4">
        <div className="mu-container">
          <Kit id="il-cat-read" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-book" />Reading</span>
          <h1>{t({ uk: 'Історії', ru: 'Истории', en: 'Stories' })} <em>{t({ uk: 'англійською.', ru: 'на английском.', en: 'in English.' })}</em></h1>
          <p>{t({ uk: 'Страшні, романтичні й смішні. Читай або слухай, підглядай у словничок і перевір, чи все зрозумів.', ru: 'Страшные, романтические и смешные. Читай или слушай, подглядывай в словарик и проверь, всё ли понял.', en: 'Scary, romantic and funny. Read or listen, peek at the glossary and check you understood everything.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><StoriesList initial={g} items={ALL_STORIES.map((s) => ({ id: s.id, title: s.title, level: s.level, minutes: s.minutes, color: s.color, genre: s.genre, teaser: s.teaser }))} /></div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
