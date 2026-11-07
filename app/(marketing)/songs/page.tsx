import type { Metadata } from 'next';
import Link from 'next/link';
import { alt } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import HeroTip from '@/components/HeroTip';
import { tr } from '@/lib/i18n-server';
import { SONGS } from '@/lib/songs';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Англійська через пісні: Taylor Swift, Katy Perry, Lady Gaga, The Weeknd | Murly', ru: 'Английский по песням: Taylor Swift, Katy Perry, Lady Gaga, The Weeknd | Murly', en: 'Learn English with songs: Taylor Swift, Katy Perry, Lady Gaga, The Weeknd | Murly' }),
    description: t({ uk: 'Популярні пісні з офіційними кліпами: про що пісня, корисні вирази з озвучкою, граматика, міні-квіз і питання для розмови.', ru: 'Популярные песни с официальными клипами: о чём песня, полезные выражения с озвучкой, грамматика, мини-квиз и вопросы для разговора.', en: 'Popular songs with official videos: what the song is about, useful phrases with audio, grammar, a mini quiz and questions to talk about.' }),
    alternates: alt('/songs'),
  };
}

export default function SongsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }}>
        <div className="mu-container">
          <h1>{t({ uk: 'Англійська', ru: 'Английский', en: 'English' })} <em>{t({ uk: 'через пісні.', ru: 'по песням.', en: 'through songs.' })}</em></h1>
          <HeroTip>{t({ uk: 'Офіційний кліп, вирази з озвучкою, міні-квіз і питання для розмови. Тексти пісень шукай в офіційних джерелах.', ru: 'Официальный клип, выражения с озвучкой, мини-квиз и вопросы для разговора. Тексты песен ищи в официальных источниках.', en: 'Official video, phrases with audio, a mini quiz and questions to discuss. Find the lyrics in official sources.' })}</HeroTip>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container sg-grid">
          {SONGS.map((s) => (
            <Link key={s.id} href={`/songs/${s.id}`} className="sg-card">
              <span className="sg-card__img" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${s.yt}/hqdefault.jpg)` }} />
              <span className="sg-card__body">
                <small>{s.artist}</small>
                <b>{s.title}</b>
                <span className="sg-card__tags"><span className="gr-level">{s.level}</span><span className="le-tag">{s.age === 'all' ? t({ uk: 'Для всіх', ru: 'Для всех', en: 'For everyone' }) : t({ uk: 'Підлітки й дорослі', ru: 'Подростки и взрослые', en: 'Teens and adults' })}</span></span>
              </span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
