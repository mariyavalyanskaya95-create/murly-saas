import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Контакти Murly', ru: 'Контакты Murly', en: 'Contact Murly' }),
    description: t({
      uk: 'Пошта Murly і відповіді на часті питання.',
      ru: 'Почта Murly и ответы на частые вопросы.',
      en: 'Murly email and answers to common questions.',
    }),
  };
}

const EMAIL = 'murly.school@gmail.com';

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Чи підходить Murly, якщо в мене слабка англійська?', ru: 'Подходит ли Murly, если у меня слабый английский?', en: 'Is Murly right for me if my English is weak?' }, a: { uk: 'Так. Почни з тесту на рівень. Після кожної помилки є пояснення.', ru: 'Да. Начни с теста на уровень. После каждой ошибки есть объяснение.', en: 'Yes. Start with the level test. Every mistake comes with an explanation.' } },
  { q: { uk: 'Скільки часу треба на день?', ru: 'Сколько времени нужно в день?', en: 'How much time do I need per day?' }, a: { uk: '5-10 хвилин, але щодня. Регулярність працює краще за довгі заняття раз на тиждень.', ru: '5-10 минут, но каждый день. Регулярность работает лучше долгих занятий раз в неделю.', en: '5-10 minutes, but every day. Regular practice beats long sessions once a week.' } },
  { q: { uk: 'Завдання справді як на НМТ?', ru: 'Задания правда как на НМТ?', en: 'Are the tasks really like the NMT?' }, a: { uk: 'Так. 20 пробних НМТ: 32 завдання, близько 60 хвилин, пояснення до кожної відповіді.', ru: 'Да. 20 пробных НМТ: 32 задания, около 60 минут, объяснение к каждому ответу.', en: 'Yes. 20 NMT mock tests: 32 questions, about 60 minutes, every answer explained.' } },
  { q: { uk: 'Чи можна займатися з репетитором через Murly?', ru: 'Можно ли заниматься с репетитором через Murly?', en: 'Can I study with a tutor through Murly?' }, a: { uk: 'Так. Учитель створює кабінет, дає тобі код, задає домашку і бачить прогрес.', ru: 'Да. Учитель создаёт кабинет, даёт тебе код, задаёт домашку и видит прогресс.', en: 'Yes. The teacher creates a dashboard, gives you a code, sets homework and sees your progress.' } },
  { q: { uk: 'Чи потрібна реєстрація?', ru: 'Нужна ли регистрация?', en: 'Do I need to sign up?' }, a: { uk: 'Граматика, дієслова, ігри й квізи відкриті без неї. Акаунт потрібен, щоб зберігати прогрес і отримувати домашку.', ru: 'Грамматика, глаголы, игры и квизы открыты без неё. Аккаунт нужен, чтобы сохранять прогресс и получать домашку.', en: 'Grammar, verbs, games and quizzes are open without it. You need an account to save progress and get homework.' } },
  { q: { uk: 'Як скасувати підписку?', ru: 'Как отменить подписку?', en: 'How do I cancel my subscription?' }, a: { uk: 'У будь-який момент у кабінеті. Доступ залишається до кінця оплаченого періоду.', ru: 'В любой момент в кабинете. Доступ сохраняется до конца оплаченного периода.', en: 'Anytime in your dashboard. You keep access until the end of the paid period.' } },
];

export default function ContactPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="st-cat-please" className="kit-hero" />
          <h1>{t({ uk: 'Є питання?', ru: 'Есть вопросы?', en: 'Got questions?' })} <em>{t({ uk: 'Пиши.', ru: 'Пиши.', en: 'Write to us.' })}</em></h1>
          <p>{t({ uk: 'Ідеї і знайдені помилки теж сюди.', ru: 'Идеи и найденные ошибки тоже сюда.', en: 'Ideas and bugs you found go here too.' })}</p>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-contact">
            <a href={`mailto:${EMAIL}`} className="mu-card mu-card--lime">
              <div className="mu-card__icon"><Icon id="d-send" /></div>
              <b>{t({ uk: 'Пошта', ru: 'Почта', en: 'Email' })}</b>
              <span>{EMAIL}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Часті', ru: 'Частые', en: 'Common' })} <em>{t({ uk: 'питання.', ru: 'вопросы.', en: 'questions.' })}</em></h2>
          </div>
          <Faq items={FAQ.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/sign-up" className="mu-btn mu-btn--lime mu-btn--lg">
              {t({ uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
