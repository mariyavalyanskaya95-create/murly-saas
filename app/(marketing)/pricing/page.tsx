import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PricingSection from '@/components/PricingSection';
import Faq from '@/components/Faq';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Тарифи Murly: від 0 ₴', ru: 'Тарифы Murly: от 0 ₴', en: 'Murly pricing: from 0 ₴' }),
    description: t({
      uk: 'Free, Pro для учнів і Tutor для репетиторів. Підготовка до НМТ з англійської, скасування в один клік.',
      ru: 'Free, Pro для учеников и Tutor для репетиторов. Подготовка к НМТ по английскому, отмена в один клик.',
      en: 'Free, Pro for students and Tutor for tutors. English prep for the NMT (Ukrainian school exam), cancel in one click.',
    }),
  };
}

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Що є у безкоштовному тарифі?', ru: 'Что есть в бесплатном тарифе?', en: 'What’s in the free plan?' }, a: { uk: 'Один квіз на день, streak і базова статистика. Цього вистачить, щоб зрозуміти, чи підходить тобі Murly.', ru: 'Один квиз в день, streak и базовая статистика. Этого хватит, чтобы понять, подходит ли тебе Murly.', en: 'One quiz a day, a streak and basic stats. Enough to see if Murly is right for you.' } },
  { q: { uk: 'Чим Pro відрізняється від Free?', ru: 'Чем Pro отличается от Free?', en: 'How is Pro different from Free?' }, a: { uk: 'Без обмежень на квізи, повні пробники НМТ, детальний розбір кожної помилки і щотижневий прогрес.', ru: 'Квизы без ограничений, полные пробные тесты НМТ, подробный разбор каждой ошибки и еженедельный прогресс.', en: 'Unlimited quizzes, full NMT practice tests, a detailed review of every mistake and weekly progress.' } },
  { q: { uk: 'Як працює тариф Tutor?', ru: 'Как работает тариф Tutor?', en: 'How does the Tutor plan work?' }, a: { uk: 'Репетитор отримує кабінет на до 20 учнів: групи, домашка в один клік, прогрес кожного і автозвіт батькам.', ru: 'Репетитор получает кабинет на 20 учеников: группы, домашка в один клик, прогресс каждого и автоотчёт родителям.', en: 'A tutor gets a dashboard for up to 20 students: groups, one-click homework, everyone’s progress and automatic reports for parents.' } },
  { q: { uk: 'Можна скасувати будь-коли?', ru: 'Можно отменить в любой момент?', en: 'Can I cancel anytime?' }, a: { uk: 'Так, у кабінеті, в один клік. Доступ лишається до кінця оплаченого періоду, без штрафів.', ru: 'Да, в кабинете, в один клик. Доступ сохраняется до конца оплаченного периода, без штрафов.', en: 'Yes, in your dashboard, in one click. You keep access until the end of the paid period, no penalties.' } },
  { q: { uk: 'Як оплатити?', ru: 'Как оплатить?', en: 'How do I pay?' }, a: { uk: 'Карткою онлайн, у гривнях. Оплата відкриється разом із кабінетами, а поки квізи можна проходити безкоштовно.', ru: 'Картой онлайн, в гривнах. Оплата откроется вместе с кабинетами, а пока квизы можно проходить бесплатно.', en: 'By card online, in hryvnias. Payment opens together with the dashboards. Until then, quizzes are free.' } },
];

export default function PricingPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-money" />{t({ uk: 'Тарифи', ru: 'Тарифы', en: 'Pricing' })}</span>
          <h1>{t({ uk: 'Дешевше за один', ru: 'Дешевле одного', en: 'Cheaper than one' })} <em>{t({ uk: 'урок', ru: 'урока', en: 'lesson' })}</em> {t({ uk: 'з репетитором.', ru: 'с репетитором.', en: 'with a tutor.' })}</h1>
          <p>{t({ uk: 'Почни безкоштовно. Якщо зайде, переходь на Pro. Скасування в один клік.', ru: 'Начни бесплатно. Если понравится, переходи на Pro. Отмена в один клик.', en: 'Start for free. If you like it, switch to Pro. Cancel in one click.' })}</p>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <PricingSection />
        </div>
      </section>

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />FAQ</span>
            <h2 className="mu-section__title">{t({ uk: 'Про', ru: 'Об', en: 'About' })} <em>{t({ uk: 'оплату.', ru: 'оплате.', en: 'payment.' })}</em></h2>
          </div>
          <Faq items={FAQ.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
