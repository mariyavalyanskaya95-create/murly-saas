import Link from 'next/link';
import Icon from './Icon';

// Тарифи Murly: один блок для головної і сторінки /pricing
export default function PricingSection({ firstQuiz = '/quiz/teen-life' }: { firstQuiz?: string }) {
  return (
    <div className="mu-pricing">
      <div className="mu-price">
        <div className="mu-price__name"><Icon id="d-smile" />Free</div>
        <div className="mu-price__amount">0 ₴</div>
        <div className="mu-price__period">Назавжди</div>
        <ul className="mu-price__list">
          <li>1 квіз на день</li>
          <li>Streak і базова статистика</li>
          <li>AI пояснення без деталей</li>
        </ul>
        <Link href={firstQuiz} className="mu-btn">Спробувати</Link>
      </div>
      <div className="mu-price mu-price--featured">
        <div className="mu-price__name"><Icon id="d-rocket" />Pro</div>
        <div className="mu-price__amount">149 ₴<span>/міс</span></div>
        <div className="mu-price__period">або 1 490 ₴ на рік (-16%)</div>
        <ul className="mu-price__list">
          <li>Усі квізи та mock-тести</li>
          <li>AI розбирає кожну помилку детально</li>
          <li>Банк завдань НМТ формату</li>
          <li>Щотижневий прогрес</li>
        </ul>
        <Link href="/sign-up?plan=pro" className="mu-btn mu-btn--tomato">
          Обрати Pro<span className="mu-btn__arrow mu-btn__arrow--lime"><Icon id="e-arrow" /></span>
        </Link>
      </div>
      <div className="mu-price">
        <div className="mu-price__name"><Icon id="d-team" />Tutor</div>
        <div className="mu-price__amount">490 ₴<span>/міс</span></div>
        <div className="mu-price__period">До 20 учнів</div>
        <ul className="mu-price__list">
          <li>Усе з Pro</li>
          <li>Кабінет для ведення груп</li>
          <li>Домашка в один клік</li>
          <li>Автозвіт батькам щотижня</li>
        </ul>
        <Link href="/for-teachers" className="mu-btn">Для репетиторів</Link>
      </div>
    </div>
  );
}
