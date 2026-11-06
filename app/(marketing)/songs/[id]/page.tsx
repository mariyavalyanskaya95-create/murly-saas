import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { alt } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { tr } from '@/lib/i18n-server';
import { SONGS, songById } from '@/lib/songs';
import { SongPhrases, SongQuiz, SongVideo } from '@/components/songs/SongParts';

export function generateStaticParams() { return SONGS.map((s) => ({ id: s.id })); }

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const s = songById(params.id); const t = tr();
  if (!s) return {};
  return {
    title: t({ uk: `${s.title} (${s.artist}): англійська через пісню | Murly`, ru: `${s.title} (${s.artist}): английский по песне | Murly`, en: `${s.title} (${s.artist}): learn English with the song | Murly` }),
    description: `${t(s.about)} ${s.phrases.map((p) => p.en).join(', ')}.`,
    alternates: alt(`/songs/${s.id}`),
  };
}

export default function SongPage({ params }: { params: { id: string } }) {
  const s = songById(params.id);
  if (!s) notFound();
  const t = tr();
  const i = SONGS.indexOf(s);
  const next = SONGS[(i + 1) % SONGS.length];
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 8 }}>
        <div className="mu-container sg-head">
          <Link href="/songs" className="t-back">← {t({ uk: 'Усі пісні', ru: 'Все песни', en: 'All songs' })}</Link>
          <p className="sg-head__artist">{s.artist} · {s.year}</p>
          <h1>{s.title}</h1>
          <p><span className="gr-level">{s.level}</span> <span className="le-tag">{s.age === 'all' ? t({ uk: 'Для всіх', ru: 'Для всех', en: 'For everyone' }) : t({ uk: 'Підлітки й дорослі', ru: 'Подростки и взрослые', en: 'Teens and adults' })}</span></p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container sg-page">
          <SongVideo yt={s.yt} title={`${s.artist} - ${s.title}`} />
          <p className="t-muted sg-src">{t({ uk: 'Офіційне відео з YouTube-каналу виконавця.', ru: 'Официальное видео с YouTube-канала исполнителя.', en: 'Official video from the artist’s YouTube channel.' })}</p>

          <h2>{t({ uk: 'Про що пісня', ru: 'О чём песня', en: 'What the song is about' })}</h2>
          <p className="sg-about">{t(s.about)}</p>

          <h2>{t({ uk: 'Вирази', ru: 'Выражения', en: 'Phrases' })}</h2>
          <SongPhrases song={s} />

          <h2>{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</h2>
          <p className="sg-about">{t(s.grammar)}</p>

          <h2>{t({ uk: 'Міні-квіз', ru: 'Мини-квиз', en: 'Mini quiz' })}</h2>
          <SongQuiz song={s} />

          <h2>{t({ uk: 'Поговоримо', ru: 'Поговорим', en: 'Let’s talk' })}</h2>
          <ol className="sg-talk">{s.talk.map((q) => <li key={q}>{q}</li>)}</ol>

          <p className="sg-next"><Link href={`/songs/${next.id}`} className="mu-btn mu-btn--lime">{t({ uk: 'Наступна пісня', ru: 'Следующая песня', en: 'Next song' })}: {next.title}</Link></p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
