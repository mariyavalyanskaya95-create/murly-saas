import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Контакти Murly',
  description: 'Напиши Murly: пошта, соцмережі і відповіді на часті питання про підготовку до НМТ.',
};

const EMAIL = 'murly.school@gmail.com';

const CHANNELS = [
  { icon: 'd-send', title: 'Пошта', value: EMAIL, href: `mailto:${EMAIL}`, mod: 'mu-card--lime' },
  { icon: 'd-chat', title: 'Telegram', value: 'Скоро', mod: '' },
  { icon: 'd-camera', title: 'Instagram', value: 'Скоро', mod: 'mu-card--mustard' },
  { icon: 'e-mic', title: 'TikTok', value: 'Скоро', mod: 'mu-card--sky' },
];

const FAQ = [
  { q: 'Чи підходить Murly, якщо в мене слабка англійська?', a: 'Так. Квізи йдуть від простих тем до складних, а після кожної помилки є пояснення українською. Почни з Teen Life і дивись на розбори.' },
  { q: 'Скільки часу треба на день?', a: 'Достатньо 5-10 хвилин. Один квіз займає близько п’яти хвилин, і регулярність працює краще за довгі сесії раз на тиждень.' },
  { q: 'Завдання справді як на НМТ?', a: 'Так, ми робимо їх у форматах НМТ з англійської: reading з текстом, use of English і граматика. Повний пробник на 90 хвилин з’явиться найближчим часом.' },
  { q: 'Чи можна займатися з репетитором через Murly?', a: 'Тариф Tutor дає репетитору кабінет для груп учнів, домашку в один клік і щотижневий звіт батькам. Кабінети зараз у роботі.' },
  { q: 'Чи потрібна реєстрація?', a: 'Для перших квізів ні. Реєстрація знадобиться, щоб зберігати результати, streak і прогрес у кабінеті.' },
  { q: 'Як скасувати підписку?', a: 'У будь-який момент у кабінеті, без дзвінків і листів. Доступ залишається до кінця оплаченого періоду.' },
];

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-chat" />Контакти</span>
          <h1>Є питання? <em>Пиши.</em></h1>
          <p>Пиши на пошту. Ідеї нових квізів і знайдені помилки теж сюди.</p>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-contact">
            {CHANNELS.map((c) => {
              const body = (
                <>
                  <div className="mu-card__icon"><Icon id={c.icon} /></div>
                  <b>{c.title}</b>
                  <span>{c.value}</span>
                </>
              );
              return c.href ? (
                <a key={c.title} href={c.href} className={`mu-card ${c.mod}`}>{body}</a>
              ) : (
                <div key={c.title} className={`mu-card mu-card--soon ${c.mod}`}>{body}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />FAQ</span>
            <h2 className="mu-section__title">Часті <em>питання.</em></h2>
          </div>
          <Faq items={FAQ} />
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/quiz/teen-life" className="mu-btn mu-btn--lime mu-btn--lg">
              Спробувати квіз<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
