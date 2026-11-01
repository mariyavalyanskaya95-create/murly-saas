// Плашка «Перший місяць безкоштовно, без картки» (головна і тарифи)
import Link from 'next/link';
import Icon from './Icon';
import { tr } from '@/lib/i18n-server';

export default function FreeMonthBanner({ href = '/sign-up?role=teacher' }: { href?: string }) {
  const t = tr();
  return (
    <div className="mu-free">
      <Icon id="d-spark" className="mu-free__ic" />
      <div className="mu-free__txt">
        <b>{t({ uk: 'Перший місяць безкоштовно, без картки', ru: 'Первый месяц бесплатно, без карты', en: 'First month free, no card needed' })}</b>
        <span>{t({ uk: 'Усі можливості Pro на 30 днів. Потім сам вирішиш, чи продовжувати.', ru: 'Все возможности Pro на 30 дней. Потом сам решишь, продолжать ли.', en: 'Everything in Pro for 30 days. Then you decide whether to continue.' })}</span>
      </div>
      <Link href={href} className="mu-btn mu-btn--ink">{t({ uk: 'Спробувати', ru: 'Попробовать', en: 'Try it' })}<span className="mu-btn__arrow"><Icon id="e-arrow" /></span></Link>
    </div>
  );
}
