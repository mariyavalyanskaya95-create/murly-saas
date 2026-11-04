import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import PricingSection from '@/components/PricingSection';
import Faq from '@/components/Faq';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Тарифи Murly: від 0 ₴', ru: 'Тарифы Murly: от 0 ₴', en: 'Murly pricing: from 0 ₴' }),
    description: t({
      uk: 'Перший місяць безкоштовно. Кабінет вчителя від 0 ₴, Учень Плюс 99 ₴ на місяць і міні-продукти від 85 ₴: чек-лист НМТ, граматика A1-B1, неправильні дієслова.',
      ru: 'Первый месяц бесплатно. Кабинет учителя от 0 ₴, Ученик Плюс 99 ₴ в месяц и мини-продукты от 85 ₴: чек-лист НМТ, грамматика A1-B1, неправильные глаголы.',
      en: 'First month free. Teacher dashboard from 0 ₴, Student Plus 99 ₴ a month and mini products from 85 ₴: NMT checklist, A1-B1 grammar, irregular verbs.',
    }),
  };
}

// Міні-продукти: купуються один раз, без підписки. Мінімум 85 ₴.
const MINI: { icon: string; price: number; old?: number; name: T; text: T; who: 'student' | 'teacher'; bundle?: boolean }[] = [
  { icon: 'e-pencil', price: 99, who: 'student', name: { uk: 'Чек-лист підготовки до НМТ', ru: 'Чек-лист подготовки к НМТ', en: 'NMT prep checklist' }, text: { uk: 'План на 8 тижнів, стратегії і день іспиту', ru: 'План на 8 недель, стратегии и день экзамена', en: 'An 8-week plan, strategies and exam day' } },
  { icon: 'e-trophy', price: 85, who: 'student', name: { uk: 'Пробний НМТ з розбором', ru: 'Пробный НМТ с разбором', en: 'NMT mock test with answers explained' }, text: { uk: 'Повний тест як на іспиті і пояснення кожної відповіді', ru: 'Полный тест как на экзамене и объяснение каждого ответа', en: 'A full exam-style test and every answer explained' } },
  { icon: 'e-abc', price: 149, who: 'student', name: { uk: 'Уся базова граматика A1-B1', ru: 'Вся базовая грамматика A1-B1', en: 'All basic grammar A1-B1' }, text: { uk: 'Супер просто, з прикладами і вправами', ru: 'Супер просто, с примерами и упражнениями', en: 'Super simple, with examples and exercises' } },
  { icon: 'e-book', price: 85, who: 'student', name: { uk: 'Неправильні дієслова: картки і план на 30 днів', ru: 'Неправильные глаголы: карточки и план на 30 дней', en: 'Irregular verbs: cards and a 30-day plan' }, text: { uk: 'Друкуєш, вчиш по 5 на день', ru: 'Печатаешь, учишь по 5 в день', en: 'Print them, learn 5 a day' } },
  { icon: 'e-speak', price: 85, who: 'student', name: { uk: '100 важливих слів для НМТ', ru: '100 важных слов для НМТ', en: '100 key words for the NMT' }, text: { uk: '10 тем, приклади і тест', ru: '10 тем, примеры и тест', en: '10 topics, examples and a test' } },
  { icon: 'd-heart', price: 199, old: 269, who: 'student', bundle: true, name: { uk: 'Старт до НМТ: 3 в 1', ru: 'Старт к НМТ: 3 в 1', en: 'NMT starter: 3 in 1' }, text: { uk: 'Чек-лист, 100 слів і дієслова за 30 днів разом з іграми для друку', ru: 'Чек-лист, 100 слов и глаголы за 30 дней вместе с играми для печати', en: 'Checklist, 100 words and 30-day verbs, plus printable games' } },
  { icon: 'd-spark', price: 299, who: 'student', bundle: true, name: { uk: 'Усе для НМТ', ru: 'Всё для НМТ', en: 'Everything for the NMT' }, text: { uk: 'Чек-лист, пробник, граматика, дієслова і 100 слів разом', ru: 'Чек-лист, пробник, грамматика, глаголы и 100 слов вместе', en: 'Checklist, mock test, grammar, verbs and 100 words together' } },
  { icon: 'e-mic', price: 199, who: 'teacher', name: { uk: '10 уроків для Speaking club', ru: '10 уроков для Speaking club', en: '10 Speaking club lessons' }, text: { uk: 'Теми, питання і картки, бери і веди', ru: 'Темы, вопросы и карточки, бери и веди', en: 'Topics, questions and cards, ready to teach' } },
  { icon: 'e-board', price: 85, who: 'teacher', name: { uk: 'Шаблон першого уроку з новим учнем', ru: 'Шаблон первого урока с новым учеником', en: 'First lesson template for a new student' }, text: { uk: 'Знайомство, тест рівня і план навчання', ru: 'Знакомство, тест уровня и план обучения', en: 'Getting to know, level test and a study plan' } },
];

