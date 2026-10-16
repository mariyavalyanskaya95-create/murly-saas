import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Про Murly: тренажер НМТ з англійської', ru: 'О Murly: тренажёр НМТ по английскому', en: 'About Murly: NMT English trainer' }),
    description: t({
      uk: 'Чому Murly не схожий на підручник: формат НМТ, пояснення кожної помилки і 5 хвилин на день.',
      ru: 'Почему Murly не похож на учебник: формат НМТ, объяснение каждой ошибки и 5 минут в день.',
      en: 'Why Murly is not like a textbook: the NMT (Ukrainian school exam) format, an explanation for every mistake and 5 minutes a day.',
    }),
  };
}

const PRINCIPLES: { icon: string; mod: string; title: T; text: T }[] = [
  { icon: 'e-trophy', mod: 'mu-card--lime', title: { uk: 'Тільки формат НМТ', ru: 'Только формат НМТ', en: 'Only the NMT format' }, text: { uk: 'Кожне завдання зроблене так, як на іспиті: reading, use of English, writing. Ти тренуєш саме те, за що дають бали.', ru: 'Каждое задание сделано так, как на экзамене: reading, use of English, writing. Ты тренируешь именно то, за что дают баллы.', en: 'Every task is built like the exam: reading, use of English, writing. You train exactly what earns points.' } },
  { icon: 'd-spark', mod: 'mu-card--mustard', title: { uk: 'Пояснення, а не відповіді', ru: 'Объяснения, а не ответы', en: 'Explanations, not just answers' }, text: { uk: 'Після кожної помилки ти бачиш, на яке правило вона і де в тексті підказка. Так помилка не повторюється.', ru: 'После каждой ошибки ты видишь, на какое она правило и где в тексте подсказка. Так ошибка не повторяется.', en: 'After every mistake you see which rule it is about and where the hint is in the text. That way it doesn’t happen again.' } },
  { icon: 'd-clock', mod: 'mu-card--sky', title: { uk: '5 хвилин на день', ru: '5 минут в день', en: '5 minutes a day' }, text: { uk: 'Короткі квізи замість двогодинних сесій. Регулярність дає більше, ніж зубріння за тиждень до іспиту.', ru: 'Короткие квизы вместо двухчасовых сессий. Регулярность даёт больше, чем зубрёжка за неделю до экзамена.', en: 'Short quizzes instead of two-hour sessions. Regular practice beats cramming the week before the exam.' } },
  { icon: 'e-flame', mod: 'mu-card--ink', title: { uk: 'Як гра, а не як урок', ru: 'Как игра, а не как урок', en: 'Like a game, not a lesson' }, text: { uk: 'Життя, streak, наліпки і рівні. Повертатися хочеться, бо цікаво, а не бо змусили.', ru: 'Жизни, streak, наклейки и уровни. Возвращаться хочется, потому что интересно, а не потому что заставили.', en: 'Lives, streaks, stickers and levels. You come back because it’s fun, not because someone made you.' } },
];

const ROADMAP: { live: boolean; icon: string; title: T; text: T }[] = [
  { live: true, icon: 'e-speak', title: { uk: 'Квізи за темами НМТ', ru: 'Квизы по темам НМТ', en: 'Quizzes on NMT topics' }, text: { uk: 'Teen Life і Films & Netflix вже працюють, нові теми в роботі.', ru: 'Teen Life и Films & Netflix уже работают, новые темы в работе.', en: 'Teen Life and Films & Netflix are live, new topics are on the way.' } },
  { live: true, icon: 'd-spark', title: { uk: 'Пояснення кожної відповіді', ru: 'Объяснение каждого ответа', en: 'An explanation for every answer' }, text: { uk: 'Блок «Чому так?» після кожного завдання.', ru: 'Блок «Почему так?» после каждого задания.', en: 'A “Why?” block after every task.' } },
  { live: false, icon: 'e-abc', title: { uk: 'Grammar Boss', ru: 'Grammar Boss', en: 'Grammar Boss' }, text: { uk: 'Великий квіз на всі часи, умовні речення, пасив і reported speech.', ru: 'Большой квиз на все времена, условные предложения, пассив и reported speech.', en: 'A big quiz on all tenses, conditionals, passive and reported speech.' } },
  { live: false, icon: 'e-trophy', title: { uk: 'Mock-test #1', ru: 'Mock-test #1', en: 'Mock-test #1' }, text: { uk: 'Повний пробник на 90 хвилин з таймером і прогнозом балу.', ru: 'Полный пробный тест на 90 минут с таймером и прогнозом балла.', en: 'A full 90-minute practice test with a timer and a score forecast.' } },
  { live: false, icon: 'd-crm', title: { uk: 'Кабінет учня', ru: 'Кабинет ученика', en: 'Student dashboard' }, text: { uk: 'Історія квізів, слабкі теми, streak і прогрес до 200 балів.', ru: 'История квизов, слабые темы, streak и прогресс до 200 баллов.', en: 'Quiz history, weak topics, streak and progress towards 200 points.' } },
  { live: false, icon: 'd-team', title: { uk: 'Кабінет репетитора', ru: 'Кабинет репетитора', en: 'Tutor dashboard' }, text: { uk: 'Групи учнів, домашка в один клік і щотижневий звіт батькам.', ru: 'Группы учеников, домашка в один клик и еженедельный отчёт родителям.', en: 'Student groups, one-click homework and a weekly report for parents.' } },
];

