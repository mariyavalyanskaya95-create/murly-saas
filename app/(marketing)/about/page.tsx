import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Про Murly: тренажер НМТ з англійської',
  description: 'Чому Murly не схожий на підручник: формат НМТ, пояснення кожної помилки і 5 хвилин на день.',
};

const PRINCIPLES = [
  { icon: 'e-trophy', mod: 'mu-card--lime', title: 'Тільки формат НМТ', text: 'Кожне завдання зроблене так, як на іспиті: reading, use of English, writing. Ти тренуєш саме те, за що дають бали.' },
  { icon: 'd-spark', mod: 'mu-card--mustard', title: 'Пояснення, а не відповіді', text: 'Після кожної помилки ти бачиш, на яке правило вона і де в тексті підказка. Так помилка не повторюється.' },
  { icon: 'd-clock', mod: 'mu-card--sky', title: '5 хвилин на день', text: 'Короткі квізи замість двогодинних сесій. Регулярність дає більше, ніж зубріння за тиждень до іспиту.' },
  { icon: 'e-flame', mod: 'mu-card--ink', title: 'Як гра, а не як урок', text: 'Життя, streak, наліпки і рівні. Повертатися хочеться, бо цікаво, а не бо змусили.' },
];

const ROADMAP = [
  { live: true, icon: 'e-speak', title: 'Квізи за темами НМТ', text: 'Teen Life і Films & Netflix вже працюють, нові теми в роботі.' },
  { live: true, icon: 'd-spark', title: 'Пояснення кожної відповіді', text: 'Блок «Чому так?» після кожного завдання.' },
  { live: false, icon: 'e-abc', title: 'Grammar Boss', text: 'Великий квіз на всі часи, умовні речення, пасив і reported speech.' },
  { live: false, icon: 'e-trophy', title: 'Mock-test #1', text: 'Повний пробник на 90 хвилин з таймером і прогнозом балу.' },
  { live: false, icon: 'd-crm', title: 'Кабінет учня', text: 'Історія квізів, слабкі теми, streak і прогрес до 200 балів.' },
  { live: false, icon: 'd-team', title: 'Кабінет репетитора', text: 'Групи учнів, домашка в один клік і щотижневий звіт батькам.' },
];

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="c-paw" />Про Murly</span>
          <h1>Не підручник. <em>Тренажер</em> для НМТ.</h1>
          <p>Murly допомагає підготуватися до НМТ з англійської короткими квізами у форматі іспиту. Кожна помилка розбирається, кожен день рахується.</p>
          <Link href="/quiz/teen-life" className="mu-btn mu-btn--lime mu-btn--lg">
            Спробувати квіз<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
          </Link>
        </div>
      </section>

      <div className="mu-scallop" style={{ backgroundColor: 'var(--mu-tomato)' }} />
      <section className="mu-section mu-section--tomato" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow mu-section__eyebrow--lime"><Icon id="d-bulb" />Як ми думаємо</span>
            <h2 className="mu-section__title">Чотири <em>правила</em> Murly.</h2>
          </div>
          <div className="mu-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} className={`mu-card ${p.mod}`}>
                <div className="mu-card__icon"><Icon id={p.icon} /></div>
                <h3 className="mu-card__title">{p.title}</h3>
                <p className="mu-card__text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mu-scallop mu-scallop--up" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-cal" />Що вже є і що далі</span>
            <h2 className="mu-section__title">Murly <em>росте.</em></h2>
            <p className="mu-section__lead">Ми запускаємось поступово і показуємо чесно, що вже працює, а що в роботі.</p>
          </div>
          <div className="mu-cards">
            {ROADMAP.map((r) => (
              <div key={r.title} className={`mu-card ${r.live ? '' : 'mu-card--soon'}`}>
                <span className={`mu-status ${r.live ? 'mu-status--live' : 'mu-status--soon'}`}>{r.live ? 'Вже працює' : 'Скоро'}</span>
                <div className="mu-card__icon"><Icon id={r.icon} /></div>
                <h3 className="mu-card__title">{r.title}</h3>
                <p className="mu-card__text">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-glass" className="mu-ic mu-ic--cta" />
            <h2>Почни з <em>5 хвилин.</em></h2>
            <p>Перший квіз безкоштовний і без реєстрації.</p>
            <Link href="/quiz/teen-life" className="mu-btn mu-btn--tomato mu-btn--lg">
              Почати квіз<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
