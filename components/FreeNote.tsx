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
          {t({ uk: 'Користуйтеся матеріалами, підключайте своїх учнів або навчайтеся самі.', ru: 'Пользуйтесь материалами, подключайте своих учеников или учитесь сами.', en: 'Use the materials, invite your students or learn on your own.' })}
        </p>
        <Link href="/sign-up" className="mu-btn mu-btn--lime">{t({ uk: 'Почати безкоштовно', ru: 'Начать бесплатно', en: 'Start for free' })}</Link>
      </div>
    </div>
  );
}