export default function AboutPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="st-cat-box" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="c-paw" />{t({ uk: 'Про Murly', ru: 'О Murly', en: 'About Murly' })}</span>
          <h1>{t({ uk: 'Не підручник.', ru: 'Не учебник.', en: 'Not a textbook.' })} <em>{t({ uk: 'Тренажер', ru: 'Тренажёр', en: 'A trainer' })}</em> {t({ uk: 'для НМТ.', ru: 'для НМТ.', en: 'for the NMT.' })}</h1>
          <p>{t({ uk: 'Murly допомагає підготуватися до НМТ з англійської короткими квізами у форматі іспиту. Кожна помилка розбирається, кожен день рахується.', ru: 'Murly помогает подготовиться к НМТ по английскому с помощью коротких квизов в формате экзамена. Каждая ошибка разбирается, каждый день засчитывается.', en: 'Murly helps you prepare for the English NMT (Ukrainian school exam) with short exam-style quizzes. Every mistake is explained, every day counts.' })}</p>
          <Link href="/quiz/teen-life" className="mu-btn mu-btn--lime mu-btn--lg">
            {t({ uk: 'Спробувати квіз', ru: 'Попробовать квиз', en: 'Try a quiz' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
          </Link>
        </div>
      </section>

      <div className="mu-scallop" style={{ backgroundColor: 'var(--mu-tomato)' }} />
      <section className="mu-section mu-section--tomato" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow mu-section__eyebrow--lime"><Icon id="d-bulb" />{t({ uk: 'Як ми думаємо', ru: 'Как мы думаем', en: 'How we think' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Чотири', ru: 'Четыре', en: 'Four' })} <em>{t({ uk: 'правила', ru: 'правила', en: 'rules' })}</em> {t({ uk: 'Murly.', ru: 'Murly.', en: 'of Murly.' })}</h2>
          </div>
          <div className="mu-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title.uk} className={`mu-card ${p.mod}`}>
                <div className="mu-card__icon"><Icon id={p.icon} /></div>
                <h3 className="mu-card__title">{t(p.title)}</h3>
                <p className="mu-card__text">{t(p.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mu-scallop mu-scallop--up" style={{ backgroundColor: 'var(--mu-tomato)' }} />

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="e-cal" />{t({ uk: 'Що вже є і що далі', ru: 'Что уже есть и что дальше', en: 'What’s here and what’s next' })}</span>
            <h2 className="mu-section__title">Murly <em>{t({ uk: 'росте.', ru: 'растёт.', en: 'is growing.' })}</em></h2>
            <p className="mu-section__lead">{t({ uk: 'Ми запускаємось поступово і показуємо чесно, що вже працює, а що в роботі.', ru: 'Мы запускаемся постепенно и честно показываем, что уже работает, а что в работе.', en: 'We are launching step by step and show honestly what already works and what is in progress.' })}</p>
          </div>
          <div className="mu-cards">
            {ROADMAP.map((r) => (
              <div key={r.title.uk} className={`mu-card ${r.live ? '' : 'mu-card--soon'}`}>
                <span className={`mu-status ${r.live ? 'mu-status--live' : 'mu-status--soon'}`}>{r.live ? t({ uk: 'Вже працює', ru: 'Уже работает', en: 'Live now' }) : t({ uk: 'Скоро', ru: 'Скоро', en: 'Coming soon' })}</span>
                <div className="mu-card__icon"><Icon id={r.icon} /></div>
                <h3 className="mu-card__title">{t(r.title)}</h3>
                <p className="mu-card__text">{t(r.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-glass" className="mu-ic mu-ic--cta" />
            <h2>{t({ uk: 'Почни з', ru: 'Начни с', en: 'Start with' })} <em>{t({ uk: '5 хвилин.', ru: '5 минут.', en: '5 minutes.' })}</em></h2>
            <p>{t({ uk: 'Перший квіз безкоштовний і без реєстрації.', ru: 'Первый квиз бесплатный и без регистрации.', en: 'The first quiz is free, no sign-up needed.' })}</p>
            <Link href="/quiz/teen-life" className="mu-btn mu-btn--tomato mu-btn--lg">
              {t({ uk: 'Почати квіз', ru: 'Начать квиз', en: 'Start a quiz' })}<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
