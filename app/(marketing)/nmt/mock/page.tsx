import RelatedPosts from '@/components/blog/RelatedPosts';
import Link from 'next/link';
import { alt } from '@/lib/seo';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import { MOCKS, SOON, FREE } from '@/lib/mock';
import { PAID_ENABLED } from '@/lib/plans';
import { tr } from '@/lib/i18n-server';
import SeoNote from '@/components/SeoNote';

import HeroTip from '@/components/HeroTip';
export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Пробний НМТ з англійської онлайн з поясненнями | Murly', ru: 'Пробный НМТ по английскому онлайн с объяснениями | Murly', en: 'NMT English mock tests online with explanations | Murly' }),
    description: t({ uk: `${MOCKS.length} пробних НМТ з англійської у форматі 2026: 32 завдання, таймер і розбір кожної відповіді. Варіанти 1 і 2 безкоштовно, без реєстрації.`, ru: `${MOCKS.length} пробных НМТ по английскому в формате 2026: 32 задания, таймер и разбор каждого ответа. Варианты 1 и 2 бесплатно, без регистрации.`, en: `${MOCKS.length} NMT English mock tests in the 2026 format: 32 questions, a timer and every answer explained. Tests 1 and 2 are free, no sign-up.` }),
    alternates: alt('/nmt/mock'),
  };
}

export default function MockListPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="il-cat-exam" className="kit-hero" />
          <h1>{t({ uk: 'Як справжній НМТ,', ru: 'Как настоящий НМТ,', en: 'Like the real NMT,' })} <em>{t({ uk: 'але з поясненнями.', ru: 'но с объяснениями.', en: 'but with explanations.' })}</em></h1>
          <HeroTip>{t({ uk: '32 завдання, 6 частин, як на іспиті. Біля кожної відповіді кнопка «Чому так?»: розбираємо, чому правильний саме цей варіант і де пастки.', ru: '32 задания, 6 частей, как на экзамене. Возле каждого ответа кнопка «Почему так?»: разбираем, почему правильный именно этот вариант и где ловушки.', en: '32 questions in 6 parts, like the real exam. Every answer has a «Why?» button that explains the right choice and the traps.' })}</HeroTip>
          <SeoNote free={PAID_ENABLED ? { uk: 'Варіанти 1 і 2 безкоштовно, без реєстрації', ru: 'Варианты 1 и 2 бесплатно, без регистрации', en: 'Tests 1 and 2 are free, no sign-up' } : { uk: 'Варіанти 1 і 2 безкоштовні завжди, зараз відкриті всі. Без реєстрації', ru: 'Варианты 1 и 2 бесплатны всегда, сейчас открыты все. Без регистрации', en: 'Tests 1 and 2 are always free, all tests are open for now. No sign-up' }} sell={{ text: { uk: 'План підготовки на папері:', ru: 'План подготовки на бумаге:', en: 'A prep plan on paper:' }, links: [{ href: '/shop/nmt-start', label: { uk: 'Старт до НМТ: 3 в 1', ru: 'Старт к НМТ: 3 в 1', en: 'NMT starter: 3 in 1' } }, { href: '/shop/nmt-checklist', label: { uk: 'Чек-лист підготовки до НМТ', ru: 'Чек-лист подготовки к НМТ', en: 'NMT prep checklist' } }] }} />
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container mk-vars">
          {MOCKS.map((m) => (
            <Link key={m.id} href={`/nmt/mock/${m.id}`} className="mk-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="mk-task__tag">{m.level}</span>{' '}<span className={`mk-free ${FREE.includes(m.id) || !PAID_ENABLED ? 'is-free' : ''}`}>{FREE.includes(m.id) ? t({ uk: 'Безкоштовно', ru: 'Бесплатно', en: 'Free' }) : PAID_ENABLED ? t({ uk: 'Повний пакет', ru: 'Полный пакет', en: 'Full pack' }) : t({ uk: 'Зараз безкоштовно', ru: 'Сейчас бесплатно', en: 'Free for now' })}</span>
              <h3 style={{ margin: '10px 0 6px' }}>{t({ uk: `Варіант ${m.id}`, ru: `Вариант ${m.id}`, en: `Test ${m.id}` })}</h3>
              <p className="muted">{t({ uk: '32 завдання · близько 60 хвилин', ru: '32 задания · около 60 минут', en: '32 questions · about 60 minutes' })}</p>
              <span className="mu-btn mu-btn--lime">{t({ uk: 'Почати', ru: 'Начать', en: 'Start' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></span>
            </Link>
          ))}
          {Array.from({ length: SOON }, (_, i) => (
            <div key={i} className="mk-card" style={{ opacity: 0.6 }}>
              <span className="mk-task__tag">{t({ uk: 'Скоро', ru: 'Скоро', en: 'Soon' })}</span>
              <h3 style={{ margin: '10px 0 6px' }}>{t({ uk: `Варіант ${MOCKS.length + i + 1}`, ru: `Вариант ${MOCKS.length + i + 1}`, en: `Test ${MOCKS.length + i + 1}` })}</h3>
              <p className="muted">{t({ uk: 'Готуємо нові тексти й оголошення', ru: 'Готовим новые тексты и объявления', en: 'New texts and notices are on the way' })}</p>
            </div>
          ))}
        </div>
      </section>
      <RelatedPosts slugs={['nmt-anglijska-za-3-misyatsi']} />
      <SiteFooter />
      <Stickers />
    </>
  );
}
