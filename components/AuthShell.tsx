import Link from 'next/link';
import Icon from './Icon';
import { LangSwitch } from './LangProvider';

// Вхід і реєстрація на весь екран: ліворуч яскрава панель Murly, праворуч форма
export default function AuthShell({ title, lead, points, aside, children }: {
  title: React.ReactNode; lead: string;
  points: { icon: string; text: string }[];
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="auth-split">
      <aside className="auth-split__brand">
        <Link href="/" className="mu-logo auth-split__logo">MUR<span className="mu-logo__dot" />LY</Link>
        <h1>{title}</h1>
        <p className="auth-split__lead">{lead}</p>
        <ul className="auth-split__points">
          {points.map((p) => (
            <li key={p.text}><span className="auth-split__ic"><Icon id={p.icon} /></span>{p.text}</li>
          ))}
        </ul>
        {aside}
        <Icon id="c-cat-sit" className="mu-ic auth-split__cat" />
      </aside>
      <main className="auth-split__main">
        <div className="auth-split__top"><LangSwitch /></div>
        <div className="auth-split__form">{children}</div>
      </main>
    </div>
  );
}

// Вигляд форми Clerk у стилі Murly: без зайвої картки, на всю ширину колонки
export const clerkLook = {
  elements: {
    rootBox: { width: '100%' },
    cardBox: { width: '100%', maxWidth: '100%', boxShadow: 'none', border: '0', background: 'transparent' },
    card: { width: '100%', boxShadow: 'none', background: 'transparent', padding: '8px 0', border: '0' },
    header: { textAlign: 'left', alignItems: 'flex-start' },
    headerTitle: { fontSize: '30px', lineHeight: '1.15', fontFamily: 'Boldonse, Arial Black, sans-serif', fontWeight: '400' },
    headerSubtitle: { fontSize: '15px' },
    formButtonPrimary: { background: '#1A1A1A', color: '#D0F834', borderRadius: '999px', height: '48px', fontSize: '15px', textTransform: 'none', boxShadow: '0 3px 0 #1A1A1A' },
    formFieldInput: { height: '46px', borderRadius: '14px', border: '2px solid #1A1A1A', background: '#fff' },
    socialButtonsBlockButton: { height: '46px', borderRadius: '14px', border: '2px solid #1A1A1A', background: '#fff' },
    footer: { background: 'transparent' },
  },
};
