import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { alt } from '@/lib/seo';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { tr } from '@/lib/i18n-server';
import { SONGS, songById } from '@/lib/songs';
import { SongChoice, SongGap, SongPhrases, SongQuiz, SongVideo, SongVocab } from '@/components/songs/SongParts';
import { SONG_LESSONS } from '@/lib/songs-more';

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
  const L = SONG_LESSONS[s.id];
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
          {L && <ul className="sg-facts">{L.facts.map((f, k) => <li key={k}>{t(f)}</li>)}</ul>}

          {L && (<>
            <h2>{t({ uk: 'Розминка', ru: 'Разминка', en: 'Warm-up' })}</h2>
            <ol className="sg-talk">{L.warmup.map((q) => <li key={q}>{q}</li>)}</ol>
          </>)}

          <h2>{t({ uk: 'Головні вирази пісні', ru: 'Главные выражения песни', en: 'Key phrases' })}</h2>
          <SongPhrases song={s} />

          {L && (<>
            <h2>{t({ uk: 'Словник уроку', ru: 'Словарь урока', en: 'Lesson vocabulary' })}</h2>
            <p className="t-muted">{t({ uk: 'Натискай на слово або приклад, щоб послухати.', ru: 'Нажимай на слово или пример, чтобы послушать.', en: 'Tap a word or example to listen.' })}</p>
            <SongVocab groups={L.vocab} />
          </>)}

          <h2>{t({ uk: 'Міні-квіз: що означає вираз', ru: 'Мини-квиз: что значит выражение', en: 'Mini quiz: what does it mean' })}</h2>
          <SongQuiz song={s} />

          {L && (<>
            <h2>{t({ uk: 'Слухаємо й дивимось', ru: 'Слушаем и смотрим', en: 'Listen and watch' })}</h2>
            <ol className="sg-talk">{L.listen.map((x, k) => <li key={k}>{t(x)}</li>)}</ol>
            {L.lyricVideo && (<>
              <p className="sg-about">{t({ uk: 'Офіційне відео з текстом пісні від виконавця: слухай і читай.', ru: 'Официальное видео с текстом песни от исполнителя: слушай и читай.', en: 'The official lyric video from the artist: listen and read along.' })}</p>
              <SongVideo yt={L.lyricVideo} title={`${s.title} (lyric video)`} />
            </>)}
          </>)}

          <h2>{t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' })}</h2>
          <p className="sg-about">{L ? t(L.grammar) : t(s.grammar)}</p>
          {L && <SongChoice items={L.grammarEx} />}

          {L && (<>
            <h2>{t({ uk: 'Встав слово', ru: 'Вставь слово', en: 'Fill in the gaps' })}</h2>
            <SongGap items={L.gapfill} words={[...L.gapfill.map((g) => g.a)].sort()} />
          </>)}

          <h2>{t({ uk: 'Поговоримо', ru: 'Поговорим', en: 'Let’s talk' })}</h2>
          <ol className="sg-talk">{(L ? [...s.talk, ...L.speaking] : s.talk).map((q) => <li key={q}>{q}</li>)}</ol>

          {L && (<>
            <h2>{t({ uk: 'Рольова гра', ru: 'Ролевая игра', en: 'Role-play' })}</h2>
            <p className="sg-about">{t(L.roleplay)}</p>
            <h2>{t({ uk: 'Напиши', ru: 'Напиши', en: 'Write' })}</h2>
            <p className="sg-about">{t(L.writing)}</p>
          </>)}

          <p className="sg-next"><Link href={`/songs/${next.id}`} className="mu-btn mu-btn--lime">{t({ uk: 'Наступна пісня', ru: 'Следующая песня', en: 'Next song' })}: {next.title}</Link></p>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
