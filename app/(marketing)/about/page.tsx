import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Stickers from '@/components/Stickers';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Marquee from '@/components/Marquee';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';
import Kit from '@/components/Kit';

export function generateMetadata(): Metadata {
  const t = tr();
  return {
    title: t({ uk: 'Про Murly: платформа англійської для дітей, підлітків і дорослих', ru: 'О Murly: платформа английского для детей, подростков и взрослых', en: 'About Murly: an English platform for kids, teens and adults' }),
    description: t({
      uk: 'Murly: кабінети вчителя й учня, готові уроки, домашка-гра, граматика простими словами і підготовка до НМТ.',
      ru: 'Murly: кабинеты учителя и ученика, готовые уроки, домашка-игра, грамматика простыми словами и подготовка к НМТ.',
      en: 'Murly: teacher and student dashboards, ready lessons, homework as a game, simple grammar and NMT prep.',
    }),
  };
}

// Чотири правила Murly: коротко, без абзаців
const PRINCIPLES: { icon: string; title: T; pts: T[] }[] = [
  { icon: 'd-team', title: { uk: 'З учителем і самому', ru: 'С учителем и самому', en: 'With a teacher or alone' }, pts: [
    { uk: 'Кабінет учителя', ru: 'Кабинет учителя', en: 'Teacher dashboard' }, { uk: 'Кабінет учня', ru: 'Кабинет ученика', en: 'Student dashboard' }, { uk: 'Багато відкрито без реєстрації', ru: 'Многое открыто без регистрации', en: 'Lots open without sign-up' }] },
  { icon: 'e-trophy', title: { uk: 'Як гра', ru: 'Как игра', en: 'Like a game' }, pts: [
    { uk: 'XP і рівні', ru: 'XP и уровни', en: 'XP and levels' }, { uk: 'Монетки й 3D-містечко', ru: 'Монетки и 3D-городок', en: 'Coins and a 3D town' }, { uk: 'Уроки за іграми', ru: 'Уроки по играм', en: 'Game-based lessons' }] },
  { icon: 'e-abc', title: { uk: 'Коротко і зрозуміло', ru: 'Коротко и понятно', en: 'Short and clear' }, pts: [
    { uk: 'Граматика простими словами', ru: 'Грамматика простыми словами', en: 'Grammar made simple' }, { uk: 'Пояснення кожної помилки', ru: 'Объяснение каждой ошибки', en: 'Every mistake explained' }, { uk: 'Без зубріння', ru: 'Без зубрёжки', en: 'No cramming' }] },
  { icon: 'd-heart', title: { uk: 'Для всіх віків', ru: 'Для всех возрастов', en: 'For all ages' }, pts: [
    { uk: 'Малюки й діти', ru: 'Малыши и дети', en: 'Little ones and kids' }, { uk: 'Підлітки й НМТ', ru: 'Подростки и НМТ', en: 'Teens and NMT' }, { uk: 'Дорослі', ru: 'Взрослые', en: 'Adults' }] },
];

export default function AboutPage() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <section className="mu-page-hero" data-stickers="6">
        <div className="mu-container">
          <Kit id="st-cat-box" className="kit-hero" />
          <h1>{t({ uk: 'Англійська, яку', ru: 'Английский, который', en: 'English you' })} <em>{t({ uk: 'хочеться', ru: 'хочется', en: 'want' })}</em> {t({ uk: 'вчити.', ru: 'учить.', en: 'to learn.' })}</h1>
          <Link href="/sign-up" className="mu-btn mu-btn--lime mu-btn--lg">
            {t({ uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span>
          </Link>
        </div>
      </section>

      <Marquee items={[t({ uk: 'Уроки', ru: 'Уроки', en: 'Lessons' }), t({ uk: 'Ігри', ru: 'Игры', en: 'Games' }), t({ uk: 'Граматика', ru: 'Грамматика', en: 'Grammar' }), 'НМТ', 'Murly']} />

      <section className="mu-section" data-stickers="4">
        <div className="mu-container">
          <div className="mu-section__head">
            <span className="mu-section__eyebrow"><Icon id="d-bulb" />{t({ uk: 'Як ми думаємо', ru: 'Как мы думаем', en: 'How we think' })}</span>
            <h2 className="mu-section__title">{t({ uk: 'Чотири', ru: 'Четыре', en: 'Four' })} <em>{t({ uk: 'правила.', ru: 'правила.', en: 'rules.' })}</em></h2>
          </div>
          <div className="mu-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title.uk} className="mu-card">
                <div className="mu-card__icon"><Icon id={p.icon} /></div>
                <h3 className="mu-card__title">{t(p.title)}</h3>
                <ul className="mu-ticks">{p.pts.map((x) => <li key={x.uk}>{t(x)}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop: 0 }}>
        <div className="mu-container">
          <div className="mu-cta-box">
            <Icon id="c-cat-glass" className="mu-ic mu-ic--cta" />
            <h2>{t({ uk: 'Почни', ru: 'Начни', en: 'Start' })} <em>{t({ uk: 'безкоштовно.', ru: 'бесплатно.', en: 'for free.' })}</em></h2>
            <div className="mu-hero__cta" style={{ justifyContent: 'center' }}>
              <Link href="/sign-up" className="mu-btn mu-btn--lime mu-btn--lg">{t({ uk: 'Створити акаунт', ru: 'Создать аккаунт', en: 'Create an account' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
              <Link href="/contact" className="mu-textlink">{t({ uk: 'Написати нам', ru: 'Написать нам', en: 'Contact us' })}</Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <Stickers />
    </>
  );
}
