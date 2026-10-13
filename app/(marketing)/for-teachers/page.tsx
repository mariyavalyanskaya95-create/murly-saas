import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';

export const metadata: Metadata = {
  title: 'Murly для репетиторів НМТ з англійської',
  description: 'Кабінет для груп учнів, домашка в один клік, прогрес кожного і звіт батькам. Готові квізи у форматі НМТ.',
};

const PAINS = [
  { icon: 'd-clock', title: 'Менше рутини', text: 'Не треба шукати й друкувати завдання. Обираєш квіз із бібліотеки і відправляєш групі.' },
  { icon: 'd-growth', title: 'Видно прогрес', text: 'Хто що пройшов, де помиляється і які теми просідають. По кожному учню окремо.' },
  { icon: 'd-heart', title: 'Спокійні батьки', text: 'Раз на тиждень батьки отримують короткий звіт. Менше питань у месенджерах.' },
];

const STEPS = [
  { n: '01', icon: 'd-team', title: 'Створи групу', text: 'Додай учнів за посиланням. Вони реєструються самі.' },
  { n: '02', icon: 'e-board', title: 'Задай домашку', text: 'Обери квіз або тему, вкажи дедлайн. Учні бачать її в кабінеті.' },
  { n: '03', icon: 'd-crm', title: 'Дивись результати', text: 'Бали, помилки і час на кожне завдання. Слабкі теми підсвічуються.' },
  { n: '04', icon: 'd-send', title: 'Звіт батькам', text: 'Автоматично щотижня. Ти нічого не пишеш вручну.' },
];

const FAQ = [
  { q: 'Скільки учнів можна вести?', a: 'На тарифі Tutor до 20 учнів. Якщо потрібно більше, напиши нам.' },
  { q: 'Чи можна додавати свої завдання?', a: 'Зараз працюють готові квізи Murly. Власні завдання в планах після запуску кабінету.' },
  { q: 'Коли запуститься кабінет репетитора?', a: 'Він у роботі. Напиши нам на пошту зі сторінки контактів, і ми повідомимо, щойно відкриємо доступ.' },
];

export default function ForTeachersPage() {
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-team" />Для репетиторів</span>
          <h1>Готуй до НМТ <em>без рутини.</em></h1>
          <p>Готові квізи у форматі НМТ, домашка в один клік і прогрес кожного учня в одному кабінеті.</p>
          <div className="mu-hero__cta">
            <Link href="/sign-up?role=teacher" className="mu-btn mu-btn--lime mu-btn--lg">
              Хочу кабінет<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
            <Link href="/quiz/teen-life" className="mu-btn mu-btn--lg">Подивитись квіз</Link>
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-cards">
            {PAINS.map((p, i) => (
              <div key={p.title} className={`mu-card ${['mu-card--lime', 'mu-card--mustard', 'mu-card--sky'][i]}`}>
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
            <span className="mu-section__eyebrow"><Icon id="e-cal" />Як це працює</span>
            <h2 className="mu-section__title">Чотири <em>кроки.</em></h2>
          </div>
          <div className="mu-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="mu-step">
                <span className="mu-step__ic"><Icon id={s.icon} /></span>
                <div className="mu-step__num">{s.n}</div>
                <h3 className="mu-step__title">{s.title}</h3>
                <p className="mu-step__text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />FAQ</span>
            <h2 className="mu-section__title">Питання <em>репетиторів.</em></h2>
          </div>
          <Faq items={FAQ} />
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/pricing" className="mu-btn mu-btn--tomato mu-btn--lg">
              Тариф Tutor, 490 ₴<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
