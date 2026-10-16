import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import VerbPlan from '@/components/games/VerbPlan';
import { CORE_VERBS } from '@/lib/irregular-verbs';
import { localizeVerbs } from '@/lib/content/verbs';
import { verbPlan } from '@/lib/verb-plan';
import { tr } from '@/lib/i18n-server';

// Бонус до PDF «Неправильні дієслова за 30 днів»: ігри по днях плану (сюди веде QR-код)
export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Неправильні дієслова за 30 днів: ігри на кожен день', ru: 'Неправильные глаголы за 30 дней: игры на каждый день', en: 'Irregular verbs in 30 days: a game for every day' }),
    description: t({ uk: 'План на 30 днів: 3-4 неправильні дієслова на день, повторення кожен 5-й день, квіз, пари й анаграми.', ru: 'План на 30 дней: 3-4 неправильных глагола в день, повторение каждый 5-й день, квиз, пары и анаграммы.', en: 'A 30-day plan: 3-4 irregular verbs a day, review every 5th day, with quiz, pairs and anagrams.' }),
    alternates: { canonical: '/bonus/verbs-30' },
  };
}

export default function Verbs30Page() {
  const t = tr();
  const days = verbPlan(localizeVerbs(CORE_VERBS, t.lang));
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" style={{ paddingBottom: 16 }} data-stickers="6">
        <div className="mu-container">
          <Kit id="st-cat-cool" className="kit-hero" />
          <span className="mu-section__eyebrow"><Icon id="e-book" />{t({ uk: 'Бонус до PDF', ru: 'Бонус к PDF', en: 'PDF bonus' })}</span>
          <h1>{t({ uk: 'Дієслова', ru: 'Глаголы', en: 'Irregular verbs' })} <em>{t({ uk: 'за 30 днів.', ru: 'за 30 дней.', en: 'in 30 days.' })}</em></h1>
          <p>{t({ uk: 'Обери день з плану і грай саме з його дієсловами. Лаймові дні це повторення. Прогрес зберігається в цьому браузері.', ru: 'Выбери день из плана и играй именно с его глаголами. Лаймовые дни это повторение. Прогресс сохраняется в этом браузере.', en: 'Pick a day from the plan and play with its verbs. Lime days are review days. Progress is saved in this browser.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container"><VerbPlan days={days} /></div>
      </section>
      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container" style={{ textAlign: 'center' }}>
          <Link href="/irregular-verbs" className="mu-btn">{t({ uk: 'Уся таблиця дієслів', ru: 'Вся таблица глаголов', en: 'Full verb table' })}</Link>
        </div>
      </section>
      <SiteFooter />
      <Stickers />
    </>
  );
}
