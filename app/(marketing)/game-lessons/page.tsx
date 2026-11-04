import type { Metadata } from 'next';
import { alt } from '@/lib/seo';
import Icon from '@/components/Icon';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SendToStudent from '@/components/game-lessons/SendToStudent';
import { GAME_LESSONS } from '@/lib/game-lessons';
import { tr } from '@/lib/i18n-server';
import Faq from '@/components/Faq';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { SITE_URL } from '@/lib/seo';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Уроки англійської за іграми: Minecraft, Roblox та інші | Murly', ru: 'Уроки английского по играм: Minecraft, Roblox и другие | Murly', en: 'English lessons based on games: Minecraft, Roblox and more | Murly' }),
    description: t({ uk: 'Готові інтерактивні уроки англійської для дітей і підлітків за улюбленими іграми: граматика, слова, місії в грі та відео.', ru: 'Готовые интерактивные уроки английского для детей и подростков по любимым играм: грамматика, слова, миссии в игре и видео.', en: 'Ready-made interactive English lessons for kids and teens based on their favourite games: grammar, words, in-game missions and videos.' }),
    alternates: alt('/game-lessons'),
  };
}

export default function GameLessonsPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="e-trophy" />{t({ uk: 'Для вчителів', ru: 'Для учителей', en: 'For teachers' })}</span>
          <h1>{t({ uk: 'Уроки за іграми', ru: 'Уроки по играм', en: 'Game-based lessons' })}</h1>
          <p>{t({ uk: 'Граматика й слова на матеріалі ігор, у які учні грають самі. Місії в грі, відео й рахунок XP.', ru: 'Грамматика и слова на материале игр, в которые ученики играют сами. Миссии в игре, видео и счёт XP.', en: 'Grammar and vocabulary through the games students already play. In-game missions, videos and an XP score.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container gl-grid">
          {GAME_LESSONS.map((l) => (
            <article key={l.id} className={`gl-card ${l.ready ? '' : 'is-soon'}`}>
              <div className="gl-card__top" style={{ background: l.color }}>
                <span className="gl-card__game">{l.game}</span>
                <span className="gl-card__px" aria-hidden="true" />
              </div>
              <div className="gl-card__body">
                <h2>{l.title}</h2>
                <p className="gl-card__gr">{t(l.grammar)}</p>
                <p className="t-muted">{t(l.topic)}</p>
                <div className="gl-card__meta"><span>{l.level}</span><span>{l.age} {t({ uk: 'років', ru: 'лет', en: 'y.o.' })}</span><span>{l.minutes} {t({ uk: 'хв', ru: 'мин', en: 'min' })}</span></div>
                {l.ready ? (
                  <div className="gl-card__act">
                    <a className="mu-btn mu-btn--lime" href={`/game-lessons/${l.id}.html`} target="_blank" rel="noreferrer">{t({ uk: 'Відкрити урок', ru: 'Открыть урок', en: 'Open the lesson' })}</a>
                    <SendToStudent url={`/game-lessons/${l.id}.html`} name={`${l.title} (${l.game})`} />
                  </div>
                ) : <span className="gl-card__soon">{t({ uk: 'Скоро', ru: 'Скоро', en: 'Coming soon' })}</span>}
              </div>
            </article>
          ))}
        </div>
        <div className="mu-container gl-seo">
          <h2>{t({ uk: 'Навіщо вчити англійську через ігри', ru: 'Зачем учить английский через игры', en: 'Why teach English through games' })}</h2>
          <p>{t({ uk: 'Діти вже знають ці світи напам’ять. На уроці вони описують, що будують, розповідають, що сталося в грі, планують і порівнюють. Граматика (Present Simple і Continuous, Past Simple, going to і will, прикметники) з’являється сама, бо дитині є що сказати. Кожен урок має XP, міні-ігри, місії в самій грі та офіційні відео.', ru: 'Дети уже знают эти миры наизусть. На уроке они описывают, что строят, рассказывают, что случилось в игре, планируют и сравнивают. Грамматика (Present Simple и Continuous, Past Simple, going to и will, прилагательные) появляется сама, потому что ребёнку есть что сказать. В каждом уроке XP, мини-игры, миссии в самой игре и официальные видео.', en: 'Kids already know these worlds by heart. In class they describe what they build, retell what happened in the game, make plans and compare. Grammar (Present Simple and Continuous, Past Simple, going to and will, adjectives) comes naturally because the child has something to say. Every lesson has XP, mini-games, in-game missions and official videos.' })}</p>
          <h2>{t({ uk: 'Питання вчителів', ru: 'Вопросы учителей', en: 'Teachers ask' })}</h2>
          <Faq items={[
            { q: t({ uk: 'Чи треба, щоб учень грав під час уроку?', ru: 'Нужно ли, чтобы ученик играл во время урока?', en: 'Does the student need to play during the lesson?' }), a: t({ uk: 'Ні, урок працює і без гри: слова, правило, міні-ігри і розмова. Місії в грі можна дати на кінець уроку або додому.', ru: 'Нет, урок работает и без игры: слова, правило, мини-игры и разговор. Миссии в игре можно дать в конце урока или домой.', en: 'No, the lesson works without the game: words, the rule, mini-games and speaking. In-game missions can go at the end or as homework.' }) },
            { q: t({ uk: 'Для якого віку і рівня?', ru: 'Для какого возраста и уровня?', en: 'Which age and level?' }), a: t({ uk: 'Для дітей і підлітків 8-15 років, рівні A2-B1. Вік і рівень вказані на кожній картці.', ru: 'Для детей и подростков 8-15 лет, уровни A2-B1. Возраст и уровень указаны на каждой карточке.', en: 'Kids and teens aged 8-15, levels A2-B1. Each card shows the age and level.' }) },
            { q: t({ uk: 'Як дати урок учню?', ru: 'Как дать урок ученику?', en: 'How do I give a lesson to a student?' }), a: t({ uk: 'Натисни «Надіслати учню»: урок з’явиться в кабінеті учня, а XP за завдання піде в його рівень.', ru: 'Нажми «Отправить ученику»: урок появится в кабинете ученика, а XP за задания пойдёт в его уровень.', en: 'Click “Send to a student”: the lesson appears in their account and the XP goes to their level.' }) },
            { q: t({ uk: 'Чи безпечно це для дітей?', ru: 'Безопасно ли это для детей?', en: 'Is it safe for kids?' }), a: t({ uk: 'Ми беремо лише мирні режими: будівництво, виживання, мода, паркур. Відео тільки з офіційних каналів ігор, а в кожному уроці є місія про безпеку в чаті.', ru: 'Мы берём только мирные режимы: строительство, выживание, мода, паркур. Видео только с официальных каналов игр, а в каждом уроке есть миссия о безопасности в чате.', en: 'We use only peaceful modes: building, survival, fashion, parkour. Videos come only from official game channels, and every lesson has a chat safety mission.' }) },
          ]} />
        </div>
        <p className="mu-container t-muted" style={{ marginTop: 24, fontSize: 14 }}>{t({ uk: 'Назви ігор належать їхнім власникам. Murly не пов’язаний з розробниками ігор. Ілюстрації в уроках наші, відео з офіційних каналів.', ru: 'Названия игр принадлежат их владельцам. Murly не связан с разработчиками игр. Иллюстрации в уроках наши, видео с официальных каналов.', en: 'Game names belong to their owners. Murly is not affiliated with the game developers. Lesson illustrations are our own, videos come from official channels.' })}</p>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Game-based English lessons', itemListElement: GAME_LESSONS.filter((l) => l.ready).map((l, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'LearningResource', name: `${l.title} (${l.game})`, url: `${SITE_URL}/game-lessons/${l.id}.html`, educationalLevel: l.level, inLanguage: 'en', learningResourceType: 'Lesson plan', teaches: l.grammar.en, typicalAgeRange: l.age } })) }) }} />
      <RelatedPosts slugs={['anglijska-cherez-minecraft-roblox', 'past-simple-prostymy-slovamy', 'igry-dlya-onlajn-uroku-anglijskoyi']} />
      <SiteFooter />
    </>
  );
}
