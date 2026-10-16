import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import Kit from '@/components/Kit';
import Icon from '@/components/Icon';
import { tr } from '@/lib/i18n-server';

export default function NotFound() {
  const t = tr();
  return (
    <>
      <SiteNav />
      <main className="mu-container nf">
        <Kit id="st-cat-shock" />
        <h1>{t({ uk: 'Ой! Такої сторінки немає.', ru: 'Ой! Такой страницы нет.', en: 'Oops! This page doesn’t exist.' })}</h1>
        <p className="mu-section__lead">{t({ uk: 'Можливо, котик її сховав. Повернімося на головну.', ru: 'Возможно, котик её спрятал. Вернёмся на главную.', en: 'Maybe the cat hid it. Let’s go back home.' })}</p>
        <p style={{ marginTop: 24 }}><Link href="/" className="mu-btn mu-btn--lime">{t({ uk: 'На головну', ru: 'На главную', en: 'Home' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link></p>
      </main>
      <SiteFooter />
    </>
  );
}
