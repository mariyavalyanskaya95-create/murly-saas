import Link from 'next/link';
import Icon from './Icon';

export default function SiteFooter() {
  return (
    <footer className="mu-footer">
      <div className="mu-container">
        <div className="mu-footer__grid">
          <div>
            <div className="mu-logo">MUR<span className="mu-logo__dot" />LY</div>
            <p>Онлайн-платформа англійської для дітей, підлітків і дорослих. Кабінети для вчителя й учня. Створено в Україні.</p>
          </div>
          <div>
            <h4>Murly</h4>
            <ul>
              <li><Link href="/#students">Учням</Link></li>
              <li><Link href="/for-teachers">Вчителям</Link></li>
              <li><Link href="/for-parents">Батькам</Link></li>
              <li><Link href="/nmt">НМТ з англійської</Link></li>
              <li><Link href="/pricing">Тарифи</Link></li>
            </ul>
          </div>
          <div>
            <h4>Вчитися</h4>
            <ul>
              <li><Link href="/grammar">Граматика</Link></li>
              <li><Link href="/irregular-verbs">Неправильні дієслова</Link></li>
              <li><Link href="/irregular-verbs/games">Ігри з дієсловами</Link></li>
              <li><Link href="/practice">Слухати і читати</Link></li>
              <li><Link href="/quiz/teen-life">Квізи</Link></li>
              <li><Link href="/worlds">Murly Town</Link></li>
            </ul>
          </div>
          <div>
            <h4>Компанія</h4>
            <ul>
              <li><Link href="/about"><Icon id="c-cat" />Про нас</Link></li>
              <li><Link href="/contact"><Icon id="d-phone" />Контакти</Link></li>
              <li><a href="#"><Icon id="e-pencil" />Блог</a></li>
            </ul>
          </div>
          <div>
            <h4>Соцмережі</h4>
            <ul>
              <li><a href="#"><Icon id="e-mic" />TikTok</a></li>
              <li><a href="#"><Icon id="d-camera" />Instagram</a></li>
              <li><a href="#"><Icon id="d-send" />Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="mu-footer__bottom">
          <Icon id="c-cat-sleep" className="mu-ic mu-ic--sleep" />© {new Date().getFullYear()} Murly · Зроблено в Україні
        </div>
      </div>
    </footer>
  );
}
