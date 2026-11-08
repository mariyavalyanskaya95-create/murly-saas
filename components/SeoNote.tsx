// Короткий рядок під заголовком безкоштовної сторінки: «безкоштовно, без реєстрації» і одне посилання на матеріал для друку
import Link from 'next/link';
import Icon from '@/components/Icon';
import { tr } from '@/lib/i18n-server';
import type { T } from '@/lib/i18n';

type Sell = { text: T; links: { href: string; label: T }[] };

export default function SeoNote({ free, sell }: { free?: T; sell?: Sell }) {
  const t = tr();
  if (!free && !sell) return null;
  return (
    <div className="mu-seonote">
      {free && <p className="mu-seonote__free"><Icon id="d-spark" />{t(free)}</p>}
      {sell && (
        <p className="mu-seonote__sell">
          {t(sell.text)}{' '}
          {sell.links.map((l, i) => (
            <span key={l.href}>{i > 0 && ' · '}<Link href={l.href}>{t(l.label)}</Link></span>
          ))}
        </p>
      )}
    </div>
  );
}
