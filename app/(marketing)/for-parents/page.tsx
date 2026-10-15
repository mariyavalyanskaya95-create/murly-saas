import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Murly для батьків: англійська, яку дитина хоче вчити',
  description: 'Домашка-гра, слова від учителя, граматика простими словами і 3D-містечко за монетки. Регулярне навчання без сварок.',
  alternates: { canonical: '/for-parents' },
};

const POINTS = [
  { icon: 'd-clock', mod: 'mu-card--lime', title: 'Трохи щодня', text: 'Короткі вправи й ігри, які легко вписати в день. Регулярність дає більше, ніж марафон перед контрольною.' },
  { icon: 'c-fish', mod: 'mu-card--mustard', title: 'Хочеться самому', text: 'За домашку і слова дитина отримує монетки і будує своє 3D-містечко. Мотивація без нагадувань.' },
  { icon: 'd-lock', mod: 'mu-card--sky', title: 'Безпечно', text: 'Без реклами. У грі все англійською, а кабінет учня бачить тільки його вчитель.' },
];

const FAQ = [
  { q: 'Чи потрібен учитель?', a: 'Найкраще працює разом з учителем: він дає код, задає домашку і бачить прогрес. Але граматику, дієслова, слухання й читання можна проходити і самостійно.' },
  { q: 'Для якого віку?', a: 'Для дітей від 6 років, підлітків і дорослих. Є окремий розділ підготовки до НМТ.' },
  { q: 'Скільки коштує?', a: 'Почати можна безкоштовно. Актуальні ціни на сторінці «Тарифи».' },
  { q: 'Як зареєструвати дитину?', a: 'Натисніть «Почати», оберіть «Я учень». Якщо вчитель дав код, введіть його на головній сторінці або в кабінеті учня.' },
];

export default function ForParentsPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-heart" />Для батьків</span>
          <h1>Англійська без <em>сварок</em> через уроки.</h1>
          <p>Домашка-гра, слова від учителя і своє 3D-містечко за монетки. Дитина вчиться сама, бо їй цікаво.</p>
          <div className="mu-hero__cta">
            <Link href="/sign-up?role=student" className="mu-btn mu-btn--lime mu-btn--lg">
              Зареєструвати дитину<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
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
