// Детальна сторінка тарифу: для кого, що унікального, як працює бот, питання
import Link from 'next/link';
import { alt } from '@/lib/seo';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Kit from '@/components/Kit';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import FreeMonthBanner from '@/components/FreeMonthBanner';
import { tr } from '@/lib/i18n-server';
import { PAID_ENABLED } from '@/lib/plans';
import { PLAN_PAGES, planPage } from '@/lib/plan-pages';

export function generateStaticParams() { return PLAN_PAGES.map((p) => ({ plan: p.slug })); }

export function generateMetadata({ params }: { params: { plan: string } }): Metadata {
  const p = planPage(params.plan);
  if (!p) return {};
  const t = tr();
  return {
    title: `${t(p.name)}: ${p.price.month ? `${p.price.month} ₴` : '0 ₴'} | Murly`,
    description: t(p.lead),
    alternates: alt(`/pricing/${p.slug}`),
  };
}

const fmt = (n: number) => n.toLocaleString('uk-UA');

// Макет чату з ботом: показуємо, як виглядає облік у Telegram
function BotMock({ kind }: { kind: 'teacher' | 'parent' }) {
  const t = tr();
  const msgs = kind === 'teacher'
    ? [
        { me: false, text: t({ uk: 'Доброго ранку! Ваш день:\n10:00 Аня: Past Simple\n16:30 Ігор: НМТ, варіант 4\n\nНа перевірку: 2\nЧекають оплати: 1 (Полина)', ru: 'Доброе утро! Ваш день:\n10:00 Аня: Past Simple\n16:30 Игорь: НМТ, вариант 4\n\nНа проверку: 2\nЖдут оплаты: 1 (Полина)', en: 'Good morning! Your day:\n10:00 Anya: Past Simple\n16:30 Ihor: NMT, mock 4\n\nTo review: 2\nAwaiting payment: 1 (Polina)' }) },
        { me: true, text: t({ uk: 'Оплата', ru: 'Оплата', en: 'Payment' }) },
        { me: false, text: t({ uk: 'Полина: 4 уроки, 1 600 ₴ записано.\nБаланс: +3 уроки', ru: 'Полина: 4 урока, 1 600 ₴ записано.\nБаланс: +3 урока', en: 'Polina: 4 lessons, 1,600 ₴ recorded.\nBalance: +3 lessons' }) },
      ]
    : [
        { me: false, text: t({ uk: 'Нова домашка від вчителя: «Animals, 20 слів». Здати до п’ятниці.', ru: 'Новая домашка от учителя: «Animals, 20 слов». Сдать до пятницы.', en: 'New homework from the teacher: “Animals, 20 words”. Due Friday.' }) },
        { me: true, text: t({ uk: 'Успіхи', ru: 'Успехи', en: 'Progress' }) },
        { me: false, text: t({ uk: 'За тиждень: 5 вправ, 34 нових слова, 120 монеток.', ru: 'За неделю: 5 упражнений, 34 новых слова, 120 монеток.', en: 'This week: 5 exercises, 34 new words, 120 coins.' }) },
      ];
  const keys = kind === 'teacher'
    ? [t({ uk: 'Відмітити урок', ru: 'Отметить урок', en: 'Mark lesson' }), t({ uk: 'Оплата', ru: 'Оплата', en: 'Payment' }), t({ uk: 'Борги', ru: 'Долги', en: 'Debts' }), t({ uk: 'Перевірка', ru: 'Проверка', en: 'Review' })]
    : [t({ uk: 'Успіхи', ru: 'Успехи', en: 'Progress' }), t({ uk: 'Монетки', ru: 'Монетки', en: 'Coins' }), t({ uk: 'Оплата', ru: 'Оплата', en: 'Payment' }), t({ uk: 'Домашка', ru: 'Домашка', en: 'Homework' })];
  return (
    <div className="pl-bot" aria-hidden="true">
      <div className="pl-bot__head"><span className="pl-bot__ava"><Kit id="st-cat-blep" /></span><b>Murly</b><small>bot</small></div>
      <div className="pl-bot__chat">
        {msgs.map((m, i) => <p key={i} className={`pl-bot__msg ${m.me ? 'is-me' : ''}`}>{m.text}</p>)}
      </div>
      <div className="pl-bot__keys">{keys.map((k) => <span key={k}>{k}</span>)}</div>
    </div>
  );
}

