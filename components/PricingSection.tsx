'use client';
// Тарифи Murly: вчителям і учням/батькам, місяць або рік. Оплата поки «скоро».
import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icon';
import { useT } from './LangProvider';
import type { T } from '@/lib/i18n';

type Plan = {
  icon: string;
  name: T;
  month: number;
  year?: number;
  note: T;
  items: T[];
  cta: T;
  href: string;
  hit?: boolean;
  paid?: boolean;
};

const TEACHER: Plan[] = [
  {
    icon: 'd-smile', name: { uk: 'Старт', ru: 'Старт', en: 'Start' }, month: 0,
    note: { uk: 'Назавжди безкоштовно', ru: 'Навсегда бесплатно', en: 'Free forever' },
    items: [
      { uk: 'До 3 учнів', ru: 'До 3 учеников', en: 'Up to 3 students' },
      { uk: '6 готових уроків з бібліотеки', ru: '6 готовых уроков из библиотеки', en: '6 ready-made library lessons' },
      { uk: 'Домашка і прогрес учнів', ru: 'Домашка и прогресс учеников', en: 'Homework and student progress' },
      { uk: 'Розклад занять', ru: 'Расписание занятий', en: 'Lesson schedule' },
    ],
    cta: { uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' }, href: '/sign-up?role=teacher',
  },
  {
    icon: 'd-rocket', name: { uk: 'Вчитель', ru: 'Учитель', en: 'Teacher' }, month: 199, year: 1990, hit: true, paid: true,
    note: { uk: '14 днів безкоштовно', ru: '14 дней бесплатно', en: '14 days free' },
    items: [
      { uk: 'До 30 учнів', ru: 'До 30 учеников', en: 'Up to 30 students' },
      { uk: 'Уся бібліотека уроків з відповідями', ru: 'Вся библиотека уроков с ответами', en: 'The full lesson library with answers' },
      { uk: 'Презентація на урок і друк A4', ru: 'Презентация на урок и печать A4', en: 'Lesson slides and A4 print' },
      { uk: 'Учням усе для навчання безкоштовно', ru: 'Ученикам всё для учёбы бесплатно', en: 'Students learn for free' },
    ],
    cta: { uk: 'Спробувати 14 днів', ru: 'Попробовать 14 дней', en: 'Try 14 days' }, href: '/sign-up?role=teacher&plan=teacher',
  },
  {
    icon: 'd-team', name: { uk: 'Без ліміту', ru: 'Без лимита', en: 'Unlimited' }, month: 349, year: 3490, paid: true,
    note: { uk: 'Для шкіл і великих груп', ru: 'Для школ и больших групп', en: 'For schools and big groups' },
    items: [
      { uk: 'Усе з тарифу «Вчитель»', ru: 'Всё из тарифа «Учитель»', en: 'Everything in Teacher' },
      { uk: 'Скільки завгодно учнів', ru: 'Сколько угодно учеников', en: 'Any number of students' },
      { uk: 'Групи і класи', ru: 'Группы и классы', en: 'Groups and classes' },
      { uk: 'Звіт батькам щотижня', ru: 'Отчёт родителям каждую неделю', en: 'Weekly report for parents' },
    ],
    cta: { uk: 'Спробувати 14 днів', ru: 'Попробовать 14 дней', en: 'Try 14 days' }, href: '/sign-up?role=teacher&plan=unlimited',
  },
];

const STUDENT: Plan[] = [
  {
    icon: 'd-smile', name: { uk: 'Безкоштовно', ru: 'Бесплатно', en: 'Free' }, month: 0,
    note: { uk: 'Назавжди', ru: 'Навсегда', en: 'Forever' },
    items: [
      { uk: 'Граматика і неправильні дієслова', ru: 'Грамматика и неправильные глаголы', en: 'Grammar and irregular verbs' },
      { uk: 'Квіз щодня', ru: 'Квиз каждый день', en: 'A quiz every day' },
      { uk: 'Ігри з дієсловами', ru: 'Игры с глаголами', en: 'Verb games' },
      { uk: 'Домашка від свого вчителя', ru: 'Домашка от своего учителя', en: 'Homework from your teacher' },
    ],
    cta: { uk: 'Почати', ru: 'Начать', en: 'Start' }, href: '/sign-up?role=student',
  },
  {
    icon: 'd-rocket', name: { uk: 'Учень Плюс', ru: 'Ученик Плюс', en: 'Student Plus' }, month: 99, year: 890, hit: true, paid: true,
    note: { uk: 'Для самостійної підготовки', ru: 'Для самостоятельной подготовки', en: 'For learning on your own' },
    items: [
      { uk: 'Усі квізи і пробники НМТ', ru: 'Все квизы и пробные тесты НМТ', en: 'All quizzes and NMT practice tests' },
      { uk: 'Розбір кожної помилки', ru: 'Разбор каждой ошибки', en: 'Every mistake explained' },
      { uk: 'Слухати і читати без обмежень', ru: 'Слушать и читать без ограничений', en: 'Unlimited listening and reading' },
      { uk: 'Прогрес щотижня', ru: 'Прогресс каждую неделю', en: 'Weekly progress' },
    ],
    cta: { uk: 'Оплата скоро', ru: 'Оплата скоро', en: 'Payment soon' }, href: '/sign-up?role=student&plan=plus',
  },
  {
    icon: 'd-heart', name: { uk: "Сім'я", ru: 'Семья', en: 'Family' }, month: 149, paid: true,
    note: { uk: 'Для 2-3 дітей', ru: 'Для 2-3 детей', en: 'For 2-3 kids' },
    items: [
      { uk: 'Усе з «Учень Плюс» для кожної дитини', ru: 'Всё из «Ученик Плюс» для каждого ребёнка', en: 'Student Plus for every child' },
      { uk: 'Окремий прогрес кожного', ru: 'Отдельный прогресс каждого', en: 'Separate progress for each' },
      { uk: 'Звіт батькам', ru: 'Отчёт родителям', en: 'Report for parents' },
    ],
    cta: { uk: 'Оплата скоро', ru: 'Оплата скоро', en: 'Payment soon' }, href: '/sign-up?role=student&plan=family',
  },
];

const fmt = (n: number) => n.toLocaleString('uk-UA').replace(/ /g, ' ');

export default function PricingSection({ firstQuiz = '/quiz/teen-life', start = 'teacher' }: { firstQuiz?: string; start?: 'teacher' | 'student' }) {
  const t = useT();
  const [who, setWho] = useState<'teacher' | 'student'>(start);
  const [yearly, setYearly] = useState(false);
  const plans = who === 'teacher' ? TEACHER : STUDENT;
  const mo = t({ uk: '/міс', ru: '/мес', en: '/mo' });
  const yr = t({ uk: '/рік', ru: '/год', en: '/yr' });

  return (
    <div className="pr">
      <div className="pr-switches">
        <div className="lp-switch" role="tablist" aria-label={t({ uk: 'Для кого', ru: 'Для кого', en: 'Who is it for' })}>
          <button role="tab" aria-selected={who === 'teacher'} className={who === 'teacher' ? 'is-on' : ''} onClick={() => setWho('teacher')}><Icon id="d-team" />{t({ uk: 'Вчителям', ru: 'Учителям', en: 'Teachers' })}</button>
          <button role="tab" aria-selected={who === 'student'} className={who === 'student' ? 'is-on' : ''} onClick={() => setWho('student')}><Icon id="d-kid" />{t({ uk: 'Учням і батькам', ru: 'Ученикам и родителям', en: 'Students and parents' })}</button>
        </div>
        <div className="lp-switch pr-bill" role="tablist" aria-label={t({ uk: 'Період оплати', ru: 'Период оплаты', en: 'Billing period' })}>
          <button role="tab" aria-selected={!yearly} className={!yearly ? 'is-on' : ''} onClick={() => setYearly(false)}>{t({ uk: 'Місяць', ru: 'Месяц', en: 'Monthly' })}</button>
          <button role="tab" aria-selected={yearly} className={yearly ? 'is-on' : ''} onClick={() => setYearly(true)}>{t({ uk: 'Рік', ru: 'Год', en: 'Yearly' })} <span className="pr-save">{t({ uk: 'вигідніше', ru: 'выгоднее', en: 'save' })}</span></button>
        </div>
      </div>

      <div className="mu-pricing">
        {plans.map((p) => {
          const showYear = yearly && p.year;
          const amount = p.month === 0 ? '0' : fmt(showYear ? p.year! : p.month);
          const href = p.month === 0 && who === 'student' ? firstQuiz : p.href;
          return (
            <div key={p.name.uk} className={`mu-price ${p.hit ? 'mu-price--featured' : ''}`} data-hit={t({ uk: 'Хіт', ru: 'Хит', en: 'Best pick' })}>
              <div className="mu-price__name"><Icon id={p.icon} />{t(p.name)}</div>
              <div className="mu-price__amount">{amount} ₴{p.month > 0 && <span>{showYear ? yr : mo}</span>}</div>
              <div className="mu-price__period">
                {showYear
                  ? t({ uk: `це ${fmt(Math.round(p.year! / 12))} ₴ на місяць`, ru: `это ${fmt(Math.round(p.year! / 12))} ₴ в месяц`, en: `that’s ${fmt(Math.round(p.year! / 12))} ₴ a month` })
                  : t(p.note)}
              </div>
              <ul className="mu-price__list">{p.items.map((it) => <li key={it.uk}>{t(it)}</li>)}</ul>
              <Link href={href} className={`mu-btn ${p.hit ? 'mu-btn--tomato' : ''}`}>
                {t(p.cta)}
                {p.hit && <span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="pr-rule">
        <Icon id="c-cat-glass" className="mu-ic pr-rule__ic" />
        <p>{t({
          uk: 'Якщо твій вчитель на платному тарифі, усе потрібне для навчання в нього для тебе безкоштовно.',
          ru: 'Если твой учитель на платном тарифе, всё нужное для учёбы у него для тебя бесплатно.',
          en: 'If your teacher is on a paid plan, everything you need for their lessons is free for you.',
        })}</p>
      </div>
    </div>
  );
}
