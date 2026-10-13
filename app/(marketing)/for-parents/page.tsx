import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Murly для батьків: підготовка дитини до НМТ з англійської',
  description: 'Короткі щоденні квізи у форматі НМТ і щотижневий звіт про прогрес дитини.',
};

const POINTS = [
  { icon: 'd-clock', mod: 'mu-card--lime', title: '5 хвилин на день', text: 'Короткі сесії, які легко вписати в день. Регулярність дає більше, ніж марафон перед іспитом.' },
  { icon: 'd-crm', mod: 'mu-card--mustard', title: 'Звіт щотижня', text: 'Що пройдено, де помилки, які теми просідають. Без допитів «ти займався?».' },
  { icon: 'e-trophy', mod: 'mu-card--sky', title: 'Формат НМТ', text: 'Завдання такі ж, як на іспиті, тож дитина звикає до формату заздалегідь.' },
];

const FAQ = [
  { q: 'Скільки коштує?', a: 'Є безкоштовний тариф з одним квізом на день. Pro коштує 149 ₴ на місяць і відкриває все.' },
  { q: 'Чи замінить Murly репетитора?', a: 'Murly дає регулярну практику і пояснення помилок. Якщо дитина займається з репетитором, він може вести її в кабінеті Murly.' },
  { q: 'Як я побачу прогрес?', a: 'Щотижневий звіт приходитиме на пошту, а в кабінеті видно історію квізів і слабкі теми. Кабінет зараз у роботі.' },
];

export default function ForParentsPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-heart" />Для батьків</span>
          <h1>НМТ без <em>сварок</em> через уроки.</h1>
          <p>Дитина проходить короткі квізи, а ви бачите прогрес раз на тиждень. Без нагадувань і контролю.</p>
          <div className="mu-hero__cta">
            <Link href="/quiz/teen-life" className="mu-btn mu-btn--lime mu-btn--lg">
              Спробувати квіз<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
            <Link href="/pricing" className="mu-btn mu-btn--lg">Тарифи</Link>
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cards">
            {POINTS.map((p) => (
              <div key={p.title} className={`mu-card ${p.mod}`}>
                <div className="mu-card__icon"><Icon id={p.icon} /></div>
                <h3 className="mu-card__title">{p.title}</h3>
                <p className="mu-card__text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />FAQ</span>
            <h2 className="mu-section__title">Питання <em>батьків.</em></h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
