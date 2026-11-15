// Плашка над футером: Murly безкоштовний для нових користувачів
import Link from 'next/link';
import Icon from './Icon';
import { tr } from '@/lib/i18n-server';

export default function FreeNote() {
  const t = tr();
  return (
    <div className="mu-container">
      <div className="mu-freenote">
        <Icon id="d-spark" className="mu-freenote__ic" />
        <p>
          <b>{t({ uk: 'Murly безкоштовний для нових користувачів.', ru: 'Murly бесплатный для новых пользователей.', en: 'Murly is free for new users.' })}</b>{' '}
          {t({ uk: 'Користуйтеся матеріалами, підключайте своїх учнів або навчайтеся самі. Хто приєднається зараз, отримає −50% на будь-який тариф назавжди, коли ми запустимо оплату.', ru: 'Пользуйтесь материалами, подключайте своих учеников или учитесь сами. Кто присоединится сейчас, получит −50% на любой тариф навсегда, когда мы запустим оплату.', en: 'Use the materials, invite your students or learn on your own. Join now and get 50% off any plan forever once paid plans launch.' })}
        </p>
        <Link href="/sign-up" className="mu-btn mu-btn--lime">{t({ uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' })}</Link>
      </div>
    </div>
  );
}
