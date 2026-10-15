import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Контакти Murly', ru: 'Контакты Murly', en: 'Contact Murly' }),
    description: t({
      uk: 'Напиши Murly: пошта, соцмережі і відповіді на часті питання про підготовку до НМТ.',
      ru: 'Напиши Murly: почта, соцсети и ответы на частые вопросы о подготовке к НМТ.',
      en: 'Write to Murly: email, social media and answers to common questions about NMT (Ukrainian school exam) prep.',
    }),
  };
}

const EMAIL = 'murly.school@gmail.com';

const SOON: T = { uk: 'Скоро', ru: 'Скоро', en: 'Coming soon' };

const CHANNELS: { icon: string; title: T; value: T; href?: string; mod: string }[] = [
  { icon: 'd-send', title: { uk: 'Пошта', ru: 'Почта', en: 'Email' }, value: { uk: EMAIL }, href: `mailto:${EMAIL}`, mod: 'mu-card--lime' },
  { icon: 'd-chat', title: { uk: 'Telegram' }, value: SOON, mod: '' },
  { icon: 'd-camera', title: { uk: 'Instagram' }, value: SOON, mod: 'mu-card--mustard' },
  { icon: 'e-mic', title: { uk: 'TikTok' }, value: SOON, mod: 'mu-card--sky' },
];

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Чи підходить Murly, якщо в мене слабка англійська?', ru: 'Подходит ли Murly, если у меня слабый английский?', en: 'Is Murly right for me if my English is weak?' }, a: { uk: 'Так. Квізи йдуть від простих тем до складних, а після кожної помилки є пояснення українською. Почни з Teen Life і дивись на розбори.', ru: 'Да. Квизы идут от простых тем к сложным, а после каждой ошибки есть объяснение на украинском. Начни с Teen Life и смотри разборы.', en: 'Yes. Quizzes go from easy topics to harder ones, and every mistake comes with an explanation in Ukrainian. Start with Teen Life and read the explanations.' } },
  { q: { uk: 'Скільки часу треба на день?', ru: 'Сколько времени нужно в день?', en: 'How much time do I need per day?' }, a: { uk: 'Достатньо 5-10 хвилин. Один квіз займає близько п’яти хвилин, і регулярність працює краще за довгі сесії раз на тиждень.', ru: 'Достаточно 5-10 минут. Один квиз занимает около пяти минут, и регулярность работает лучше, чем долгие сессии раз в неделю.', en: '5-10 minutes is enough. One quiz takes about five minutes, and regular practice works better than long sessions once a week.' } },
  { q: { uk: 'Завдання справді як на НМТ?', ru: 'Задания правда как на НМТ?', en: 'Are the tasks really like the NMT?' }, a: { uk: 'Так, ми робимо їх у форматах НМТ з англійської: reading з текстом, use of English і граматика. Повний пробник на 90 хвилин з’явиться найближчим часом.', ru: 'Да, мы делаем их в форматах НМТ по английскому: reading с текстом, use of English и грамматика. Полный пробный тест на 90 минут появится в ближайшее время.', en: 'Yes, we build them in the English NMT formats: reading with a text, use of English and grammar. A full 90-minute practice test is coming soon.' } },
  { q: { uk: 'Чи можна займатися з репетитором через Murly?', ru: 'Можно ли заниматься с репетитором через Murly?', en: 'Can I study with a tutor through Murly?' }, a: { uk: 'Тариф Tutor дає репетитору кабінет для груп учнів, домашку в один клік і щотижневий звіт батькам. Кабінети зараз у роботі.', ru: 'Тариф Tutor даёт репетитору кабинет для групп учеников, домашку в один клик и еженедельный отчёт родителям. Кабинеты сейчас в работе.', en: 'The Tutor plan gives a tutor a dashboard for student groups, one-click homework and a weekly report for parents. Dashboards are in progress now.' } },
  { q: { uk: 'Чи потрібна реєстрація?', ru: 'Нужна ли регистрация?', en: 'Do I need to sign up?' }, a: { uk: 'Для перших квізів ні. Реєстрація знадобиться, щоб зберігати результати, streak і прогрес у кабінеті.', ru: 'Для первых квизов нет. Регистрация понадобится, чтобы сохранять результаты, streak и прогресс в кабинете.', en: 'Not for the first quizzes. You’ll need an account to save results, your streak and progress in the dashboard.' } },
  { q: { uk: 'Як скасувати підписку?', ru: 'Как отменить подписку?', en: 'How do I cancel my subscription?' }, a: { uk: 'У будь-який момент у кабінеті, без дзвінків і листів. Доступ залишається до кінця оплаченого періоду.', ru: 'В любой момент в кабинете, без звонков и писем. Доступ сохраняется до конца оплаченного периода.', en: 'Anytime in your dashboard, no calls or emails. You keep access until the end of the paid period.' } },
];

export default function ContactPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <span className="mu-section__eyebrow"><Icon id="d-chat" />{t({ uk: 'Контакти', ru: 'Контакты', en: 'Contact' })}</span>
          <h1>{t({ uk: 'Є питання?', ru: 'Есть вопросы?', en: 'Got questions?' })} <em>{t({ uk: 'Пиши.', ru: 'Пиши.', en: 'Write to us.' })}</em></h1>
          <p>{t({ uk: 'Пиши на пошту. Ідеї нових квізів і знайдені помилки теж сюди.', ru: 'Пиши на почту. Идеи новых квизов и найденные ошибки тоже сюда.', en: 'Send us an email. Ideas for new quizzes and bugs you found go here too.' })}</p>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-contact">
            {CHANNELS.map((c) => {
              const body = (
                <>
                  <div className="mu-card__icon"><Icon id={c.icon} /></div>
                  <b>{t(c.title)}</b>
                  <span>{t(c.value)}</span>
                </>
              );
              return c.href ? (
                <a key={c.title.uk} href={c.href} className={`mu-card ${c.mod}`}>{body}</a>
              ) : (
                <div key={c.title.uk} className={`mu-card mu-card--soon ${c.mod}`}>{body}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />FAQ</span>
            <h2 className="mu-section__title">{t({ uk: 'Часті', ru: 'Частые', en: 'Common' })} <em>{t({ uk: 'питання.', ru: 'вопросы.', en: 'questions.' })}</em></h2>
          </div>
          <Faq items={FAQ.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/quiz/teen-life" className="mu-btn mu-btn--lime mu-btn--lg">
              {t({ uk: 'Спробувати квіз', ru: 'Попробовать квиз', en: 'Try a quiz' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