export default function PlanDetail({ params }: { params: { plan: string } }) {
  const p = planPage(params.plan);
  if (!p) notFound();
  const t = tr();
  const ctaLabel = p.paid && !PAID_ENABLED && p.slug !== 'school' ? t({ uk: 'Зараз безкоштовно', ru: 'Сейчас бесплатно', en: 'Free right now' }) : t(p.cta.label);
  const others = PLAN_PAGES.filter((x) => x.slug !== p.slug);
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id={p.kit} className="kit-hero" />
          <Link href="/pricing" className="mu-section__eyebrow pl-back"><Icon id={p.icon} />{t({ uk: 'Тариф', ru: 'Тариф', en: 'Plan' })} «{t(p.name)}»</Link>
          <h1>{t(p.title)} <em>{t(p.em)}</em></h1>
          <p>{t(p.lead)}</p>
          <div className="pl-price">
            <div className="pl-price__main"><b>{fmt(p.price.month)} ₴</b>{p.price.month > 0 && <span>{t({ uk: '/міс', ru: '/мес', en: '/mo' })}</span>}</div>
            {p.price.year ? (
              <div className="pl-price__year">
                <span>{t({ uk: 'або', ru: 'или', en: 'or' })} <b>{fmt(p.price.year)} ₴ {t({ uk: 'за рік', ru: 'за год', en: 'a year' })}</b></span>
                <s>{fmt(p.price.month * 12)} ₴</s>
                <em>−{Math.round((1 - p.price.year / (p.price.month * 12)) * 100)}%, {t({ uk: 'економія', ru: 'экономия', en: 'save' })} {fmt(p.price.month * 12 - p.price.year)} ₴</em>
              </div>
            ) : null}
            <small>{t(p.note)}</small>
          </div>
          <div className="mu-hero__cta">
            <Link href={p.cta.href} className="mu-btn mu-btn--ink mu-btn--lg">{ctaLabel}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
            <Link href="/pricing" className="mu-btn mu-btn--lg">{t({ uk: 'Усі тарифи', ru: 'Все тарифы', en: 'All plans' })}</Link>
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 24 }}>
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-smile" />{t({ uk: 'Для кого', ru: 'Для кого', en: 'Who it’s for' })}</span>
          </div>
          <ul className="pl-who">{p.who.map((w) => <li key={w.uk}><Icon id="c-paw" />{t(w)}</li>)}</ul>
        </div>
      </section>

      <section className="mu-section">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-spark" />{t({ uk: 'Чому Murly', ru: 'Почему Murly', en: 'Why Murly' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Що робить цей тариф', ru: 'Что делает этот тариф', en: 'What makes this plan' })} <em>{t({ uk: 'особливим.', ru: 'особенным.', en: 'special.' })}</em></h2>
          </div>
          <div className="pl-features">
            {p.unique.map((f) => (
              <article key={f.title.uk} className="pl-feature">
                <span className="pl-feature__ic"><Icon id={f.icon} /></span>
                <h3>{t(f.title)}</h3>
                <p>{t(f.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {p.blocks.map((b, i) => {
        const isBot = p.bot && b.title.uk.includes('Telegram');
        return (
          <section key={i} className="mu-section">
            <div className={`mu-container pl-block ${isBot ? 'pl-block--bot' : ''}`}>
              <div className="pl-block__text">
                <h2 className="mu-section__title">{t(b.title)}</h2>
                <p className="pl-block__lead">{t(b.text)}</p>
                {b.points.length > 0 && <ul className="pl-points">{b.points.map((x) => <li key={x.uk}>{t(x)}</li>)}</ul>}
              </div>
              {isBot && p.bot && <BotMock kind={p.bot} />}
            </div>
          </section>
        );
      })}

      {p.paid && (
        <section className="mu-section" style={{ paddingTop: 0 }}>
          <div className="mu-container"><FreeMonthBanner href={p.cta.href} /></div>
        </section>
      )}

      <section className="mu-section">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />FAQ</span>
            <h2 className="mu-section__title">{t({ uk: 'Часті', ru: 'Частые', en: 'Common' })} <em>{t({ uk: 'питання.', ru: 'вопросы.', en: 'questions.' })}</em></h2>
          </div>
          <Faq items={p.faq.map((f) => ({ q: t(f.q), a: t(f.a) }))} />
        </div>
      </section>

      <section className="mu-section">
        <div className="mu-container">
          <div className="mu-section__head">
            <h2 className="mu-section__title">{t({ uk: 'Інші', ru: 'Другие', en: 'Other' })} <em>{t({ uk: 'тарифи.', ru: 'тарифы.', en: 'plans.' })}</em></h2>
          </div>
          <div className="pl-others">
            {others.map((o) => (
              <Link key={o.slug} href={`/pricing/${o.slug}`} className="pl-other">
                <Icon id={o.icon} /><b>{t(o.name)}</b><span>{o.price.month ? `${fmt(o.price.month)} ₴${t({ uk: '/міс', ru: '/мес', en: '/mo' })}` : t({ uk: 'безкоштовно', ru: 'бесплатно', en: 'free' })}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
