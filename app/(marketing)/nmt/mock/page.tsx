import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import { MOCKS, SOON } from '@/lib/mock';
import { tr } from '@/lib/i18n-server';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Пробний НМТ з англійської з поясненнями', ru: 'Пробный НМТ по английскому с объяснениями', en: 'NMT English mock test with explanations' }),
    description: t({ uk: '32 завдання у форматі НМТ-2026: оголошення, читання, пропуски. Біля кожної відповіді кнопка «Чому так?».', ru: '32 задания в формате НМТ-2026: объявления, чтение, пропуски. Возле каждого ответа кнопка «Почему так?».', en: '32 questions in the NMT 2026 format: notices, reading, gap fills. Every answer has a «Why?» button.' }),
    alternates: { canonical: '/nmt/mock' },
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
          <span className="mu-section__eyebrow"><Icon id="e-trophy" />{t({ uk: 'Пробний НМТ', ru: 'Пробный НМТ', en: 'Mock NMT' })}</span>
          <h1>{t({ uk: 'Як справжній НМТ,', ru: 'Как настоящий НМТ,', en: 'Like the real NMT,' })} <em>{t({ uk: 'але з поясненнями.', ru: 'но с объяснениями.', en: 'but with explanations.' })}</em></h1>
          <p>{t({ uk: '32 завдання, 6 частин, як на іспиті. Біля кожної відповіді кнопка «Чому так?»: розбираємо, чому правильний саме цей варіант і де пастки.', ru: '32 задания, 6 частей, как на экзамене. Возле каждого ответа кнопка «Почему так?»: разбираем, почему правильный именно этот вариант и где ловушки.', en: '32 questions in 6 parts, like the real exam. Every answer has a «Why?» button that explains the right choice and the traps.' })}</p>
        </div>
      </section>
      <section className="mu-section" style={{ paddingTop: 8 }}>
        <div className="mu-container mk-vars">
          {MOCKS.map((m) => (
            <Link key={m.id} href={`/nmt/mock/${m.id}`} className="mk-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="mk-task__tag">{m.level}</span>
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
      <SiteFooter />
      <Stickers />
    </>
  );
}
