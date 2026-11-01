'use client';
// Тарифи Murly: вчителям і учням/батькам, місяць або рік. Оплата поки «скоро».
import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icon';
import { useT } from './LangProvider';
import type { T } from '@/lib/i18n';
import { PAID_ENABLED, PRICES } from '@/lib/plans';

type Plan = {
  more?: string;
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

const FREE_NOTE: T = { uk: 'Перший місяць безкоштовно', ru: 'Первый месяц бесплатно', en: 'First month free' };
const TEACHER: Plan[] = [
  {
    more: 'start', icon: 'd-smile', name: { uk: 'Старт', ru: 'Старт', en: 'Start' }, month: 0,
    note: { uk: 'Назавжди безкоштовно', ru: 'Навсегда бесплатно', en: 'Free forever' },
    items: [
      { uk: 'До 3 учнів', ru: 'До 3 учеников', en: 'Up to 3 students' },
      { uk: 'Розклад, домашка, словник учня', ru: 'Расписание, домашка, словарь ученика', en: 'Schedule, homework, student dictionary' },
      { uk: 'Частина уроків і activities', ru: 'Часть уроков и activities', en: 'Some lessons and activities' },
      { uk: 'Дані не зникають ніколи', ru: 'Данные не пропадают никогда', en: 'Your data never disappears' },
    ],
    cta: { uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' }, href: '/sign-up?role=teacher',
  },
  {
    more: 'pro', icon: 'd-rocket', name: { uk: 'Вчитель Pro', ru: 'Учитель Pro', en: 'Teacher Pro' }, month: PRICES.teacherPro, year: PRICES.teacherProYear, hit: true, paid: true,
    note: FREE_NOTE,
    items: [
      { uk: 'Скільки завгодно учнів', ru: 'Сколько угодно учеников', en: 'Any number of students' },
      { uk: 'Усі уроки, activities і тренажери', ru: 'Все уроки, activities и тренажёры', en: 'All lessons, activities and trainers' },
      { uk: 'Telegram-бот: оплати, уроки, домашка', ru: 'Telegram-бот: оплаты, уроки, домашка', en: 'Telegram bot: payments, lessons, homework' },
      { uk: 'Кімната уроку, дошка, групи', ru: 'Комната урока, доска, группы', en: 'Lesson room, whiteboard, groups' },
      { uk: 'Сторінка успіхів для батьків', ru: 'Страница успехов для родителей', en: 'Progress page for parents' },
    ],
    cta: { uk: 'Спробувати місяць безкоштовно', ru: 'Попробовать месяц бесплатно', en: 'Try a month free' }, href: '/sign-up?role=teacher&plan=pro',
  },
  {
    more: 'school', icon: 'd-team', name: { uk: 'Школа', ru: 'Школа', en: 'School' }, month: PRICES.school, year: PRICES.schoolYear, paid: true,
    note: { uk: `До 5 вчителів, далі +${PRICES.schoolExtraTeacher} ₴ за кожного`, ru: `До 5 учителей, дальше +${PRICES.schoolExtraTeacher} ₴ за каждого`, en: `Up to 5 teachers, then +${PRICES.schoolExtraTeacher} ₴ each` },
    items: [
      { uk: 'Pro для кожного вчителя', ru: 'Pro для каждого учителя', en: 'Pro for every teacher' },
      { uk: 'Спільний список учнів і груп', ru: 'Общий список учеников и групп', en: 'Shared students and groups' },
      { uk: 'Оплати й борги всієї школи', ru: 'Оплаты и долги всей школы', en: 'Payments for the whole school' },
      { uk: 'Перший місяць безкоштовно', ru: 'Первый месяц бесплатно', en: 'First month free' },
    ],
    cta: { uk: 'Написати нам', ru: 'Написать нам', en: 'Contact us' }, href: '/contact',
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
    more: 'plus', icon: 'd-rocket', name: { uk: 'Учень Плюс', ru: 'Ученик Плюс', en: 'Student Plus' }, month: PRICES.studentPlus, year: PRICES.studentPlusYear, hit: true, paid: true,
    note: FREE_NOTE,
    items: [
      { uk: 'Усі тренажери на 100 завдань', ru: 'Все тренажёры на 100 заданий', en: 'All 100-task trainers' },
      { uk: 'Усі пробні НМТ з розбором', ru: 'Все пробные НМТ с разбором', en: 'All NMT mock tests explained' },
      { uk: 'Історії, аудіо й серіали без обмежень', ru: 'Истории, аудио и сериалы без ограничений', en: 'Unlimited stories, audio and series' },
      { uk: 'Повторення слів за розкладом', ru: 'Повторение слов по расписанию', en: 'Spaced word review' },
    ],
    cta: { uk: 'Спробувати місяць безкоштовно', ru: 'Попробовать месяц бесплатно', en: 'Try a month free' }, href: '/sign-up?role=student&plan=plus',
  },
  {
    more: 'family', icon: 'd-heart', name: { uk: "Сім'я", ru: 'Семья', en: 'Family' }, month: PRICES.family, year: PRICES.familyYear, paid: true,
    note: { uk: 'Для 2-3 дітей', ru: 'Для 2-3 детей', en: 'For 2-3 kids' },
    items: [
      { uk: 'Усе з «Учень Плюс» для кожної дитини', ru: 'Всё из «Ученик Плюс» для каждого ребёнка', en: 'Student Plus for every child' },
      { uk: 'Окремий прогрес кожного', ru: 'Отдельный прогресс каждого', en: 'Separate progress for each' },
      { uk: 'Звіт батькам', ru: 'Отчёт родителям', en: 'Report for parents' },
    ],
    cta: { uk: 'Спробувати місяць безкоштовно', ru: 'Попробовать месяц бесплатно', en: 'Try a month free' }, href: '/sign-up?role=student&plan=family',
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
          <button role="tab" aria-selected={yearly} className={yearly ? 'is-on' : ''} onClick={() => setYearly(true)}>{t({ uk: 'Рік', ru: 'Год', en: 'Yearly' })} <span className="pr-save">{t({ uk: 'до −33%', ru: 'до −33%', en: 'up to −33%' })}</span></button>
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
              <div className={`mu-price__amount ${showYear ? 'is-year' : ''}`}>{amount} ₴{p.month > 0 && <span>{showYear ? yr : mo}</span>}</div>
              {showYear && <div className="mu-price__save"><s>{fmt(p.month * 12)} ₴</s><b>−{Math.round((1 - p.year! / (p.month * 12)) * 100)}%</b></div>}
              <div className="mu-price__period">
                {showYear
                  ? t({ uk: `це ${fmt(Math.round(p.year! / 12))} ₴ на місяць, економія ${fmt(p.month * 12 - p.year!)} ₴`, ru: `это ${fmt(Math.round(p.year! / 12))} ₴ в месяц, экономия ${fmt(p.month * 12 - p.year!)} ₴`, en: `that’s ${fmt(Math.round(p.year! / 12))} ₴ a month, you save ${fmt(p.month * 12 - p.year!)} ₴` })
                  : p.year ? <>{t(p.note)}<br /><span className="mu-price__hint">{t({ uk: `За рік: ${fmt(p.year)} ₴, економія ${fmt(p.month * 12 - p.year)} ₴`, ru: `За год: ${fmt(p.year)} ₴, экономия ${fmt(p.month * 12 - p.year)} ₴`, en: `Yearly: ${fmt(p.year)} ₴, save ${fmt(p.month * 12 - p.year)} ₴` })}</span></> : t(p.note)}
              </div>
              <ul className="mu-price__list">{p.items.map((it) => <li key={it.uk}>{t(it)}</li>)}</ul>
              {p.more && <Link href={`/pricing/${p.more}`} className="mu-price__more">{t({ uk: 'Детальніше про тариф', ru: 'Подробнее о тарифе', en: 'More about this plan' })}<Icon id="e-arrow" /></Link>}
              <Link href={href} className={`mu-btn ${p.hit ? 'mu-btn--tomato' : ''}`}>
                {p.paid && !PAID_ENABLED ? t({ uk: 'Зараз безкоштовно', ru: 'Сейчас бесплатно', en: 'Free right now' }) : t(p.cta)}
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
