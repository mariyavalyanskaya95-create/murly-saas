import Link from 'next/link';
import Icon from './Icon';
import { tr } from '@/lib/i18n-server';

// Тарифи Murly: один блок для головної і сторінки /pricing
export default function PricingSection({ firstQuiz = '/quiz/teen-life' }: { firstQuiz?: string }) {
  const t = tr();
  return (
    <div className="mu-pricing">
      <div className="mu-price">
        <div className="mu-price__name"><Icon id="d-smile" />Free</div>
        <div className="mu-price__amount">0 ₴</div>
        <div className="mu-price__period">{t({ uk: 'Назавжди', ru: 'Навсегда', en: 'Forever' })}</div>
        <ul className="mu-price__list">
          <li>{t({ uk: '1 квіз на день', ru: '1 квиз в день', en: '1 quiz a day' })}</li>
          <li>{t({ uk: 'Streak і базова статистика', ru: 'Streak и базовая статистика', en: 'Streak and basic stats' })}</li>
          <li>{t({ uk: 'AI пояснення без деталей', ru: 'AI-объяснения без деталей', en: 'AI explanations, no details' })}</li>
        </ul>
        <Link href={firstQuiz} className="mu-btn">{t({ uk: 'Спробувати', ru: 'Попробовать', en: 'Try it' })}</Link>
      </div>
      <div className="mu-price mu-price--featured">
        <div className="mu-price__name"><Icon id="d-rocket" />Pro</div>
        <div className="mu-price__amount">149 ₴<span>{t({ uk: '/міс', ru: '/мес', en: '/mo' })}</span></div>
        <div className="mu-price__period">{t({ uk: 'або 1 490 ₴ на рік (-16%)', ru: 'или 1 490 ₴ в год (-16%)', en: 'or 1 490 ₴ a year (-16%)' })}</div>
        <ul className="mu-price__list">
          <li>{t({ uk: 'Усі квізи та mock-тести', ru: 'Все квизы и mock-тесты', en: 'All quizzes and mock tests' })}</li>
          <li>{t({ uk: 'AI розбирає кожну помилку детально', ru: 'AI подробно разбирает каждую ошибку', en: 'AI explains every mistake in detail' })}</li>
          <li>{t({ uk: 'Банк завдань НМТ формату', ru: 'Банк заданий в формате НМТ', en: 'NMT-style task bank' })}</li>
          <li>{t({ uk: 'Щотижневий прогрес', ru: 'Еженедельный прогресс', en: 'Weekly progress' })}</li>
        </ul>
        <Link href="/sign-up?plan=pro" className="mu-btn mu-btn--tomato">
          {t({ uk: 'Обрати Pro', ru: 'Выбрать Pro', en: 'Choose Pro' })}<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
        </Link>
      </div>
      <div className="mu-price">
        <div className="mu-price__name"><Icon id="d-team" />Tutor</div>
        <div className="mu-price__amount">490 ₴<span>{t({ uk: '/міс', ru: '/мес', en: '/mo' })}</span></div>
        <div className="mu-price__period">{t({ uk: 'До 20 учнів', ru: 'До 20 учеников', en: 'Up to 20 students' })}</div>
        <ul className="mu-price__list">
          <li>{t({ uk: 'Усе з Pro', ru: 'Всё из Pro', en: 'Everything in Pro' })}</li>
          <li>{t({ uk: 'Кабінет для ведення груп', ru: 'Кабинет для ведения групп', en: 'Dashboard for managing groups' })}</li>
          <li>{t({ uk: 'Домашка в один клік', ru: 'Домашка в один клик', en: 'One-click homework' })}</li>
          <li>{t({ uk: 'Автозвіт батькам щотижня', ru: 'Автоотчёт родителям каждую неделю', en: 'Weekly auto-report for parents' })}</li>
        </ul>
        <Link href="/for-teachers" className="mu-btn">{t({ uk: 'Для репетиторів', ru: 'Для репетиторов', en: 'For tutors' })}</Link>
      </div>
    </div>
  );
}