const FAQ: { q: T; a: T }[] = [
  { q: { uk: 'Що можна безкоштовно?', ru: 'Что можно бесплатно?', en: 'What can I do for free?' }, a: { uk: 'Учням: граматика, неправильні дієслова, ігри і квіз щодня. Вчителям: кабінет на 3 учнів і 6 готових уроків. Без картки і без терміну.', ru: 'Ученикам: грамматика, неправильные глаголы, игры и квиз каждый день. Учителям: кабинет на 3 учеников и 6 готовых уроков. Без карты и без срока.', en: 'Students: grammar, irregular verbs, games and a daily quiz. Teachers: a dashboard for 3 students and 6 ready-made lessons. No card, no time limit.' } },
  { q: { uk: 'Мій вчитель уже платить. Мені теж треба?', ru: 'Мой учитель уже платит. Мне тоже надо?', en: 'My teacher already pays. Do I need to?' }, a: { uk: 'Ні. Якщо вчитель на платному тарифі, уроки, домашка і все для навчання з ним для тебе безкоштовні.', ru: 'Нет. Если учитель на платном тарифе, уроки, домашка и всё для учёбы с ним для тебя бесплатны.', en: 'No. If your teacher is on a paid plan, lessons, homework and everything for learning with them are free for you.' } },
  { q: { uk: 'Що таке міні-продукти?', ru: 'Что такое мини-продукты?', en: 'What are mini products?' }, a: { uk: 'Окремі матеріали, які купуються один раз, без підписки: чек-листи, пробники, граматика, картки. Вони лишаються в тебе назавжди.', ru: 'Отдельные материалы, которые покупаются один раз, без подписки: чек-листы, пробники, грамматика, карточки. Они остаются у тебя навсегда.', en: 'One-time materials, no subscription: checklists, mock tests, grammar, cards. They stay with you forever.' } },
  { q: { uk: 'Як працює безкоштовний місяць?', ru: 'Как работает бесплатный месяц?', en: 'How does the free month work?' }, a: { uk: 'Після реєстрації 30 днів у тебе всі можливості Pro, картку вводити не треба. Якщо не продовжиш, кабінет перейде на «Старт»: усі дані лишаються, активними будуть 3 учні.', ru: 'После регистрации 30 дней у тебя все возможности Pro, карту вводить не нужно. Если не продлишь, кабинет перейдёт на «Старт»: все данные остаются, активными будут 3 ученика.', en: 'For 30 days after sign-up you get everything in Pro, no card needed. If you don’t continue, the dashboard moves to Start: all your data stays, and 3 students remain active.' } },
  { q: { uk: 'Що дає «Запроси колегу»?', ru: 'Что даёт «Пригласи коллегу»?', en: 'What does “Invite a colleague” give?' }, a: { uk: 'Коли вчитель за твоїм посиланням оформить Pro, ви обоє отримаєте ще місяць безкоштовно.', ru: 'Когда учитель по твоей ссылке оформит Pro, вы оба получите ещё месяц бесплатно.', en: 'When a teacher who joined via your link gets Pro, you both get another month free.' } },
  { q: { uk: 'Можна скасувати будь-коли?', ru: 'Можно отменить в любой момент?', en: 'Can I cancel anytime?' }, a: { uk: 'Так, у кабінеті, в один клік. Доступ лишається до кінця оплаченого періоду, без штрафів.', ru: 'Да, в кабинете, в один клик. Доступ сохраняется до конца оплаченного периода, без штрафов.', en: 'Yes, in your dashboard, in one click. You keep access until the end of the paid period, no penalties.' } },
  { q: { uk: 'Як оплатити?', ru: 'Как оплатить?', en: 'How do I pay?' }, a: { uk: 'Карткою онлайн, у гривнях. Оплату ми якраз підключаємо, а поки все безкоштовне працює без обмежень.', ru: 'Картой онлайн, в гривнах. Оплату мы как раз подключаем, а пока всё бесплатное работает без ограничений.', en: 'By card online, in hryvnias. We’re connecting payments right now. Until then, everything free works without limits.' } },
];

export default function PricingPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <h1>{t({ uk: 'Тарифи', ru: 'Тарифы', en: 'Pricing' })}</h1>
          <p>{t({ uk: 'Почни безкоштовно, перший місяць Pro без оплати. Далі для учня від 99 ₴, для вчителя 249 ₴ на місяць.', ru: 'Начни бесплатно, первый месяц Pro без оплаты. Дальше для ученика от 99 ₴, для учителя 249 ₴ в месяц.', en: 'Start for free, your first month of Pro costs nothing. Then from 99 ₴ for students and 249 ₴ a month for teachers.' })}</p>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <PricingSection />
        </div>
      </section>

      <section className="mu-section" id="mini" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-pencil" />{t({ uk: 'Міні-продукти', ru: 'Мини-продукты', en: 'Mini products' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Один раз', ru: 'Один раз', en: 'Pay once,' })} <em>{t({ uk: 'і назавжди.', ru: 'и навсегда.', en: 'keep forever.' })}</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Без підписки. Взяв те, що потрібно саме зараз.', ru: 'Без подписки. Взял то, что нужно именно сейчас.', en: 'No subscription. Get just what you need right now.' })}</p>
          </div>
          {(['student', 'teacher'] as const).map((who) => (
            <div key={who} className="pr-mini-group">
              <h3 className="pr-mini-title"><Icon id={who === 'student' ? 'd-kid' : 'd-team'} />{who === 'student' ? t({ uk: 'Учням і батькам', ru: 'Ученикам и родителям', en: 'Students and parents' }) : t({ uk: 'Вчителям', ru: 'Учителям', en: 'Teachers' })}</h3>
              <div className="pr-mini">
                {MINI.filter((m) => m.who === who).map((m) => (
                  <div key={m.name.uk} className={`pr-mini__card ${m.bundle ? 'is-bundle' : ''}`}>
                    <span className="pr-mini__ic"><Icon id={m.icon} /></span>
                    <b>{t(m.name)}</b>
                    <small>{t(m.text)}</small>
                    <div className="pr-mini__foot">
                      <span className="pr-mini__price">{m.old && <s className="pr-mini__old">{m.old} ₴</s>}{m.price} ₴</span>
                      <span className="pr-mini__soon">{t({ uk: 'Скоро', ru: 'Скоро', en: 'Soon' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
